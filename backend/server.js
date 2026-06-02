import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import connectDB from "./src/config/db.js";
import protect from "./src/middleware/authMiddleware.js";

dotenv.config();

connectDB();
const app=express();
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


app.listen(5000,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})