import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from '../utils/axios'; // Make sure you have axios configured for API calls
import { useParams } from 'react-router-dom';  // To get userId from URL
import { useSelector } from 'react-redux';  // To get userId from Redux

const FreelancerProfile = () => {

  const userId = useSelector((state) => state.auth.userId);  // Get userId from Redux


  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [freelancerType, setFreelancerType] = useState('');
  const [category, setCategory] = useState('');
  const [friendlyAddress, setFriendlyAddress] = useState('');
  // const [gallery, setGallery] = useState(null);
  const [resume, setResume] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [awards, setAwards] = useState([{ id: 1, value: '' }]);
  const [skills, setSkills] = useState([{ id: 1, value: '' }]);
  const [faqs, setFaqs] = useState([{ id: 1, value: '' }]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/freelancerProfile/${userId}`);
        const profile = response.data;
        setFullName(profile.fullName || '');
        setEmail(profile.email || '');
        setPhone(profile.phone || '');
        setLocation(profile.location || '');
        setDescription(profile.description || '');
        setJobTitle(profile.jobTitle || '');
        setMinRate(profile.minRate || '');
        setMaxRate(profile.maxRate || '');
        setGender(profile.gender || '');
        setDob(profile.dob || '');
        setFreelancerType(profile.freelancerType || '');
        setCategory(profile.category || '');
        setFriendlyAddress(profile.friendlyAddress || '');
        setVideoUrl(profile.videoUrl || '');
        setAwards(profile.awards ? profile.awards.map((award, index) => ({ id: index + 1, value: award })) : []);
        setSkills(profile.skills ? profile.skills.map((skill, index) => ({ id: index + 1, value: skill })) : []);
        setFaqs(profile.faqs ? profile.faqs.map((faq, index) => ({ id: index + 1, value: faq })) : []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleAddField = (setState, state) => {
    setState([...state, { id: state.length + 1, value: '' }]);
  };

  const handleRemoveField = (id, setState, state) => {
    setState(state.filter((item) => item.id !== id));
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('jobTitle', jobTitle);
    formData.append('minRate', minRate);
    formData.append('maxRate', maxRate);
    formData.append('gender', gender);
    formData.append('dob', dob);
    formData.append('freelancerType', freelancerType);
    formData.append('category', category);
    formData.append('friendlyAddress', friendlyAddress);
    formData.append('videoUrl', videoUrl);
    formData.append('awards', JSON.stringify(awards.map((award) => award.value)));
    formData.append('skills', JSON.stringify(skills.map((skill) => skill.value)));
    formData.append('faqs', JSON.stringify(faqs.map((faq) => faq.value)));

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    // if (gallery) {
    //   formData.append('gallery', gallery);
    // }
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      const response = await axios.post('/freelancerProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile saved successfully:', response.data);
      alert('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>

      {/* Profile Image */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Profile Image</label>
        <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="block w-full" />
      </div>

      {/* Full Name */}
      

      {/* Gender, Date of Birth */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="">
        <label className="block text-lg font-semibold mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Email, Phone */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Freelancer Type, Category */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Freelancer Type</label>
          <select
            value={freelancerType}
            onChange={(e) => setFreelancerType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Freelancer Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="programming-tech">Programming & Tech</option>
            <option value="graphic-and-design">Graphics & Design</option>
            <option value="content-writing">Writing & Translation</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="business">Business</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="music-audio">Music & Audio</option>
            <option value="video-animation">Video & Animation</option>

          </select>
        </div>
      </div>

      {/* Job Title, Rates */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
       
        <div>
          <label className="block text-lg font-semibold mb-2">Min Hourly Rate</label>
          <input
            type="number"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Max Hourly Rate</label>
          <input
            type="number"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Location and Friendly Address */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Friendly Address</label>
          <input
            type="text"
            value={friendlyAddress}
            onChange={(e) => setFriendlyAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Description</label>
        <Editor
          apiKey='65gcyx9y0yezfpmk2p7xn336dpzjwn2walh2cekmrxk5o9k7'
          value={description}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />
      </div>

      {/* Media Upload */}
      {/* <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Gallery Image</label>
        <input type="file" onChange={(e) => setGallery(e.target.files[0])} className="block w-full" />
      </div> */}

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Resume</label>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} className="block w-full" />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Introduction Video URL</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Awards, Skills, FAQ */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Awards</label>
        {awards.map((award) => (
          <div key={award.id} className="flex items-center mb-2">
            <input
              type="text"
              value={award.value}
              onChange={(e) =>
                setAwards(awards.map((item) => (item.id === award.id ? { ...item, value: e.target.value } : item)))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleRemoveField(award.id, setAwards, awards)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAddField(setAwards, awards)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Award
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Skills</label>
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center mb-2">
            <input
              type="text"
              value={skill.value}
              onChange={(e) =>
                setSkills(skills.map((item) => (item.id === skill.id ? { ...item, value: e.target.value } : item)))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleRemoveField(skill.id, setSkills, skills)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAddField(setSkills, skills)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add Skill
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">FAQ</label>
        {faqs.map((faq) => (
          <div key={faq.id} className="flex items-center mb-2">
            <input
              type="text"
              value={faq.value}
              onChange={(e) =>
                setFaqs(faqs.map((item) => (item.id === faq.id ? { ...item, value: e.target.value } : item)))
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleRemoveField(faq.id, setFaqs, faqs)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={() => handleAddField(setFaqs, faqs)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Add FAQ
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
      >
        Save Profile
      </button>
    </div>
  );
};

export default FreelancerProfile;



