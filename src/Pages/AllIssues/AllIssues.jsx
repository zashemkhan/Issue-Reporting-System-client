import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../components/IssueCard';

const AllIssues = () => {
  const [searchText, setSearchText] = useState('');
  const [Iscategory, setIscategory] = useState('');
  const axiosSecure = useAxiosSecure();

  

  const [totalissues , settoalIssues] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [currentPage, setCurrentpage] = useState(0)
  const limit = 5;

const { data: allissues = [], isLoading, refetch } = useQuery({
  queryKey: ['issues',  currentPage], 
  queryFn: async () => {
    const res = await axiosSecure.get(`/issues?limit=${limit}&skip=${currentPage * limit}`);
        settoalIssues(res.data.total);
        const page = Math.ceil(res.data.total / limit)
      
       setTotalpage(page)
    return res.data.result; 
  },
});


  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-[1400px]">
      <h2 className="py-2 text-4xl font-bold max-sm:px-4">
        AllIssues: ({totalissues})
      </h2>

      <div className="flex justify-between gap-10 max-sm:px-4">
        <div className="w-full max-w-[500px]">
          <input
            type="text"
            placeholder="Search issues..."
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <select
          className="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          onChange={(e) => setIscategory(e.target.value)}
        >
          <option value="">All Category</option>
          <option value="Broken Streetlights">Broken Streetlights</option>
          <option value="Potholes">Potholes</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage Overflow">Garbage Overflow</option>
          <option value="Damaged Footpaths">Damaged Footpaths</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 lg:grid-cols-3">
        {allissues.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-6 text-4xl font-bold text-gray-700"> Not Found</p>
          </div>
        ) : (
          allissues.map((issue) => (
            <IssueCard 
            
              key={issue._id}
              issue={issue}
              refetch={refetch}
            ></IssueCard>
          ))
        )}
      </div>

      <div className='flex justify-center gap-3 flex-wrap py-10'>
        {
          currentPage > 0 &&   <button onClick={() => setCurrentpage(currentPage - 1)} className='btn'>prev</button>
        }
      
       {
         [...Array(totalpage).keys()].map((i) => (
          <button onClick={() => setCurrentpage(i)} className={`btn ${i === currentPage && 'bg-[#25408f] text-white'}`}
          >{i + 1}</button>
         ))
       }
       {
         currentPage < totalpage - 1 &&   <button onClick={() => setCurrentpage(currentPage + 1)}  className='btn'>next</button>
       }
         
      </div>
    </div>
  );
};

export default AllIssues;
