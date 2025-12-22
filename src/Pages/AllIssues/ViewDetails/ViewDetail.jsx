import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const ViewDetail = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user/role');
      return res.data;
    },
  });
  const role = users.find(u => u.email === user?.email)?.role;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { image, title, category, location, priority, upvotes, description, date, _id, status, createdBy } = data;

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b0000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/issues/${id}`).then((res) => {
          if (res.data.deletedCount) {
            navigate('/allissues');
            Swal.fire('Deleted!', 'Issue has been deleted.', 'success');
          }
        });
      }
    });
  };

  const handleEdit = (id) => {
    setCurrentEditId(id);
    setOpenModal(true);
  };

  const handleForms = async (formData) => {
    const issueData = { ...formData, date: format(new Date(), 'MM/dd/yyyy, hh:mm a') };
    axiosSecure.patch(`/issues/${currentEditId}`, issueData).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire('Updated!', 'Issue updated successfully', 'success');
        setOpenModal(false);
        navigate('/allissues');
      }
    });
  };

  return (
    <div className="px-2 pt-8 pb-16 md:px-3 bg-gray-50 min-h-screen">
      <div className="mx-auto my-5 max-w-[1400px] bg-white rounded-2xl shadow-lg p-6">
        {/* Image */}
        <div className="mb-8 h-[350px] w-full overflow-hidden rounded-2xl shadow-md">
          <img className="h-full w-full object-cover" src={image} alt={title} />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-[#8b0000]">{title}</h1>

        {/* Description */}
        <p className="mb-6 leading-7 text-gray-700">{description}</p>

        {/* Badges */}
        <div className="my-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-blue-100 px-4 py-1 font-semibold text-blue-800 shadow-sm">
            Category: {category}
          </span>
          <span className={`rounded-full px-4 py-1 font-semibold shadow-sm ${
            priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            Priority: {priority}
          </span>
          <span className={`rounded-full px-4 py-1 font-semibold shadow-sm ${
            status === 'pending' ? 'bg-orange-200 text-orange-800' : 'bg-green-100 text-green-700'
          }`}>
            Status: {status}
          </span>
          <span className="rounded-full bg-yellow-100 px-4 py-1 font-semibold text-yellow-700 shadow-sm">
            Upvotes: {upvotes}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-1 font-semibold text-gray-700 shadow-sm">
            Location: {location}
          </span>
          <span className="rounded-full bg-gray-100 px-4 py-1 font-semibold text-gray-700 shadow-sm">
            Date: {date}
          </span>
        </div>

        {/* Action Buttons */}
        {(createdBy === user.uid || role === 'admin') && (
          <div className="flex flex-wrap gap-3">
            {priority !== 'high' && (
              <Link to={`/payment/${_id}`} className="rounded-xl bg-[#8b0000] px-6 py-3 font-semibold text-white shadow hover:bg-[#b22222] transition">
                Boost Issue
              </Link>
            )}
            {status === 'pending' && (
              <button onClick={() => handleEdit(_id)} className="rounded-xl bg-[#25408f] px-6 py-3 font-semibold text-white shadow hover:bg-[#1b2f6b] transition">
                Update
              </button>
            )}
            <button onClick={() => handleDelete(_id)} className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div onClick={() => setOpenModal(false)} className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[520px] rounded-2xl bg-white p-6 shadow-2xl">
            <form onSubmit={handleSubmit(handleForms)} className="space-y-5">
              {/* Title */}
              <div>
                <label className="font-semibold text-gray-600">Title</label>
                <input
                  defaultValue={title}
                  {...register('title', { required: true })}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#8b0000]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-semibold text-gray-600">Category</label>
                <select
                  defaultValue={category}
                  {...register('category', { required: true })}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#8b0000]"
                >
                  <option value="">Select a category</option>
                  <option value="Broken Streetlights">Broken Streetlights</option>
                  <option value="Potholes">Potholes</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Garbage Overflow">Garbage Overflow</option>
                  <option value="Damaged Footpaths">Damaged Footpaths</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="font-semibold text-gray-600">Location</label>
                <input
                  defaultValue={location}
                  {...register('location', { required: true })}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#8b0000]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-gray-600">Description</label>
                <textarea
                  rows={6}
                  defaultValue={description}
                  {...register('description', { required: true })}
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#8b0000]"
                ></textarea>
              </div>

              <button className="w-full rounded-xl bg-[#8b0000] py-3 font-semibold text-white shadow hover:bg-[#b22222] transition">
                Submit Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDetail;
