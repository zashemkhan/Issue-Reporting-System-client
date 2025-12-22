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
    <div className="relative flex flex-col gap-4 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 max-md:mx-auto max-md:w-full">
      {/* Issue Image */}
      <div className="relative h-80 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={issue.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-md">
          {status.toUpperCase()}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-md">
          Priority: {priority}
        </span>
      </div>

      {/* Issue Info */}
      <div className="flex flex-col justify-between p-5 gap-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">Category: {category}</p>
          <p className="text-sm text-gray-400">Location: {location}</p>
          <p className="text-sm text-gray-400">Date: {date}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <NavLink
            to={`/viewdetails/${_id}`}
            className="flex-1 rounded-lg bg-gradient-to-r from-[#25408f] to-[#3b5ac1] px-4 py-2 text-center text-white font-semibold shadow-md transition hover:from-[#3b5ac1] hover:to-[#25408f]"
          >
            See Details
          </NavLink>

          {reactLocation.pathname.includes('allissues') &&
            createdBy !== user?.uid && (
              <button
                onClick={() => handleCount(_id)}
                className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#ff7f50] to-[#ff4500] text-white shadow-md transition hover:scale-110"
              >
                {user && votedBy.includes(user?.uid) ? (
                  <FaThumbsUp />
                ) : (
                  <FaRegThumbsUp />
                )}
              </button>
            )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Upvotes: <span className="font-semibold">{votedBy.length}</span>
        </p>
      </div>
    </div>
  );
};

export default IssueCard;
