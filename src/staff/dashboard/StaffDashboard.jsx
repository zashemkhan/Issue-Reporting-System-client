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
export default function StaffDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: AssignedIssuesCount = [] } = useQuery({
    queryKey: ['Assigned-issues-count'],
    queryFn: async () => {
      const res = await axiosSecure.get('/staff/assigned-issues');
      return res.data;
    },
  });

  const totalResolved = AssignedIssuesCount.filter(
    (issue) => issue.status === 'resolved',
  ).length;

  const chartData = [
    { name: 'Total', count: AssignedIssuesCount.length },
    { name: 'Resolved', count: totalResolved },
  ];

  return (
    <div className='px-2 md:px-3'>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className="text-2xl">Assigned issues count</h4>
          <h5 className="text-center text-3xl">
            {AssignedIssuesCount.length || 0}
          </h5>
        </div>
        <div className="grid h-40 place-content-center rounded-md bg-white p-3 font-bold shadow">
          <h4 className="text-2xl">Issues resolved count</h4>
          <h5 className="text-center text-3xl">{totalResolved || 0}</h5>
        </div>
      </div>
      <div className="mt-20 h-72 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
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
}
