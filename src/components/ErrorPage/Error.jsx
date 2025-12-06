import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-9xl font-bold text-red-500 mb-4 animate-bounce">404</h1>
      <p className="text-4xl font-bold text-gray-700 mb-6">Page Not Found</p>
      <Link to="/" className="bg-[#25408f] text-white btn">
        Go Back Home
      </Link>
    </div>

  );
};

export default Error;