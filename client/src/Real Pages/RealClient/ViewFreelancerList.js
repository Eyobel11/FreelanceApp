import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; 
import 'swiper/css/pagination'; 
import { Autoplay, Pagination } from 'swiper/modules'; 
import sampleImage from '../../assets/77.jpg'; 
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const ViewFreelancerCarousel = () => {

  const [freelancers, setFreelancers] = useState([]);
  const navigate = useNavigate();

  // Fetch freelancer data
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get('/freelancerprofile'); // Replace with your actual API endpoint
        setFreelancers(response.data);
      } catch (error) {
        console.error('Error fetching freelancers:', error);
      }
    };

    fetchFreelancers();
  }, []);


  const handleFreelancerClick = (freelancerId) => {
    navigate(`/client/freelancerprofiledetail/${freelancerId}`);
  };
  
  return (
    <section className=" bg-slate-100 py-11">
      <div className="container mx-auto px-10">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold text-gray-900 py-2">Highest Rated Freelancers</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur.</p>
        </div>

        <Swiper
          spaceBetween={0} // Adjust the gap between sliders
          slidesPerView={1} // Start with 1 slide
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true, el: '.custom-pagination-freelancer' }}
          modules={[Autoplay, Pagination]} 
          breakpoints={{
            640: {
              slidesPerView: 1, // 1 slide on small screens
            },
            768: {
              slidesPerView: 2, // 2 slides on medium screens
            },
            1024: {
              slidesPerView: 3, // 3 slides on larger screens
            },
            1280: {
              slidesPerView: 4, // 4 slides on very large screens
            },
          }}
          className="w-full"
        >
          {freelancers.map((freelancer) => (
            <SwiperSlide key={freelancer._id}       onClick={() => handleFreelancerClick(freelancer._id)} >
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-0 w-60 h-80 mx-auto text-center 
                transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in"
          >
                  
                <img
                  
                  src={freelancer.profileImage ? `http://localhost:5000${freelancer.profileImage}` : "https://via.placeholder.com/150x150"}
                  alt="img"
                  className="w-full h-56 object-cover rounded-t-lg mb-2"
                />
                <h3 className="text-lg font-semibold text-gray-900">{freelancer.fullName}</h3>
                <p className="text-gray-600">{freelancer.jobTitle}</p>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>{freelancer.rating || '0.0'}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination-freelancer mt-6" style={{ textAlign: 'center' }}></div>
      </div>
    </section>
  );
};

export default ViewFreelancerCarousel;
