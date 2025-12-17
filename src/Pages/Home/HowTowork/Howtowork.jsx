import React from 'react';
import img1 from '/camera.png'
import img2 from '/like.png'
import img3 from '/done.png'

const Howtowork = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-md:mx-4 mx-auto max-w-[1400px]'>
    <div className='bg-white shadow p-10 space-y-3 rounded-md hover:scale-104 transtion ease-in-out duration-300 '>
     <div className='bg-white shadow rounded-full h-20 w-20 p-4 mx-auto grid place-content-center'>
       <img src={img1} alt="" />
     </div>
      <h3 className='text-3xl font-bold text-center'>Step 1: Report an Issue</h3>
      <p className='text-center'>Capture a photo and provide details about the issue you've spotted in your neighborhood.</p>
    </div>
    <div className='bg-white shadow p-10 space-y-3 rounded-md hover:scale-104 transtion ease-in-out duration-300 '>
     <div className='bg-white shadow rounded-full h-20 w-20 p-4  mx-auto grid place-content-center'>
       <img src={img2} alt="" />
     </div>
      <h3 className='text-3xl font-bold text-center'>Step 2: Get Community Support</h3>
      <p className='text-center'>Other citizens vote on your report, helping prioritize issues that matter most to the community.</p>
    </div>
    <div className='bg-white shadow p-10 space-y-3 rounded-md hover:scale-104 transtion ease-in-out duration-300 '>
     <div className='bg-white shadow rounded-full h-20 w-20 p-4 mx-auto grid place-content-center'>
       <img src={img3} alt="" />
     </div>
      <h3 className='text-3xl font-bold text-center'>Step 3: Track Resolution</h3>
      <p className='text-center'>Follow the progress as issues get fixed and receive notifications when your reported problems are resolved.</p>
    </div>

    </div>
  );
};

export default Howtowork;