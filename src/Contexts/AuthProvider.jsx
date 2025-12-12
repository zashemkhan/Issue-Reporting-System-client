import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/FireBase.init';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCreating, setUserCreating] = useState(false);

  // const server = useAxiosSecure();
  const axiosSecure = useAxiosSecure()

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with email & pass
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login in with google
  const signInGoogle = async () => {
    setUserCreating(true);
    await signInWithPopup(auth, googleProvider);

    const user = auth.currentUser;

    try {
      const { data } = await axiosSecure.post('/user/social-login', {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      // console.log(data);
      setUser(data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setUserCreating(false);
    }
  };

  // update user
  const updateProfileUser = async (profile) => {
    setUserCreating(true);
    await updateProfile(auth.currentUser, profile);

    const { data } = await axiosSecure.post('/user/create', {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    });
    setUserCreating(false);

    return data;
  };

  // observe user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (userCreating) return;

      if (currentUser) {
        const { data } = await axiosSecure.get('/user/user-profile');
        setUser(data);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userCreating]);

  const authInfo = {
    registerUser,
    loginUser,
    updateProfileUser,
    signInGoogle,
    user,
    setUser,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
