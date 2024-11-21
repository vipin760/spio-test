import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const HorizontalBarChart = ({ data1, data2 }) => {

  const data = {
    labels: data1?.xaxislabel,
    datasets: [
      {
        label: data1?.label,
        data: data1?.data,
        backgroundColor: data1?.bgcolor ?? '#388ee2',
        barThickness: data1?.barthickness ?? 12,
        order: 2,
        datalabels: {
          anchor: data1?.anchor ?? 'end',
          align: data1?.align ?? 'top',
          color: data1?.datalabelcolor ?? '#003d62',
          font: {
            size: 12
          },
          formatter: (value) => value.toFixed(1) // Formats value to one decimal place
        }
      }
    ]
  };

  if (data2) {
    data.datasets.push({
      type: 'line',
      label: data2?.label,
      data: data2?.data,
      borderColor: data2?.bgcolor ?? '#003d62',
      backgroundColor: data2?.bgcolor ?? '#003d62',
      xAxisID: 'topX', // Use the top x-axis
      borderWidth: data2?.borderwidth ?? 4,
      fill: false,
      tension: 0.4,
      order: 1, // Ensure this dataset appears on top
      datalabels: {
        color: data2?.datalabelcolor ?? '#003d62',
        anchor: 'end',
        align: 'top', // Align data labels above the line
        formatter: (value) => value.toFixed(1)
      }
    });
  }

  const options = {
    indexAxis: 'y', // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        max: data1?.maxlimit,
        ticks: {
          stepSize: data1?.stepsize
        }
      },
      ...(data2 && {topX: {
        type: 'linear',
        position: 'top', // Set the second x-axis to be at the top
        beginAtZero: true,
        max: data2?.maxlimit, // Set the max limit for the second x-axis
        ticks: {
          stepSize: data2?.stepsize // Optionally specify step size
        }
      }
    }),
      y: {
        position: 'left', // Default y-axis for the first dataset
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        align: 'start', // Aligns the legend to the left when at the bottom
        labels: {
          usePointStyle: true, // Sets the legend markers to a disc type
          pointStyle: 'circle', // Ensures the markers are circular discs
          font: {
            size: 10 // Adjust the font size to change the legend disc size
          }
        }
      },
      datalabels: {
        display: true,
        color: '#000', // Set label text color
        anchor: 'end', // Anchor the labels to the end of the bars
        align: 'right', // Align labels to the right of the end
        font: {
          weight: 'bold' // Optional: make the text bold
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div style={{ height: '450px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
