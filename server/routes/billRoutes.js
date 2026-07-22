import express from "express";
import { generateBill } from "../controllers/billController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate Bill
router.post("/", protect, generateBill);

export default router;