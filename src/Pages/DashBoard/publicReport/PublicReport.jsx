import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'kitzo/react';


const PublicReport = () => {
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const   handleForm = async (data) => {
const uploadPhoto = data.photo[0];

 const formData = new FormData();
        formData.append('image', uploadPhoto);
        const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_IMGBB}`;


const imgResponse = await axios.post(img_api_url, formData);
const uploadedImageUrl = imgResponse.data.data.url;

          const issueData = {
      title: data.title,
      category: data.category,
      description:data.description,
      location: data.location,
      priority: 'normal',
      status: 'Pending',
      image: uploadedImageUrl,  
      upvotes: 0,
     date:  format(new Date(), 'MM/dd/yyyy, hh:mm a')
    };

     axiosSecure.post("/issues", issueData)
     .then(res => {
      // console.log(res.data)
      toast.success('Issue submitted successfully!')
     })
    
}

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-10">
    
    <h1 className="text-3xl font-bold text-center mb-6 text-[#25408f]">
      Public Reporting System
    </h1>

    <form onSubmit={handleSubmit(handleForm)} className="space-y-5">

      {/* Photo */}
      <div>
        <label className="font-semibold text-gray-500">Photo</label>
        <input
          type="file"
          {...register("photo", { required: true })}
          className="mt-1 file-input w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#25408f] focus:outline-none "
        />
        {errors.photo && (
          <p className="text-sm text-red-600 mt-1">Photo is required</p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="font-semibold text-gray-500">Title</label>
        <input
          type="text"
          placeholder="Enter issue title"
          {...register("title", { required: true })}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">Title is required</p>
        )}
      </div>

      {/* Category */}
  <div>
  <label className="font-semibold text-gray-500">Category</label>

  <select
    {...register("category", { required: true })}
    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
  >
    <option value="">Select a category</option>
    <option value="Broken Streetlights">Broken Streetlights</option>
    <option value="Potholes">Potholes</option>
    <option value="Water Leakage">Water Leakage</option>
    <option value="Garbage Overflow">Garbage Overflow</option>
    <option value="Damaged Footpaths">Damaged Footpaths</option>
  </select>

  {errors.category && (
    <p className="text-sm text-red-600 mt-1">Category is required</p>
  )}
</div>


      {/* Location */}
      <div>
        <label className="font-semibold text-gray-500">Location</label>
        <input
          type="text"
          placeholder="Enter issue location"
          {...register("location", { required: true })}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
        />
        {errors.location && (
          <p className="text-sm text-red-600 mt-1">Location is required</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="font-semibold text-gray-500">Description</label>
        <textarea
          rows={6}
          placeholder="Describe the issue..."
          {...register("description", { required: true })}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#25408f] focus:outline-none"
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">Description is required</p>
        )}
      </div>

      {/* Submit Button */}
      <button className="w-full py-3 rounded-lg bg-[#25408f] text-white font-semibold hover:bg-[#1b2f6b] transition">
        Submit Report
      </button>
    </form>
  </div>
</div>

  );
};

export default PublicReport;
