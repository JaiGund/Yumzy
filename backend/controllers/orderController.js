import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing user order for frontend.
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Done" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: "Error" });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming `authMiddleware` adds user info to `req.user`

    // Find the most recent order by `userId`
    const order = await orderModel.findOne({ userId }).sort({ date: -1 }); // Sort by date (most recent)

    if (!order) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    res.json({ success: true, address: order.address });
  } catch (error) {
    console.error("Error fetching user address:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus, getUserAddress };