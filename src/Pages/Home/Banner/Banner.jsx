import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  return (
    <Carousel className="max-lg:px-4" autoPlay={true} infiniteLoop={true} showArrows={false} showStatus={false}>
      <div className=" bg-white p-6 rounded-lg shadow hover:shadow-lg transition bg-[url('src/assets/photorealistic-style-clouds-light.jpg')] bg-cover bg-center  h-[400px]  relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white ">
          <h3 className="text-5xl max-md:text-3xl font-bold mb-2 ">Broken Streetlights</h3>
          <p className="text-center text-2xl mb-4">Streetlights not working? Report them now.'</p>
          <button className="px-4 py-2 bg-[#25408f] text-white rounded-lg hover:bg-blue-700 transition">Apply Now</button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg shadow hover:shadow-lg transition bg-[url('src/assets/closeup-bea-ch-shore-washed-up-with-garbage.jpg')] bg-cover bg-center  h-[400px]  ">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white ">
          <h3 className="text-5xl max-md:text-3xl font-bold mb-2">Garbage Overflow</h3>
          <p className="text-center text-2xl mb-4">Overflowing garbage in public areas? Let us know.</p>
          <button className="px-4 py-2 bg-[#25408f] text-white rounded-lg hover:bg-blue-700 transition">Apply Now</button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg shadow hover:shadow-lg transition bg-[url('src/assets/street-floor.jpg')] bg-cover bg-center  h-[400px]  ">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-5xl max-md:text-3xl font-bold mb-2">Damaged Footpaths</h3>
          <p className="text-center text-2xl mb-4">Cracked or broken footpaths? Report it now.</p>
          <button className="px-4 py-2 bg-[#25408f] text-white rounded-lg hover:bg-blue-700 transition">Apply Now</button>
        </div>
      </div>

      <div className=" bg-white p-6 rounded-lg shadow hover:shadow-lg transition bg-[url('src/assets/plumbing-repair.jpg')] bg-cover bg-center  h-[400px]  ">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-5xl max-md:text-3xl font-bold mb-2">Water Leakage</h3>
          <p className="text-center text-2xl mb-4">Report water leaks to prevent damage and waste</p>
          <button className="px-4 py-2 bg-[#25408f] text-white rounded-lg hover:bg-blue-700 transition">Apply Now</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
