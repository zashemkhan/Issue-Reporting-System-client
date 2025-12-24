import { NavLink, useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { useState } from 'react';
import { toast } from 'kitzo/react';

const IssueCard = ({ issue, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    image,
    title,
    category,
    location: issueLocation,
    upvotedBy = [],
    date,
    createdBy,
    status = "Pending",
    priority = "Normal",
  } = issue;

  const [votedBy, setVotedBy] = useState(upvotedBy);

  const handleUpvote = async () => {
    if (!user) return navigate('/login');
    if (votedBy.includes(user.uid)) return toast.error('Already upvoted');

    try {
      setVotedBy((prev) => [...prev, user.uid]);
      await axiosSecure.patch('/issues/upvotes', { _id });
      toast.success('Upvoted successfully');
      refetch && refetch();
    } catch (err) {
      setVotedBy((prev) => prev.filter((id) => id !== user.uid));
      toast.error('Failed to upvote');
    }
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-2xl bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl max-md:mx-auto max-md:w-full">
      {/* Image & Status */}
      <div className="relative h-80 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-md">
          {status.toUpperCase()}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-md">
          Priority: {priority}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between gap-3 p-5">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">Category: {category}</p>
          <p className="text-sm text-gray-400">Location: {issueLocation}</p>
          <p className="text-sm text-gray-400">Date: {date}</p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <NavLink
            to={`/viewdetails/${_id}`}
            className="flex-1 rounded-lg bg-gradient-to-r from-[#25408f] to-[#3b5ac1] px-4 py-2 text-center font-semibold text-white shadow-md transition hover:from-[#3b5ac1] hover:to-[#25408f]"
          >
            See Details
          </NavLink>

          {/* Upvote Button */}
          {((location.pathname.includes('my-issues-page')) ||
            (location.pathname.includes('allissues') && createdBy !== user?.uid)) && (
            <button
              onClick={handleUpvote}
              className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#ff7f50] to-[#ff4500] text-white shadow-md transition hover:scale-110"
            >
              {votedBy.includes(user?.uid) ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </button>
          )}
        </div>

        {/* Upvotes Count */}
        <p className="mt-2 text-sm text-gray-500">
          Upvotes: <span className="font-semibold">{votedBy.length}</span>
        </p>
      </div>
    </div>
  );
};

export default IssueCard;
