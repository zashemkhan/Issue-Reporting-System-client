import React from 'react';
import { FaCamera, FaUsers, FaCheckCircle } from 'react-icons/fa';

const HowToWork = () => {
  const steps = [
    {
      icon: <FaCamera className="text-5xl text-white" />,
      title: 'Step 1: Report an Issue',
      desc: "Capture a photo and provide details about the issue you've spotted in your neighborhood.",
      bg: 'bg-[#8b0000]',
    },
    {
      icon: <FaUsers className="text-5xl text-white" />,
      title: 'Step 2: Get Community Support',
      desc: 'Other citizens vote on your report, helping prioritize issues that matter most to the community.',
      bg: 'bg-[#25408f]',
    },
    {
      icon: <FaCheckCircle className="text-5xl text-white" />,
      title: 'Step 3: Track Resolution',
      desc: 'Follow the progress as issues get fixed and receive notifications when your reported problems are resolved.',
      bg: 'bg-[#008080]',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#fdf5f5] to-[#fff5f0] py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex transform flex-col items-center gap-6 rounded-xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-3 hover:shadow-2xl"
          >
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full ${step.bg} shadow-lg`}
            >
              {step.icon}
            </div>
            <h3 className="text-center text-2xl font-bold md:text-3xl">
              {step.title}
            </h3>
            <p className="text-center text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToWork;
