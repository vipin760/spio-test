import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

// Registering necessary components for chart.js
ChartJS.register(
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const ScatterChart = ({ monthlyData }) => {

  const da = []
  const dat = monthlyData?.map((data, index) => ({
    x: index + 1,
    y: data?.reviews
  }));

  console.log("Dat", dat);


  const data = {
    datasets: [
      {
        type: 'scatter',
        label: 'Reviews',
        data: monthlyData?.map((data, index) => ({
          x: index + 1,
          y: data?.reviews
        })),
        backgroundColor: '#388ee2',
        borderColor: '#388ee2',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: 'rectRounded', // Change point style for distinction
        datalabels: {
          color: '#388ee2',
          anchor: 'start',
          align: 'bottom',
          formatter: (value) => {
            return value.y >= 1000 ? (value.y / 1000).toFixed(1) + 'k' : value.y;
          }
        }
      },
      {
        type: 'scatter',
        label: 'Rating',
        data: monthlyData?.map((data, index) => ({
          x: index + 1,
          y: data?.totalRating
        })),
        borderColor: '#003d62',
        backgroundColor: '#003d62',
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointStyle: 'triangle', // Change point style for distinction
        datalabels: {
          color: '#003d62',
          anchor: 'end',
          align: 'top',
          formatter: (value) => value.y.toFixed(1) // Display one decimal place
        }
      }
    ]
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Month'
        },
        ticks: {
          stepSize: 1,
          callback: (value) => {
            // Convert x values to month labels
            const labels = ["Jun '23", "Jul '23", "Aug '23", "Sep '23", "Oct '23", "Nov '23", "Dec '23", "Jan '24", "Feb '24", "Mar '24", "Apr '24", "May '24", "Jun '24"];
            return labels[value - 1];
          }
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        },
        ticks: {
          callback: (value) => {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k';
            }
            return value;
          }
        }
      }
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start', // Aligns the legend to the left when at the bottom
        labels: {
          usePointStyle: true, // Sets the legend markers to a disc type
          pointStyle: 'circle', // Ensures the markers are circular discs
          font: {
            size: 12 // Adjust the font size to change the legend disc size
          }
        }
      },
      datalabels: {
        display: true,
        color: (context) => context.dataset.borderColor, // Color of the labels based on the dataset
        formatter: (value) => {
          return value.y >= 1000 ? (value.y / 1000).toFixed(1) + 'k' : value.y;
        }
      }
    }
  };

  return (
    <div>
      <div style={{ paddingTop: '20px', maxHeight: 400, height: '400px', overflowY: 'scroll' }}>
        <Chart type='scatter' data={data} options={options} />
      </div>
    </div>
  );
};

export default ScatterChart;
