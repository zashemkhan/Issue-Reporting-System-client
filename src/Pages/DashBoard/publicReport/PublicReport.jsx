import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'kitzo/react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';

const PublicReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(user?.email)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // let freeUser = 3;
  const handleForm = async (data) => {
    // if(user === freeUser) return

    const uploadPhoto = data.photo[0];

    const formData = new FormData();
    formData.append('image', uploadPhoto);
    const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_IMGBB}`;

    const imgResponse = await axios.post(img_api_url, formData);
    const uploadedImageUrl = imgResponse.data.data.url;

    const issueData = {
      title: data.title,
      category: data.category,
      description: data.description,
      location: data.location,
      priority: 'normal',
      status: 'pending',
      image: uploadedImageUrl,
      upvotes: 0,
      date: format(new Date(), 'MM/dd/yyyy, hh:mm a'),
      createdBy: user.uid,
      upvotedBy: [],
    };

    axiosSecure.post('/issues', issueData).then((res) => {
      toast.success('Issue submitted successfully!');
      navigate('/dashboard/my-issues-page');
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#25408f]">
          Public Reporting System
        </h1>

        <form
          onSubmit={handleSubmit(handleForm)}
          className="space-y-5"
        >
          {/* Photo */}
          <div>
            <label className="font-semibold text-gray-500">Photo</label>
            <input
              type="file"
              {...register('photo', { required: true })}
              className="file-input mt-1 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
            />
            {errors.photo && (
              <p className="mt-1 text-sm text-red-600">Photo is required</p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold text-gray-500">Title</label>
            <input
              type="text"
              placeholder="Enter issue title"
              {...register('title', { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">Title is required</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold text-gray-500">Category</label>

            <select
              {...register('category', { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="Broken Streetlights">Broken Streetlights</option>
              <option value="Potholes">Potholes</option>
              <option value="Water Leakage">Water Leakage</option>
              <option value="Garbage Overflow">Garbage Overflow</option>
              <option value="Damaged Footpaths">Damaged Footpaths</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-600">Category is required</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold text-gray-500">Location</label>
            <input
              type="text"
              placeholder="Enter issue location"
              {...register('location', { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">Location is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-500">Description</label>
            <textarea
              rows={6}
              placeholder="Describe the issue..."
              {...register('description', { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                Description is required
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button className="w-full rounded-lg bg-[#25408f] py-3 font-semibold text-white transition hover:bg-[#1b2f6b]">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublicReport;
