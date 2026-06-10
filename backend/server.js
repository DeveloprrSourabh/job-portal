import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import connectDB from "./src/config/db.js";
import protect from "./src/middleware/authMiddleware.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import cors from "cors";
dotenv.config();

connectDB();
const app=express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use(express.json());

// User Routes
app.use("/api/users",userRoutes)

// proected route
app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You are authorized",
        user: req.user,
    });
});

// JOB Route
app.use("/api/jobs", jobRoutes);

// applications route
app.use("/api/applications", applicationRoutes);

// Dashboard Route
app.use("/api/dashboard", dashboardRoutes);

// Resume uploade route
app.use("/uploads", express.static("uploads"));


app.listen(5000,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})