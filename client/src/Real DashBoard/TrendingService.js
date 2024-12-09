import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const TrendingServicesSection = () => {
  const [trendingServices, setServices] = useState([]);
  const navigate = useNavigate();

  const handleFreelancerClick = (serviceId) => {
    navigate(`/servicedetail/${serviceId}`);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/servicepost');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services"className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Trending Services
        </h2>
        <p className="text-gray-500 mb-12">
          Most viewed and all-time top-selling services
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 50 },
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {trendingServices.map((service) => (
            <SwiperSlide key={service._id}>
              <div 
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 cursor-pointer"
                onClick={() => handleFreelancerClick(service._id)}
              >
                <img
                  // src={service.img || 'https://via.placeholder.com/150'}
                  src={service.featuredImage? `http://localhost:5000${service.featuredImage}` : "https://via.placeholder.com/150"}

                  alt={service.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="text-gray-500 text-sm">{service.category}</div>
                <h3 className="text-lg font-medium text-gray-900">
                  {service.title}
                </h3>
                <div className="flex items-center mt-2 mb-4">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1 text-gray-700 font-bold">
                    {service.rating || 0}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({service.reviews || 0} Reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{service.author}</div>
                  <div className="text-gray-900 font-normal">
                    Starting at: ${service.servicePrice ? service.servicePrice.toFixed(2) : 'N/A'}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-6"></div> 
      </div>
    </section>
  );
};

export default TrendingServicesSection;
