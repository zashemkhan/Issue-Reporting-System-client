import React from 'react';

const IssueCard = ({issue}) => {
  console.log(issue)
  const {image,title,category,location,status, priority, upvotes} = issue
  return (
    <div className="border  rounded-lg shadow-md p-4 flex flex-col gap-4 max-w-md">
  <img src={image} alt={issue.title} className=" h-80 object-cover rounded" />
  <div className="flex-1 flex flex-col justify-between">
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{category}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm mt-1">Status: <span>{status}</span></p>
      <p className="text-sm">Priority: <span>{priority}</span></p>
      <p className="text-sm mt-1">Upvotes: {upvotes}</p>
    </div>
    <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
      View Details
    </button>
  </div>
</div>
  );
};

export default IssueCard;