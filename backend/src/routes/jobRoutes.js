import express from "express";
import { createJob, deleteJob, getAllJobs, getJobById, getMyJobs, updateJob } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";
import recruiterOnly from "../middleware/recruiterMiddleware.js";

const router = express.Router();

// Create Jobs
router.post("/create", protect, recruiterOnly, createJob);

// Get All Jobs
router.get("/", getAllJobs);

// Get particular recruiter job
router.get(
  "/my-jobs",
  protect,
  recruiterOnly,
  getMyJobs
);

// Delete Jobs
router.delete(
  "/:id",
  protect,
  recruiterOnly,
  deleteJob
);

// Update Job
router.put("/:id",protect,recruiterOnly,updateJob);

// Get single job
router.get("/:id",getJobById);

export default router;