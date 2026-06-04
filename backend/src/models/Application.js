import mongoose, { Schema } from "mongoose";

const applicationSchema=new Schema({
 job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{timestamps:true});

const Application= mongoose.model("Application",applicationSchema);

export default Application;