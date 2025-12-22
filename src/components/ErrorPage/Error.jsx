import React from 'react';
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#fef3f3] to-[#f0f4ff] px-4">
      <div className="text-center">
        <h1 className="text-[12rem] font-extrabold text-[#8b0000] leading-none max-md:text-[8rem] animate-pulse">
          404
        </h1>
        <p className="text-3xl md:text-4xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-[#8b0000] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#b22222] hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
