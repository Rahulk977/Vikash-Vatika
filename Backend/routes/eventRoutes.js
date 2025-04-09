const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

// Add Event (Admin only)
router.post("/add", async (req, res) => {
  const { name, category, subcategory, price, images, video } = req.body;

  if (category === "Wedding" && !subcategory) {
    return res.status(400).json({ error: "Wedding events require a subcategory" });
  }

  const event = await Event.create({ name, category, subcategory, price, images, video });
  res.status(201).json(event);
});

// Get All Events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Get Events by Category
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const events = await Event.find({ category });
  res.json(events);
});

// Get Wedding Events by Subcategory
router.get("/wedding/:subcategory", async (req, res) => {
  const { subcategory } = req.params;

  try {
    const events = await Event.find({
      category: "Wedding",
      subcategory: { $regex: new RegExp(subcategory, "i") } // Case-insensitive match
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Specific Event by ID
router.get("/details/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
});

module.exports = router;
