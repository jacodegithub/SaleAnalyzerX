// src/components/TransactionsDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('march');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, selectedMonth]);


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const fetchTransactions = () => {
    const apiUrl = `http://localhost:8080/api/transactions?month=${selectedMonth}&page=${currentPage}`;
    axios.get(apiUrl)
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const searchTransactions = (event) => {
    event.preventDefault();
    const apiUrl = `http://localhost:8080/api/transactions?search=${searchQuery}`;
    axios.get(apiUrl)
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error searching data:', error));
  };
//   console.log('transactions ',transactions);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
        setSortConfig({ key, direction });   
    };

    const sortedData = [...transactions].sort((a, b) => {
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

      <div className='flex justify-between'>
        <div className="mb-4">
            <label className="mr-2 text-slate-100">Select Month:</label>
                <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border rounded bg-slate-700 text-slate-200 border-none outline-none"
                >
                    <option value="" >Months</option>
                    {months.map((month, index) => (
                        <option key={index} value={month.toLowerCase()}>{month}</option>
                    ))}
            </select>
        </div>

        <form className="mb-4">
            <label className="mr-2 text-slate-100">Search Transaction:</label>
            <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search...'
            className="p-2 border rounded mr-2 bg-slate-700 border-none placeholder:text-slate-100 text-slate-100"
            />
            <button onClick={searchTransactions} className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-custom-gray">Search</button>
        </form>
      </div>  

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
          {sortedData.map(transaction => (
            <tr key={transaction.id}>
              <td className="border p-2 border-slate-500">{transaction.id}</td>
              <td className="border p-2 border-slate-500">{transaction.title}</td>
              <td className="border p-2 border-slate-500">{transaction.description}</td>
              <td className="border p-2 border-slate-500">{transaction.price}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrentPage(currentPage - 1)} className="p-2 bg-slate-500 rounded hover:bg-transparent transition duration-500 hover:text-slate-500 border border-slate-500">Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} className="p-2 bg-slate-500 rounded hover:bg-transparent transition duration-500 hover:text-slate-500 border border-slate-500">Next</button>
      </div>
    </div>
  );
};

export default TransactionsDashboard;
