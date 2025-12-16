import React from 'react';
import Banner from './Banner/Banner';
import Howtowork from './HowTowork/Howtowork';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import StayUpdated from './StayUpdated/StayUpdated';
import ResolvedIssues from './ResolvedIssues/ResolvedIssues';

const Home = () => {
  return (
    <div className="">
      <div  className="mt-20 max-w-[1400px] mx-auto">
        <Banner></Banner>
      </div>
      <div className="my-20">
       <ResolvedIssues></ResolvedIssues>
      </div>
      <div className="my-20">
        <Howtowork></Howtowork>
      </div>
      <div className="my-20">
      <KeyFeatures></KeyFeatures>
      </div>
      <div className="my-20">
      <StayUpdated></StayUpdated>
      </div>
    </div>
  );
};

export default Home;
