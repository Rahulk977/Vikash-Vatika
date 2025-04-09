const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config(); // Load environment variables

// Ensure you have a valid MongoDB connection string in `.env`
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("adminpassword", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    mongoose.disconnect();
  }
};

createAdmin();
