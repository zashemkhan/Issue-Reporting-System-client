import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import IssueCard from '../../../components/IssueCard';

const MyIssuesPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const axiosSecure = useAxiosSecure();

  const { data: myIssues = [] } = useQuery({
    queryKey: ['my-issues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues/${user?.email}`);
      return res.data;
    },
  });

  const filteredIssues = myIssues.filter((issue) =>
    selectedCategory === '' ? true : issue.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-4xl font-extrabold text-[#8b0000] mb-6">
          My Issues ({myIssues.length})
        </h2>

        {/* Category Filter */}
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Broken Streetlights">Broken Streetlights</option>
            <option value="Potholes">Potholes</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Damaged Footpaths">Damaged Footpaths</option>
          </select>
        </div>

        {/* Issues Grid */}
        {filteredIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-3xl font-bold text-gray-500">No Issues Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyIssuesPage;
