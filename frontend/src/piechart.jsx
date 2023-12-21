// PieChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './chart.css'

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  console.log('pie',data);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(item => item._id),
        datasets: [{
          data: data.map(item => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#2196F3'],
          borderWidth: 1,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  const pieChartContent = data.map((item, index) => (
    <tr key={index} className="">
      <td className="p-4 text-center">{item._id}</td>
      <td className="p-4 text-center">{item.count}</td>
    </tr>
  ));
  
  return (
    <div className="mt-8 w-full">
      <h2 className='text-2xl text-slate-200 uppercase'>Pie Chart</h2>
      <div className='flex items-center justify-evenly'>
        <canvas ref={chartRef} className='piechart'></canvas>
        <div className="container flex justify-center p-10">
          <table className=" w-3/4 bg-slate-500 rounded">
            <thead>
              <tr className='border-b bg-slate-700 text-slate-200'>
                <th className="p-2">Category</th>
                <th className="p-2">Count</th>
              </tr>
            </thead>
            <tbody>{pieChartContent}</tbody>
          </table>
        </div>
      </div>
    </div>
    // <div className='flex justify-center'>
    //   <canvas ref={chartRef} width={400} height={400}></canvas>;

    // </div>
  )
};

export default PieChart;
