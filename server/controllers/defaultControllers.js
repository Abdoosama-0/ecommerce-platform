require('dotenv').config()
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const Category = require('../models/category');
const welcomeUser = (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
};

const restoreOrder = async (req, res) => {
const {orderId} =req.params
  if (!orderId) {
    return res.status(400).json({ message: 'orderId is required' });
  }
const order = await Order.findById(orderId)
order.status="pending"
await order.save()
return res.status(200).json({order})

}
const cancelOrder = async (req, res) => {
const {orderId} =req.params
  if (!orderId) {
    return res.status(400).json({ message: 'orderId is required' });
  }
const order = await Order.findById(orderId)
order.status="cancelled"
await order.save()
return res.status(200).json({order})

}

const getUserOrders = async (req, res) => {
  const userId = req.userId;
  const {status} = req.params
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  const query = {
    status: status,
    userId: userId
  };
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const orders = await Order.find(query)
    .populate('products.productId', 'title price imageUrls  category')
    
    if (!orders) {
      return res.status(404).json({ message: 'Orders not found' });
    }

  return res.status(200).json({
    message: 'User orders retrieved successfully',
    orders:orders

 })
}


const getCategories = async (req, res) => {
  const categories = await Category.find().populate('createdBy', 'name email');

  if (!categories) {
    return res.status(404).json({ message: 'Categories not found' });
  }

 


  return res.status(200).json({
    message: 'All categories',
    categories 
  });
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
  res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'none' });
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
  const user = await User.findById(userId).populate('cart.productId', 'title price imageUrls quantity category');
  if (!user){
    return res.status(404).json({message:'user not found'})
  }
 
  return res.status(200).json({message:'get user cart successfully' ,cart:user.cart})

}

const products = async (req, res) => {
 
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const {category} = req.params


    const query = {
      isDeleted: false,
      quantity: { $gt: 0 },
      category: category
    };

    const products = await Product.find(query).skip(skip).limit(limit);
    const total = await Product.countDocuments(query);
 
    const deletedProductsCount = await Product.countDocuments({ isDeleted: true,category: category });  

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      deletedProductsCount: deletedProductsCount
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
 

   
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });


    let totalQuantity = 0;
    let totalPrice = 0;
    let cartItems = []
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      cartItems.push({
    name: product.title,
    price: product.price,
    quantity: item.quantity,
  });
      totalQuantity += item.quantity;
      totalPrice += item.quantity * product.price;
      if(product.quantity < item.quantity  ){
        return res.status(400).json({ message: `you can just buy : ${ product.quantity}` });
      }
      product.quantity-=item.quantity
      await product.save();
    
    }
let payment_method_id 
let data ={}
if(paymentMethod!=='cash on delivery'){
  try {

if (paymentMethod==='Visa-Mastercard'){  payment_method_id = 2}
if (paymentMethod==='Visa-Fawry'){  payment_method_id = 3}
else{
  
    return res.status(404).json({
      message: 'not valid payment method',
    });
}
// if (paymentMethod==='Visa-Meeza'){  payment_method_id = 4}

const customer={
  first_name:user.name,
  last_name:"none",
  email:user.email,
  phone:user.phone||"none",
}

    const body = {
      payment_method_id,
      cartTotal:totalPrice,
      currency:'EGP',
      customer,
      redirectionUrls: {
        successUrl: process.env.FRONT_URL,
        failUrl: "https://dev.fawaterk.com/fail",
        pendingUrl: "https://dev.fawaterk.com/pending",
      },
      cartItems,
    };

    const response = await fetch(
      "https://staging.fawaterk.com/api/v2/invoiceInitPay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.FAWATERAK_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );


    if (!response.ok) {
 
      console.log("=========================================")
      return res
        .status(response.status)
        .json({ error: "Failed to execute payment" });
    }
     data = await response.json();
  } catch (error) {
    console.error("Error executing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }

   }




    const newOrder = new Order({
      userId,
      products,
      totalQuantity,
      totalPrice,
      address
      ,paymentMethod,
      payment_method_id:payment_method_id||"0",
      invoice_id:data.data.invoice_id|| null,
      invoice_key:data.data.invoice_key|| null,
      paymentStatus:'pending'
    });

    await newOrder.save();

    return res.status(200).json({
      message: 'Order placed successfully',
    order:newOrder,
    payment_data:data.data.payment_data

    });
 
};

//==========

const getPaymentMethods = async (req, res) => {
  try {
    const response = await fetch("https://staging.fawaterk.com/api/v2/getPaymentmethods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FAWATERAK_API_KEY}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch payment methods" });
    }

    const data = await response.json();

    
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//==========
const executePayment = async (req, res) => {
  try {
    const {
      payment_method_id,
      cartTotal,
      currency,
      invoice_number,
      customer,
      cartItems,
    } = req.body;

    const body = {
      payment_method_id,
      cartTotal,
      currency,
      invoice_number,
      customer,
      redirectionUrls: {
        successUrl: "https://dev.fawaterk.com/success",
        failUrl: "https://dev.fawaterk.com/fail",
        pendingUrl: "https://dev.fawaterk.com/pending",
      },
      cartItems,
    };

    const response = await fetch(
      "https://staging.fawaterk.com/api/v2/invoiceInitPay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${process.env.FAWATERAK_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to execute payment" });
    }

    const data = await response.json();

    // رجّع الرد زي ما هو للـ frontend
    res.status(200).json(data);
  } catch (error) {
    console.error("Error executing payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


//=========
const crypto = require("crypto");
;
const fawaterkWebhook=async(req,res)=>{
    const data = req.body;
  
    console.log("Webhook data received:", data);

    if (data.invoice_status === "paid") {
      const query = `InvoiceId=${data.invoice_id}&InvoiceKey=${data.invoice_key}&PaymentMethod=${data.payment_method}`;
  
      const hash = crypto
        .createHmac("sha256",  process.env.FAWATERAK_API_KEY)
        .update(query)
        .digest("hex");
  
      if (hash === data.hashKey) {
        console.log("✅ Hash Verified, Payment is Valid!");
           const order = await Order.findOne({invoice_id:data.invoice_id})
            if (!order) return res.status(404).json({ message: 'Order not found' });
            order.paymentStatus="paid"
            await order.save()

      } else {
        console.log("❌ Hash Verification Failed!");
      }
    }
  

    if (data.status === "EXPIRED") {
      const query = `referenceId=${data.referenceId}&PaymentMethod=${data.paymentMethod}`;
  
      const hash = crypto
        .createHmac("sha256", process.env.FAWATERAK_API_KEY)
        .update(query)
        .digest("hex");
  
      if (hash === data.hashKey) {
        console.log("✅ Hash Verified, Transaction Expired!");
  
      } else {
        console.log("❌ Hash Verification Failed for Expired Transaction!");
      }
    }
  
    res.sendStatus(200); 
}


module.exports={
getPaymentMethods,
executePayment,
fawaterkWebhook,

order,
  products,
  product,
  welcomeUser,
  address,
  cart,
  addToCart,clearCart,
  logout,addresses,cancelOrder,getCategories,increaseQuantity,getProductQuantity,decreaseQuantity,
  deleteFromCart,userData,updateUserData,deleteAddress,updateAddress,getAddressById,getUserOrders ,
  restoreOrder}