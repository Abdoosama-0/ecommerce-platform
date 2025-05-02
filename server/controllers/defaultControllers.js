
const User = require('../models/users');
const Product = require('../models/products');
const Order = require('../models/order');
const welcomeUser = (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
};


const logout = (req, res) => {
  res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  return res.status(200).json({ message: 'Logged out successfully' });
};

const clearCart = async (req, res) => {
 
    const userId = req.userId; // يجب أن تكون هذه القيمة متوفرة من الـ middleware مثل isUser

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = []; // 🧹 تفريغ السلة
    await user.save();

    return res.status(200).json({ message: 'Cart cleared successfully',cart:  user.cart});
 
};

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { product } = req.body;

    if (!product.productId || !product.quantity) {
      return res.status(400).json({ message: 'wrong data' });
    }

    if (!userId) {
      return res.status(404).json({ message: 'userId not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // التحقق إذا كان المنتج موجود مسبقاً في الكارت
    const existingItem = user.cart.find(item =>
      item.productId.toString() === product.productId
    );

    if (existingItem) {
      // إذا موجود، زوّد الكمية فقط
      existingItem.quantity += product.quantity;
    } else {
      // إذا غير موجود، أضفه جديد
      user.cart.push(product);
    }

    await user.save();

    return res.status(200).json({ message: 'Added to cart successfully', cart: user.cart });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const cart= async(req,res)=>{
  const userId =req.userId
  if (!userId){
    return res.status(404).json({message:'userId not found'})
  }
  const user = await User.findById(userId)
  if (!userId){
    return res.status(404).json({message:'user not found'})
  }
  return res.status(200).json({message:'get user card successfully' ,cart:user.cart})
}

 
    const products = async (req, res) => {
      const page = parseInt(req.query.page) || 1; // رقم الصفحة، افتراضي 1
      const limit = 20; // عدد العناصر لكل صفحة
      const skip = (page - 1) * limit;
    
      try {
        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments(); // إجمالي المنتجات
    
        res.json({
          products,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
        });
      } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء استرجاع المنتجات" });
      }
    };
    

const product = async (req, res) => {
  const  id  = req.query.id; // الحصول على معرف المنتج من المعاملات
  try {
    const product = await Product.findById(id); // البحث عن المنتج باستخدام المعرف
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // إذا لم يتم العثور على المنتج
    } 
    res.status(200).json(product); // إرجاع خطأ الخادم
  } catch (error) {
    console.error('Error fetching product:', error); // تسجيل الخطأ
    return res.status(500).json({ message: 'Server error' }); // إرجاع خطأ الخادم
  }
}


const order = async (req, res) => {
  try {
    const {  address,paymentMethod,products } = req.body;
    const userId=req.userId
    console.log(userId)
    if (
      !address ||
      !address.government ||
      !address.city|| !address.area|| !address.street|| !address.departmentNumber
    ) {
      return res.status(400).json({ message: 'complete the data please' });
    }
    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }
    if(paymentMethod!=='cash on delivery'){
      return res.status(400).json({ message: 'the paymentMethods that allowed is [cash on delivery]' });
    }

    // تحقق من وجود المستخدم
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // حساب totalQuantity و totalPrice
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      totalQuantity += item.quantity;
      totalPrice += item.quantity * product.price;
    }

    // إنشاء الأوردر
    const newOrder = new Order({
      userId,
      products,
      totalQuantity,
      totalPrice,
      address
      ,paymentMethod
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order placed successfully',
    order:newOrder
    });
  } catch (error) {
    console.error('Order Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
const address = async (req, res) => {
  const { newAddress } = req.body;

  
  if (
    !newAddress ||
    !newAddress.government ||
    !newAddress.city|| !newAddress.area|| !newAddress.street|| !newAddress.departmentNumber
  ) {
    return res.status(400).json({ message: 'complete the data please' });
  }

  
    const user = await User.findById(req.userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.push(newAddress);
    await user.save();

    return res.status(200).json({
      message: 'Address added successfully',
      addresses: user.addresses,
    });
  
};

module.exports={order,products,product,welcomeUser,address,cart,addToCart,clearCart,logout}