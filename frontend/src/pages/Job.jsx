import JobCard from "../components/JobCard";

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Microsoft",
      location: "Delhi",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Google",
      location: "Bangalore",
    },
    {
      id: 3,
      title: "MERN Developer",
      company: "Amazon",
      location: "Hyderabad",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Available Jobs
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {jobs.map((job)=>(
            <JobCard
                key={job.id}
                {...job}
            />
        ))}
      </div>
    </div>
  );
};

export default Jobs;