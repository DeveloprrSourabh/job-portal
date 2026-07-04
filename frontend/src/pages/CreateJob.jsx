import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    requirements: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post(
      "/jobs/create",
      formData
    );
    console.log(response);
    alert(response.data.message);

    navigate("/dashboard");
  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
        "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Post New Job</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
        />

        <button
  type="submit"
  disabled={loading}
  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
>
  {loading ? "Posting..." : "Post Job"}
</button>
      </form>
    </div>
  );
};

export default CreateJob;
