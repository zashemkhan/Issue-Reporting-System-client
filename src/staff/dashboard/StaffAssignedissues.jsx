import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'kitzo/react';

const StaffAssignedissues = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: assignedIssues = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['staff-assigned-issues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/staff/assigned-issues');
      return res.data;
    },
  });

  const updateIssueStatus = async (issueId, status) => {
    await axiosSecure.patch('/staff/update-issue-status', {
      issueId,
      status,
    });
    refetch();
    toast.success(`Issue status updated to '${status}'`);
  };

  return (
    <div className="p-2">
      <h5 className="text-4xl font-bold">
        {' '}
        Assigned issues : ({assignedIssues.length})
      </h5>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading issues.</p>}
      {!isLoading && assignedIssues.length === 0 && (
        <p>No assigned issues found.</p>
      )}
      {!isLoading && assignedIssues.length > 0 && (
        <div className="overflow-x-auto  rounded-xl bg-white shadow-sm mt-4">
          <table className="table-zebra table w-full min-w-[800px]">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th>Issue Title</th>
                <th>Status</th>
                <th>
                  <div className="flex justify-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* loop */}
              {assignedIssues.map((issue) => {
                const isInProgess = issue.status === 'in-progress';
                const isWorking = issue.status === 'working';
                const isResolved = issue.status === 'resolved';
                const isClosed = issue.status === 'closed';

                return (
                  <tr key={issue.issueId}>
                    <td>{issue.title}</td>
                    <td>{issue.status}</td>
                    <td>
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => {
                            if (isInProgess) {
                              toast.error("Status already is 'In-progress'");
                              return;
                            }
                            updateIssueStatus(issue.issueId, 'in-progress');
                          }}
                          className={`btn px-3 py-1 text-start hover:bg-neutral-200 ${isInProgess ? 'opacity-30' : 'opacity-100'}`}
                        >
                          In-progess
                        </button>
                        <button
                          onClick={() => {
                            if (isWorking) {
                              toast.error("Status already is 'Working'");
                              return;
                            }
                            updateIssueStatus(issue.issueId, 'working');
                          }}
                          className={`btn px-3 py-1 text-start hover:bg-neutral-200 ${isWorking ? 'opacity-30' : 'opacity-100'}`}
                        >
                          Working
                        </button>
                        <button
                          onClick={() => {
                            if (isResolved) {
                              toast.error("Status already is 'Resolved'");
                              return;
                            }
                            updateIssueStatus(issue.issueId, 'resolved');
                          }}
                          className={`btn px-3 py-1 text-start hover:bg-neutral-200 ${isResolved ? 'opacity-30' : 'opacity-100'}`}
                        >
                          Resolved
                        </button>
                        <button
                          onClick={() => {
                            if (isClosed) {
                              toast.error("Status already is 'Closed'");
                              return;
                            }
                            updateIssueStatus(issue.issueId, 'closed');
                          }}
                          className={`btn px-3 py-1 text-start hover:bg-neutral-200 ${isClosed ? 'opacity-30' : 'opacity-100'}`}
                        >
                          Closed
                        </button>
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



