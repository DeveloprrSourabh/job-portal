import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { loginUser, registerUser, uploadResume } from "../controllers/userControllers.js";
import protect from "../middleware/authMiddleware.js";


const router=express.Router();

//Register User 
router.post("/register",registerUser);

// Login User
router.post("/login",loginUser);

// resume upload
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

export default router;