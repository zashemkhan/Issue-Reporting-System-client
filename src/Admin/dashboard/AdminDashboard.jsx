

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: allDIssues = [] } = useQuery({
    queryKey: ['alldissues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data?.result || [];
    },
  });

  const totalPending = allDIssues.filter(
    (issue) => issue.status === 'pending'
  ).length;

  const totalInProgress = allDIssues.filter(
    (issue) => issue.status === 'in-progress'
  ).length;

  const totalResolved = allDIssues.filter(
    (issue) => issue.status === 'resolved'
  ).length;

  const totalRejected = allDIssues.filter(
    (issue) => issue.status === 'rejected'
  ).length;

  const totalIssues = allDIssues.length;

  const totalHighBoostPrice = allDIssues
    .filter((issue) => issue.priority === 'high')
    .reduce((sum, issue) => sum + (issue.boostPrice || 0), 0);

  const chartData = [
    { name: 'Total', count: totalIssues },
    { name: 'Pending', count: totalPending },
    { name: 'In Progress', count: totalInProgress },
    { name: 'Resolved', count: totalResolved },
    { name: 'Rejected', count: totalRejected },
    { name: 'Payment', count: totalHighBoostPrice },
  ];

  return (
    <div className="px-2 md:px-4">
      <div className="mx-auto max-w-[1400px]">

    
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

          <div className="grid h-40 place-content-center rounded-xl bg-slate-50 text-slate-800 shadow-sm">
            <h4 className="text-xl">Total Issues</h4>
            <h5 className="text-center text-3xl font-bold">{totalIssues}</h5>
          </div>

          <div className="grid h-40 place-content-center rounded-xl bg-yellow-50 text-yellow-700 shadow-sm">
            <h4 className="text-xl">Pending Issues</h4>
            <h5 className="text-center text-3xl font-bold">{totalPending}</h5>
          </div>

          <div className="grid h-40 place-content-center rounded-xl bg-blue-50 text-blue-700 shadow-sm">
            <h4 className="text-xl">In Progress</h4>
            <h5 className="text-center text-3xl font-bold">
              {totalInProgress}
            </h5>
          </div>

          <div className="grid h-40 place-content-center rounded-xl bg-green-50 text-green-700 shadow-sm">
            <h4 className="text-xl">Resolved Issues</h4>
            <h5 className="text-center text-3xl font-bold">
              {totalResolved}
            </h5>
          </div>

          <div className="grid h-40 place-content-center rounded-xl bg-red-50 text-red-700 shadow-sm">
            <h4 className="text-xl">Rejected Issues</h4>
            <h5 className="text-center text-3xl font-bold">
              {totalRejected}
            </h5>
          </div>

          <div className="grid h-40 place-content-center rounded-xl bg-violet-50 text-violet-700 shadow-sm">
            <h4 className="text-xl">Total Payments</h4>
            <h5 className="text-center text-3xl font-bold">
              ৳ {totalHighBoostPrice}
            </h5>
          </div>

        </div>

      
        <div className="mt-16 ">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                barSize={35}
                radius={[8, 8, 0, 0]}
                fill="#3B82F6" 
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
