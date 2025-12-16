import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useAuth from '../../../Hooks/useAuth';

const ViewDetail = () => {
  const { user } = useAuth();
  const [openmodal, setOpenmodal] = useState();
  const [currentEditId, setCurrentEditId] = useState(null);
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    image,
    title,
    category,
    location,
    priority,
    upvotes,
    description,
    date,
    _id,
    status,
    createdBy,
  } = data;

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/issues/${id}`).then((res) => {
          if (res.data.deletedCount) {
            navigate('/allissues');
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  const handleEdit = (id) => {
    setCurrentEditId(id);
    setOpenmodal(true);
  };

  const handleForms = async (formData) => {
    const issueData = {
      ...formData,
      date: format(new Date(), 'MM/dd/yyyy, hh:mm a'),
    };
    axiosSecure.patch(`/issues/${currentEditId}`, issueData).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire('Updated!', 'Issue updated successfully', 'success');
        setOpenmodal(false);
        navigate('/allissues');
      }
    });
  };

  return (
    <div className="px-2 pt-8 pb-16 md:px-3">
      <div className="mx-auto my-5 max-w-[1400px] bg-white">
        {/* Image */}
        <div className="mb-8 h-[350px] w-full overflow-hidden rounded-2xl shadow-md">
          <img
            className="h-full w-full object-cover"
            src={image}
            alt={title}
          />
        </div>
        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900">{title}</h1>
        {/* Description */}
        <span className="mb-6 leading-7 text-gray-700">{description}</span>
        {/* Badges */}
        <div className="my-10 flex flex-wrap gap-3">
          <span className="rounded-full bg-blue-100 px-4 py-1 font-semibold text-blue-800 shadow-sm">
            Category: {category}
          </span>
          <span
            className={`rounded-full px-4 py-1 font-semibold shadow-sm ${
              priority === 'high'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            Priority: {priority}
          </span>
          <span
            className={`rounded-full px-4 py-1 font-semibold shadow-sm ${
              status === 'pending'
                ? 'bg-orange-200 text-orange-800'
                : 'bg-green-100 text-green-700'
            }`}
          >
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
        {createdBy === user.uid && (
          <div className="flex gap-3">
            {/* Boost Button */}
            {priority !== 'high' && (
              <Link
                to={`/payment/${_id}`}
                className="rounded-lg bg-[#25408f] px-6 py-3 font-semibold text-white shadow transition hover:bg-[#1b2f6b]"
              >
                Boost Issue
              </Link>
            )}
            {/* Update */}
            <button
              onClick={() => handleEdit(_id)}
              className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600"
            >
              Update
            </button>
            {/* Delete */}
            <button
              onClick={() => handleDelete(_id)}
              className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {openmodal && (
        <div
          onClick={() => setOpenmodal(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[520px] rounded-xl bg-white p-6 shadow-2xl"
          >
            <form
              onSubmit={handleSubmit(handleForms)}
              className="space-y-5"
            >
              {/* Title */}
              <div>
                <label className="font-semibold text-gray-600">Title</label>
                <input
                  defaultValue={title}
                  {...register('title', { required: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#25408f]"
                />
              </div>
              {/* Category */}
              <div>
                <label className="font-semibold text-gray-600">Category</label>
                <select
                  defaultValue={category}
                  {...register('category', { required: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#25408f]"
                >
                  <option value="">Select a category</option>
                  <option value="Broken Streetlights">
                    Broken Streetlights
                  </option>
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
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#25408f]"
                />
              </div>
              {/* Description */}
              <div>
                <label className="font-semibold text-gray-600">
                  Description
                </label>
                <textarea
                  rows={6}
                  defaultValue={description}
                  {...register('description', { required: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow outline-none focus:ring-2 focus:ring-[#25408f]"
                ></textarea>
              </div>
              <button className="w-full rounded-lg bg-[#25408f] py-3 font-semibold text-white shadow transition hover:bg-[#1b2f6b]">
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
