import React from 'react';
import { NavLink } from 'react-router';

const IssueCard = ({ issue }) => {
  const { image, title, category, location, _id, upvotes, date } = issue;
  return (

     <div className="flex max-w-md flex-col gap-4 rounded-lg shadow-md hover:scale-104 transition ease-in-out duration-300 max-md:mx-auto max-md:w-full">
      <img
        src={image}
        alt={issue.title}
        className="h-80 rounded object-cover"
      />
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="text-[20px] font-bold">{title}</h2>
          <p className="text-sm text-gray-600">Category: {category}</p>
          <p className="text-sm text-gray-500">Location: {location}</p>

          <p className="mt-1 text-sm">Upvotes: {upvotes}</p>
          <p className="mt-1 text-sm">{date}</p>
        </div>

        <NavLink
          to={`/viewdetails/${_id}`}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-all hover:bg-blue-700"
        >
          See Details
        </NavLink>
      </div>
    </div>

  );
};

export default IssueCard;
