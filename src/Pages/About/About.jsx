import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-r from-[#f0f4ff] to-[#ffffff] py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 md:text-5xl">
            About InfraReport
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Empowering citizens to report and track public infrastructure issues
            efficiently.
          </p>
        </div>

        {/* Mission, Vision, How it works */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border-l-8 border-[#25408f] bg-white p-6 shadow-lg transition-all hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-[#25408f]">Mission</h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Improve public service quality by enabling fast reporting and
              quick responses from authorities.
            </p>
          </div>

          <div className="rounded-2xl border-l-8 border-[#34d399] bg-white p-6 shadow-lg transition-all hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-[#34d399]">Vision</h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Build cleaner, safer, and smarter cities with active citizen
              participation.
            </p>
          </div>

          <div className="rounded-2xl border-l-8 border-[#f59e0b] bg-white p-6 shadow-lg transition-all hover:shadow-2xl">
            <h2 className="text-xl font-semibold text-[#f59e0b]">
              How It Works
            </h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Submit a report → Admin verifies → Issue assigned → Issue resolved
              → Status tracked.
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-12 text-center">
          <p className="text-base text-gray-700 md:text-lg">
            InfraReport ensures transparency, accountability, and faster public
            service delivery, making the city a better place for everyone.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
