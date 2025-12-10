import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h4 className='text-2xl font-bold'>Profile</h4>
      <div className='flex items-center gap-10 '>
 <div className='w-[200px] rounded-full'>
   <img className='w-[200px] rounded-full' src={user.photoURL} alt="" />
 </div>
  <div>
    
 {/* <p>{user.displayName}</p> */}
 <input type="text" className='border' />

 <p>{user.email}</p>
  </div>
      </div>
     
    
    </div>
  );
};

export default MyProfile;
