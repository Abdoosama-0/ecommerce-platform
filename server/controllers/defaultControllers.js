
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const welcomeUser = (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
};

const getProductQuantity = async (req, res) => {
 
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ 
      message: 'Product quantity retrieved successfully', 
      quantity: product.quantity 
    });

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

  
    const user = await User.findById(req.userId);

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

const getAddressById =async (req,res)=>{
const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressId = req.params.addressId;
    const address = user.addresses.find((addr) => addr._id.toString() === addressId);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    return res.status(200).json({ message: 'Success get address', address });
}
const updateAddress = async (req, res) => {
  const {
    government,
    city,
    area,
    street,
    buildingNumber,
    departmentNumber
  } = req.body.currentEditAddress;

     const addressId = req.params.addressId;

  if (!addressId) {
    return res.status(400).json({ message: 'عنوان غير صالح' });
  }

  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }


  const address = user.addresses.find((addr) => addr._id.toString() === addressId);

  if (!address) {
    return res.status(404).json({ message: 'العنوان غير موجود' });
  }


  address.government = government || address.government;
  address.city = city || address.city;
  address.area = area || address.area;
  address.street = street || address.street;
  address.buildingNumber = buildingNumber || address.buildingNumber;
  address.departmentNumber = departmentNumber || address.departmentNumber;


  await user.save();

  return res.status(200).json({ message: 'تم تحديث العنوان بنجاح', address });
};





const deleteAddress = async (req, res) => {
     const addressId = req.params.addressId;

  if (!addressId) {
    return res.status(400).json({ message: 'الطلب غير صحيح، يجب تحديد عنوان' });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

  const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === addressId);

  if (addressIndex === -1) {
    return res.status(404).json({ message: 'العنوان غير موجود' });
  }

  // حذف العنوان من المصفوفة
  user.addresses.splice(addressIndex, 1);

  // حفظ التغييرات
  await user.save();

  return res.status(200).json({ message: 'تم حذف العنوان بنجاح', addresses: user.addresses });
};

const updateUserData = async (req,res)=>{
  const { username, email, name, phone } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      username,
      email,
      name,
      phone
    },
    {
      new: true,           
      runValidators: true
    }
  );

  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

  return res.status(200).json({ user });
}



const userData = async (req,res)=>{
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }
  return res.status(200).json({ 
    username: user.username,
    email:user.email,
    name:user.name,
    isAdmin:user.isAdmin,
    phone:user.phone,
    addresses:user.addresses
   });
}

const deleteFromCart = async (req, res) => {
  const user = await User.findById(req.userId);
  const { productId } = req.body;

  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }


  const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'المنتج غير موجود في السلة' });
  }

  
  user.cart.splice(productIndex, 1);

 
  await user.save();

  return res.status(200).json({ message: 'تم حذف المنتج من السلة بنجاح' });
};



const decreaseQuantity = async (req, res) => {
  const user = await User.findById(req.userId);
  const { productId } = req.body;

  if (!user) {
    return res.status(404).json({ message: 'المستخدم غير موجود' });
  }

 
  const product = user.cart.find(item => item.productId.toString() === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'المنتج غير موجود في السلة' });
  }

 

  if (product.quantity > 1) {
    product.quantity--;
    await user.save();
  } else {
    
    const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);
    if (productIndex !== -1) {
      user.cart.splice(productIndex, 1);
      await user.save();
      return res.status(200).json({ message: 'تم حذف العنصر' });
    }
  }
 


  return res.status(200).json({ message: 'تمت النقصان بنجاح', quantity: product.quantity });
};
const increaseQuantity = async (req, res) => {
  
    const user = await User.findById(req.userId);
    const { productId } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productInCart = user.cart.find(item => item.productId.toString() === productId);

    if (!productInCart) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const productInStock = await Product.findById(productId);

    if (!productInStock) {
      return res.status(404).json({ message: 'Product not found in stock' });
    }

    if (productInStock.quantity < productInCart.quantity + 1) {
      return res.status(400).json({ message: `You can only buy: ${productInStock.quantity} items` });
    }

    // Increase quantity in cart
    productInCart.quantity++;
    await user.save();

    return res.status(200).json({ message: 'Quantity increased successfully', quantity: productInCart.quantity });

};


const addresses =async (req,res)=>{
  const user= await User.findById(req.userId)
  if(!user){
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(200).json({ message: 'succuss get addresses' ,addresses: user.addresses });
}

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
    const productInStock = await Product.findById(product.productId);

    if (!productInStock) {
      return res.status(404).json({ message: 'Product not found in stock' });
    }

    if (productInStock.quantity < product.quantity + 1) {
      return res.status(400).json({ message: `You can only buy: ${productInStock.quantity} items` });
    }

   
    const existingItem = user.cart.find(item =>
      item.productId.toString() === product.productId
    );

    if (existingItem) {

      existingItem.quantity += product.quantity;
       await user.save();

    return res.status(200).json({ message: 'quantity increased successfully', art: user.cart,quantity:   existingItem.quantity  });

    } else {
    
      user.cart.push(product);
      await user.save();

    return res.status(200).json({ message: 'Added to cart successfully', cart: user.cart, quantity: product.quantity });
    }



};

const cart= async(req,res)=>{
  const userId =req.userId
  if (!userId){
    return res.status(404).json({message:'userId not found'})
  }
  const user = await User.findById(userId).populate('cart.productId', 'title price imageUrls quantity');
  if (!user){
    return res.status(404).json({message:'user not found'})
  }
 
  return res.status(200).json({message:'get user card successfully' ,cart:user.cart})

}

const products = async (req, res) => {
 
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;


    const query = {
      isDeleted: false,
      quantity: { $gt: 0 },
    };

    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
 
};


const product = async (req, res) => {
  const  id  = req.query.id;
  
    const product = await Product.findById(id); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    } 
    res.status(200).json(product);

}


const order = async (req, res) => {
 
    const {  address,paymentMethod,products } = req.body;
    const userId=req.userId

  
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

   
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });


    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      totalQuantity += item.quantity;
      totalPrice += item.quantity * product.price;
      if(product.quantity < item.quantity  ){
        return res.status(400).json({ message: `you can just buy : ${ product.quantity}` });
      }
      product.quantity-=item.quantity
      await product.save();
    
    }

   


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
 
};


module.exports={order,products,product,welcomeUser,address,cart,addToCart,clearCart,logout,addresses,increaseQuantity,getProductQuantity,decreaseQuantity,deleteFromCart,userData,updateUserData,deleteAddress,updateAddress,getAddressById}