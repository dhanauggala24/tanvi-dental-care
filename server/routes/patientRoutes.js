import express from "express";
import {
  registerPatient,
  getAppointments,
  approveAppointment,
  assignDoctor,
  getPatientHistory,
} from "../controllers/patientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Reception
router.post("/register", registerPatient);

// Appointments
router.get("/appointments", protect, getAppointments);
router.put("/appointments/:id/approve", protect, approveAppointment);
router.put("/appointments/:id/assign-doctor", protect, assignDoctor);

// Patient History
router.get("/:id/history", protect, getPatientHistory);

export default router;