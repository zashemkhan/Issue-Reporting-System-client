import React from 'react';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router';
import Banner from './Banner/Banner';

const Home = () => {
  return (
    <div className='max-w-[1400px] mx-auto '>
    
    <div className='mt-20'>
      <Banner></Banner>
    </div>
    </div>
  );
};

export default Home;