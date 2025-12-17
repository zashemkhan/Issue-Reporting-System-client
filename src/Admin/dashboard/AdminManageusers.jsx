
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminManageusers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: manageUser = [], refetch } = useQuery({
    queryKey: ['manage-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/manage-users');
      return res.data || [];
    },
  });

  const handleBlock = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be blocked and cannot log in!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, block user!',
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/users/block/${id}`);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire('Blocked!', 'User has been blocked.', 'success');
      }
    }
  };

  const handleUnblock = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be unblocked and can log in again!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, unblock user!',
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/users/unblock/${id}`);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire('Unblocked!', 'User has been unblocked.', 'success');
      }
    }
  };

  return (
    <div className="px-2 md:px-4">
      <h5 className="py-4 text-3xl font-bold text-slate-800">
        Manage Users ({manageUser.length})
      </h5>

 
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="table table-zebra">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {manageUser.map((u, i) => (
              <tr key={u._id}>
                <th>{i + 1}</th>

                <td>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-slate-200">
                      <img
                        className="h-full w-full object-cover"
                        src={u.photoURL}
                        alt={u.displayName}
                      />
                    </div>
                    <span className="font-medium">{u.displayName}</span>
                  </div>
                </td>

                <td className="text-slate-600">{u.email}</td>

                <td>
                  {u.isSubscribed ? (
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">
                      Premium
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                      Free
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBlock(u._id)}
                      disabled={u.isblock}
                      className="btn btn-sm bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
                    >
                      Block
                    </button>

                    <button
                      onClick={() => handleUnblock(u._id)}
                      className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                    >
                      Unblock
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageusers;
