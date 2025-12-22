import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { format } from 'date-fns';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function StaffDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: AssignedIssues = [] } = useQuery({
    queryKey: ['Assigned-issues-count'],
    queryFn: async () => {
      const res = await axiosSecure.get('/staff/assigned-issues');
      return res.data;
    },
  });

  const totalResolved = AssignedIssues.filter(issue => issue.status === 'resolved').length;

  const todaysTasks = AssignedIssues.filter((assignment) => {
    if (!assignment || !assignment.assignedAt) return false;
    return format(new Date(assignment.assignedAt), 'dd-MM-y') === format(new Date(), 'dd-MM-y');
  }).length;

  const chartData = [
    { name: 'Total Submit', count: AssignedIssues.length },
    { name: 'Resolved', count: totalResolved },
    { name: "Today's Task", count: todaysTasks },
  ];

  return (
    <div className="px-4 md:px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Staff Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-800 p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold">Assigned Issues</h4>
          <h5 className="text-3xl font-bold mt-2">{AssignedIssues.length || 0}</h5>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-green-50 text-green-700 p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold">Resolved Issues</h4>
          <h5 className="text-3xl font-bold mt-2">{totalResolved || 0}</h5>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-red-50 text-red-700 p-6 shadow-md hover:shadow-lg transition">
          <h4 className="text-xl font-semibold">Today's Tasks</h4>
          <h5 className="text-3xl font-bold mt-2">{todaysTasks}</h5>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-16 h-72 w-full">
        <ResponsiveContainer width="100%" height={300}>
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
  );
}
