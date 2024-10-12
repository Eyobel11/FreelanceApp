import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Example of getting user role (this could be from a context, Redux, or localStorage)
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar role={userRole} /> {/* Pass role to Sidebar */}
      <div className="flex-grow p-6 bg-gray-100">
        <Outlet context={{ role: userRole }} /> {/* Pass role to child components */}
      </div>
    </div>
  );
};

export default UserDashboard;
