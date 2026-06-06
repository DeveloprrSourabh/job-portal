import express from "express";
import protect from "../middleware/authMiddleware.js";
import studentOnly  from "../middleware/studentMiddleware.js";
import recruiterOnly  from "../middleware/recruiterMiddleware.js";
import { applyJob, getApplicants, getMyApplications,updateApplicationStatus } from "../controllers/applicationController.js";

const router = express.Router();

// apply for application
router.post("/:id/apply",protect,studentOnly,applyJob);

// get my applications
router.get(
  "/my-applications",
  protect,
  studentOnly,
  getMyApplications
);

// get applicants
router.get("/job/:id",protect,recruiterOnly,getApplicants);

// update application status
router.put("/:id/status",protect,recruiterOnly,updateApplicationStatus);

export default router;
