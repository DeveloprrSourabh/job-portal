import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyJobs = async () => {
    try {
      const response = await api.get("/jobs/my-jobs");
      //   console.log(response);
      setJobs(response.data.jobs);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  if (loading) {
    return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      <div className="mb-6">
        <Link
          to="/dashboard/create-job"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          + Post New Job
        </Link>
      </div>
      {jobs?.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> ₹{job.salary}
                </p>

                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>

                <p>
                  <strong>Type:</strong> {job.jobType}
                </p>

                <p className="text-gray-500 mt-2">{job.description}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/dashboard/edit-job/${job._id}`}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
