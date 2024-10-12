import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function PostNewProject() {
  const [description, setDescription] = useState('');

  const handleEditorChange = (content) => {
    setDescription(content);
  };

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

  return (
    <div className="p-4 md:p-8">
      {/* General Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Service title..." />
          </div>
          <div>
            <label className="block mb-2 font-medium">Categories</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
            
            <option value="">Select Category</option>
            <option value="business">Business</option>
            <option value="designer">Designer</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="programming-tech">Programming & Tech</option>
            <option value="project-managers">Project Managers</option>
            <option value="web-developers">Web Developers</option>
            <option value="writing-translation">Writing & Translation</option>

              {/* Add more categories */}
            </select>
          </div>
          {/* <div>
            <label className="block mb-2 font-medium">Delivery Time</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="e.g. 7 Days" />
          </div> */}
          <div>
            <label className="block mb-2 font-medium">Job Type</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option value="">Select Category</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Freelance</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Job Location Type</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option value="">Select Category</option>
              <option>Onsite</option>
              <option>Partial Onsite</option>
              <option>Remote</option>

            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option value="">Select Category</option>
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
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option value="">Select Category</option>
              <option>1-2 Years</option>
              <option>3-4 Years</option>
              <option>5+ Years</option>
              <option>Fresh</option>
          
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Friendly Address</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="eg. 22 street" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="eg. Addis Ababa" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Website</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="eg. www.google.com" />
          </div>
          <div>
            <label className="block mb-2 font-medium">English Level</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option value="">Select Category</option>
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Min Price</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg p-3" placeholder="eg. 100" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Max Price</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg p-3" placeholder="eg. 200" />
          </div>
         
          
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Description</label>
          <Editor
            apiKey="your-tinymce-api-key"
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
        <div className="grid grid-cols-1  gap-6">
          <div>
            <label className="block mb-2 font-medium">Featured Image</label>
            <button className="bg-pink-100 text-pink-600 border border-pink-300 rounded-lg w-full p-3">Browse</button>
          </div>
          <div>
            <label className="block mb-2 font-medium">Gallery</label>
            <button className="bg-pink-100 text-pink-600 border border-pink-300 rounded-lg w-full p-3">Browse</button>
          </div>
        </div>
      </div>
            {/*Skills*/}
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
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Submit & Preview</button>
      </div>
    </div>
  );
}

export default PostNewProject;
