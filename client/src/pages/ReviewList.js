import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const ReviewList = ({ freelancerId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/reviews/freelancer/${freelancerId}`);
      setReviews(response.data);
    };
    fetchReviews();
  }, [freelancerId]);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-bold mb-4">Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id} className="border-b border-gray-200 py-2">
            <p className="font-semibold">Rating: {review.rating}/5</p>
            <p>{review.reviewText}</p>
            <p className="text-sm text-gray-500">By {review.client.name} for Job: {review.job.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
