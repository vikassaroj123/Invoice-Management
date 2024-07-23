import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ invoices }) => {
  const data = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        label: 'Invoices',
        data: [
          invoices.filter(invoice => invoice.status === 'paid').length,
          invoices.filter(invoice => invoice.status === 'unpaid').length,
        ],
        backgroundColor: [
          'rgba(76, 175, 80, 0.6)', // Semi-transparent color for better visual effect
          'rgba(244, 67, 54, 0.6)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(244, 67, 54, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 14,
          font: {
            size: 14,
            weight: '600',
            family: 'Arial, sans-serif',
          },
          color: '#333',
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.index;
          const meta = legend.chart.getDatasetMeta(0);
          meta.data[index].hidden = !meta.data[index].hidden;
          legend.chart.update();
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#444',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (tooltipItem) => {
            const { label, raw } = tooltipItem;
            const percentage = ((raw / invoices.length) * 100).toFixed(2);
            return `${label}: ${raw} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeInOutQuad',
    },
    layout: {
      padding: 20, // Adds padding around the chart
    },
  };

  return (
    <div className=" max-w-full">
      <div className="relative w-full h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Charts;
