
import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';

const Paymentspage = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: paymenttotal = [] } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure.get('/issues');
      return res.data?.result || [];
    },
  });


  const highPriority = paymenttotal.filter((issue) => issue.priority === 'high');

 
  const totalPrice = highPriority.reduce((acc, cur) => acc + Number(cur.boostPrice || 0), 0);

  // PDF Download function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('High Priority Payments', 14, 16);

    const columns = ['#', 'Email', 'Priority', 'Location', 'Price'];
    const rows = highPriority.map((item, index) => [
      index + 1,
      item.email,
      item.priority,
      item.location,
      item.boostPrice,
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    
    doc.text(`Total Price: ${totalPrice}`, 14, doc.lastAutoTable.finalY + 10);

    doc.save('high-priority-payments.pdf');
  };

  return (
    <div className=" mt-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Payments Page</h1>

      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th className="font-bold">Email</th>
              <th className="font-bold">Priority</th>
              <th className="font-bold">Location</th>
              <th className="font-bold">Price</th>
            </tr>
          </thead>
          <tbody>
            {highPriority.map((p, i) => (
              <tr key={p._id || i}>
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

      <div className="mt-5 text-right">
        <button
          onClick={handleDownloadPDF}
          className="border px-4 py-2 rounded-md border-gray-300 hover:bg-gray-100 transition"
        >
          Download PDF
        </button>
      </div>

      <div className="mt-2 text-right font-bold">
        Total Price: {totalPrice}
      </div>
    </div>
  );
};

export default Paymentspage;

