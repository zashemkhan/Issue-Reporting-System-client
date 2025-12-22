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

  const totalPending = myIssues.filter(i => i.status === 'pending').length;
  const totalInProgress = myIssues.filter(i => i.status === 'in progress').length;
  const totalResolved = myIssues.filter(i => i.status === 'resolved').length;
  const totalIssues = myIssues.length;
  const totalHighBoostPrice = myIssues
    .filter(i => i.priority === 'high')
    .reduce((sum, i) => sum + (i.boostPrice || 0), 0);

  const chartData = [
    { name: 'Total', count: totalIssues },
    { name: 'Pending', count: totalPending },
    { name: 'In Progress', count: totalInProgress },
    { name: 'Resolved', count: totalResolved },
    { name: 'Payment', count: totalHighBoostPrice },
  ];

  // Card colors for visual diversity
  const cardStyles = [
    { bg: 'bg-indigo-100', text: 'text-indigo-800' },
    { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    { bg: 'bg-purple-100', text: 'text-purple-800' },
    { bg: 'bg-green-100', text: 'text-green-800' },
    { bg: 'bg-pink-100', text: 'text-pink-800' },
  ];

  const cardTitles = [
    'Total Issues Submitted',
    'Total Pending Issues',
    'Total In Progress Issues',
    'Total Resolved Issues',
    'Total Payments',
  ];

  const cardValues = [
    totalIssues,
    totalPending,
    totalInProgress,
    totalResolved,
    totalHighBoostPrice,
  ];

  return (
    <div className="px-4 py-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-8 text-3xl font-extrabold text-gray-800">
          Citizen Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cardTitles.map((title, index) => (
            <div
              key={index}
              className={`${cardStyles[index].bg} group relative flex h-40 flex-col items-center justify-center rounded-xl p-6 font-bold shadow-md transition-transform hover:-translate-y-2 hover:shadow-xl`}
            >
              <h4 className={`text-lg ${cardStyles[index].text} mb-2`}>{title}</h4>
              <h3 className={`text-3xl font-extrabold ${cardStyles[index].text}`}>
                {cardValues[index] || 0}
              </h3>
              <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full border-4 border-white bg-opacity-30 bg-gradient-to-tr from-white to-gray-200"></div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="mt-16 h-80 w-full rounded-xl bg-white p-4 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-700">Issues Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
              <XAxis dataKey="name" tick={{ fill: '#555', fontWeight: 500 }} />
              <YAxis allowDecimals={false} tick={{ fill: '#555', fontWeight: 500 }} />
              <Tooltip />
              <Bar
                dataKey="count"
                barSize={40}
                fill="#8b0000"
                radius={[6, 6, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DasboardCitizen;
