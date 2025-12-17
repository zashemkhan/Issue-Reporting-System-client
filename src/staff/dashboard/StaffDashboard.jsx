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

  const totalResolved = AssignedIssues.filter(
    (issue) => issue.status === 'resolved',
  ).length;

  const todaysTasks = AssignedIssues.filter((assignment) => {
    if (!assignment) return false;

    return (
      format(assignment.assignedAt, 'dd-MM-y') === format(new Date(), 'dd-MM-y')
    );
  }).length;

  const chartData = [
    { name: 'Total submit', count: AssignedIssues.length },
    { name: 'Resolved', count: totalResolved },
    {
      name: "Today's task",
      count: todaysTasks,
    },
  ];

  return (
    <div className="px-2 md:px-3">
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid h-40 place-content-center rounded-xl bg-slate-50 text-slate-800 shadow-sm">
          <h4 className="text-2xl">Assigned issues count</h4>
          <h5 className="text-center text-3xl">{AssignedIssues.length || 0}</h5>
        </div>
        <div className="grid h-40 place-content-center rounded-xl bg-green-50 text-green-700 shadow-sm">
          <h4 className="text-2xl">Issues resolved count</h4>
          <h5 className="text-center text-3xl">{totalResolved || 0}</h5>
        </div>
        <div  className="grid h-40 place-content-center rounded-xl bg-red-50 text-red-700 shadow-sm">
          <h4 className="text-2xl">Today's task</h4>
          <h5 className="text-center text-3xl">{todaysTasks}</h5>
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
  );
}
