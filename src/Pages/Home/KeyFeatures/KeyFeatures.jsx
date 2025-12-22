import React from 'react';
import { FaUser } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

const KeyFeatures = () => {
  const features = [
    {
      icon: <FaUser className="text-3xl text-[#ff7f50]" />,
      title: 'User Dashboards',
      desc: 'Track your reports, view their status, and receive notifications when updates are available.',
    },
    {
      icon: <BiLike className="text-3xl text-[#34d399]" />,
      title: 'Upvote System',
      desc: 'Prioritize issues based on community votes to ensure the most important problems get fixed first.',
    },
    {
      icon: <IoIosSettings className="text-3xl text-[#a78bfa]" />,
      title: 'Admin Panel',
      desc: 'Powerful tools for admins to manage reports, assign tasks, and monitor resolution progress.',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#f0f4ff] to-[#ffffff] py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold text-gray-800 md:text-3xl">
            Key Features
          </h1>
          <p className="mt-2 text-gray-500 text-lg md:text-xl">
            Everything you need to manage public reports efficiently
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-lg transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fff0f5] to-[#ffe4e1] transition-all group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-center text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
