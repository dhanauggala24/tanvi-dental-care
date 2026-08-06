import express from "express";
import {
  generateBill,
  getAllBills,
  getBillById,
  updatePayment,
} from "../controllers/billController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate Bill
router.post("/", protect, generateBill);

// Get All Bills
router.get("/", protect, getAllBills);
router.get("/:id", protect, getBillById);
router.put("/:id/payment", protect, updatePayment);
export default router;