import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

// Registering necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const SmoothLineChart = ({ monthlyData }) => {

  const months = [];
  const currentDate = new Date();

  const startYear = currentDate.getFullYear() - 1;
  const startMonth = currentDate.getMonth();

  for (let i = 0; i < 12; i++) {
    const date = new Date(startYear, startMonth + i, 1);
    const formattedMonth = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    months.push(formattedMonth);
  }

  console.log(months);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Reviews',
        data: monthlyData?.map((data, index) => data?.reviews),
        borderColor: '#388ee2',
        backgroundColor: '#388ee2', // Light blue gradient fill
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointStyle: 'rectRot', // Rotate the points
        yAxisID: 'y-reviews',
        datalabels: {
          color: '#388ee2',
          anchor: 'end',
          align: 'top',
          formatter: (value) => {
            return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
          }
        }
      },
      {
        label: 'Rating',
        data: monthlyData?.map((data, index) => data?.totalRating),
        borderColor: '#003d62',
        backgroundColor: '#003d62', // Light blue gradient fill
        borderWidth: 4,
        fill: false,
        tension: 0.4,
        pointStyle: 'triangle', // Triangle points
        yAxisID: 'y-ratings',
        datalabels: {
          color: '#003d62',
          anchor: 'end',
          align: 'top',
          formatter: (value) => value.toFixed(1)
        }
      }
    ]
  };

  const options = {
    scales: {
      'y-reviews': {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        min: 0,
        max: 8000,
        title: {
          display: true,
          text: 'Number of Reviews'
        },
        ticks: {
          stepSize: 1000,
          callback: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k';
            }
            return value;
          }
        }
      },
      'y-ratings': {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: false,
        min: 1,
        max: 5,
        title: {
          display: true,
          text: 'Rating (1-5)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 10
          }
        }
      },
      datalabels: {
        display: true
      }
    }
  };

  return (
    <div>
      <div style={{ height: '450px', paddingTop: '20px' }}>
        <Chart type='line' data={data} options={options} />
      </div>
    </div>
  );
};

export default SmoothLineChart;
