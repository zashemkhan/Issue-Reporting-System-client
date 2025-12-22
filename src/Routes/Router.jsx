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
import Payment from '../Pages/AllIssues/Payment/Payment';
import PaymentSuccess from '../Pages/AllIssues/Payment/PaymentSuccess';
import PaymentCancell from '../Pages/AllIssues/Payment/PaymentCancell';
import DasboardCitizen from '../Pages/DashBoard/DasboardCitizen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/all-issues', element: <AllIssues /> },
      {
        path: '/viewdetails/:id',
        element: (
          <PrivateRoute>
            <ViewDetail />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(`${import.meta.env.VITE_SERVER}/issues/${params.id}`),
      },
      {
        path: '/payment/:issueId',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment-cancel',
        element: (
          <PrivateRoute>
            <PaymentCancell />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <AuthProtectedRoute>
        <AuthLayout />
      </AuthProtectedRoute>
    ),
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <RoleBasedRedirect requiredRole={'user'}>
          <DashBoard />
        </RoleBasedRedirect>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DasboardCitizen /> }, // Default dashboard page
      { path: 'my-issues-page', element: <MyIssuesPage /> },
      { path: 'public-report', element: <PublicReport /> },
      { path: 'my-profile', element: <MyProfile /> },
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
      { path: 'admindashboard', element: <AdminDashboard /> },
      { path: 'adminallissues', element: <AdminAllIssues /> },
      { path: 'manageusers', element: <AdminManageusers /> },
      { path: 'managestaff', element: <AdminManageStaff /> },
      { path: 'paymentspage', element: <Paymentspage /> },
      { path: 'profile', element: <AdminProfile /> },
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
      { path: 'staffdashboard', element: <StaffDashboard /> },
      { path: 'staffprofile', element: <StaffProfile /> },
      { path: 'staffassignissues', element: <StaffAssignedissues /> },
    ],
  },
  { path: '*', element: <Error /> },
]);
