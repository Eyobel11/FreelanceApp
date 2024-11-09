import React, { useState } from 'react';
import axios from '../utils/axios'; // Adjust the import according to your project structure
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SubmitProposal = () => {
  const { jobId } = useParams(); // Get jobId from the route
  const freelancerId = useSelector((state) => state.auth.user._id); // Get freelancerId from Redux
  const navigate = useNavigate();

  const [coverLetter, setCoverLetter] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [attachments, setAttachments] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setAttachments(e.target.files[0]); // Handling file input for attachments
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('freelancerId', freelancerId);
    formData.append('jobId', jobId);
    formData.append('coverLetter', coverLetter);
    formData.append('proposedRate', proposedRate);
    formData.append('estimatedTime', estimatedTime);

    if (attachments) {
      formData.append('attachments', attachments);
    }

    
  try {
    const response = await axios.post('/proposals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 201) {
      Swal.fire({
        title: 'Proposal Sent!',
        text: 'Congratulations, your proposal has been sent successfully.',
        icon: 'success',
        confirmButtonColor: '#3E4B40',
      }).then(() => {
        navigate("/freelancer/proposals"); // Navigate after closing the success popup
      });
    }
  } catch (error) {
    console.error('Error sending proposal:', error);
    
    Swal.fire({
      title: 'Error!',
      text: 'Failed to send Proposal. Please try again later.',
      icon: 'error',
      confirmButtonColor: '#d33',
    });
  }
};

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4 overflow-x-hidden">
       <ToastContainer /> 
      <h2 className="text-3xl font-medium mb-8 ">Submit Your Proposal</h2>

      <form onSubmit={handleSubmit} className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">
       

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Proposed Rate ($):</label>
            <input
              type="number"
              value={proposedRate}
              onChange={(e) => setProposedRate(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Enter your proposed rate..."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Estimated Time :</label>
            <input
              type="text"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Estimated hours to complete..."
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Cover Letter:</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            className="w-full h-60 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            placeholder="Introduce yourself and explain why you are a great fit..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Attachments:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className=" px-4 py-2  focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-1/3  back text-white py-3 rounded-lg font-bold hover:bg-green-950 transition duration-200"
        >
          Submit Proposal
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-center text-green-600">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default SubmitProposal;
