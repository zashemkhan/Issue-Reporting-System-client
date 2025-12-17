import { NavLink, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

import useAuth from '../Hooks/useAuth';
import { useState } from 'react';
import { toast } from 'kitzo/react';

const IssueCard = ({ issue, refetch }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const reactLocation = useLocation();
  const axoisSecure = useAxiosSecure();

  const {
    image,
    title,
    category,
    location,
    _id,
    upvotedBy,
    date,
    boostPrice,
    createdBy,
    status,
    priority,
  } = issue;

  const [votedBy, setVotedBy] = useState(() => [...upvotedBy]);

  const handleCount = (_id) => {
    if (!user) return navigate('/login');
    if (votedBy.includes(user?.uid))
      return toast.error('You have already upvoted this issue');
    setVotedBy((prev) => [...prev, user?.uid]);

    axoisSecure.patch('/issue/upvotes', { _id }).then((res) => {
      refetch();
      toast.success('You have successfully upvoted this issue');
      return res.data;
    });
  };

  return (
    <div className="relative flex max-w-md flex-col gap-4 rounded-xl shadow-md transition max-md:mx-auto max-md:w-full">
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

          <div className="flex items-center gap-2">
            <p>Upvotes: {votedBy.length}</p>
          </div>
          <p className="mt-1 text-sm">{date}</p>
        </div>
        <span className="absolute top-2 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
          status: {status}
        </span>
        <span className="absolute top-2 right-2 rounded-full bg-white px-3 py-1 text-sm font-semibold">
          priority : {priority}
        </span>

        <div className="mt-4 flex gap-2">
          <NavLink
            to={`/viewdetails/${_id}`}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-all hover:bg-blue-700"
          >
            See Details
          </NavLink>

          {reactLocation.pathname.includes('allissues') &&
            createdBy !== user?.uid && (
              <button
                onClick={() => handleCount(_id)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                {user && votedBy.includes(user?.uid) ? (
                  <FaThumbsUp />
                ) : (
                  <FaRegThumbsUp />
                )}
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
