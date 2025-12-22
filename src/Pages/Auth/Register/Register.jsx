import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'kitzo/react';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateProfileUser } = useAuth();

  const handleRegister = (data) => {
    if (isRegistering) return;
    setIsRegistering(true);

    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append('image', profileImg);
        const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOST_IMGBB}`;

        axios.post(img_api_url, formData).then((res) => {
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateProfileUser(userProfile)
            .then(() => setIsRegistering(false))
            .catch(() => setIsRegistering(false));
        });
      })
      .catch(() => {
        toast.error('Already have an account');
        setIsRegistering(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-center text-3xl font-bold text-[#8b0000] mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name', { required: true })}
              className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-[#8b0000] transition ${
                errors.name ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">Name is required</p>}
          </div>

          {/* Photo */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Photo</label>
            <input
              type="file"
              {...register('photo', { required: true })}
              className={`file-input w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-[#8b0000] transition ${
                errors.photo ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.photo && <p className="text-red-600 text-sm mt-1">Photo is required</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
              className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-[#8b0000] transition ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">Email is required</p>}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: true, minLength: 6 })}
              className={`rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-[#8b0000] transition ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </span>
            {errors.password?.type === 'required' && (
              <p className="text-red-600 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-600 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#8b0000] text-white rounded-xl font-semibold shadow-md hover:bg-[#b22222] transition mt-4"
          >
            {isRegistering ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <p className="text-center text-gray-700">
            Already have an account?{' '}
            <NavLink
              state={location.state}
              to="/login"
              className="text-[#8b0000] hover:text-[#b22222] font-medium transition"
            >
              Login
            </NavLink>
          </p>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
