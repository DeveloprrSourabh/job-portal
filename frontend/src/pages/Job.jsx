import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import api from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {
      const response = await api.get(`/jobs?keyword=${search}&page=${page}`);

      setJobs(response?.data.jobs);
      setTotalPages(response.data.totalPages);
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
  }, [page]);

  if (loading) {
    return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
  }
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <p>{search}</p>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
      </div>
      <button
        onClick={fetchJobs}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-3 hover:bg-blue-700 transition"
      >
        Search
      </button>

      <div className="grid grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
