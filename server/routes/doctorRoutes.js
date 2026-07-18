import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyAppointments } from "../controllers/doctorController.js";

const router = express.Router();

// Doctor's Appointments
router.get("/my-appointments", protect, getMyAppointments);

export default router;