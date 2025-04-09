const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alt_phone: { type: String },
  flat: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  zipcode: { type: String, required: true },
}, { _id: false });

const OrderItemSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: String,
  category: String,
  subcategory: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order_id: { type: String, required: true, unique: true },
  address: { type: AddressSchema, required: true },
  items: [OrderItemSchema],
  total_amount: { type: Number, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Confirmed", "Completed", "Cancelled"] },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
