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
      toast.success('Profile successfully upated');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" mt-20 flex max-w-4xl flex-col gap-10 rounded-xl bg-white p-8  md:flex-row md:p-10">
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 md:items-start">
        <img
          className="h-40 w-40 rounded-full border border-[#c9c9c9] object-cover"
          src={user.photoURL}
          alt="Profile"
        />
        <h5 className="text-2xl font-bold text-gray-800">{user.displayName}</h5>
        <p className="font-medium text-gray-500">{user.email}</p>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-400">Name</label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={user.displayName}
            {...register('name', { required: true })}
            className="rounded-md border border-[#c9c9c9] px-2 py-2 transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
          />
        </div>

        {/* Photo Field */}
        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-400">Photo</label>
          <input
            type="file"
            {...register('photo', { required: true })}
            className="file-input w-full rounded-md border border-[#c9c9c9] transition focus:border-[#c9c9c9] focus:ring-2 focus:ring-[#c9c9c9] focus:outline-none"
          />
        </div>

        {/* Update Button */}
        {/* <button
          type="submit"
          className="btn flex w-fit items-center justify-center gap-2 rounded-md bg-[#25408f] px-6 py-2 font-semibold text-white"
        >
          {isUpdating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>Update</span>
          )}
        </button> */}

        {!user.isblock && (
          <button
            type="submit"
            className="btn flex w-fit items-center justify-center gap-2 rounded-md bg-[#25408f] px-6 py-2 font-semibold text-white"
          >
            {isUpdating ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span>Update</span>
            )}
          </button>
        )}
      </form>
    </div>
  );
};

export default MyProfile;
