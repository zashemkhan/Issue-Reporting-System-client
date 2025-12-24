import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import IssueCard from "../../../components/IssueCard";

const MyIssuesPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: myIssues = [], isLoading, refetch } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/issues/my-issues/${user.email}`);
      return res.data || [];
    },
  });

  const filteredIssues = myIssues.filter(issue =>
    selectedCategory ? issue.category === selectedCategory : true
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-6 text-4xl font-bold text-[#8b0000]">
          My Issues ({myIssues.length})
        </h2>

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mb-6 rounded border px-4 py-2"
          value={selectedCategory}
        >
          <option value="">All</option>
          <option value="Potholes">Potholes</option>
          <option value="Water Leakage">Water Leakage</option>
          <option value="Garbage Overflow">Garbage Overflow</option>
          <option value="Broken Streetlights">Broken Streetlights</option>
        </select>

        {filteredIssues.length === 0 ? (
          <p className="text-xl text-gray-500">No issues found</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} refetch={refetch} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyIssuesPage;
