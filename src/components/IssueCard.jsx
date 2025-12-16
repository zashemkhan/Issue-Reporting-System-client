import { NavLink, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { BiLike } from 'react-icons/bi';
import useAuth from '../Hooks/useAuth';

const IssueCard = ({ issue, refetch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axoisSecure = useAxiosSecure();
  const { image, title, category, location, _id, upvotes, date , boostPrice} = issue;
  const handleCount = (_id) => {
    if (!user) return navigate('/login');
    // console.log(upvotes, id)
    axoisSecure.patch('/issue/upvotes', { _id }).then((res) => {
      refetch();
      return res.data;
    });
  };
  return (
    <div className="flex max-w-md flex-col gap-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-104 max-md:mx-auto max-md:w-full">
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


          <div className='flex  gap-2  items-center'>
            <p
              onClick={() => handleCount(_id)}
              className=" text-sm"
            >
              <BiLike size={20}></BiLike>
             
            </p>
            <p>Upvotes: {upvotes}</p> 
          </div>
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
