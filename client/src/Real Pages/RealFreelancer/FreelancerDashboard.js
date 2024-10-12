import React from "react";
import { FaRegFileAlt, FaCheckCircle, FaHourglassHalf, FaCommentDots } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js for line chart

const FreelacerDashboardDash = () => {

  const data = {
    labels: ['October 14, 2023', 'October 16, 2023', 'October 18, 2023', 'October 20, 2023', 'October 22, 2023', 'October 24, 2023', 'October 26, 2023', 'October 28, 2023'],
    datasets: [
      {
        label: 'Page Views',
        data: [0, 0, 4.5, 0, 0, 4.0, 0, 5.0],
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      {/* Main Layout */}
      <main className="flex-1 bg-gray-200 py-10 px-4 lg:px-10 mt-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-10">Welcome to Your Dashboard</h1>

        {/* Grid for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaRegFileAlt className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Posted Services</p>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaCheckCircle className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Completed Services</p>
            <p className="text-2xl">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaHourglassHalf className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">In Queue Services</p>
            <p className="text-2xl">1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <FaCommentDots className="text-3xl text-green-900 mx-auto mb-3" />
            <p className="text-lg lg:text-xl">Review</p>
            <p className="text-2xl">0</p>
          </div>
        </div>

        {/* Page Views Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Page Views</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Line data={data} />
          </div>
        </div>
      </main>
    </>
  );
};

export default FreelacerDashboardDash;
