import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin

// Registering necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const ReviewAndRatingsChart = ({ data1, data2 }) => {


  // const months = [];
  // const currentDate = new Date();

  // const startYear = currentDate.getFullYear() - 1;
  // const startMonth = currentDate.getMonth();

  // for (let i = 0; i < 12; i++) {
  //   const date = new Date(startYear, startMonth + i, 1);
  //   const formattedMonth = date.toLocaleString('default', { month: 'short', year: '2-digit' });
  //   months.push(formattedMonth);
  // }

  const data = {
    labels: data1?.xaxislabel,
    datasets: [
      {
        type: 'bar',
        label: data1?.label,
        data: data1?.data,
        backgroundColor: data1?.bgcolor ?? '#388ee2',
        borderColor: data1?.bordercolor ?? '#388ee2',
        borderWidth: data1?.borderwidth ?? 4,
        barThickness: data1?.barthickness ?? 30,
        yAxisID: data1?.yid,
        order: data1?.order ?? 2,
        datalabels: {
          color: data1?.datalabelcolor ?? '#388ee2',
          anchor: data1?.anchor ?? 'end',
          align: data1?.align ?? 'top',
          formatter: (value) => {
            return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
          }
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
      yAxisID: data2?.yid,
      borderWidth: data1?.borderwidth ?? 4,
      fill: false,
      tension: 0.4,
      order: data1?.order ?? 1,
      datalabels: {
        color: data1?.datalabelcolor ?? '#003d62',
        anchor: data1?.anchor ?? 'end',
        align: data1?.align ?? 'top',
        formatter: (value) => value.toFixed(1)
      }
    })
  }

  const options = {
    scales: {
      [data1.yid]: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        min: data1?.minlimit,
        max: data1?.maxlimit,
        title: {
          display: true,
          text: data1?.optionTitle,
        },
        ticks: {
          stepSize: Math.floor(data1?.stepsize),
          callback: function (value) {
            const roundedValue = Math.round(value);

            // Format large numbers as '2.6k' or '5k'
            if (roundedValue >= 1000) {
              return (roundedValue / 1000).toFixed(1) + 'k';
            }
            return roundedValue;
  
          }
        }
      },
      ...(data2 && {
        [data2.yid]: {
          type: 'linear',
          display: true,
          position: 'right',
          beginAtZero: false,
          min: data2.minlimit,
          max: data2.maxlimit,
          title: {
            display: true,
            text: data2.optionTitle
          },
          grid: {
            drawOnChartArea: false
          }
        }
      })
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
            size: 10 // Adjust the font size to change the legend disc size
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
        <Chart type='bar' data={data} options={options} />
      </div>
    </div>
  );
};

export default ReviewAndRatingsChart;
