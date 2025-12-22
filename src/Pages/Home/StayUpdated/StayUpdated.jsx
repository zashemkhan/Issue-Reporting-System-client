import { toast } from 'kitzo/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const StayUpdated = () => {
  const { register, handleSubmit } = useForm();

  const handleSubscribe = (data) => {
    toast.success('Successfully Subscribed');
  };

  return (
    <section className="bg-gradient-to-r from-[#fff0f0] to-[#fff5f5] py-16">
      <div className="mx-auto max-w-[800px] space-y-6 px-4 text-center">
        <h3 className="text-2xl font-extrabold text-gray-800 md:text-3xl">
          Stay Updated
        </h3>
        <p className="text-lg text-gray-600">
          Subscribe to our newsletter to get updates on new features, city
          partnerships, and success stories.
        </p>

        <form
          onSubmit={handleSubmit(handleSubscribe)}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-[#8b0000] px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm transition focus:border-[#8b0000] focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#8b0000] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#b22222]"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default StayUpdated;
