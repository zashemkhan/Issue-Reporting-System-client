import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import IssueCard from '../../components/IssueCard';

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();

  const [totalIssues, setTotalIssues] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const limit = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: allIssues = [], isLoading, refetch } = useQuery({
    queryKey: ['issues', currentPage, selectedCategory, debouncedSearch],
    queryFn: async () => {
      const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
      const searchQuery = debouncedSearch ? `&search=${debouncedSearch}` : '';
      const res = await axiosSecure.get(
        `/issues?limit=${limit}&skip=${currentPage * limit}${categoryQuery}${searchQuery}`
      );
      if(res?.data){
        setTotalIssues(res.data.total || 0);
        setTotalPages(Math.ceil((res.data.total || 0) / limit));
        return res.data.data || [];
      }
      return [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-[1400px] px-4">
        <h2 className="text-4xl font-extrabold text-[#8b0000] mb-8">
          All Issues ({totalIssues})
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full sm:w-1/2 rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            className="w-full sm:w-1/4 rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="">All Categories</option>
            <option value="Broken Streetlights">Broken Streetlights</option>
            <option value="Potholes">Potholes</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Garbage Overflow">Garbage Overflow</option>
            <option value="Damaged Footpaths">Damaged Footpaths</option>
          </select>
        </div>

        {allIssues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-3xl font-bold text-gray-500">No Issues Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} refetch={refetch} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 rounded-xl bg-[#8b0000] text-white hover:bg-[#b22222] transition"
            >
              Prev
            </button>
          )}

          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-4 py-2 rounded-xl border ${
                i === currentPage ? 'bg-[#8b0000] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              } transition`}
            >
              {i + 1}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 rounded-xl bg-[#8b0000] text-white hover:bg-[#b22222] transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllIssues;
