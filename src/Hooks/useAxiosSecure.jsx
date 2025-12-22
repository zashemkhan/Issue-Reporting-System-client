import axios from 'axios';
import { auth } from '../Firebase/FireBase.init';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosSecure.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
