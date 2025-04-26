const Order = require('../models/order');
const User = require('../models/users');
const Product = require('../models/products');

const order = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid request data' });
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
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder._id,
      totalQuantity,
      totalPrice,
    });
  } catch (error) {
    console.error('Order Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports={order}