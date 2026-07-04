import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    experience: "",
    description: "",
    requirements: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);

      const job = response.data.job;

      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        experience: job.experience,
        description: job.description,
        requirements: job.requirements,
      });
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Failed to load job");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);
  if (loading) {
    return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  }
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Edit Job</h1>
    </div>
  );
};

export default EditJob;
