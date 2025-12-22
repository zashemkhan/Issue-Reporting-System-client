import { ToastContainer } from 'kitzo/react';
import { Link, NavLink, Outlet } from 'react-router';
import { LayoutDashboard, UserPlus } from 'lucide-react';
import { TbReport } from 'react-icons/tb';

export default function StaffDashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-md w-full px-4">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
            aria-label="open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <Link to="/" className="ml-2 text-2xl font-bold text-[#1e91f4]">
            CityFix Portal
          </Link>
        </nav>

        {/* Page Content */}
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="bg-white w-64 min-h-full flex flex-col shadow-lg">
          <ul className="menu p-4 w-full grow">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/staff/dashboard/staffdashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <LayoutDashboard size={24} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Assigned Issues */}
            <li>
              <NavLink
                to="/staff/dashboard/staffassignissues"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <TbReport size={24} />
                <span>Assigned Issues</span>
              </NavLink>
            </li>

            {/* Profile */}
            <li>
              <NavLink
                to="/staff/dashboard/staffprofile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <UserPlus size={24} />
                <span>My Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}
