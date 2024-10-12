// src/components/BiddingForm.js
import { useState } from 'react';
import API from '../utils/axios';

const BiddingForm = ({ jobId }) => {
  const [bidData, setBidData] = useState({
    amount: '',
    message: '',
  });

  const handleChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/bids/${jobId}`, { ...bidData, jobId });
      console.log('Bid Placed:', res.data);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Bid Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter your bid amount"
          value={bidData.amount}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
        <textarea
          name="message"
          placeholder="Enter a message"
          value={bidData.message}
          onChange={handleChange}
          className="textarea w-full"
        />
      </div>
      
      <button type="submit" className="btn-primary w-full">Place Bid</button>
    </form>
  );
};

export default BiddingForm;
