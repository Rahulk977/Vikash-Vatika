const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ["Wedding", "Birthday", "Corporate"], required: true },
  subcategory: {
    type: String,
    enum: ["Stage Decoration", "Gate Decoration", "Gallery Decoration", "Mandap Decoration"],
    required: function () { return this.category === "Wedding"; }
  },
  price: Number,
  images: [String],
  video: String, // Public Google Drive Video Link
});

module.exports = mongoose.model("Event", EventSchema);
