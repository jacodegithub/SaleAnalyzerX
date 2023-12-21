import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionStatistics = ({ statistics }) => {
  return (
        <div className="contianer mx-auto p-4 bg-slate-500 rounded mt-20">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Transaction Statistics</h2>
            <table className="w-full border-collapse border border-slate-900 shadow-lg">
                <thead>
                    <tr className="bg-slate-800 text-slate-200">
                        <th className="p-2 border border-slate-900">Total Sale Amount</th>
                        <th className="p-2 border border-slate-900">Total Sold Items</th>
                        <th className="p-2 border border-slate-900">Total Not Sold Items</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-slate-800 font-bold'>
                        <td className="text-center p-2 border-2 border-slate-600 text-xl">{statistics.totalSaleAmount} /-</td>
                        <td className="text-center p-2 border-2 border-slate-600 text-xl">{statistics.totalSoldItems}</td>
                        <td className="text-center p-2 border-2 border-slate-600 text-xl">{statistics.totalNotSoldItems}</td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
};

export default TransactionStatistics;
