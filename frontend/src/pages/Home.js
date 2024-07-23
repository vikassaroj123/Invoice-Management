import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-300 opacity-30 rounded-full transform scale-150 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400 opacity-30 rounded-full transform scale-150 animate-pulse"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 p-6 sm:p-12 bg-white shadow-2xl rounded-xl max-w-md sm:max-w-lg mx-auto border border-gray-200 transition-transform transform hover:scale-105">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Invoice Management System
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Effortlessly manage your invoices with our streamlined system. Create, track, and organize your invoices with ease and precision.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="flex items-center bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaSignInAlt className="mr-2 text-lg sm:text-xl" /> Login
          </Link>
          <Link
            to="/signup"
            className="flex items-center bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaUser className="mr-2 text-lg sm:text-xl" /> Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
