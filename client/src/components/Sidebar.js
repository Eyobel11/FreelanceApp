// Sidebar.js
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="h-full w-64 bg-gray-800 text-white fixed">
      <div className="p-4 font-bold text-lg">Dashboard</div>
      <nav className="mt-8">
        {role === 'freelancer' && (
          <>
            <Link to="/dashboard/freelancer/jobs" className="block py-2 px-4 hover:bg-gray-700">
              My Jobs
            </Link>
            <Link to="/dashboard/freelancer/bids" className="block py-2 px-4 hover:bg-gray-700">
              My Bids
            </Link>
            <Link to="/dashboard/freelancer/messages" className="block py-2 px-4 hover:bg-gray-700">
              Messages
            </Link>
            <Link to="/dashboard/freelancer/payments" className="block py-2 px-4 hover:bg-gray-700">
              Payments
            </Link>
            <Link to="/notification" className="block py-2 px-4 hover:bg-gray-700">
              Notifications
            </Link>
          </>
        )}
        {role === 'client' && (
          <>
            <Link to="/dashboard/client/post-job" className="block py-2 px-4 hover:bg-gray-700">
              Post a Job
            </Link>
            <Link to="/dashboard/client/my-jobs" className="block py-2 px-4 hover:bg-gray-700">
              My Job Listings
            </Link>
            <Link to="/dashboard/client/applicants" className="block py-2 px-4 hover:bg-gray-700">
              Applicants
            </Link>
            <Link to="/dashboard/client/payments" className="block py-2 px-4 hover:bg-gray-700">
              Payments
            </Link>
            <Link to="/notification" className="block py-2 px-4 hover:bg-gray-700">
              Notifications
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
