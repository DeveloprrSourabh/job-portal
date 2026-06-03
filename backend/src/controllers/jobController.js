import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      description,
      recruiter: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "recruiter",
      "name email"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
