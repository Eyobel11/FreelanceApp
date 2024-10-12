import Sidebar from '../components/Sidebar';

const ClientDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold">Client Dashboard</h1>
        <p>Welcome to your client dashboard. Post jobs, manage listings, and track applicants here.</p>
        {/* Other client-specific content */}
      </div>
    </div>
  );
};

export default ClientDashboard;
