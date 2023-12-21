// CombinedDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionsDashboard from './transactions';
import TransactionStatistics from './statistics';
import PieChart from './piechart';
import BarChart from './barchart';

const CombinedDashboard = () => {
  const [combinedData, setCombinedData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [propTransactions, setPropTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchData();
  }, [selectedMonth, currentPage]); // Include currentPage in the dependency array

//   console.log(currentPage);
  const fetchData = async () => {
    try {
      let apiUrl = `http://localhost:8080/api/combined-data/${selectedMonth}`;

      const response = await axios.get(apiUrl);
      setCombinedData(response.data);
      setPropTransactions(response.data.transactions);
      setTotalPages(Math.ceil(response.data.transactions.length / 5)); // Assuming 'total' is the total number of transactions
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchFunction = async () => {

    try {
      console.log(searchQuery);
      const apiUrl = `http://localhost:8080/api/transactions?search=${searchQuery}`

      // If searching, append the search query to the API URL
      // if (searchQuery) {
      //   apiUrl += `?`;
      // }

      const response = await axios.get(apiUrl);
      console.log('res',response.data)
      setPropTransactions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const searchTransactions = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset page to 1 when searching
    searchFunction();
  };

  const handleNextPage = async () => {
    setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        console.log(nextPage, totalPages);
        if(nextPage > 1) {
            transactionData(nextPage)
        }

        return nextPage;
    });

  };

  const transactionData = async (pageNum) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/transactions?month=${selectedMonth}&page=${pageNum}`);
        console.log('res',response.data)
        setPropTransactions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

//   console.log('combined ', combinedData);

  return (
    <div className="container mx-auto p-4 py-20">
        <div className="container mx-auto p-4 flex justify-between">
            <div className="mb-4">
                <label className="text-slate-200 mr-2">Select Month:</label>
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded bg-slate-600 text-slate-200 border-none"
                >
                    <option value="">Months</option>
                    {
                        months.map((month, index) => (
                            <option key={index} value={month.toLowerCase()}>{month}</option>
                        ))
                    }
                </select>
            </div>

            <form className="mb-4" onSubmit={searchTransactions}>
                <label className="text-slate-200 mr-2">Search Transaction:</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search...'
                    className="p-2 border rounded mr-2 bg-slate-600 placeholder:text-slate-200 text-slate-200"
                />
                <button type='submit' className="px-4 py-2 bg-slate-500 text-white rounded">Search</button>
            </form>
        </div>
      {combinedData && (
        <>
          {/* Render components with the fetched data */}
          <TransactionsDashboard 
            propTransactions={propTransactions} 
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
          />
          <TransactionStatistics statistics={combinedData.statistics} />

          <div className='container mx-auto p-4 mt-20'>
            <PieChart data={combinedData.pieChart} />
            <BarChart data={combinedData.barChart} />
          </div>
        </>
      )}
    </div>
  );
};

export default CombinedDashboard;
