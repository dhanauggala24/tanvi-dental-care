import express from "express";
import {
  registerPatient,
  getAppointments,
  approveAppointment,
  assignDoctor,
} from "../controllers/patientController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerPatient);

router.get("/appointments", protect, getAppointments);

router.put("/appointments/:id/approve", protect, approveAppointment);

// NEW ROUTE
router.put("/appointments/:id/assign-doctor", protect, assignDoctor);

export default router;