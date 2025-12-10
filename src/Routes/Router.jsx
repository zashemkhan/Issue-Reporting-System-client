import { createBrowserRouter } from 'react-router';
import Root from '../Layouts/Root';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import AllIssues from '../Pages/AllIssues/AllIssues';
import Login from '../Pages/Auth/Login/Login';
import AuthLayout from '../Layouts/AuthLayout';
import Register from '../Pages/Auth/Register/Register';
import Error from '../components/ErrorPage/Error';
import PrivateRoute from './PrivateRoute';
import DashBoard from '../Layouts/DashBoard';
import PublicReport from '../Pages/DashBoard/publicReport/PublicReport';
import ViewDetail from '../Pages/AllIssues/ViewDetails/ViewDetail';
import MyIssuesPage from '../Pages/DashBoard/MyIssuesPage/MyIssuesPage';
import MyProfile from '../Pages/DashBoard/MyProfile/MyProfile';
import AdminDashboardLayout from '../Admin/dashboard/AdminDashboardLayout';
import AdminDashboard from '../Admin/dashboard/AdminDashboard';
import StaffDashboardLayout from '../staff/dashboard/StaffDashboardLayout';
import StaffDashboard from '../staff/dashboard/StaffDashboard';
import RoleBasedRedirect from './RoleBasedRedirect';
import AuthProtectedRoute from './AuthProtectedRoute';
import AdminProfile from '../Admin/dashboard/AdminProfile';
import AdminAllIssues from '../Admin/dashboard/AdminAllIssues';
import AdminManageusers from '../Admin/dashboard/AdminManageusers';
import AdminManageStaff from '../Admin/dashboard/AdminManageStaff';
import Paymentspage from '../Admin/dashboard/Paymentspage';
import StaffProfile from '../staff/dashboard/StaffProfile';
import StaffAssignedissues from '../staff/dashboard/StaffAssignedissues';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/about',
        element: (
          <PrivateRoute>
            <About></About>
          </PrivateRoute>
        ),
      },
      {
        path: '/allissues',
        element: <AllIssues></AllIssues>,
      },
      {
        path: '/viewdetails/:id',
        element: (
          <PrivateRoute>
            <ViewDetail></ViewDetail>
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(`${import.meta.env.VITE_SERVER}/issues/${params.id}`),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProtectedRoute>
        <AuthLayout></AuthLayout>
      </AuthProtectedRoute>
    ),
    children: [
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <RoleBasedRedirect requiredRole={'user'}>
          <DashBoard />
        </RoleBasedRedirect>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'my-issues-page',
        element: <MyIssuesPage></MyIssuesPage>,
      },
      {
        path: 'public-report',
        element: <PublicReport></PublicReport>,
      },
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>,
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: (
      <PrivateRoute>
        <RoleBasedRedirect requiredRole={'admin'}>
          <AdminDashboardLayout />
        </RoleBasedRedirect>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'admindashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'adminallissues',
        element: <AdminAllIssues></AdminAllIssues>,
      },
      {
        path: 'manageusers',
        element:<AdminManageusers></AdminManageusers>,
      },
      {
        path: 'managestaff',
        element:<AdminManageStaff></AdminManageStaff>,
      },
      {
        path: 'paymentspage',
        element:<Paymentspage></Paymentspage>,
      },
      {
        path: 'profile',
        element: <AdminProfile></AdminProfile>,
      },
    ],
  },
  {
    path: '/staff/dashboard',
    element: (
      <PrivateRoute>
        <RoleBasedRedirect requiredRole={'staff'}>
          <StaffDashboardLayout />
        </RoleBasedRedirect>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'staffdashboard',
        element: <StaffDashboard />,
      },
      {
        path: 'staffprofile',
        element: <StaffProfile></StaffProfile>,
      },
      {
        path: 'staffassignissues',
        element:<StaffAssignedissues></StaffAssignedissues>,
      },
    ],
  },
  {
    path: '*',
    element: <Error></Error>,
  },
]);
