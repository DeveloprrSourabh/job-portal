import Application from "../models/Application.js";

// apply for application
export const applyJob=async(req,res)=>{
    try {
        const jobId=req.params.id;

        // Already Applied
        const existingApplication=await Application.findOne({
            job:jobId,
            student:req.user.id,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
            });
        }

        // Create new application
        const application = await Application.create({
            job: jobId,
            student: req.user.id,
        });

        res.status(201).json(application);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Get my application
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id,
    }).populate("job");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};