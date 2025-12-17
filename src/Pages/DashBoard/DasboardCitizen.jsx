import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const DasboardCitizen = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myIssues = [] } = useQuery({
    queryKey: ['my-issues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues/${user?.email}`);
      return res.data;
    },
  });
  const totalPending = myIssues.filter(
    (issue) => issue.status === 'pending',
  ).length;
  const totalInProgress = myIssues.filter(
    (issue) => issue.status === 'in progress',
  ).length;
  const totalResolved = myIssues.filter(
    (issue) => issue.status === 'resolved',
  ).length;
  const totalIssues = myIssues.length;

  const totalHighBoostPrice = myIssues
    .filter((issue) => issue.priority === 'high')
    .reduce((sum, issue) => sum + (issue.boostPrice || 0), 0);

  const chartData = [
    { name: 'Total', count: totalIssues },
    { name: 'Pending', count: totalPending },
    { name: 'In Progress', count: totalInProgress },
    { name: 'Resolved', count: totalResolved },
    { name: 'Payment', count: totalHighBoostPrice },
  ];

  return (
    <div className="px-2">
      <div className="mx-auto max-w-[1400px]">
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {/* Total Issues Submitted */}
  <div className="grid h-40 place-content-center rounded-md bg-blue-100 p-4 font-bold shadow-md">
    <h4 className="text-2xl text-blue-800">Total issues submitted</h4>
    <h5 className="text-center text-3xl text-blue-900">{totalIssues || 0}</h5>
  </div>

  {/* Total Pending Issues */}
  <div className="grid h-40 place-content-center rounded-md bg-yellow-100 p-4 font-bold shadow-md">
    <h4 className="text-2xl text-yellow-800">Total pending issues</h4>
    <h5 className="text-center text-3xl text-yellow-900">{totalPending || 0}</h5>
  </div>

  {/* Total In Progress Issues */}
  <div className="grid h-40 place-content-center rounded-md bg-purple-100 p-4 font-bold shadow-md">
    <h4 className="text-2xl text-purple-800">Total in progress issues</h4>
    <h5 className="text-center text-3xl text-purple-900">{totalInProgress || 0}</h5>
  </div>

  {/* Total Resolved Issues */}
  <div className="grid h-40 place-content-center rounded-md bg-green-100 p-4 font-bold shadow-md">
    <h4 className="text-2xl text-green-800">Total Resolved issues</h4>
    <h5 className="text-center text-3xl text-green-900">{totalResolved || 0}</h5>
  </div>

  {/* Total Payments */}
  <div className="grid h-40 place-content-center rounded-md bg-teal-100 p-4 font-bold shadow-md">
    <h4 className="text-2xl text-teal-800">Total payments</h4>
    <h5 className="text-center text-3xl text-teal-900">{totalHighBoostPrice}</h5>
  </div>
</div>

        <div className="mt-20 h-72 w-full">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                barSize={35}
                 fill="#3B82F6" 
                radius={[6, 6, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DasboardCitizen;
