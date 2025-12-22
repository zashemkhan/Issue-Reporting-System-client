import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router';
import useAuth from './../../../Hooks/useAuth';

const Banner = () => {
  const { user } = useAuth();

  return (
    <Carousel
      className="max-lg:px-4"
      autoPlay={true}
      infiniteLoop={true}
      showStatus={false}
      showThumbs={false}
    >
      <div className="relative h-[400px] rounded-lg bg-white bg-[url('/banner-1.jpg')] bg-cover bg-center p-6 shadow transition hover:shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="mb-2 text-5xl font-bold max-md:text-3xl">
            Broken Streetlights
          </h3>
          <p className="mb-4 text-center text-2xl">
            Streetlights not working? Report them now
          </p>
          <Link to={user?.role === 'user' ? '/dashboard/public-report' : '/'}>
             <button className="rounded-lg bg-[#8b0000] px-4 py-2 text-white transition hover:bg-[#b22222]">
              Apply Now
            </button>
          </Link>
        </div>
      </div>

      <div className="h-[400px] rounded-lg bg-white bg-[url('/banner-2.jpg')] bg-cover bg-center p-6 shadow transition hover:shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="mb-2 text-5xl font-bold max-md:text-3xl">
            Garbage Overflow
          </h3>
          <p className="mb-4 text-center text-2xl">
            Overflowing garbage in public areas? Let us know
          </p>
          <Link to={user?.role === 'user' ? '/dashboard/public-report' : '/'}>
           <button className="rounded-lg bg-[#8b0000] px-4 py-2 text-white transition hover:bg-[#b22222]">
              Apply Now
            </button>
          </Link>
        </div>
      </div>

      <div className="h-[400px] rounded-lg bg-white bg-[url('/banner-3.jpg')] bg-cover bg-center p-6 shadow transition hover:shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="mb-2 text-5xl font-bold max-md:text-3xl">
            Damaged Footpaths
          </h3>
          <p className="mb-4 text-center text-2xl">
            Cracked or broken footpaths? Report it now
          </p>
          <Link to={user?.role === 'user' ? '/dashboard/public-report' : '/'}>
          <button className="rounded-lg bg-[#8b0000] px-4 py-2 text-white transition hover:bg-[#b22222]">
              Apply Now
            </button>
          </Link>
        </div>
      </div>

      <div className="h-[400px] rounded-lg bg-white bg-[url('/banner-4.jpg')] bg-cover bg-center p-6 shadow transition hover:shadow-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="mb-2 text-5xl font-bold max-md:text-3xl">
            Water Leakage
          </h3>
          <p className="mb-4 text-center text-2xl">
            Report water leaks to prevent damage and waste
          </p>
          <Link to={user?.role === 'user' ? '/dashboard/public-report' : '/'}>
            <button className="rounded-lg bg-[#8b0000] px-4 py-2 text-white transition hover:bg-[#b22222]">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
