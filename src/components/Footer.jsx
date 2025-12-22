import React from 'react';
import { NavLink } from 'react-router';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#fdf0f0] text-gray-800">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo & Info */}
        <div className="flex flex-col gap-4">
          <Logo onClick={() => console.log('Clicked Footer Logo')} />
          <p className="mt-2 text-gray-600">
            Your one-stop platform to report and track city issues efficiently.
          </p>
          <div className="space-y-2">
            <h3 className="font-bold text-[#8b0000]">Address</h3>
            <p>Bogura, Sherpur Bus Stand, Bangladesh</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[#8b0000]">Contact</h3>
            <p>Phone: 0099 4488 99</p>
            <p>Email: issuerpt29@gmail.com</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h3 className="mb-3 font-bold text-[#8b0000]">Quick Links</h3>
          <NavLink
            to="/"
            className="transition hover:text-[#b22222]"
          >
            Home
          </NavLink>
          <NavLink
            to="/allissues"
            className="transition hover:text-[#b22222]"
          >
            All Issues
          </NavLink>
          <NavLink
            to="/about"
            className="transition hover:text-[#b22222]"
          >
            About
          </NavLink>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3">
          <h3 className="mb-3 font-bold text-[#8b0000]">Follow Us</h3>
          <div className="flex gap-4">
         <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#b22222]">
              <Facebook size={24} />
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#b22222]">
              <Instagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#b22222]">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        © 2025 IssueRPT Portal & Solutions. All Rights Reserved. | Privacy Policy
        | Terms & Conditions
      </div>
    </footer>
  );
};

export default Footer;
