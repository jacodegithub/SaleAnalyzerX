import React, { useState } from 'react';

const TransactionsDashboard = ({ propTransactions, handleNextPage, handlePreviousPage }) => {

  if(!propTransactions) {
    return;
  }

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
  }
      setSortConfig({ key, direction });   
  };

  const sortedData = [...propTransactions].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border-slate-500">
        <thead>
          <tr className="bg-slate-500 text-slate-100">
            <th onClick={() => handleSort('id')} className="cursor-pointer border p-4 border-slate-900 hover:bg-custom-gray">ID</th>
            <th onClick={() => handleSort('title')} className="cursor-pointer border p-4 border-slate-900 hover:bg-custom-gray">Title</th>
            <th onClick={() => handleSort('description')} className="cursor-pointer border p-4 border-slate-900 hover:bg-custom-gray">Description</th>
            <th onClick={() => handleSort('price')} className="cursor-pointer border p-4 border-slate-900 hover:bg-custom-gray">Price</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody className='text-slate-100'>
          {
            sortedData?.map(transaction => (
              <tr key={transaction.id}>
                <td className="border p-2 border-slate-500">{transaction.id}</td>
                <td className="border p-2 border-slate-500">{transaction.title}</td>
                <td className="border p-2 border-slate-500">{transaction.description}</td>
                <td className="border p-2 border-slate-500">{transaction.price}</td>
                {/* Add other columns as needed */}
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => handlePreviousPage()} className="p-2 bg-slate-500 rounded hover:bg-transparent transition duration-500 hover:text-slate-500 border border-slate-500">Previous</button>
        <button onClick={() => handleNextPage()} className="p-2 bg-slate-500 rounded hover:bg-transparent transition duration-500 hover:text-slate-500 border border-slate-500">Next</button>
      </div>
    </div>
  );
};

export default TransactionsDashboard;
