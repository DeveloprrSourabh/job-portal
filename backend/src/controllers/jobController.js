import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { title, company, location, description,salary,experience,jobType,requirements } = req.body;
    if (
  !title ||
  !company ||
  !location ||
  !salary ||
  !experience ||
  !jobType ||
  !description ||
  !requirements
) {
  return res.status(400).json({
    message: "Please fill all required fields",
  });
}

    const job = await Job.create({
  title,
  company,
  location,
  salary,
  experience,
  jobType,
  description,
  requirements,
  recruiter: req.user.id,
});

    res.status(201).json({ message: "Job created successfully", job });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const keyword = req.query.keyword || "";
    const totalJobs = await Job.countDocuments({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          location: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });
    const jobs = await Job.find({
      $or: [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          location: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    })
      .populate("recruiter", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      jobs,
      totalJobs,
      page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Particular Recruiter Job
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Jobs
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Jobs
export const updateJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jon not find",
      });
    }

    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.location = location || job.location;
    job.description = description || job.description;

    const updatedJob = await job.save();
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single Job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "recruiter",
      "name email",
    );
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
