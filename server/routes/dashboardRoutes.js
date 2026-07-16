import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOwnerDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/owner", protect, getOwnerDashboard);

export default router;