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
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    function closeDropdown(e) {
      if (e.target.closest('.dropdown-toggle')) return;
      if (e.target.closest('.dropdown-menu')) return;
      setOpenDropdown(false);
    }

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const getDashboardPath = () => {
    if (!user || !user.role) return '/dashboard';
    switch (user.role?.toLowerCase()) {
      case 'admin':
        return '/admin/dashboard/admindashboard';
      case 'staff':
        return '/staff/dashboard/staffdashboard';
      default:
        return '/dashboard';
    }
  };

  const linkClass = ({ isActive }) =>
    `rounded-md px-5 py-2 font-medium transition-colors duration-200 ${
      isActive
        ? 'text-[#8b0000] bg-[#fceaea]'
        : 'text-gray-700 hover:bg-[#fceaea]'
    }`;

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={linkClass}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-issues"
          className={linkClass}
        >
          All Issues
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={linkClass}
        >
          About
        </NavLink>
      </li>

      {user ? (
        <li className="relative"   onClick={() => setOpenDropdown(!openDropdown)}>
          <div className="dropdown-toggle flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition hover:ring-2 hover:ring-[#8b0000]">
            {user.photoURL ? (
              <img
                className="h-10 w-10 rounded-full border"
                src={user.photoURL}
                alt={user.displayName || 'User'}
              />
            ) : (
              <CiUser className="text-2xl text-[#8b0000]" />
            )}
          </div>

          {openDropdown && (
            <ul className="dropdown-menu absolute top-12 right-0 z-50 flex w-[200px] flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
              <li className="truncate text-lg font-semibold">
                {user.displayName || 'User'}
              </li>
              <li>
                <NavLink
                  to={getDashboardPath()}
                  className={linkClass}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-md bg-[#8b0000] px-4 py-2 font-semibold text-white transition hover:bg-[#b22222]"
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </li>
      ) : (
        <li>
          <NavLink to="/login">
            <button className="rounded-md bg-[#8b0000] px-4 py-2 font-semibold text-white transition hover:bg-[#b22222]">
              Login
            </button>
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
        <Logo
          onClick={() => {
            if (location.pathname === '/') window.location.reload();
            else navigate('/');
          }}
        />

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-4 md:flex">{links}</ul>

        {/* Mobile Toggle */}
        <button
          className="rounded-md p-2 transition hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 p-4 shadow-sm md:hidden">
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
