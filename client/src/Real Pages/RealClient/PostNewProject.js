import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Make sure you have axios configured for API calls
import Swal from 'sweetalert2';

function PostNewProject() {
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

  // Handle form submission
  const handleSubmit = async () => {
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

    // Append files
    if (featuredImage) {
      formData.append('featuredImage', featuredImage);
    }
    if (gallery.length > 0) {
      for (const file of gallery) {
        formData.append('gallery', file);
      }
    }

    try {
      const response = await axios.post('/jobpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        title: 'Job Posted!',
        text: 'Your job has been posted successfully.',
        icon: 'success',
        confirmButtonColor: '#3E4B40',
      });

      console.log('Job posted successfully:', response.data);
      // Optionally, reset the form or display a success message
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      // Optionally, display an error message to the user

      Swal.fire({
        title: 'Error!',
        text: 'There was an error posting your job. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* General Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Service title..."
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Categories</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Category</option>
              <option>Business</option>
              <option>Design</option>
              <option>Digital Marketing</option>
              <option>Lifestyle</option>
              <option>Programming & Tech</option>
              <option>Project Managment</option>
              <option>Web Development</option>
              <option>Writing & Translation</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Job Type</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Job Location Type</label>
            <select
              value={jobLocationType}
              onChange={(e) => setJobLocationType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Location Type</option>
              <option>Onsite</option>
              <option>Partial Onsite</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Duration</option>
              <option>1 Hour</option>
              <option>1 Day</option>
              <option>1 Week</option>
              <option>2-3 Days</option>
              <option>2-3 Hours</option>
              <option>2-3 Weeks</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Experience Level</option>
              <option>1-2 Years</option>
              <option>3-4 Years</option>
              <option>5+ Years</option>
              <option>Fresh</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Friendly Address</label>
            <input
              type="text"
              value={friendlyAddress}
              onChange={(e) => setFriendlyAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. 22 street"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. Addis Ababa"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. www.google.com"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">English Level</label>
            <select
              value={englishLevel}
              onChange={(e) => setEnglishLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select English Level</option>
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Min Price</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. 100"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="e.g. 200"
            />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <Editor
            apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
            value={description}
            init={{
              height: 300,
              menubar: false,
              plugins: 'lists link image code',
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
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

      {/* Skills Section */}
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

      {/* Action Buttons */}
      <div className="flex">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          onClick={handleSubmit}
        >
          Submit & Preview
        </button>
      </div>
    </div>
  );
}

export default PostNewProject;
