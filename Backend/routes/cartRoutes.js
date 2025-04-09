
// const express = require("express");
// const router = express.Router();
// const Cart = require("../models/Cart");

// // Add item to cart
// router.post("/addcart", async (req, res) => {
//   try {
//     const { userId, item } = req.body;
//     if (!userId || !item || !item.eventId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       cart = new Cart({ userId, items: [{ ...item, quantity: item.quantity || 1 }] });
//     } else {
//       const existingItem = cart.items.find(i => i.eventId.toString() === item.eventId);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         cart.items.push({ ...item, quantity: item.quantity || 1 });
//       }
//     }
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Get cart by user ID
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }
//     const cart = await Cart.findOne({ userId }).populate("items.eventId");
//     res.status(200).json(cart || { userId, items: [] });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Update item quantity in cart
// // backend/routes/cartRoutes.js
// const mongoose = require("mongoose");

// router.put("/updateQuantity", async (req, res) => {
//     try {
//       let { userId, eventId, quantity } = req.body;
  
//       if (!userId || !eventId || quantity < 1) {
//         return res.status(400).json({ error: "Invalid request" });
//       }
  
//       // ✅ Extract `_id` if `eventId` is an object
//       if (typeof eventId === "object" && eventId._id) {
//         eventId = eventId._id;
//       }
  
//       // ✅ Validate ObjectId format
//       if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
//         console.error("Invalid ObjectId format:", { userId, eventId });
//         return res.status(400).json({ error: "Invalid userId or eventId format" });
//       }
  
//       // Convert to ObjectId
//       userId = new mongoose.Types.ObjectId(userId);
//       eventId = new mongoose.Types.ObjectId(eventId);
  
//       const cart = await Cart.findOne({ userId });
//       if (!cart) return res.status(404).json({ error: "Cart not found" });
  
//       const item = cart.items.find(i => i.eventId.equals(eventId));
//       if (!item) return res.status(404).json({ error: "Item not found in cart" });
  
//       item.quantity = quantity;
//       await cart.save();
  
//       res.status(200).json(cart);
//     } catch (error) {
//       console.error("Error updating cart quantity:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
  


// // Remove item from cart
// router.delete("/removecart", async (req, res) => {
//   try {
//     const { userId, eventId } = req.body;
//     if (!userId || !eventId) {
//       return res.status(400).json({ error: "User ID and Event ID are required" });
//     }
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ error: "Cart not found" });
//     cart.items = cart.items.filter(item => item.eventId.toString() !== eventId);
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error removing cart item:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Clear the cart
// router.delete("/clearcart", async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }
//     await Cart.findOneAndDelete({ userId });
//     res.status(200).json({ message: "Cart cleared successfully" });
//   } catch (error) {
//     console.error("Error clearing cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Fetch user's cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Find the cart; if not found, return empty items array
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json({ items: cart.items });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (!userId || !item || !item.eventId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Find cart by userId
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create new cart with the first item
      cart = new Cart({ userId, items: [{ ...item, quantity: 1 }] });
    } else {
      // Check if item exists in cart
      const existingItem = cart.items.find(i => i.eventId.toString() === item.eventId);
      if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with default quantity 1
        cart.items.push({ ...item, quantity: 1 });
      }
    }
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Remove item from cart
router.delete("/remove", async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!userId || !eventId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // Filter out the item that matches eventId
    cart.items = cart.items.filter(item => item.eventId.toString() !== eventId);
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// Update quantity of an item in the cart
router.put("/update", async (req, res) => {
  try {
    const { userId, eventId, quantity } = req.body;
    if (!userId || !eventId || typeof quantity !== 'number') {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const item = cart.items.find(item => item.eventId.toString() === eventId);
    if (item) {
      item.quantity = quantity;
    } else {
      return res.status(404).json({ error: "Item not found in cart" });
    }
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    console.error("Error updating quantity:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

// Clear the entire cart
router.delete("/clear", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;
