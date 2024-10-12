import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice'; // Import the logout action
// import { useSelector } from 'react-redux';
// import ReviewForm from '../components/ReviewForm'


const Navbar = () => {

//   const jobId = useSelector((state) => state.jobs.currentJobId); // Example from Redux
// const freelancerId = useSelector((state) => state.auth.userId); // Freelancer ID from auth state
// const clientId = useSelector((state) => state.auth.clientId); // Client ID

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action to clear state
    localStorage.removeItem('token');  // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');  // Redirect to login page
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">My Freelancer Platform</Link>
        <div>
          <Link to="/login" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Login</Link>
          <Link to="/register" className="ml-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600">Register</Link>
          <Link to="/reviews" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Reviews</Link>{/* Review List Link */}
          {/* <Link
  to={`/reviews/new?jobId=${jobId}&freelancerId=${freelancerId}&clientId=${clientId}`}
  className="ml-4 px-4 py-2 bg-green-500 rounded hover:bg-green-600"
>
  Leave a Review
</Link> */}


                  {/* <ReviewForm
            jobId={someJobId}
            freelancerId={someFreelancerId}
            clientId={someClientId}
          />   */}
  
          <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
