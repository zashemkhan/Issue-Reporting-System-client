import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import { format } from 'date-fns';
import { toast, ToastContainer } from 'kitzo/react';
import useAuth from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const PublicReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { data: myIssues = [], isLoading: isMyIssueLoading, refetch } = useQuery({
    queryKey: ['my-issues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues/${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleForm = async (data) => {
    if (loading) return;
    setLoading(true);

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
      boostPrice: 100,
      isAssigned: false,
    };

    axiosSecure.post('/issues', issueData).then(() => {
      toast.success('Issue submitted successfully!');
      queryClient.invalidateQueries(['my-issues', user?.email]);
      setLoading(false);
      reset();
      navigate('/dashboard/my-issues-page');
    });
  };

  const Subscribebutton = async () => {
    try {
      await axiosSecure.patch(`/users/subscribe/${user.email}`);
      toast.success('Subscription successful!');
      navigate('/dashboard/my-profile');
      refetch();
    } catch (error) {
      toast.error('Subscription failed');
    }
  };

  return (
    <>
      <ToastContainer />
      {user.isblock ? (
        <div className="flex min-h-screen items-center justify-center">
          <h4 className="text-2xl font-bold text-red-600">
            Your account has been blocked
          </h4>
        </div>
      ) : isMyIssueLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : myIssues.length >= 3 && !user.isSubscribed ? (
        <div className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold text-[#8b0000]">Limit Reached</h3>
          <p className="text-gray-600">
            You have reached your issue submission limit. To continue submitting new
            issues, you need to become a paid member.
          </p>
          <button
            className="w-full rounded-lg bg-[#8b0000] py-2 font-semibold text-white shadow-md transition hover:bg-[#b22222]"
            onClick={Subscribebutton}
          >
            Subscribe Now
          </button>
        </div>
      ) : (
        <div className="px-4 py-12">
          <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-[#8b0000]">
              Public Reporting System
            </h1>

            <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
              {/* Photo */}
              <div>
                <label className="font-semibold text-gray-600">Photo</label>
                <input
                  type="file"
                  {...register('photo', { required: true })}
                  className="file-input mt-1 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
                />
                {errors.photo && (
                  <p className="mt-1 text-sm text-red-600">Photo is required</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="font-semibold text-gray-600">Title</label>
                <input
                  type="text"
                  placeholder="Enter issue title"
                  {...register('title', { required: true })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">Title is required</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="font-semibold text-gray-600">Category</label>
                <select
                  {...register('category', { required: true })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
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
                <label className="font-semibold text-gray-600">Location</label>
                <input
                  type="text"
                  placeholder="Enter issue location"
                  {...register('location', { required: true })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">Location is required</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold text-gray-600">Description</label>
                <textarea
                  rows={6}
                  placeholder="Describe the issue..."
                  {...register('description', { required: true })}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#8b0000] focus:outline-none"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">Description is required</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#8b0000] py-3 font-semibold text-white shadow-md transition hover:bg-[#b22222]"
                disabled={loading || user.isBlocked}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicReport;
