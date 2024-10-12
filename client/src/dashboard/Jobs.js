import { useOutletContext } from 'react-router-dom';

const Jobs = () => {
  const { role } = useOutletContext();

  return (
    <div>
      <h1 className="text-2xl font-bold">Jobs</h1>

      {role === 'freelancer' ? (
        <div>
          <h2 className="text-xl">Freelancer Job Listings</h2>
          <p>Manage the jobs you have applied for, and ongoing jobs.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl">Client Job Postings</h2>
          <p>Manage the jobs you have posted and review freelancer proposals.</p>
        </div>
      )}
    </div>
  );
};

export default Jobs;
