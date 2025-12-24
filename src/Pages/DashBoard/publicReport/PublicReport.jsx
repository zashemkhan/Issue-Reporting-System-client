import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { format } from "date-fns";
import { toast, ToastContainer } from "kitzo/react";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PublicReport = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Get user's issues count
  const { data: myIssues = [], isLoading } = useQuery({
    queryKey: ["my-issues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if(!user?.email) return [];
      const res = await axiosSecure.get(`/issues/my-issues/${user.email}`);
      return res.data || [];
    },
  });

  const handleForm = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_IMGBB}`;
      const imgRes = await axios.post(img_api_url, formData);
      const imageUrl = imgRes.data.data.url;

      const issueData = {
        title: data.title,
        category: data.category,
        description: data.description,
        location: data.location,
        image: imageUrl,
        date: format(new Date(), "MM/dd/yyyy, hh:mm a"),
      };

      await axiosSecure.post("/issues", issueData);

      toast.success("Issue submitted successfully!");
      queryClient.invalidateQueries(["my-issues", user.email]);
      reset();
      navigate("/dashboard/my-issues-page");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      await axiosSecure.patch(`/users/subscribe/${user.email}`);
      toast.success("Subscription successful!");
      navigate("/dashboard/my-profile");
    } catch {
      toast.error("Subscription failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {user?.isBlocked ? (
        <div className="flex min-h-screen items-center justify-center">
          <h4 className="text-2xl font-bold text-red-600">
            Your account has been blocked
          </h4>
        </div>
      ) : myIssues.length >= 3 && !user?.isSubscribed ? (
        <div className="mx-auto mt-20 max-w-lg rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-2xl font-bold text-[#8b0000]">Limit Reached</h3>
          <p className="mt-2 text-gray-600">Free users can submit only 3 issues.</p>
          <button
            onClick={handleSubscribe}
            className="mt-4 w-full rounded-lg bg-[#8b0000] py-2 text-white"
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
              <input type="file" {...register("photo", { required: true })} />
              {errors.photo && <p className="text-red-600">Photo required</p>}

              <input placeholder="Title" {...register("title", { required: true })} />
              {errors.title && <p className="text-red-600">Title required</p>}

              <select {...register("category", { required: true })}>
                <option value="">Select category</option>
                <option value="Potholes">Potholes</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Garbage Overflow">Garbage Overflow</option>
                <option value="Broken Streetlights">Broken Streetlights</option>
              </select>
              {errors.category && <p className="text-red-600">Category required</p>}

              <input placeholder="Location" {...register("location", { required: true })} />
              {errors.location && <p className="text-red-600">Location required</p>}

              <textarea rows={5} {...register("description", { required: true })} />
              {errors.description && <p className="text-red-600">Description required</p>}

              <button
                disabled={loading}
                className="w-full bg-[#8b0000] py-3 text-white"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicReport;
