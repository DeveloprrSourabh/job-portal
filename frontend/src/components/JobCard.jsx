const JobCard = ({ title, company, location }) => {
  return (
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Company:</span> {company}
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Location:</span> {location}
      </p>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
        View Details
      </button>
    </div>
  );
};

export default JobCard;