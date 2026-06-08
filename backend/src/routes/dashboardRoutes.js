import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import protect from "../middleware/authMiddleware.js";
import recruiterOnly from "../middleware/recruiterMiddleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  recruiterOnly,
  getDashboardStats
);

export default router;