import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User Already register",
            })
        }

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating User
        const user=await User.create({
            name,email,password:hashedPassword
        })
        res.status(201).json({
            message:"User Register Successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

// Login User
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        
        // find user
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }

        // matching password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
            })
        }

        // JWT TOKEN CREATE
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.status(200).json({
            message: "Login successfull",
            token,
            user,
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}