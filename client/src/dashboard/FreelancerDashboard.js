import Sidebar from '../components/Sidebar';
import ManageJobs from '../components/ManageJobs';
import { Link } from 'react-router-dom';

const FreelancerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold">Freelancer Dashboard</h1>
        <p>Welcome to your freelancer dashboard. Manage your jobs, bids, and payments here.</p>
        {/* Other freelancer-specific content */}

        <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>
      <nav>
        <Link to="/dashboard/manage-jobs" className="text-blue-600 hover:underline">
          Manage Jobs
        </Link>
      </nav>
      {/* Assume we have a route setup for this component */}
      <ManageJobs />
    </div>

      </div>
    </div>
  );
};

export default FreelancerDashboard;
