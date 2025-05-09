const Product=require('../models/product')
const Order = require('../models/order');
const User = require('../models/user');

const banUser = async (req, res) => {
  const userId = req.query.id; // الحصول

  const user = await User.findById(userId);
  if (!user) {
return res.status(404).json({ message: 'User not found' });
  }
  user.isBanned = !user.isBanned;

  await user.save();
  return res.status(200).json({ message: 'success', newStatus:user.isBanned });
}

const getUsers = async (req, res) => {
const users =await User.find()
 .select('_id name email phone address isAdmin isBanned') // تحديد الحقول التي تريد إرجاعها
if (!users) {
  return res.status(404).json({ message: 'Users not found' });
}
const usersCount = await User.countDocuments(); // إجمالي المستخدمين
return res.status(200).json({ message: 'all Users', usersCount, users });


}


const updateOrderStatus = async (req, res) => {
  const orderId = req.query.id; // الحصول

  const { status } = req.body; // الحصول على الحالة الجديدة من الطلب
    if(!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' ,validValues:['pending', 'shipped', 'delivered', 'cancelled']}); 
    }
 
    // تحديث حالة الطلب في قاعدة البيانات
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }, // لإرجاع النسخة المحدثة من الطلب

    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order status updated successfully', order: updatedOrder });
  
};


const getOrder = async (req, res) => {
  const orderId = req.query.id; 
  const order = await Order.findById(orderId)
  .populate('userId', 'name email phone ') 
  .populate('products.productId', 'title price imageUrls'); 
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.status(200).json({message:"order found",order} );


}



const getOrders = async (req, res) => {
 
    const orders = await Order.find()
      .populate('userId', 'name email') // يعرض اسم وإيميل المستخدم
      .populate('products.productId', 'title price'); // يعرض اسم وسعر كل منتج

    res.status(200).json({message:"all orders",orders} );

};


const adminWelcome= async(req,res)=>{
  return res.json({message:'welcome admin'})

}


const addProduct=async(req,res)=>{
    
        const { title, price, details, category } = req.body;
        let imageUrls = [];
    
        // التحقق إذا كان في صور مرفوعة
        if (req.files && req.files.length > 0) {
          // إضافة الصور الجديدة للمصفوفة
          imageUrls = req.files.map((file) => file.path);
        }
       
        const newProduct = new Product({
          title,
          price: Number(price),
          details,
          category,
          imageUrls,
    
        });
    
        await newProduct.save(); 
    
        res.json({ message: "تم إضافة المنتج بنجاح", product: newProduct });
  
    }
    
    const getProducts = async (req, res) => {
      const page = parseInt(req.query.page) || 1; // رقم الصفحة، افتراضي 1
      const limit = 20; // عدد العناصر لكل صفحة
      const skip = (page - 1) * limit;
    
      
        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments(); // إجمالي المنتجات
    
        res.json({
          products,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
        });
   
    };
    
    const getProductById = async (req, res) => {
      const  id  = req.query.id;
    
    
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: "المنتج غير موجود" });
        }
        res.json(product);
     
    }

    const editProduct = async (req, res) => {
     
        const id = req.query.id;
        let imageUrls = [];
    
        
        if (req.files && req.files.length > 0) {
         
          imageUrls = req.files.map((file) => file.path);
        }
    

        if (req.body.existingImages) {
          try {
            const existingImages = JSON.parse(req.body.existingImages); // فك الـ JSON للصور القديمة
            imageUrls = [...existingImages, ...imageUrls]; // دمج الصور القديمة مع الجديدة
          } catch (err) {
            return res.status(400).json({ error: 'existingImages not valid JSON' });
          }
        }
    
        const { title, price, details, category } = req.body;
    
        // التأكد من أن السعر قيمة صالحة
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
          return res.status(400).json({ error: 'Invalid price value' });
        }
    
        // تحديث المنتج في قاعدة البيانات
        const product = await Product.findByIdAndUpdate(
          id,
          {
            title,
            price: numericPrice,
            details,
            category,
            imageUrls
          },
          { new: true } // علشان يرجعلك النسخة الجديدة بعد التعديل
        );
    
        if (!product) {
          return res.status(404).json({ error: "المنتج غير موجود" });
        }
    
        res.json({ message: "تم تعديل المنتج بنجاح", product });
    
    };
    

    const deleteProduct = async (req, res) => {
      const id = req.query.id;
    
      
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ error: "المنتج غير موجود" });
        }
        res.json({ message: "تم حذف المنتج بنجاح" });
    
    }

module.exports={addProduct,getProducts,getProductById,editProduct,deleteProduct,adminWelcome,getOrders,getOrder,updateOrderStatus,getUsers,banUser}