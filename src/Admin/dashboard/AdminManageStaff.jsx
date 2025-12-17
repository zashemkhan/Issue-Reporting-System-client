import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import imageUpload from '../../helpers/imageUpload';
import { toast } from 'kitzo/react';
import SubmitButton from '../../components/SubmitButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'motion/react';
import Modal from './../../components/Modal';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminManageStaff = () => {
  const [isOpenmodal, setIsModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(null);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isCreating, setIsCreating] = useState(false);

  // create staff profile
  async function createStaff(data) {
    if (isCreating) return;
    setIsCreating(true);
    // photo url
    const uploadedImageUrl = await imageUpload(data.photo);

    const staffData = {
      name: data.name,
      email: data.email,
      password: data.password,
      number: data.number,
      photoURL: uploadedImageUrl,
    };

    // backend request
    try {
      await axiosSecure.post('/admin/create-new-staff', staffData);
      toast.success('New staff profile created');
      reset();
      setIsModal(false);
      queryClient.invalidateQueries({
        queryKey: ['staff-list'],
      });
    } catch (err) {
      console.error(err);
      toast.error('Error while creating staff profile');
    } finally {
      setIsCreating(false);
    }
  }

  const {
    data: staffList = [],
    isLoading: staffListLoading,
    refetch,
  } = useQuery({
    queryKey: ['staff-list'],
    queryFn: async () => {
      const response = await axiosSecure.get('/admin/staff-list');
      return response.data;
    },
  });

  const [isUpdatingStaff, setIsUpdatingStaff] = useState(false);

  async function updatestaff(data) {
    if (isUpdatingStaff) return;
    setIsUpdatingStaff(true);

    try {
      const updatedPhotoURL = await imageUpload(data.staffphoto);
      await axiosSecure.patch('/admin/update-staff-profile', {
        email: updateModal.email,
        displayName: data.staffname,
        photoURL: updatedPhotoURL,
        number: data.staffphone,
      });
      toast.success('Staff profile updated');
      setUpdateModal(null);
      queryClient.invalidateQueries({ queryKey: ['staff-list'] });
    } catch (err) {
      console.error(err);
      toast.success('Error while updating staff profile');
    } finally {
      setIsUpdatingStaff(false);
    }
  }

  function handleDelete(id) {
    // console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/staff/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  }
  return (
    <div className="p-3">
      <button
        onClick={() => setIsModal(true)}
        className="btn"
      >
        Create Staff
      </button>

      <div>
        {staffListLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="mt-4 overflow-x-auto rounded-md">
              <table className="table-zebra table">
                {/* head */}
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th>#</th>
                    <th>Staff</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((s, i) => (
                    <tr key={s._id}>
                      <th>{i + 1}</th>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="size-5 overflow-hidden rounded-full">
                            <img
                              className="size-full object-cover object-center"
                              src={s.photoURL}
                              alt={`${s.displayName} profile image`}
                            />
                          </div>
                          <h4 className="text-nowrap">{s.displayName}</h4>
                        </div>
                      </td>
                      <td>{s.email}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {/* Update Button */}
                          <button
                            onClick={() => setUpdateModal(s)}
                            className="rounded-md bg-teal-600 px-4 py-2 text-white shadow transition-shadow hover:bg-teal-700"
                          >
                            Update
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="rounded-md bg-red-600 px-4 py-2 text-white shadow transition-shadow hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpenmodal && (
          <Modal
            closeModal={() => setIsModal(false)}
            className="w-full max-w-[500px] rounded-xl bg-white p-6 shadow-md"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsModal(false)}
                className="grid size-6 place-items-center rounded-full bg-white font-bold shadow"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(createStaff)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col">
                <label className="font-semibold text-[#c9c9c9]">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: true })}
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                />
                {errors.name?.type === 'required' && (
                  <p className="text-sm text-red-600">Name is required</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-[#c9c9c9]">Photo</label>
                <input
                  type="file"
                  {...register('photo', { required: true })}
                  className="file-input w-full rounded-md border border-[#c9c9c9] transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                />
                {errors.photo?.type === 'required' && (
                  <p className="text-sm text-red-600">photo is required</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold text-[#c9c9c9]">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Email"
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                />
                {errors.email?.type === 'required' && (
                  <p className="text-sm text-red-600">Email is required</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-[#c9c9c9]">Number</label>
                <input
                  type="number"
                  {...register('number', { required: true })}
                  placeholder="Number"
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                />
                {errors.email?.type === 'required' && (
                  <p className="text-sm text-red-600">number is required</p>
                )}
              </div>
              <div className="relative flex flex-col">
                <label className="font-semibold text-[#c9c9c9]">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                />

                {errors.email?.type === 'required' && (
                  <p className="text-sm text-red-600">password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-sm text-red-600">
                    password must be 6 characters or longer
                  </p>
                )}
              </div>

              <div>
                <SubmitButton
                  isSubmitting={isCreating}
                  text="Create staff"
                />
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {updateModal && (
          <Modal
            closeModal={() => {
              setUpdateModal(null);
              reset();
            }}
            className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-md"
          >
            <div className="mx-auto size-25 overflow-hidden rounded-full">
              <img
                className="size-full object-cover object-center"
                src={updateModal.photoURL}
                alt={`${updateModal.displayName} profile image`}
              />
            </div>
            <form onSubmit={handleSubmit(updatestaff)}>
              <div className="grid gap-2">
                <label
                  htmlFor="staff-email"
                  className="w-fit pl-1"
                >
                  Staff email
                </label>
                <input
                  id="staff-email"
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                  type="text"
                  readOnly
                  placeholder="Staff email"
                  defaultValue={updateModal.email}
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="staff-name"
                  className="w-fit pl-1"
                >
                  Staff name
                </label>
                <input
                  id="staff-name"
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                  type="text"
                  placeholder="Staff name"
                  defaultValue={updateModal.displayName}
                  {...register('staffname', {
                    required: true,
                  })}
                />
              </div>

              <div className="grid gap-1">
                <label
                  htmlFor="staff-image"
                  className="w-fit pl-1"
                >
                  Staff image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input w-full min-w-0"
                  {...register('staffphoto', {
                    required: true,
                  })}
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="staff-phone"
                  className="w-fit pl-1"
                >
                  Staff phone
                </label>
                <input
                  id="staff-phone"
                  className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
                  type="number"
                  placeholder="Staff phone"
                  defaultValue={updateModal.number}
                  {...register('staffphone', {
                    required: true,
                  })}
                />
              </div>

              <div className="mt-4">
                <SubmitButton
                  isSubmitting={isUpdatingStaff}
                  text={'Update'}
                />
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminManageStaff;
