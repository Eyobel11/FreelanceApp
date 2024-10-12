import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function PostNewService() {
  const [description, setDescription] = useState('');

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  return (
    <div className="p-4 md:p-8">
      {/* General Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="Service title..." />
          </div>
          <div>
            <label className="block mb-2 font-medium">Categories</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>Web Development</option>
              <option>Designing</option>
              <option>Music & Audio</option>
              <option>Voice Over</option>
              {/* Add more categories */}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Delivery Time</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="e.g. 7 Days" />
          </div>
          <div>
            <label className="block mb-2 font-medium">Response Time</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>1 Hours</option>
              <option>2 Hours</option>
              <option>3 Hours</option>
              <option>4 Hours</option>
              <option>5 Hours</option>
              <option>6 Hours</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Service Price</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg p-3" placeholder="e.g. $100" />
          </div>
          <div>
            <label className="block mb-2 font-medium">English Level</label>
            <select className="w-full border border-gray-300 rounded-lg p-3">
              <option>Fluent</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
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

      {/* Action Buttons */}
      <div className="flex">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Submit & Preview</button>
      </div>
    </div>
  );
}

export default PostNewService;
