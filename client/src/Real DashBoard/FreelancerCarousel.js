import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; 
import 'swiper/css/pagination'; 
import { Autoplay, Pagination } from 'swiper/modules'; 
import sampleImage from '../assets/77.jpg'; 

const freelancers = [
  {
    id: 1,
    name: 'Thomas Powell',
    role: 'Design & Creative',
    rating: 4.0,
    image: sampleImage,
  },
  {
    id: 2,
    name: 'Tom Wilson',
    role: 'Marketing Manager',
    rating: 4.5,
    image: sampleImage,
  },
  {
    id: 3,
    name: 'freelancer 17696',
    role: 'Unknown',
    rating: 0.0,
    image: sampleImage,
  },
  {
    id: 4,
    name: 'Nayyar Shaikh',
    role: 'Web Developer',
    rating: 0.0,
    image: sampleImage,
  },
  {
    id: 5,
    name: 'Additional Freelancer',
    role: 'Content Writer',
    rating: 3.5,
    image: sampleImage,
  },
  {
    id: 6,
    name: 'New Freelancer',
    role: 'Graphic Designer',
    rating: 4.2,
    image: sampleImage,
  },
];

const FreelancerCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 md:px-16 lg:px-40 py-10">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold text-gray-900 py-2">Highest Rated Freelancers</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur.</p>
        </div>

        <Swiper
          spaceBetween={20} // Adjust the gap between sliders
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
            <SwiperSlide key={freelancer.id}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-4 w-60 mx-auto text-center 
                transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
                <p className="text-gray-600">{freelancer.role}</p>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>{freelancer.rating}</span>
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

export default FreelancerCarousel;