import { useSelector } from 'react-redux';

const DashboardHome = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      {role ? (
        <>
          {role === 'freelancer' && (
            <div>
              <p className="text-lg">This is the Freelancer Dashboard.</p>
              <p>Here you can manage your gigs, bids, and earnings.</p>
            </div>
          )}
          {role === 'client' && (
            <div>
              <p className="text-lg">This is the Client Dashboard.</p>
              <p>Here you can post jobs, track applicants, and manage payments.</p>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg">Role not found. Please log in again.</p>
      )}
    </div>
  );
};

export default DashboardHome;
