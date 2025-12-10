import { ToastContainer } from 'kitzo/react';
import { CreditCard, LayoutDashboard, SquareCheckBig, UserPlus, Users } from 'lucide-react';
import { TbReport } from 'react-icons/tb';
import { Link, NavLink, Outlet } from 'react-router';

export default function AdminDashboardLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar bg-base-300 w-full">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Link
              to="/"
              className="text-2xl font-bold"
            >
              CityFix Portal
            </Link>
          </div>
        </nav>
        {/* Page content here */}

        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 flex min-h-full flex-col items-start">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <NavLink to="/admin/dashboard/admindashboard">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="admin-dashboard"
                >
                  {/* dashboard */}

                  <LayoutDashboard />
                  <span className="is-drawer-close:hidden">DashBoard</span>
                </button>
              </li>
            </NavLink>
            {/* All Issues */}
            <NavLink to="/admin/dashboard/adminallissues">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All-Issues"
                >
                  {/* dashboard */}

               <TbReport size={24} />
                  <span className="is-drawer-close:hidden">All Issues</span>
                </button>
              </li>
            </NavLink>
            {/* Manage users */}
            <NavLink to="/admin/dashboard/manageusers">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage-users"
                >
                  {/* dashboard */}

            
                 <SquareCheckBig size={24} />
                  <span className="is-drawer-close:hidden">Manage users</span>
                </button>
              </li>
            </NavLink>
            <NavLink to="/admin/dashboard/managestaff">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="manage-staff"
                >
                  {/* dashboard */}

             
                 <Users  size={24}  />
                  <span className="is-drawer-close:hidden">Manage Staff</span>
                </button>
              </li>
            </NavLink>
            <NavLink to="/admin/dashboard/paymentspage">
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="paymentspage"
                >
                  {/* dashboard */}

  
                <CreditCard size={24} />
                  <span className="is-drawer-close:hidden">Payments page</span>
                </button>
              </li>
            </NavLink>

            <li>
              {/* profile */}
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="my-profile"
                to="/admin/dashboard/profile"
              >
                <UserPlus size={24} />
                <span className="is-drawer-close:hidden">My profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
