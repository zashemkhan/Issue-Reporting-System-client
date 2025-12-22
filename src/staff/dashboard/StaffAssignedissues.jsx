import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'kitzo/react';

const StaffAssignedissues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: assignedIssues = [], isLoading, error, refetch } = useQuery({
    queryKey: ['staff-assigned-issues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/staff/assigned-issues');
      return res.data;
    },
  });

  const updateIssueStatus = async (issueId, status) => {
    try {
      await axiosSecure.patch('/staff/update-issue-status', { issueId, status });
      refetch();
      toast.success(`Issue status updated to '${status}'`);
    } catch (err) {
      toast.error('Failed to update status');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Assigned Issues ({assignedIssues.length})
      </h2>

      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}

      {error && (
        <p className="text-red-600 font-medium">Error loading assigned issues.</p>
      )}

      {!isLoading && assignedIssues.length === 0 && (
        <p className="text-gray-500 font-medium">No assigned issues found.</p>
      )}

      {!isLoading && assignedIssues.length > 0 && (
        <div className="overflow-x-auto rounded-xl bg-white shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Issue Title</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedIssues.map(issue => {
                const statuses = ['in-progress', 'working', 'resolved', 'closed'];
                return (
                  <tr
                    key={issue.issueId}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">{issue.title}</td>
                    <td className="px-4 py-3 capitalize font-medium">{issue.status}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-center gap-2">
                        {statuses.map(status => (
                          <button
                            key={status}
                            onClick={() => {
                              if (issue.status === status) {
                                toast.error(`Status already is '${status}'`);
                                return;
                              }
                              updateIssueStatus(issue.issueId, status);
                            }}
                            className={`px-3 py-1 rounded-md border text-sm font-medium capitalize transition 
                              ${
                                issue.status === status
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            disabled={issue.status === status}
                          >
                            {status.replace('-', ' ')}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffAssignedissues;
