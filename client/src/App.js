import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';



import { useDispatch, useSelector } from 'react-redux';
import { useEffect,  } from 'react';
import { loginSuccess } from './slices/authSlice';



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
import ViewClientProfile from './Real Pages/RealClient/ViewClientProfile'
import JobDetailDashClient from './Real Pages/RealClient/JobShowDetail';
import EditJob from './Real Pages/RealClient/EditClientJob';
import EditServicePost from './Real Pages/RealFreelancer/EditProfileService';
import Contact from './Real Pages/Contact';
import NotFound from './Real Pages/404';
import TermsAndConditions from './Real Pages/TermsandCondition';
import EditClientProfile from './Real Pages/RealClient/EditProfileClient';
import JobProposals from './Real Pages/RealClient/ViewProposals';
import SubmitProposal from './Real Pages/RealFreelancer/SubmitProposal';
import ClientProposals from './Real Pages/RealClient/ProposalsMain';
import FreelancerProposals from './Real Pages/RealFreelancer/ViewPropsalFreelancer';
import MessagingPage from './Real Pages/MessagingPage';
import MessageComponent from './Real Pages/MessageComponent';
import FreelancerJobListDash from './Real Pages/RealFreelancer/FreelancerJobList';
import FreelancerJobDetailDash from './Real Pages/RealFreelancer/FreelancerJobDetai';
import FindServiceList from './Real Pages/RealClient/FindService';
import FindServiceShow from './Real Pages/RealClient/FindServiceDetail';
import ViewFreelancerCarousel from './Real Pages/RealClient/ViewFreelancerList';
import ViewFreelancerProfileDetail from './Real Pages/RealClient/ViewFreelancerProfileDetail';
import MessageInbox from './Real Pages/MessageInbox';
import MessageThread from './Real Pages/MessageThread';
import FreelancerInbox from './Real Pages/FreelancerInbox';
import ClientInbox from './Real Pages/ClientInbox';
import ClientContact from './Real Pages/RealClient/ClientHelp';
import FreelancerContact from './Real Pages/RealFreelancer/FreelancerHelp';
 
const clientID = "418054380291-vrjp8ju8edl5a7rdu66p16pn49sshbm6.apps.googleusercontent.com";

function App() {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Fetch the user from Redux
  const userId = "123";

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
              <Route path = "/" element = {<HomePage />}>

  
              
              </Route>

              <Route path="/registerDash" element={<RegisterDash />} />
              <Route path="/loginDash" element={<LoginDash />} />


              <Route path= "/client" element={<DashboardClient />} >
              
                <Route path="" element={ <ClientDashboardDash />} />
                <Route path="/client/profile" element={<ClientProfile />} />
                <Route path="/client/postproject" element={<PostNewProject />} />
                <Route path="/client/myjobs" element={<MyJobs />} />
                <Route path="/client/setprofile/:userId" element={ <ViewClientProfile />} />
                <Route path="/client/job/:jobId" element={<JobDetailDashClient />} />
                <Route path="/client/editjob/:jobId" element={<EditJob />} />
                <Route path="/client/editprofile" element={ <EditClientProfile />} />
                <Route path="/client/job/:jobId/proposals" element={<JobProposals />} />
                <Route path="/client/proposals" element={<ClientProposals />} />
                <Route path="/client/messages/:clientId" element={<MessagingPage />} />
                <Route path="/client/servicelist" element={<FindServiceList />} />
                <Route path="/client/servicedetail/:userId" element={<FindServiceShow />} />
                <Route path="/client/freelancerlist" element={<ViewFreelancerCarousel />} />
                <Route path="/client/freelancerprofiledetail/:userId" element={<ViewFreelancerProfileDetail />} />
                <Route path="/client/inbox" element={<ClientInbox />} />
                <Route path="/client/contact" element={<ClientContact />} />


              </Route>

              



              <Route path= "/freelancer" element={<Dashboardfreelancer />} >

                  <Route path="" element={<FreelancerDashboardDash />} />
                  <Route path="/freelancer/myservice" element={<MyService />} />
                  <Route path="/freelancer/editprofile" element={<FreelancerProfile />} />
                  <Route path="/freelancer/postservice" element={<PostNewService />} />
                  <Route path="/freelancer/servicedetail" element={<ServiceShowDetail />} />
                  <Route path="/freelancer/setprofile/:userId" element={<ViewProfilePageReal />} />
                  <Route path="/freelancer/service/:serviceId" element={<ServiceShowDetail />} />
                  <Route path="/freelancer/editservice/:serviceId" element={<EditServicePost />} />
                  <Route path="/freelancer/submit-proposal/:jobId" element={<SubmitProposal freelancerId={userId} />} />
                  <Route path="/freelancer/proposals" element={<FreelancerProposals />} />
                  <Route path="/freelancer/messages/:clientId" element={<MessagingPage />} />
                  <Route path="/freelancer/joblist" element={ <FreelancerJobListDash />} />
                  <Route path="/freelancer/jobdetail/:userId" element={ <FreelancerJobDetailDash />} />
                  <Route path="/freelancer/submit-proposal/:jobId" element={<SubmitProposal freelancerId={userId} />} />
                  <Route path="/freelancer/inbox" element={<FreelancerInbox />} />
                  <Route path="/freelancer/contact" element={<FreelancerContact />} />


              </Route>

                


              <Route path ="/servicedetail/:userId" element={<ServiceShow />} />
              <Route path ="/freelancerlist" element={<FreelancerList />} />
              <Route path ="/servicelist" element={<ServiceList />} />
              <Route path ="/joblist" element={ <JobListDash />} /> 
              <Route path ="/jobdetail/:userId" element={ <JobDetailDash />} />
              <Route path ="/freelancerprofiledetail/:userId" element={<FreelancerProfileDetail />} />
              <Route path ="/clientprofiledetail" element={<ClientProfileDetail />} />

             
              <Route path = "/contact" element={<Contact />} />
              <Route path = "*" element={<NotFound />} />
              <Route path = "/termsandconditions" element={<TermsAndConditions />} />


              <Route path="/messagesjob/:senderId/:receiverId" element={<MessageComponent />} />
              <Route path="/messages/inbox" element={<MessageInbox />} />
              <Route path="/messages/thread/:threadId" element={<MessageThread />} />
              
              


             
              

          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
