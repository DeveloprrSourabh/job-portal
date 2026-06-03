import express from "express";
import { createJob, getAllJobs } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";
import recruiterOnly from "../middleware/recruiterMiddleware.js";

const router = express.Router();

// Create Jobs
router.post("/create", protect, recruiterOnly, createJob);

// Get All Jobs
router.get("/", getAllJobs);

export default router;