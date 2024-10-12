import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const EditJobPage = () => {
  const { id: jobId } = useParams(); // Get jobId from the URL
  const navigate = useNavigate();  // Use this to redirect if needed
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch the job details when the component mounts
  useEffect(() => {
    if (!jobId) {
      console.error('No jobId found');
      setMessage('Invalid job ID.');
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJobData(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job:', error);
        setMessage('Failed to load job details.');
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // Handle input changes
  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update job details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) {
      setMessage('No job ID found.');
      return;
    }

    try {
      await API.put(`/jobs/${jobId}`, jobData);
      setMessage('Job updated successfully!');
      // Optionally, redirect after success
      navigate('/'); // Redirect to job listings page after update
    } catch (error) {
      console.error('Error updating job:', error);
      setMessage('Error updating job.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Job</h2>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          className="textarea w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={jobData.budget}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={jobData.category}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <input
          type="date"
          name="deadline"
          value={jobData.deadline}
          onChange={handleChange}
          className="input w-full border-gray-300 rounded-md p-3"
        />
        <button type="submit" className="btn-primary w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
