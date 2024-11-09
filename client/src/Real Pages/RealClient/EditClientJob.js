import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Make sure axios is properly configured
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const EditJob = () => {
  const { jobId } = useParams(); // Get jobId from the route params
  const navigate = useNavigate(); // Initialize useNavigate

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLocationType, setJobLocationType] = useState('');
  const [duration, setDuration] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [friendlyAddress, setFriendlyAddress] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    'Adobe Photoshop',
    'Artist',
    'Front end Developer',
    'Writer',
    'Adobe XD',
    'Computer',
    'IOS Developer',
    'Android Developer',
    'Developer',
    'Support Agent'
  ];

  // Fetch the existing job data
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      try {
        const response = await axios.get(`/jobpost/${jobId}`);
        const job = response.data;
        setTitle(job.title);
        setCategory(job.category);
        setJobType(job.jobType);
        setJobLocationType(job.jobLocationType);
        setLocation(job.location);
        setDuration(job.duration);
        setExperienceLevel(job.experienceLevel);
        setFriendlyAddress(job.friendlyAddress);
        setWebsite(job.website);
        setEnglishLevel(job.englishLevel);
        setMinPrice(job.minPrice);
        setMaxPrice(job.maxPrice);
        setDescription(job.description);
        setSelectedSkills(job.skills || []);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleSkillChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSelectAll = () => {
    setSelectedSkills(skills.length === selectedSkills.length ? [] : [...skills]);
  };

  // Handle the job update
  const handleUpdateJob = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('jobType', jobType);
    formData.append('jobLocationType', jobLocationType);
    formData.append('duration', duration);
    formData.append('experienceLevel', experienceLevel);
    formData.append('friendlyAddress', friendlyAddress);
    formData.append('location', location);
    formData.append('website', website);
    formData.append('englishLevel', englishLevel);
    formData.append('minPrice', minPrice);
    formData.append('maxPrice', maxPrice);
    formData.append('description', description);
    formData.append('skills', selectedSkills.join(','));

    // Append files if they exist
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    if (gallery.length > 0) {
      for (const file of gallery) {
        formData.append('gallery', file);
      }
    }

    try {
      await axios.put(`/jobpost/${jobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Job updated successfully');
      navigate('/client/myjobs'); // Redirect to My Jobs after updating
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Job</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Job Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Category</option>
              <option value="business">Business</option>
              <option value="designer">Designer</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="programming-tech">Programming & Tech</option>
              <option value="project-managers">Project Managers</option>
              <option value="web-developers">Web Developers</option>
              <option value="writing-translation">Writing & Translation</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Job Type</label>
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Experience Level</label>
            <input
              type="text"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Friendly Address</label>
            <input
              type="text"
              value={friendlyAddress}
              onChange={(e) => setFriendlyAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">English Level</label>
            <input
              type="text"
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <Editor
            apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
            value={description}
            init={{
              height: 300,
              menubar: false,
              plugins: 'lists link image code',
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
      
      {/* Media Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Media</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block mb-2 font-medium">Featured Image</label>
            <input type="file" onChange={(e) => setFeaturedImage(e.target.files[0])} className="block w-full" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Gallery</label>
            <input
              type="file"
              multiple
              onChange={(e) => setGallery([...e.target.files])}
              className="block w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex justify-between mb-4">
          <button
            className="text-black hover:underline"
            onClick={handleSelectAll}
          >
            {selectedSkills.length === skills.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
                className="form-checkbox"
              />
              <span>{skill}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleUpdateJob}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Update Job
      </button>
    </div>
  );
};

export default EditJob;
