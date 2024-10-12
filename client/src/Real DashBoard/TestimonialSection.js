import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; 
import { Pagination } from 'swiper/modules'; 
import sampleImage from '../assets/78.png'; 

const testimonials = [
  {
    id: 1,
    company: 'Envato',
    text: `“I have used Freeio numerous times for several different companies. 
    I have always had great experiences. I once tried using someone else, and I 
    ended up having to cancel the order and move back to Freeio.”`,
    name: 'Ali Tufan',
    role: 'Product Manager | Envato',
    image: sampleImage,
  },
  {
    id: 2,
    company: 'Upwork',
    text: `“Upwork has consistently provided me with excellent freelancers. 
    I highly recommend it for any project that requires outsourcing talent.”`,
    name: 'John Doe',
    role: 'CEO | Upwork',
    image: sampleImage,
  },
  {
    id: 3,
    company: 'Fiverr',
    text: `“Fiverr is amazing for quick turnarounds on small projects. 
    I've always found reliable freelancers for my needs.”`,
    name: 'Jane Smith',
    role: 'Creative Director | Fiverr',
    image: sampleImage,
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-[#F9F6F1] py-16 rounded-lg">
      <div className="container mx-auto">
        {/* Swiper Carousel for Testimonials */}
        <Swiper
          spaceBetween={20} // Reduced space between slides
          slidesPerView={1} // Show one testimonial at a time
          pagination={{ clickable: true , el: '.custom-pagination-testimonial'}} // Enable clickable pagination
          loop={true} // Enable loop to repeat the testimonials
          modules={[Pagination]} // Use the Pagination module
          className="w-full"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between animate-fade-in">
                {/* Left Section (Image with Play Button) */}
                <div className="relative lg:w-1/2 w-full mb-10 lg:mb-0">
                  <img
                    src={testimonial.image}
                    alt="Person working on a laptop"
                    className="w-full rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl">▶</span> {/* Play button icon */}
                    </div>
                  </button>
                </div>

                {/* Right Section (Testimonial Text) */}
                <div className="lg:w-1/2 w-full text-center lg:text-left">
                  <h4 className="text-4xl font-bold text-black mb-4 animate-fade-in">{testimonial.company}</h4>
                  <p className="text-xl text-gray-700 mb-6 w-full lg:w-2/3 animate-fade-in">{testimonial.text}</p>
                  <p className="text-gray-500 animate-fade-in">
                    {testimonial.name}
                    <br />
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

                {/* Custom pagination container */}
                <div className="custom-pagination-testimonial"></div> 

      </div>
    </section>
  );
};

export default TestimonialSection;
