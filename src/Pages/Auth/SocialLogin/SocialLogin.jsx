import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'kitzo/react';

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    signInGoogle()
      .then(() => {
        toast.success('Login successful!');
        navigate(location?.state || '/');
      })
      .catch((error) => {
        toast.error('Login failed!');
        console.log(error);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-2 text-black transition hover:shadow-md"
      >
        <svg
          className="h-5 w-5"
          aria-label="Google logo"
          viewBox="0 0 512 512"
        >
          <g>
            <path
              d="m0 0H512V512H0"
              fill="#fff"
            ></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
