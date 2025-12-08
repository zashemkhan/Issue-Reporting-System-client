import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ViewDetail = () => {
  const data = useLoaderData()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
 

  // console.log(data)
  const {image, title, category, location,priority,upvotes, 
description, date, _id} = data

const handleDelete = (id) => {
  // console.log(id)
  
  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
axiosSecure.delete(`/issues/${id}`)
.then(res => {
  // console.log(res.data)
  if(res.data.deletedCount){
  navigate('/allissues')
 Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
})
   
  }
});
 
}

  return (



  <div className="max-w-[1200px] mx-auto bg-white rounded-2xl shadow-xl my-20 p-8 ">
  <div className="flex flex-col md:flex-row gap-10">

    {/* Image Section */}
    <div className="flex-1">
      <img
        className="w-full h-80 md:h-full object-cover rounded-2xl shadow-md"
        src={image}
        alt={title}
      />
    </div>

    {/* Details Section */}
    <div className="flex-1 flex flex-col">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{title}</h1>
      <p className="text-gray-700 mb-6">{description}</p>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full shadow-sm">Category: {category}</span>
        <span className={`px-4 py-1 rounded-full shadow-sm ${priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          Priority: {priority}
        </span>
        <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full shadow-sm">Upvotes: {upvotes}</span>
        <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full shadow-sm">Location: {location}</span>
        <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full shadow-sm">Date: {date}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md">
          Update
        </button>
        <button
        onClick={() => handleDelete(_id)}
         className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md ">
          Delete
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ViewDetail;