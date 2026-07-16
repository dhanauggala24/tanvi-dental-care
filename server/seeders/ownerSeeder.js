import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

connectDB();

const seedOwners = async () => {
  try {
    // Delete existing owners
    await User.deleteMany({ role: "owner" });

    // Hash password
    const hashedPassword = await bcrypt.hash("Tanvi@2026", 10);

    // Create owners
    const owners = [
      {
        fullName: "Dr. Pydi Naidu",
        email: "pratapnaidu91@gmail.com",
        phone: "9492427478",
        password: hashedPassword,
        role: "owner",
        specialization: "Dental Surgeon",
      },
      {
        fullName: "Dr. Swathi",
        email: "nagaswathipokala@gmail.com",
        phone: "7207389116",
        password: hashedPassword,
        role: "owner",
        specialization: "Dental Surgeon",
      },
    ];

    await User.insertMany(owners);

    console.log("✅ Owners created successfully.");

    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
};

seedOwners();