import React from 'react';
import { NavLink } from 'react-router';



const IssueCard = ({issue}) => {
  
  const {image,title,category,location, _id, upvotes, date} = issue
  return (
    <div className="  rounded-lg shadow-md  flex flex-col gap-4 max-w-md ">
  <img src={image} alt={issue.title} className=" h-80 object-cover rounded" />
  <div className="flex-1 flex flex-col justify-between p-4">
    <div>
      <h2  className="text-[20px] font-bold">{title}</h2>
      <p className="text-sm text-gray-600">Category: {category}</p>
      <p className="text-sm text-gray-500">Location: {location}</p>
      
      <p className="text-sm mt-1">Upvotes: {upvotes}</p>
      <p className="text-sm mt-1">{date}</p>
    
    </div>
 
    
  <NavLink to={`/viewdetails/${_id}`} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-center">
 See Details
  </NavLink>
  </div>
</div>
  );
};

export default IssueCard;