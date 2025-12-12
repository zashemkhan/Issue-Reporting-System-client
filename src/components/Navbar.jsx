import { useEffect, useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Logo from './Logo';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/FireBase.init';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openimg, setOpenimg] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    function closeDropdown(e) {
      if (e.target.closest('.dropdown-open-btn')) return;
      if (e.target.closest('.dropdown-menu')) return;
      setOpenimg(false);
    }

    document.addEventListener('click', closeDropdown);
    document.addEventListener('mousedown', closeDropdown);
    document.addEventListener('touchstart', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
      document.removeEventListener('mousedown', closeDropdown);
      document.removeEventListener('touchstart', closeDropdown);
    };
  }, []);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#1e91f4]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#e7e7e8]`
        }
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        to="/allissues"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#1e91f4]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#e7e7e8]`
        }
      >
        <li>All Issues</li>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#1e91f4]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#e7e7e8]`
        }
      >
        <li>About</li>
      </NavLink>

      {user ? (
        <div className="relative">
          <div
            onClick={() => setOpenimg(!openimg)}
            className="dropdown-open-btn h-10 w-10 rounded-full"
          >
            <img
              className="rounded-full"
              src={user.photoURL}
              alt=""
            />
          </div>
          {openimg && (
            <div className="dropdown-menu absolute top-15 right-0 z-99 flex w-[200px] flex-col gap-3 rounded-md bg-white px-3 py-2 shadow transition-all duration-3000 max-md:left-0">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              <NavLink
                to={user.role !== 'user' ? `/${user.role}/dashboard` : '/dashboard'}
                className={({ isActive }) =>
                  ` ${isActive ? 'text-[#1e91f4]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#e7e7e8]`
                }
              >
                <li>Dashboard</li>
              </NavLink>
              <button
                onClick={handleLogout}
                className="btn rounded-md bg-[#25408f] font-semibold text-white outline-none"
              >
                log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <li>
            <button className="btn rounded-md bg-[#25408f] font-semibold text-white outline-none">
              Login
            </button>
          </li>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white px-6 py-4 shadow">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Logo
          onClick={() => {
            if (location.pathname === '/') {
              window.location.reload();
            }
            navigate('/');
          }}
        />

        <ul className="hidden items-center gap-8 text-gray-700 md:flex">
          {links}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <ul className="mt-4 flex flex-col gap-4 rounded-lg bg-gray-50 p-4 text-gray-700 shadow md:hidden">
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
