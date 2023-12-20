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

  return (
    <div className="container mx-auto p-4">

      <div className='flex justify-between'>
        <div className="mb-4">
            <label className="mr-2 text-slate-100">Select Month:</label>
                <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 border rounded bg-slate-800 text-slate-200 border-none outline-none"
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
            className="p-2 border rounded mr-2 bg-slate-800 border-none placeholder:text-slate-100 text-slate-100"
            />
            <button onClick={searchTransactions} className="p-2 bg-blue-500 text-white rounded">Search</button>
        </form>
      </div>  

      <table className="w-full border-collapse border-slate-500">
        <thead>
          <tr className="bg-blue-500">
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody className='text-slate-100'>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td className="border p-2">{transaction.id}</td>
              <td className="border p-2">{transaction.title}</td>
              <td className="border p-2">{transaction.description}</td>
              <td className="border p-2">{transaction.price}</td>
              {/* Add other columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrentPage(currentPage - 1)} className="p-2 bg-gray-300 rounded">Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} className="p-2 bg-gray-300 rounded">Next</button>
      </div>
    </div>
  );
};

export default TransactionsDashboard;
