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
    const totalPending = myIssues.filter(issue => issue.status === 'pending').length;
      const totalInProgress = myIssues.filter(issue => issue.status === 'in progress').length;
  const totalResolved = myIssues.filter(issue => issue.status === 'resolved').length;
const totalIssues = myIssues.length;

const chartData = [
  { name: 'Total', count: totalIssues },
  { name: 'Pending', count: totalPending },
  { name: 'In Progress', count: totalInProgress },
  { name: 'Resolved', count: totalResolved },
  { name: 'Payment', count: 0 },
];

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:mx-4">
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className="text-2xl">Total issues submitted</h4>
          <h5 className="text-center text-3xl">{totalIssues || 0}</h5>
        </div>
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className="text-2xl">Total pending issues</h4>
          <h5 className="text-center text-3xl">{totalPending || 0}</h5>
        </div>
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className=" text-2xl">Total in progress issues</h4>
           <h5 className="text-center text-3xl">{totalInProgress || 0}</h5>
        </div>
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className=" text-2xl">Total Resolved issues</h4>
           <h5 className="text-center text-3xl">{totalResolved || 0}</h5>
        </div>
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className=" text-2xl">Total payments</h4>
           <h5 className="text-center text-3xl">{  0}</h5>
        </div>
      </div>

       <div className="h-72 w-full mt-20 ">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="count"
          barSize={35}
          radius={[6, 6, 0, 0]}
          animationDuration={1200}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
    </div>


);

  
};

export default DasboardCitizen;
