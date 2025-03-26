import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
      <p className="text-xl text-gray-500 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;