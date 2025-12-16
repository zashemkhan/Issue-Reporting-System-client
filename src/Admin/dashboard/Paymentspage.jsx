import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Paymentspage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: paymenttotal = [] } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data?.result;
    },
  });
  const Price = paymenttotal.filter((issue) => issue.priority === 'high');

  return (
    <div >
      <h1 className="text-4xl font-bold">Payments page</h1>
      <div className="overflow-x-auto">
        <table className="table-zebra table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className='font-bold'>Email</th>
              <th className='font-bold'>priority</th>
              <th className='font-bold'>location</th>
              <th className='font-bold'>Price</th>
            </tr>
          </thead>
          <tbody>
            {Price.map((p, i) => (
              <tr key={p.email}>
                <th>{i + 1}</th>
                <td>{p.email}</td>
                <td>{p.priority}</td>
                <td>{p.location}</td>
                <td>{p.boostPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <div className='mt-5 text-right  '>
        <button className='border px-4 rounded-md border-gray-300'>Print</button>
    </div>
    </div>
  );
};

export default Paymentspage;
