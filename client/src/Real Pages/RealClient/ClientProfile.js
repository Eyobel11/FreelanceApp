import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ClientProfile = () => {
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const [category, setCategory] = useState('');
  const [friendlyAddress, setFriendlyAddress] = useState('');
  const [gallery, setGallery] = useState(null);
 
  const [videoUrl, setVideoUrl] = useState('');
  const [profileShow, setProfileShow] = useState('');
  const [website, setWebsite] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [employees , setEmployees] = useState('')
  const [responseTime, setResponseTime] = useState('');
 

  const handleEditorChange = (content) => {
    setDescription(content);
  };

//   const handleAddField = (setState, state) => {
//     setState([...state, { id: state.length + 1, value: '' }]);
//   };

//   const handleRemoveField = (id, setState, state) => {
//     setState(state.filter((item) => item.id !== id));
//   };

  const handleSaveProfile = () => {
    const profileData = {
      profileImage,
      fullName,
      email,
      phone,
      location,
    

      description,
      gallery,

      videoUrl,

      category,
      friendlyAddress,


      profileShow,
      website,
      foundedDate,
      employees , 
      responseTime
    };
    console.log('Profile Data:', profileData);
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


      {/* Email, Phone */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      <div >
        <label className="block text-lg font-semibold mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
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
        <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Response Time</label>
        <input
          type="text"
          value={responseTime}
          onChange={(e) => setResponseTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      </div>

      {/* Freelancer Type, Category */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Show my Profile</label>
          <select
            value={profileShow}
            onChange={(e) => setProfileShow(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select profile</option>
            <option value="show">Show</option>
            <option value="hide">Hide</option>
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
      </div>

      {/* website ,  */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Founded Date</label>
          <input
            type="number"
            value={foundedDate}
            onChange={(e) => setFoundedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Employees</label>
          <input
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Location and Friendly Address */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
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
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Media</label>
        <input type="file" onChange={(e) => setGallery(e.target.files[0])} className="block w-full" />
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

export default ClientProfile;
