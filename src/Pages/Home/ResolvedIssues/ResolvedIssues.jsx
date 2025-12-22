import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import IssueCard from '../../../components/IssueCard';

const ResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { data: resolved = [] } = useQuery({
    queryKey: ['resolved'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data?.result;
    },
  });

  const totalResolved = resolved.filter((issue) => issue.status === 'resolved');

  return (
    <section className="bg-gradient-to-b from-[#f9f9f9] to-[#ffffff] py-16">
      <div className="mx-auto max-w-[1400px] px-4">
        <h5 className="text-center text-3xl font-extrabold text-gray-800 mb-10 md:text-4xl">
          Latest Resolved Issues
        </h5>

        {totalResolved.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {totalResolved.slice(0, 6).map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl font-medium mt-10">
            No Resolved Issues Found
          </p>
        )}

        {totalResolved.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button className="rounded-lg bg-[#25408f] px-6 py-3 text-white font-semibold shadow-md transition hover:bg-[#3b5ac1]">
              View All Resolved Issues
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResolvedIssues;
