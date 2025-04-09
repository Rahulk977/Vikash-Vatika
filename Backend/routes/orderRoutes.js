const express = require("express");
const Order = require("../models/Order");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Place Order (Authenticated users only)
router.post("/place", authenticate, async (req, res) => {
  try {
    const { order_id, address, cart, total_amount } = req.body;

    if (!order_id || !address || !cart || !Array.isArray(cart) || cart.length === 0 || !total_amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await Order.create({
      userId: req.user.userId,
      order_id,
      address,
      items,
      total_amount,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Orders of Logged In User
router.get("/my", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Specific Order by ID (Authenticated)
router.get("/details/:id", authenticate, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;