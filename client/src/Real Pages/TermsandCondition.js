import React from 'react';
import Navbar from '../Real DashBoard/Navbar';
import Footer from '../Real DashBoard/Footer';

const TermsAndConditions = () => {
  return (
    <>
    <Navbar />
    
    <div className="container mx-auto py-16 px-4 lg:px-32 mt-16">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">Terms and Conditions</h1>
        <p className="mt-4 text-gray-600">Give your visitor a smooth online experience with a solid UX design</p>
      </div>

      {/* Section 1 - Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">1. Introduction</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisi mi, in semper metus 
          porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed, a parturient fermentum 
          amet scelerisque. Amet purus urna, dictumst aliquet aliquam natoque non, morbi pretium.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Massa ultricies a arcu velit eget gravida purus ultricies eget. Orci, fames eu facilisi justo. Lacus 
          netus at a sed justo vel leo leo pellentesque. Nulla ut laoreet luctus cum turpis et amet ac viverra.
        </p>
      </section>

      {/* Section 2 - Your Use of the Sites */}
      <section className="mb-10">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">2. Your Use of the Sites</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisi mi, in semper metus 
          porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed, a parturient fermentum 
          amet scelerisque.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Massa ultricies a arcu velit eget gravida purus ultricies eget. Orci, fames eu facilisi justo. Lacus 
          netus at a sed justo vel leo leo pellentesque.
        </p>
      </section>

      {/* Section 3 - Content and Ideas */}
      <section className="mb-10">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">3. Content and Ideas</h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus nascetur morbi nisi mi, in semper metus 
          porttitor non. Augue nunc amet fringilla sit. Fringilla eget arcu sodales sed, a parturient fermentum 
          amet scelerisque.
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          Massa ultricies a arcu velit eget gravida purus ultricies eget. Orci, fames eu facilisi justo. Lacus 
          netus at a sed justo vel leo leo pellentesque.
        </p>
      </section>

    </div>

    <Footer />
    </>
  );
};

export default TermsAndConditions;
