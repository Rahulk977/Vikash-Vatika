const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
      name: String,
      category: String,
      subcategory: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
