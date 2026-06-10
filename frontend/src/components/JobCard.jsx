const JobCard = ({ title, company, location }) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p>{company}</p>

      <p>{location}</p>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3">
        View Details
      </button>
    </div>
  );
};

export default JobCard;