import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'kitzo/react';

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [openmodal, setOpenmodal] = useState();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const {
    data: adminAllissues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['adminall-issues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data.result;
    },
  });

  console.log(adminAllissues)
  const { data: staffList = [] } = useQuery({
    queryKey: ['staffList'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/staff-list');
      return res.data;
    },
  });

  const hadleUpdateIssueStatus = async (id, status) => {
    await axiosSecure.patch(`/issues/update-issue-status`, {
      issueId: id,
      status,
    });
    refetch();
  };

  const handleAssign = async (issueId, staffEmail) => {

    await axiosSecure.post(`/admin/assign-issue`, {
      issueId,
      staffEmail,
    });
    setOpenmodal(false);
    toast.success('Staff assigned successfully');
    refetch();
  };

  return (
    <div className="">
      <h2 className="py-2 text-4xl font-bold max-sm:px-4">
        AllIssues: {adminAllissues.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th></th>
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
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.status}</td>
                <td>{issue.priority}</td>
       
                <td>
                  <button
                    onClick={() => {
                      if (issue.status === 'rejected') {
                        toast.error('Cannot assign staff to a rejected issue');
                        return;
                      }
                      setSelectedIssue(issue); // select this issue
                      setOpenmodal(true); // open modal
                    }}
                    className="btn"
                  >
                    Add staff
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => hadleUpdateIssueStatus(issue._id, 'pending')}
                    className="btn"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() =>
                      hadleUpdateIssueStatus(issue._id, 'rejected')
                    }
                    className="btn"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {openmodal && (
        <div
          onClick={() => setOpenmodal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/10"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="table-zebra table">
                <thead>
                  <tr>
                    <th>Serial</th>
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
                          className="btn"
                          onClick={() =>
                            handleAssign(selectedIssue._id, staff.email)
                          }
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
