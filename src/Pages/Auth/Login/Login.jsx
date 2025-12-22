import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'kitzo/react';
import SocialLogin from '../SocialLogin/SocialLogin';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../Firebase/FireBase.init';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const Login = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { loginUser } = useAuth();

  const handleLogin = (data) => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    loginUser(data.email, data.password)
      .then(() => setIsLoggingIn(false))
      .catch(() => {
        toast.error('Invalid email or password');
        setIsLoggingIn(false);
      });
  };

  const handleForgotPassword = () => {
    const email = getValues('email');
    if (!email) return toast.error('Please enter your email!');
    sendPasswordResetEmail(auth, email)
      .then(() => toast.success('Check your email for reset link!'))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#8b0000]">
          Welcome Back
        </h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-6"
        >
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
              className={`rounded-xl border px-4 py-2 transition outline-none focus:ring-2 focus:ring-[#8b0000] ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: true, minLength: 6 })}
              className={`rounded-xl border px-4 py-2 transition outline-none focus:ring-2 focus:ring-[#8b0000] ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10.5 right-4 cursor-pointer text-gray-500"
            >
              {showPassword ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </span>
            {errors.password?.type === 'required' && (
              <p className="mt-1 text-sm text-red-600">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="mt-1 text-sm text-red-600">
                Password must be at least 6 characters
              </p>
            )}
            <p
              onClick={handleForgotPassword}
              className="mt-2 cursor-pointer text-right text-[#8b0000] transition hover:text-[#b22222]"
            >
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#8b0000] py-3 font-semibold text-white shadow-md transition hover:bg-[#b22222]"
          >
            {isLoggingIn ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <p className="text-center text-gray-700">
            Don't have an account?{' '}
            <NavLink
              state={location.state}
              to="/register"
              className="font-medium text-[#8b0000] transition hover:text-[#b22222]"
            >
              Register
            </NavLink>
          </p>

          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-400">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
