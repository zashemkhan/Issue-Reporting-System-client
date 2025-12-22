import React from 'react';
import { Link } from 'react-router';

const PaymentCancell = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-[#8b0000] mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. Please try again.
        </p>
        <Link to="/all-issues">
          <button className="w-full py-3 rounded-xl bg-[#8b0000] text-white font-semibold shadow-md hover:bg-[#b22222] transition-colors">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancell;
