import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { CiUser } from 'react-icons/ci';
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
    navigate('/login');
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

  const getDashboardPath = () => {
    if (!user || !user.role) return '/dashboard/dashboardcitizen';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard/admindashboard';
      case 'staff':
        return '/staff/dashboard/staffdashboard';
      default:
        return '/dashboard/dashboardcitizen';
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#8b0000]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#fceaea]`
        }
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        to="/all-issues"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#8b0000]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#fceaea]`
        }
      >
        <li>All Issues</li>
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          ` ${isActive ? 'text-[#8b0000]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#fceaea]`
        }
      >
        <li>About</li>
      </NavLink>

      {user ? (
        <div className="relative">
          <div
            onClick={() => setOpenimg(!openimg)}
            className="dropdown-open-btn h-10 w-10 rounded-full cursor-pointer flex items-center justify-center bg-gray-200"
          >
            {user.photoURL ? (
              <img
                className="rounded-full border h-10 w-10"
                src={user.photoURL}
                alt={user.displayName || 'User'}
              />
            ) : (
              <CiUser className="text-2xl text-[#8b0000]" />
            )}
          </div>

          {openimg && (
            <div className="dropdown-menu absolute top-12 right-0 z-50 flex w-[200px] flex-col gap-3 rounded-md bg-white px-3 py-2 shadow-lg transition-all duration-300">
              <h1 className="text-lg font-bold truncate">{user.displayName || 'User'}</h1>

              <NavLink
                to={getDashboardPath()}
                className={({ isActive }) =>
                  ` ${isActive ? 'text-[#8b0000]' : ''} rounded-md px-5 py-1.5 font-medium hover:bg-[#fceaea]`
                }
              >
                <li>Dashboard</li>
              </NavLink>

              <button
                onClick={handleLogout}
                className="btn w-full rounded-md bg-[#8b0000] font-semibold text-white hover:bg-[#b22222]"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login">
          <li>
            <button className="btn rounded-md bg-[#8b0000] font-semibold text-white outline-none hover:bg-[#b22222]">
              Login
            </button>
          </li>
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Logo
          onClick={() => {
            if (location.pathname === '/') {
              window.location.reload();
            } else {
              navigate('/');
            }
          }}
        />

        <ul className="hidden items-center gap-8 text-gray-700 md:flex">{links}</ul>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <ul className="mt-4 flex flex-col gap-4 rounded-lg bg-gray-50 p-4 text-gray-700 shadow-md md:hidden">
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
