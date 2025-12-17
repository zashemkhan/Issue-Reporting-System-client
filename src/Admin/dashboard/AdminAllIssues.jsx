
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'kitzo/react';

const statusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'in-progress':
      return 'bg-blue-100 text-blue-700';
    case 'resolved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const priorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
 
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [openmodal, setOpenmodal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const {
    data: adminAllissues = [],
    refetch,
  } = useQuery({
    queryKey: ['adminall-issues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data.result || [];
    },
  });

  const { data: staffList = [] } = useQuery({
    queryKey: ['staffList'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/staff-list');
      return res.data || [];
    },
  });

  const hadleUpdateIssueStatus = async (id, status) => {
    await axiosSecure.patch(`/issues/update-issue-status`, {
      issueId: id,
      status,
    });
    toast.success(`Issue marked as ${status}`);
    refetch();
  };

  const handleAssign = async (issueId, staffEmail) => {
    if (isAssigning) return;
    setIsAssigning(true);

    await axiosSecure.post(`/admin/assign-issue`, {
      issueId,
      staffEmail,
    });

    toast.success('Staff assigned successfully');
    setOpenmodal(false);
    setIsAssigning(false);
    refetch();
  };

  return (
    <div className="px-2 md:px-4">
      <h2 className="py-4 text-3xl font-bold text-slate-800">
        All Issues ({adminAllissues.length})
      </h2>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="table table-zebra">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned Staff</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {adminAllissues.map((issue, i) => (
              <tr key={issue._id}>
                <th>{i + 1}</th>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.category}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor(
                      issue.status
                    )}`}
                  >
                    {issue.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor(
                      issue.priority
                    )}`}
                  >
                    {issue.priority}
                  </span>
                </td>

                <td>
                  <button
                    disabled={issue.isAssigned}
                    onClick={() => {
                      if (issue.status === 'rejected') {
                        toast.error(
                          'Cannot assign staff to a rejected issue'
                        );
                        return;
                      }
                      setSelectedIssue(issue);
                      setOpenmodal(true);
                    }}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    {issue.isAssigned ? 'Assigned' : 'Add Staff'}
                  </button>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      hadleUpdateIssueStatus(issue._id, 'pending')
                    }
                    className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() =>
                      hadleUpdateIssueStatus(issue._id, 'rejected')
                    }
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MODAL ===== */}
      {openmodal && (
        <div
          onClick={() => setOpenmodal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-2xl"
          >
            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Assign Staff
            </h3>

            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-slate-100">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {staffList.map((staff, i) => (
                    <tr key={staff._id}>
                      <th>{i + 1}</th>
                      <td>{staff.displayName}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleAssign(
                              selectedIssue._id,
                              staff.email
                            )
                          }
                          disabled={isAssigning}
                          className="btn btn-sm bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllIssues;
