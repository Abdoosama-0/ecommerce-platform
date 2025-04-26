const Product=require('../models/products')
const Order = require('../models/order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email') // يعرض اسم وإيميل المستخدم
      .populate('products.productId', 'title price'); // يعرض اسم وسعر كل منتج

    res.status(200).json({message:"all orders",orders} );
  } catch (error) {
    console.error( 'Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const adminWelcome= async(req,res)=>{
  return res.json({message:'welcome admin'})

}


const addProduct=async(req,res)=>{
    try {
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
      } catch (error) {
        res.status(500).json({ error,message: "حدث خطأ أثناء إضافة المنتج" });
      }
    }
    
    const getProducts = async (req, res) => {
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
    
    const getProductById = async (req, res) => {
      const  id  = req.query.id;
    
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: "المنتج غير موجود" });
        }
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء استرجاع المنتج" });
      }
    }

    const editProduct = async (req, res) => {
      try {
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
      } catch (error) {
        console.error(error); // طباعة الخطأ في الكونسول لمساعدتك في تتبع المشكلة 
        res.status(500).json({ error: error.message || "حدث خطأ أثناء تعديل المنتج" });
      }
    };
    

    const deleteProduct = async (req, res) => {
      const id = req.query.id;
    
      try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ error: "المنتج غير موجود" });
        }
        res.json({ message: "تم حذف المنتج بنجاح" });
      } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء حذف المنتج" });
      }
    }

module.exports={addProduct,getProducts,getProductById,editProduct,deleteProduct,adminWelcome,getOrders}