import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';
import Chat from './components/Chat'; // Import Chat component
// import Navbar from './components/Navbar'; // Import the NavBar
import Payment from './pages/Payment'; // Import the Payment component
import UserDashboard from './pages/UserDashboard';
import DashboardHome from './dashboard/DashboardHome';
import Jobs from './dashboard/Jobs';
import Messages from './dashboard/Message';
import Payments from './dashboard/Payments';
import Settings from './dashboard/Settings';
import FreelancerDashboard from './dashboard/FreelancerDashboard';
import ClientDashboard from './dashboard/ClientDashboard';
import ManageJobs from './components/ManageJobs';

import PortfolioPage from './pages/PortfolioPage';
import CreateProfilePage from './pages/CreateProfilePage';  // Import the new component
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './slices/authSlice';
import EditProfilePage from './pages/EditProfilePage';
import ViewProfilePage from './pages/ViewProfilePage';
import EditJobPage from './pages/EditJobPage';

import Notification from './components/Notification'
import ReviewForm from './components/ReviewForm';
import ReviewList from './pages/ReviewList';


import HomePage from './Real DashBoard/HomePage'
import LoginDash from './Real Pages/Login'
import RegisterDash from './Real Pages/Register'
import DashboardClient from './Real Pages/Dashboardclient'
import ServiceShow from './Real Pages/ServiceShow'



import Dashboardfreelancer from './Real Pages/Dashboardfreelancer'
import FreelancerDashboardDash from './Real Pages/RealFreelancer/FreelancerDashboard';
import MyService from './Real Pages/RealFreelancer/Myservice';
import FreelancerProfile from './Real Pages/RealFreelancer/FreelancerProfile'
import PostNewService from './Real Pages/RealFreelancer/PostNewService'
import ServiceShowDetail from './Real Pages/RealFreelancer/ServiceShowDetail'
import FreelancerList from './Real Pages/FreelancerList';
import FreelancerProfileDetail from './Real Pages/FreelancerProfileDetail';
import ViewProfilePageReal from './Real Pages/RealFreelancer/ViewProfile';
import ServiceList from './Real Pages/ServiceList';
import ClientDashboardDash from './Real Pages/RealClient/ClientDashboardDash';
import ClientProfile from './Real Pages/RealClient/ClientProfile';
import PostNewProject from './Real Pages/RealClient/PostNewProject';
import MyJobs from './Real Pages/RealClient/MyJobs';
import JobListDash from './Real Pages/JobList';
import JobDetailDash from './Real Pages/JobShow';
import ClientProfileDetail from './Real Pages/ClientProfileDetail';

 
const clientID = "418054380291-vrjp8ju8edl5a7rdu66p16pn49sshbm6.apps.googleusercontent.com";

function App() {
  // Assuming userId is fetched from authentication or context
  const userId = "123"; // Placeholder for now, should be dynamically retrieved
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (token && user && role) {
      dispatch(loginSuccess({ user: JSON.parse(user), role }));
    }
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <Router>
        <div className='App'>
          {/* <Navbar /> Add NavBar here */}
          <Routes>
              <Route path = "/dash" element = {<HomePage />}>

  
              
              </Route>

              <Route path="/registerDash" element={<RegisterDash />} />
              <Route path="/loginDash" element={<LoginDash />} />


              <Route path="/dashboardDash/client" element={<DashboardClient />} >
              
              <Route path="" element={ <ClientDashboardDash />} />
              <Route path="/dashboardDash/client/editprofile" element={<ClientProfile />} />
              <Route path="/dashboardDash/client/postproject" element={<PostNewProject />} />
              <Route path="/dashboardDash/client/myjobs" element={<MyJobs />} />
              
              </Route>



              <Route path="/dashboardDash/freelancer" element={<Dashboardfreelancer />} >

                  <Route path="" element={<FreelancerDashboardDash />} />
                  <Route path="/dashboardDash/freelancer/myservice" element={<MyService />} />
                  <Route path="/dashboardDash/freelancer/editprofile" element={<FreelancerProfile />} />
                  <Route path="/dashboardDash/freelancer/postservice" element={<PostNewService />} />
                  <Route path="/dashboardDash/freelancer/servicedetail" element={<ServiceShowDetail />} />
                  <Route path="/dashboardDash/freelancer/viewprofile" element={<ViewProfilePageReal />} />
                  
              
              </Route>


              <Route path = "/dashboardDash/servicedetail" element={<ServiceShow />} />
              <Route path = "/dashboardDash/freelancerlist" element={<FreelancerList />} />
              <Route path = "/dashboardDash/servicelist" element={<ServiceList />} />
              <Route path = "/dashboardDash/joblist" element={ <JobListDash />} />
              <Route path = "/dashboardDash/jobdetail" element={ <JobDetailDash />} />
              <Route path = "/dashboardDash/freelancerprofiledetail" element={<FreelancerProfileDetail />} />
              <Route path = "/dashboardDash/clientprofiledetail" element={<ClientProfileDetail />} />

             



            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<JobList />} /> {/* Home or Job Listing Route */}
            <Route path="/post-job" element={<PostJob />} /> {/* Job Posting Route */}
            <Route path="/job/:jobId" element={<JobDetails />} /> {/* Job Details Route (with jobId param) */}
            <Route path="/edit-job/:id" element={<EditJobPage />} />
            <Route path="/payment" element={<Payment />} /> {/* Add the payment route */}
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/freelancer/jobs" element={<ManageJobs />} />            {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/reviews/new" element={<ReviewForm />} /> {/* Review Form */}
        <Route path="/reviews" element={<ReviewList />} /> {/* Review List */}
   
        <Route path="/notification" element={<Notification />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/:userId" element={<ViewProfilePage />} />

          <Route path="/profile" element={<CreateProfilePage />} />
  
          <Route path="/portfolio/:freelancerId" element={<PortfolioPage />} />
            {/* Add Chat Route */}
            <Route path="/chat/:jobId" element={
              <Chat jobId={window.location.pathname.split("/").pop()} userId={userId} />
            } />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
