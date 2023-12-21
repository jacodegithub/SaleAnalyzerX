// BarChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './chart.css'

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.range),
        datasets: [{
          label: 'Count',
          data: data.map(item => item.count),
          backgroundColor: '#6f86d6',
          borderColor: 'rgba(75, 192, 192, 1)', // Change border color here
          borderWidth: 1, // Border width for each bar
        }],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: data.map(item => item.count),
            title: {
              display: true,
              text: 'Price Range', // X-axis label
              color: 'white',
              font: {
                size: 15,
              }
            },
            ticks: {
              color: 'white',
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count', // Y-axis label
              color: 'white',
              font: {
                size: 15,
              }
            },
            ticks: {
              color: 'white',
            }
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  const barChartContent = data.map((item, index) => (
    <tr key={index} className="">
      <td className="p-4 text-center">{item.range}</td>
      <td className="p-4 text-center">{item.count}</td>
    </tr>
  ));

  return (
    <div className="mt-8 w-full">
      <h2 className='text-2xl text-slate-200 uppercase mb-10'>Bar Chart</h2>
      <div className='flex justify-evenly items-center'>
        <canvas ref={chartRef} className='barchart'></canvas>
        <div className="container flex justify-center p-10 w-1/2">
          <table className="w-full p-4 bg-slate-500 rounded">
            <thead>
              <tr className='border-b bg-slate-700 text-slate-200'>
                <th className="p-2">Price Range</th>
                <th className="p-2">Count</th>
              </tr>
            </thead>
            <tbody>{barChartContent}</tbody>
          </table>
        </div>
      </div>
      
    </div>
    // <div className='flex justify-center'>
    //   <canvas ref={chartRef} width={400} height={400}></canvas>;

    // </div>
  )
};

export default BarChart;
