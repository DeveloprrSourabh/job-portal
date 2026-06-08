import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getDashboardStats = async (req, res) => {
  try {
    // recruiter's jobs
    const jobs = await Job.find({
      recruiter: req.user.id,
    });

    // only job ids
    const jobIds = jobs.map((job) => job._id);

    const totalJobs = jobs.length;

    const totalApplications =
      await Application.countDocuments({
        job: { $in: jobIds },
      });

    const accepted =
      await Application.countDocuments({
        job: { $in: jobIds },
        status: "accepted",
      });

    const rejected =
      await Application.countDocuments({
        job: { $in: jobIds },
        status: "rejected",
      });

    const pending =
      await Application.countDocuments({
        job: { $in: jobIds },
        status: "pending",
      });

    res.status(200).json({
      totalJobs,
      totalApplications,
      accepted,
      rejected,
      pending,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
