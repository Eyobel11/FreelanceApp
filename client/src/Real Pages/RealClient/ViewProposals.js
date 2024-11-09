import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const ProposalList = () => {
  const { jobId } = useParams();  // Get jobId from the route params
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(`/proposals/job/${jobId}`);
        setProposals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setLoading(false);
      }
    };

    fetchProposals();
  }, [jobId]);

  // Handle updating the proposal status
  const handleStatusChange = async (proposalId, newStatus) => {
    try {
      const response = await axios.put(`/proposals/${proposalId}`, { status: newStatus });
      setMessage(`Proposal status updated to ${newStatus}`);
      
      // Update the proposal status locally after successful update
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

  if (loading) {
    return <p>Loading proposals...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Proposals for Job ID: {jobId}</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      
      {proposals.length > 0 ? (
        proposals.map((proposal) => (
          <div key={proposal._id} className="bg-white p-4 mb-4 shadow-lg rounded-md">
            <h2 className="text-xl font-semibold">Freelancer: {proposal.freelancerId?.fullName || 'Unknown Freelancer'}</h2>
            <p><strong>Cover Letter:</strong> {proposal.coverLetter}</p>
            <p><strong>Proposed Rate:</strong> ${proposal.proposedRate}</p>
            <p><strong>Estimated Time:</strong> {proposal.estimatedTime}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
            {proposal.attachments && (
              <p><strong>Attachment:</strong> <a href={proposal.attachments} target="_blank" rel="noopener noreferrer">Download</a></p>
            )}

            {/* Status Update Section */}
            <div className="mt-4">
              <label htmlFor={`status-${proposal._id}`} className="block font-bold mb-2">Update Status:</label>
              <select
                id={`status-${proposal._id}`}
                value={proposal.status}
                onChange={(e) => handleStatusChange(proposal._id, e.target.value)}
                className="border p-2 rounded-lg w-full md:w-1/2"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <p>No proposals submitted for this job.</p>
      )}
    </div>
  );
};

export default ProposalList;
