import express from "express";
import {
  registerPatient,
  getPatientHistory,
} from "../controllers/patientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================
// Register Patient
// ============================
router.post("/register", registerPatient);

// ============================
// Patient History
// ============================
router.get("/:id/history", protect, getPatientHistory);

export default router;