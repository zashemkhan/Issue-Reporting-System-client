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
    <div className="px-2 md:px-3">
      <div className="mx-auto max-w-[1400px]">
        <h5 className="py-5 text-center text-4xl font-bold">
          Latest Resolved Issues
        </h5>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {totalResolved.slice(0, 6).map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
            ></IssueCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResolvedIssues;
