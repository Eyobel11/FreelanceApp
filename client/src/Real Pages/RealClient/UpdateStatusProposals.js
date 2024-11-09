import React, { useState, useEffect } from 'react';
import axios from '../utils/axios'; // Adjust as needed

const ProposalStatusUpdate = ({ jobId }) => {
  const [proposals, setProposals] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`/proposals/job/${jobId}`);
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    if (jobId) {
      fetchProposals();
    }
  }, [jobId]);

  const updateStatus = async (proposalId, status) => {
    try {
      const response = await axios.put(`/proposals/${proposalId}/status`, { status });
      setMessage('Proposal status updated successfully.');
      setProposals((prev) => prev.map((proposal) => (
        proposal._id === proposalId ? { ...proposal, status } : proposal
      )));
    } catch (error) {
      setMessage('Error updating proposal status.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Proposals for Job</h1>
      {message && <p>{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <div key={proposal._id} className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold">Freelancer: {proposal.freelancerId.fullName}</h2>
            <p><strong>Proposed Rate:</strong> ${proposal.proposedRate}</p>
            <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={() => updateStatus(proposal._id, 'accepted')}
              >
                Accept
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={() => updateStatus(proposal._id, 'rejected')}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalStatusUpdate;
