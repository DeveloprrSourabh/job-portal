import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import api from "../services/api";

const Jobs = () => {
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/jobs");

      setJobs(response?.data.jobs);
      console.log(response);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
  return (
    <h1 className="text-center text-2xl mt-10">
      Loading...
    </h1>
  );
}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      <div className="grid grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
