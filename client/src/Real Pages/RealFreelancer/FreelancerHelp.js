import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../utils/axios'; // Make sure axios is installed
import Swal from 'sweetalert2';

const FreelancerContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/email/send', formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Email Sent!',
          text: 'Your email has been sent successfully.',
          icon: 'success',
          confirmButtonColor: '#3E4B40',
        });
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      }
    } catch (error) {
      
      console.error('Error sending email:', error.response?.data || error.message);
      // Optionally, display an error message to the user

      Swal.fire({
        title: 'Error!',
        text: 'There was an error sending your email. Please try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <>
     
      <ToastContainer /> {/* Add the ToastContainer for notifications */}

      <div className="container mx-auto p-4 md:p-8 ">
        {/* Contact Us Heading Section */}
        <section className="text-left mb-10 image-add bg-cover bg-center p-10 md:p-20">
          <h1 className="text-3xl md:text-4xl font-semibold text-black">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">We'd love to talk about how we can help you.</p>
        </section>

        {/* Main Contact Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-20 lg:px-40">
          {/* Left Side: Address and Info */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-medium">Keep in touch with us</h2>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl md:text-3xl text-green-700" />
              <div>
                <h4 className="text-lg md:text-xl font-normal">Address</h4>
                <p className="text-gray-600">1234 Greenberry Street, North Melbourne, VIC 3051, Australia</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-2xl md:text-3xl text-green-700" />
              <div>
                <h4 className="text-lg md:text-xl font-normal">Phone</h4>
                <p className="text-gray-600">(080) 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl md:text-3xl text-green-700" />
              <div>
                <h4 className="text-lg md:text-xl font-normal">Email</h4>
                <p className="text-gray-600">hello@freeio.com</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg w-full lg:-mt-32">
            <h3 className="text-xl md:text-2xl font-medium mb-4 text-gray-700">Tell us about yourself</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm md:text-md font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm md:text-md font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm md:text-md font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-300 p-3 rounded-lg w-full h-52 md:h-80 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Describe your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-800 font-semibold text-white py-3 md:py-4 px-4 rounded-lg w-full hover:bg-green-950 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-10">
          <iframe
            className="w-full h-64 md:h-96 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093795!2d144.9560541153165!3d-37.817209979751664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5778d7b3afda764!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1611783944186!5m2!1sen!2sau"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </section>
      </div>

   
    </>
  );
};

export default FreelancerContact;
