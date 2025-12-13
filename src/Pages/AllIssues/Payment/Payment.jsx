import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {
  const { issueId } = useParams();
  // console.log(issueId)
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

    // console.log(res.data)
    // Stripe session URL → redirect
    window.location.href = res.data.url;
    await axiosSecure.patch(`/issue/update-status/${issueId}`, {
      priority: 'high',
    });
  };

  if (isLoading) {
    <p>loading...</p>;
  }
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-md">
        <h5 className="mb-2 text-2xl font-bold">Boost this Issue</h5>
        <p className="mb-3">Increase priority to high for 100tk</p>
        <button
          onClick={handlePay}
          className="btn rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-900"
        >
          Pay & Boost
        </button>
      </div>
    </div>
  );
};

export default Payment;
