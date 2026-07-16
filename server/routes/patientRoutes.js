import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", protect, registerPatient);

export default router;