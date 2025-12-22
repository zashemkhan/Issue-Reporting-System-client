import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'kitzo/react';

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isUpdating, setIsUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (data) => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const uploadPhoto = data.photo[0];
      const formData = new FormData();
      formData.append('image', uploadPhoto);
      const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_IMGBB}`;

      const imgResponse = await axios.post(img_api_url, formData);
      const uploadedImageUrl = imgResponse.data.data.url;

      const response = await axiosSecure.post('/user/update-profile', {
        displayName: data.name,
        photoURL: uploadedImageUrl,
      });

      setUser(response.data);
      toast.success('Profile successfully updated');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-2xl bg-white p-8 shadow-md md:flex-row md:p-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <img
            className="h-40 w-40 rounded-full border border-[#8b0000] object-cover"
            src={user.photoURL}
            alt="Profile"
          />
          <h2 className="text-2xl font-bold text-[#8b0000]">{user.displayName}</h2>
          <p className="font-medium text-gray-500">{user.email}</p>
        </div>

        {/* Update Form */}
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-1 flex-col gap-6"
        >
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Name"
              defaultValue={user.displayName}
              {...register('name', { required: true })}
              className={`rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[#8b0000]`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Photo Field */}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-600">Photo</label>
            <input
              type="file"
              {...register('photo', { required: true })}
              className="file-input w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#8b0000]"
            />
            {errors.photo && (
              <p className="text-red-600 text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Update Button */}
          {!user.isblock && (
            <button
              type="submit"
              className="w-fit rounded-lg bg-[#8b0000] px-6 py-2 font-semibold text-white shadow-md transition hover:bg-[#b22222]"
            >
              {isUpdating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                'Update'
              )}
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default MyProfile;
