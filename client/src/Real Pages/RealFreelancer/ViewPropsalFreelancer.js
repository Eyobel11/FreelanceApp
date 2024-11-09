import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { FaEye, FaSearch, FaEnvelope } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const FreelancerProposals = () => {
  const navigate = useNavigate();
  const freelancerId = useSelector((state) => state.auth.user._id);
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');
  const [coverLetter, setCoverLetter] = useState(null);  // State for viewing cover letter
  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`/proposals/freelancer/${freelancerId}`);
        setProposals(response.data);
      } catch (error) {
        setError('Error fetching proposals');
      }
    };

    if (freelancerId) {
      fetchProposals();
    }
  }, [freelancerId]);

  // Filter and Sort Logic
  const filteredProposals = proposals
    .filter((proposal) =>
      proposal.jobId?.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'Highest Rate') {
        return b.proposedRate - a.proposedRate;
      } else {
        return a.proposedRate - b.proposedRate; // 'Lowest Rate'
      }
    });

  const handleMessageClient = (clientId) => {
    if (freelancerId && clientId) {
      navigate(`/messagesjob/${freelancerId}/${clientId}`);
    } else {
      console.error("Freelancer or Client ID missing!");
    }
  };

  if (error) return <p>{error}</p>;
  if (proposals.length === 0) return <p>No proposals found.</p>;

  return (
    <div className="container mx-auto p-4 lg:p-10">
      <h1 className="text-3xl font-medium mb-6">Your Submitted Proposals</h1>
      
      
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Cost">Cost</option>
          {/* Add more sorting options if needed */}
        </select>
      </div>


      {/* Proposals Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b-4">
              <th className="py-3 px-4 text-left font-medium text-black">Job Title</th>
              <th className="py-3 px-4 text-left font-medium text-black">Proposed Rate</th>
              <th className="py-3 px-4 text-left font-medium text-black">Status</th>
              <th className="py-3 px-4 text-left font-medium text-black">Estimated Time</th>
              <th className="py-3 px-4 text-left font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.map((proposal) => (
              <tr key={proposal._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">
                  <span className="font-normal text-gray-800">
                    {proposal.jobId?.title || 'Job Title Unavailable'}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">${proposal.proposedRate}</td>
                <td className="py-3 px-4">
                  <span className={`${proposal.status === 'Accepted' ? ' text-[#3bba28]' : proposal.status === 'Rejected' ? ' text-[#eb3232]' : ' text-[#d6cd26]'}`}>
                    {proposal.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{proposal.estimatedTime}</td>
                <td className="py-3 px-4 flex space-x-2">
                  {/* View Cover Letter Button */}
                  <button
                    onClick={() => setCoverLetter(proposal.coverLetter)}
                    className="text-blue-500 hover:text-blue-800"
                    data-tooltip-id="cover-tooltip"
                    data-tooltip-content="View Cover Letter"
                  >
                    <FaEye className="inline-block mr-1" />
                  </button>
                  
                  {/* View Attachment Button */}
                  {proposal.attachments && (
                    <a
                      href={proposal.attachments}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-800"
                      data-tooltip-id="attachment-tooltip"
                      data-tooltip-content="View Attachment"
                    >
                      <FaEye className="inline-block mr-1" /> 
                    </a>
                  )}
                  
                  {/* Message Client Button */}
                  <button
                    onClick={() => handleMessageClient(proposal.clientId)}
                    className="text-gray-400 hover:text-black"
                    data-tooltip-id="message-tooltip"
                    data-tooltip-content="Message Freelancer"
                  >
                     <FaEnvelope className="inline-block ml-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cover Letter Modal */}
      {coverLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cover Letter</h2>
            <p className="text-gray-700">{coverLetter}</p>
            <button
              onClick={() => setCoverLetter(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Tooltips for cover letter and attachment */}
      <Tooltip id="cover-tooltip" place="top" type="dark" effect="solid" />
      <Tooltip id="attachment-tooltip" place="top" type="dark" effect="solid" />
      <Tooltip id="message-tooltip" place="top" type="dark" effect="solid" />
      <Tooltip id="manage-tooltip" place="top" type="dark" effect="solid" />

    </div>
  );
};

export default FreelancerProposals;
