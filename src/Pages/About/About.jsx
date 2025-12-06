import React from 'react';

const About = () => {
  return (
    <div className='max-w-[1400px] mx-auto bg-white rounded-lg  p-6  mt-6'>
    
<h1 className="text-3xl font-bold">About InfraReport</h1>
<p className="text-gray-700 mt-4">
InfraReport is a digital platform that enables citizens to report public infrastructure issues such as potholes, broken streetlights, water leakage, blocked drainage, and damaged footpaths. The system helps government staff verify, assign, and resolve these issues efficiently.
</p>


<div className="mt-6 grid md:grid-cols-3 gap-6">
<div className="p-4 border border-[#e0e2e3] rounded">
<h2 className="font-semibold text-lg">Mission</h2>
<p className="text-gray-600 mt-2">Improve public service quality by enabling fast reporting and quick responses from authorities.</p>
</div>
<div className="p-4 border  border-[#e0e2e3] rounded">
<h2 className="font-semibold text-lg">Vision</h2>
<p className="text-gray-600 mt-2">Build cleaner, safer, and smarter cities with active citizen participation.</p>
</div>
<div className="p-4 border border-[#e0e2e3] rounded">
<h2 className="font-semibold text-lg">How It Works</h2>
<p className="text-gray-600 mt-2">Submit a report → Admin verifies → Issue assigned → Issue resolved → Status tracked.</p>
</div>
</div>


<p className="text-gray-700 mt-6">
InfraReport ensures transparency, accountability, and faster public service delivery, making the city a better place for everyone.
</p>

    </div>
  );
};

export default About;