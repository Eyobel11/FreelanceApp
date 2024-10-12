// src/pages/JobDetails.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/axios';
import BiddingForm from '../components/BiddingForm';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    const fetchBids = async () => {
      try {
        const res = await API.get(`/bids/${jobId}`);
        setBids(res.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchJob();
    fetchBids();
  }, [jobId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {job ? (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{job.title}</h2>
          <p className="mb-2 text-gray-600">{job.description}</p>
          <p className="text-gray-600"><span className="font-medium">Budget:</span> ${job.budget}</p>
          <p className="text-gray-600"><span className="font-medium">Category:</span> {job.category}</p>
          <p className="text-gray-600"><span className="font-medium">Deadline:</span> {new Date(job.deadline).toDateString()}</p>

          <BiddingForm jobId={jobId} />

          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Bids</h3>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <div key={bid._id} className="p-4 bg-gray-100 rounded-md mb-4">
                  <p className="text-gray-700"><span className="font-medium">Freelancer:</span> {bid.freelancer.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Bid Amount:</span> ${bid.amount}</p>
                  <p className="text-gray-700"><span className="font-medium">Message:</span> {bid.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No bids yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default JobDetails;
