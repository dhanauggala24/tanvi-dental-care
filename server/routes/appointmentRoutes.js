import express from "express";
import {
  getAppointments,
  approveAppointment,
  assignDoctor,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================
// Get All Appointments
// ============================
router.get("/", protect, getAppointments);

// ============================
// Approve Appointment
// ============================
router.put("/:id/approve", protect, approveAppointment);

// ============================
// Assign Doctor
// ============================
router.put("/:id/assign-doctor", protect, assignDoctor);

export default router;