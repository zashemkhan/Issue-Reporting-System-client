import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
  const { issueId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: payment = {} } = useQuery({
    queryKey: ['paymentIssue', issueId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue/payment/${issueId}`);
      return res.data;
    },
  });

  const handlePay = async () => {
    const res = await axiosSecure.post('/create-checkout-session', {
      email: payment.email,
      issueId: issueId,
    });
    window.location.href = res.data.url;
    await axiosSecure.patch(`/issue/update-status/${issueId}`, {
      priority: 'high',
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
        <h2 className="text-center text-3xl font-bold text-[#8b0000] mb-4">
          Boost This Issue
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Increase the priority of your issue to <span className="font-semibold">High</span> for <span className="text-[#8b0000] font-bold">100tk</span>
        </p>

        <button
          onClick={handlePay}
          className="w-full rounded-xl bg-[#8b0000] py-3 text-white font-semibold shadow-md hover:bg-[#b22222] transition-colors"
        >
          Pay & Boost
        </button>

        <div className="mt-6 text-center text-gray-500 text-sm">
          By clicking "Pay & Boost", you agree to our <span className="underline">terms and conditions</span>.
        </div>
      </div>
    </div>
  );
};

export default Payment;
