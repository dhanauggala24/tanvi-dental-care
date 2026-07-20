import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyAppointments,
  saveClinicalNote,
} from "../controllers/doctorController.js";

const router = express.Router();

// Get logged-in doctor's appointments
router.get("/my-appointments", protect, getMyAppointments);

// Save Clinical Note
router.post(
  "/appointments/:id/clinical-note",
  protect,
  saveClinicalNote
);

export default router;