const Product=require('../models/product')
const Order = require('../models/order');
const User = require('../models/user');



const banUser = async (req, res) => {
  const userId = req.query.id; 

  const user = await User.findById(userId);
  if (!user) {
return res.status(404).json({ message: 'User not found' });
  }
  user.isBanned = !user.isBanned;

  await user.save();
  return res.status(200).json({ message: 'success', newStatus:user.isBanned });
}

const getUsers = async (req, res) => {
  const query={
    isAdmin:false
  }
const users =await User.find(query)
 .select('_id name email phone address isAdmin isBanned') 
if (!users) {
  return res.status(404).json({ message: 'Users not found' });
}
const usersCount = await User.countDocuments(query); 
return res.status(200).json({ message: 'all Users', usersCount, users });


}


const updateOrderStatus = async (req, res) => {
  const orderId = req.query.id; 

  const { status } = req.body; 
    if(!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    if (!['pending', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' ,validValues:['pending', 'shipped', 'delivered', 'cancelled']}); 
    }
 
 
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }, 

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
  .populate('products.productId', 'title price imageUrls _id'); 
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({message:"order found",order} );


}



const getOrders = async (req, res) => {
 const {status}=req.params
 const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
if (!validStatuses.includes(status)) {
  return res.status(400).json({ message: "status must be one of: 'pending', 'shipped', 'delivered', 'cancelled'" });
}
    const orders = await Order.find({ status })
      .populate('userId', 'name email') 
      .populate('products.productId', 'title price'); 

    return res.status(200).json({message:"all orders",orders} );

};


const adminWelcome= async(req,res)=>{
  return res.json({message:'welcome admin'})

}


const addProduct=async(req,res)=>{
    
        const { title, price, details, category,quantity } = req.body;
        let imageUrls = [];
    
        
        if (req.files && req.files.length > 0) {
         
          imageUrls = req.files.map((file) => file.path);
        }
        if(!title||!price  ||!category || !quantity ||imageUrls.length<1  ) {
            res.status(400).json({ message: "please complete the data"});
        }
      
       
        const newProduct = new Product({
          title,
          price: Number(price),
          details,
          category,
          imageUrls,
          quantity
    
        });
    
        await newProduct.save(); 
    
        res.status(200).json({ message: "تم إضافة المنتج بنجاح", product: newProduct });
  
    }

const getDeletedProducts = async (req, res) => {
 
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    const query = {
      isDeleted: true
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

    
    const getProducts = async (req, res) => {
      const page = parseInt(req.query.page) || 1; 
      const limit = 20; 
      const skip = (page - 1) * limit;
      const query = {
        isDeleted:false
      }
    
      
        const products = await Product.find(query).skip(skip).limit(limit);
      const total = await Product.countDocuments(query);
    
        res.status(200).json({
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
            const existingImages = JSON.parse(req.body.existingImages);
            imageUrls = [...existingImages, ...imageUrls]; 
          } catch (err) {
            return res.status(400).json({ error: 'existingImages not valid JSON' });
          }
        }
    
        const { title, price, details, category } = req.body;
    
     
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
          return res.status(400).json({ error: 'Invalid price value' });
        }
    
   
        const product = await Product.findByIdAndUpdate(
          id,
          {
            title,
            price: numericPrice,
            details,
            category,
            imageUrls
          },
          { new: true } 
        );
    
        if (!product) {
          return res.status(404).json({ error: " product doesn't exists " });
        }
    
        return res.status(200).json({  product });
    
    };
    

    const deleteProduct = async (req, res) => {
      const { productId}= req.params;

       console.log(productId)

        const product = await Product.findById(productId);

     
        if (!product) {
          return res.status(404).json({ message: "Product not available" });
        }       
        product.quantity=0
        product.isDeleted=true 
        await product.save()
        return res.status(200).json({ message: "The product has been successfully deleted." });
    
    }

    
    const restoreProduct = async (req, res) => {
      const { productId}= req.params;
      const {quantity}=req.body
    if(!quantity){
       return res.status(400).json({ message: "you must choose quantity " });
    }

    

        const product = await Product.findById(productId);

     
        if (!product) {
          return res.status(404).json({ message: "Product not available" });
        }       

        product.isDeleted=false 
        product.quantity=quantity
        await product.save()
        return res.status(200).json({ message: "The product has been successfully restored." });
    
    }
module.exports={addProduct,getProducts,getProductById,editProduct,deleteProduct,adminWelcome,getOrders,getOrder,updateOrderStatus,getUsers,banUser,getDeletedProducts,restoreProduct}