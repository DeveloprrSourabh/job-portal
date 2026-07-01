import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);
  },[]);

  return (
    <div className="px-8 py-12">
      <h1 className="text-5xl font-bold mb-4">
        Find Your Dream Job
      </h1>

      <p className="text-lg text-gray-600 mb-6">
        Connect with top companies and apply for jobs easily.
      </p>

      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
        Browse Jobs
      </button>
    </div>
  );
};

export default Home;