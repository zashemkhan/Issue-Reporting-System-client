import React from 'react';
import { NavLink } from 'react-router';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-[#edf2ff] py-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-lg:mx-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <h2 className="text-2xl font-bold ">CityFix Portal</h2>
          </div>
          <div>
            <h2 className="font-bold">Address</h2>
            <p>Bogura, Sherpur Bus stand, Bangladesh</p>
          </div>
          <div>
            <h2 className="font-bold">Contact</h2>
            <p>01734837341</p>
            <p>sakib43@gmail.com</p>
          </div>
        </div>
        <div>
          <ul className="flex flex-col  gap-4 text-gray-700">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>

            <NavLink to="/allissues">
              <li>All Issues</li>
            </NavLink>
            <NavLink to="/about">
              <li>About</li>
            </NavLink>
          </ul>
        </div>
        <div className="flex gap-3">
          <a href="#">
            <Facebook />
          </a>
          <a href="#">
            <Instagram />
          </a>
          <a href="#">
            <Linkedin />
          </a>
        </div>
       
      </div>
       <div className='flex justify-between  max-md:flex-col mx-auto max-w-[1400px]   p-6 bg-[#e7edfc] shadow mt-7 rounded-md max-lg:mx-4'>
          <p>© 2025 CityFix portal & Solutions. All Right Reserved.</p>
          <p>Privacy Policy Terms & Conditions</p>
          
        </div>
    </div>
  );
};

export default Footer;
