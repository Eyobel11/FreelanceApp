
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../utils/axios';

const ReviewForm = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const freelancerId = searchParams.get('freelancerId');
  const clientId = searchParams.get('clientId');

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');


  console.log('Job ID:', jobId);
  console.log('Freelancer ID:', freelancerId);
  console.log('Client ID:', clientId);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', {
        rating,
        reviewText,
        jobId,
        freelancerId,
        clientId
      });
      alert('Review submitted successfully!');
    } catch (error) {
      alert('Error submitting review:', error.response.data.error);
    }
  };

  return (
    <form onSubmit={submitReview} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reviewText">Review</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
