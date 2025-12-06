import React from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router';
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = (
    <>
      <NavLink to="/"
      className={({isActive}) => ` ${isActive ? 'bg-[#caeb66]' : ''} px-5 py-1.5 rounded-md hover:bg-[#e7e7e8]`}
      >
  
        <li>Home</li>
      </NavLink>


   <NavLink to="/allissues"
        className={({isActive}) => ` ${isActive ? 'bg-[#caeb66]' : ''} px-5 py-1.5 rounded-md hover:bg-[#e7e7e8]`} >
        <li >All Issues</li>
      </NavLink> 
      <NavLink to="/about"
     className={({isActive}) => ` ${isActive ? 'bg-[#caeb66]' : ''} px-5 py-1.5 rounded-md hover:bg-[#e7e7e8]`} >
        <li>About</li>
      </NavLink>
      {/* <NavLink
      className={({isActive}) => ` ${isActive ? 'bg-[#caeb66]' : ''} btn`}>
        <li >Report Issue</li>
      </NavLink> */}
      <NavLink>
        <li>
          <button className="bg-[#caeb66] font-semibold btn rounded-md">Login</button>
        </li>
      </NavLink>
    </>
  );
  return (
    <nav className="w-full bg-white shadow px-6 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🛠️</span>
          <h2 className="text-2xl font-bold ">CityFix Portal</h2>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-gray-700">{links}</ul>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && <ul className="md:hidden mt-4 flex flex-col gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg shadow">{links}</ul>}
    </nav>
  );
};

export default Navbar;
