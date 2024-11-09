import React,{useEffect} from 'react';
import { FaCode, FaPaintBrush, FaBullhorn, FaPenNib, FaMusic, FaFilm, FaLaptopCode, FaCalculator } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const services = [
  { title: 'Development & IT', count: 9, icon: <FaCode /> },
  { title: 'Design & Creative', count: 9, icon: <FaPaintBrush /> },
  { title: 'Consultancy & Digital Marketing', count: 1, icon: <FaBullhorn /> },
  { title: 'Writing & Translation', count: 1, icon: <FaPenNib /> },
  { title: 'Music & Audio', count: 0, icon: <FaMusic /> },
  { title: 'Video & Animation', count: 0, icon: <FaFilm /> },
  { title: 'Programming & Tech', count: 1, icon: <FaLaptopCode /> },
  { title: 'Finance & Accounting', count: 4, icon: <FaCalculator /> },
];

const ServicesSection = () => {
  const navigate = useNavigate();

 

  const handleFreelancerClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
    navigate(`/servicelist`);
  };

  return (
    <section className="py-12 bg-white mt-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center sm:text-left">
          Browse Talent by Category
        </h2>
        <p className="text-gray-500 mb-12 text-center sm:text-left">
          Get some inspiration from 10+ skills
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" onClick={handleFreelancerClick}>
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 
              transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-md"
            >
              <div className="text-center">
                <div className="flex justify-center items-center mb-4">
                  <span className="text-4xl text-orange-200">{service.icon}</span> {/* Larger Icon */}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {service.title.split(' & ')[0]} <br /> & {service.title.split(' & ')[1]}
                </h3>
                <p className="text-gray-500">
                  {service.count} {service.count === 1 ? 'Service' : 'Services'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
