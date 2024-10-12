import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';  // Import Autoplay module
import { FaStar } from 'react-icons/fa';


const trendingServices = [
  {
    category: 'Development & IT',
    title: 'Web development, with HTML, CSS, JavaScript...',
    rating: 4.5,
    reviews: 2,
    price: 29.0,
    author: 'Agent Smith',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
  {
    category: 'Design & Creative',
    title: 'Developers drop the framework folder into a...',
    rating: 4.5,
    reviews: 2,
    price: 128.0,
    author: 'John Paul',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
  {
    category: 'Development & IT',
    title: 'Flexibility & Customization with CMS...',
    rating: 5.0,
    reviews: 1,
    price: 99.0,
    author: 'Thomas Smith',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
  {
    category: 'Design & Creative',
    title: 'PHP framework that you can use to create your...',
    rating: 4.0,
    reviews: 1,
    price: 158.0,
    author: 'Ali Tufan',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
  {
    category: 'Design & Creative',
    title: 'PHP framework that you can use to create your...',
    rating: 4.0,
    reviews: 1,
    price: 158.0,
    author: 'Ali Tufan',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
  {
    category: 'Design & Creative',
    title: 'PHP framework that you can use to create your...',
    rating: 4.0,
    reviews: 1,
    price: 158.0,
    author: 'Ali Tufan',
    img: 'https://freeio.blogdu.de/wp-content/uploads/2022/11/service11-768x576.jpg',
  },
];

const TrendingServicesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Trending Services
        </h2>
        <p className="text-gray-500 mb-12">
          Most viewed and all-time top-selling services
        </p>

        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 3000,  // Delay of 3 seconds for autoplay
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1024: { slidesPerView: 4, spaceBetween: 50 },
          }}
          pagination={{
            clickable: true,
            el: '.custom-pagination',  // Custom pagination class for styling
          }}
          modules={[Pagination, Autoplay]}  // Added Autoplay
          className="mySwiper"
        >
          {trendingServices.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="text-gray-500 text-sm">{service.category}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <div className="flex items-center mt-2 mb-4">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1 text-gray-700 font-bold">
                    {service.rating}
                  </span>
                  <span className="ml-2 text-gray-500">
                    ({service.reviews} Reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{service.author}</div>
                  <div className="text-gray-900 font-bold">
                    Starting at: ${service.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom pagination container */}
        <div className="custom-pagination mt-6"></div> 
      </div>
    </section>
  );
};

export default TrendingServicesSection;
