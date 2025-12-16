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
    const totalResolved = resolved.filter(
    (issue) => issue.status === 'resolved',
  )
  // console.log(totalResolved)
  // const Latest = totalResolved.splice(0 , 6)
  
  return (
    <div className='max-w-[1400px] mx-auto'>
      <h5 className='text-4xl font-bold text-center py-5'>Latest Resolved Issues</h5>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
          totalResolved.map(issue => (
            <IssueCard key={issue._id} issue={issue}></IssueCard>
          ))
        }
      </div>
   
    </div>
  );
};

export default ResolvedIssues;