import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { FaEye, FaEnvelope, FaEllipsisV } from 'react-icons/fa';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';

const ClientProposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [coverLetter, setCoverLetter] = useState(null);
  const [activeProposalId, setActiveProposalId] = useState(null); // New state for active dropdown
  const clientId = useSelector((state) => state.auth.user._id);

  const [sortBy, setSortBy] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

 

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`/proposals/client/${clientId}`);
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [clientId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if clicking outside of it
      if (!event.target.closest('.dropdown-button')) {
        setActiveProposalId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMessageFreelancer = (freelancerId) => {
    if (freelancerId) {
      navigate(`/messagesjob/${clientId}/${freelancerId}`);
    } else {
      console.error("Freelancer ID is undefined. Cannot navigate to messages.");
    }
  };

  const handleStatusChange = async (proposalId, newStatus) => {
    try {
      await axios.put(`/proposals/${proposalId}`, { status: newStatus });
      setMessage(`Proposal status updated to ${newStatus}`);
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal._id === proposalId ? { ...proposal, status: newStatus } : proposal
        )
      );
    } catch (error) {
      console.error('Error updating proposal status:', error);
      setMessage('Error updating proposal status');
    }
  };

  const confirmStatusChange = (proposalId, newStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${newStatus} this proposal?`,
      icon: newStatus === 'Accepted' ? 'success' : 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'Accepted' ? '#3E4B40' : '#d33',
      cancelButtonColor: '#888',
      confirmButtonText: `Yes, ${newStatus} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusChange(proposalId, newStatus);
      }
    });
  };

  if (loading) return <p>Loading proposals...</p>;

  const filteredProposals = proposals
  .filter((proposal) =>
    proposal.jobId?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'Cost') {
      return b.proposedRate - a.proposedRate;
    } else if (sortBy === 'Oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return a.proposedRate - b.proposedRate;
    }
  });

// Group filtered and sorted proposals by job ID
const groupedProposals = filteredProposals.reduce((acc, proposal) => {
  const jobId = proposal.jobId;
  if (!acc[jobId]) {
    acc[jobId] = [];
  }
  acc[jobId].push(proposal);
  return acc;
}, {});


  return (
    <div className="container mx-auto p-6 lg:p-10">
      <h1 className="text-3xl font-semibold mb-6">Proposals for Your Job Posts</h1>

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

      {message && <p className="mb-4 text-green-500">{message}</p>}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b-4">
              <th className="py-3 px-4 text-left font-medium text-black">Job Title</th>
              <th className="py-3 px-4 text-left font-medium text-black">Freelancer</th>
              <th className="py-3 px-4 text-left font-medium text-black">Proposed Rate</th>
              <th className="py-3 px-4 text-left font-medium text-black">Status</th>
              <th className="py-3 px-4 text-left font-medium text-black">Estimated Time</th>
              <th className="py-3 px-4 text-left font-medium text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedProposals).map((jobId) => (
              <React.Fragment key={jobId}>
                
                {groupedProposals[jobId].map((proposal) => (
                  <tr key={proposal._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 text-gray-800">{proposal.jobId?.title}</td>
                    <td className="py-3 px-4">{proposal.freelancerId?.name || 'Unknown Freelancer'}</td>
                    <td className="py-3 px-4 text-gray-600">${proposal.proposedRate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          proposal.status === 'Accepted'
                            ? 'bg-green-200 text-green-800'
                            : proposal.status === 'Rejected'
                            ? 'bg-red-200 text-red-800'
                            : ' text-yellow-800'
                        }`}
                      >
                        {proposal.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{proposal.estimatedTime}</td>
                    <td className="py-3 px-4 flex items-center space-x-2 relative">
                      <button
                        onClick={() => setCoverLetter(proposal.coverLetter)}
                        className="text-blue-500 hover:text-blue-800"
                        data-tooltip-id="cover-tooltip"
                        data-tooltip-content="View Cover Letter"
                      >
                        <FaEye />
                      </button>

                      {proposal.attachments && (
                        <a
                          href={proposal.attachments}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-800"
                          data-tooltip-id="attachment-tooltip"
                          data-tooltip-content="View Attachment"
                        >
                          <FaEye />
                        </a>
                      )}
                      <button
                        onClick={() => handleMessageFreelancer(proposal.freelancerId?._id)}
                        className="text-gray-500 hover:text-black"
                        data-tooltip-id="message-tooltip"
                        data-tooltip-content="Message Freelancer"
                      >
                        <FaEnvelope />
                      </button>

                      {/* Dropdown for Managing Proposal */}
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProposalId(activeProposalId === proposal._id ? null : proposal._id);
                          }}
                          className="text-gray-500 hover:text-black dropdown-button"
                          data-tooltip-id="manage-tooltip"
                          data-tooltip-content="Manage Proposal"
                        >
                          <FaEllipsisV />
                        </button>
                        {activeProposalId === proposal._id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white z-10 border border-gray-300 rounded shadow-md">
                            <button
                              onClick={() => confirmStatusChange(proposal._id, 'Accepted')}
                              className="block w-full text-left px-4 py-2 text-green-700 hover:bg-green-100"
                            >
                              Accept Proposal
                            </button>
                            <button
                              onClick={() => confirmStatusChange(proposal._id, 'Rejected')}
                              className="block w-full text-left px-4 py-2 text-red-700 hover:bg-red-100"
                            >
                              Reject Proposal
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
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

export default ClientProposals;
