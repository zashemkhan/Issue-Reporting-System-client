import React from 'react';
import { FaUser } from 'react-icons/fa';
import { BiLike } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

const KeyFeatures = () => {
  return (
    <div className="bg-[#e2e8fe] p-7">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold">Key Features</h1>
          <span></span>
        </div>

        {/* user system  */}
        <div className="mx-auto flex w-fit flex-col gap-5 rounded-md bg-white p-4 shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:flex-row">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4e6fb] md:h-10 md:w-10">
            <FaUser className="text-xl text-orange-500 md:text-lg" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="rounded-md text-2xl font-medium md:text-3xl">
              User Dashboards
            </h3>
            <p className="text-sm md:text-base">
              Track your reports, view their status, and receive notifications
              when updates are available.
            </p>
          </div>
        </div>

        <div className='flex gap-10 max-md:flex-col my-10'>
          {/* Upvote System */}
          <div className="mx-auto flex w-full flex-col items-center gap-5 rounded-md bg-white p-4 shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:w-fit md:flex-row md:items-start">
            <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#f4e6fb] md:h-10 md:w-10">
              <BiLike className="text-2xl text-green-500 md:text-xl" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-medium md:text-3xl">
                Upvote System
              </h3>
              <p className="text-sm md:text-base">
                Prioritize issues based on community votes to ensure the most
                important problems get fixed first.
              </p>
            </div>
          </div>

          {/* Admin Panel */}
          <div className="mx-auto flex w-full flex-col items-center gap-5 rounded-md bg-white p-4 shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg md:w-fit md:flex-row md:items-start">
            <div className="flex h-10 w-12 items-center justify-center rounded-full bg-[#f4e6fb] md:h-10 md:w-10">
              <IoIosSettings className="text-2xl text-violet-500 md:text-xl" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-medium md:text-3xl">Admin Panel</h3>
              <p className="text-sm md:text-base">
                Powerful tools for admins to manage reports, assign tasks, and
                monitor resolution progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
