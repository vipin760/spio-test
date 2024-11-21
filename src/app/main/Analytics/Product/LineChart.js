import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; // Import Chart.js

import { Line } from "react-chartjs-2";

const LineChart = ({ chartRef, chartInstanceRef, dataDetails }) => {

  // useEffect(() => {
  //   const ctx = chartRef.current.getContext('2d');
  //   const data = { ...dataDetails }
  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       min: 0,
  //       max: 1200,
  //       ticks: {
  //         stepSize: 400,
  //         color: "#666", // Adjust this to match theme
  //       },
  //     },
  //     x: {
  //       ticks: {
  //         color: "#666", // Adjust this to match theme
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: "bottom",
  //       align: "start",
  //       labels: {
  //         usePointStyle: true,
  //         pointStyle: 'circle',
  //         color: "#333", // Adjust legend color
  //         boxWidth: 10,
  //         padding: 10,
  //       },
  //     },
  //     layout: {
  //       padding: 0, // Adjusts padding around the chart
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           return `${context.dataset.label}: ${context.parsed.y}`;
  //         },
  //       },
  //     },
  //   },
  // };

  //   // Initialize Chart.js chart
  //   if (chartInstanceRef.current) {
  //     chartInstanceRef.current.destroy(); // Destroy previous chart instance to avoid duplicates
  //   }

  //   chartInstanceRef.current = new Chart(ctx, {
  //     type: 'line',
  //     data: data,
  //     options: options,
  //   });

  //   // Cleanup chart on component unmount
  //   return () => {
  //     chartInstanceRef.current.destroy();
  //   };
  // }, []);


  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)",
  //     },
  //     {
  //       label: "Second dataset",
  //       data: [33, 25, 35, 51, 54, 76],
  //       fill: false,
  //       borderColor: "#742774",
  //     },
  //   ],
  // };

  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 1200,
        ticks: {
          stepSize: 400,
          color: "#666", // Ad  just this to match theme
        },
      },
      x: {
        ticks: {
          color: "#666", // Adjust this to match theme
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: "#333", // Adjust legend color
          boxWidth: 10,
          padding: 10,
        },
      },
      layout: {
        padding: 0, // Adjusts padding around the chart
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
        },
      },
    },
  };


  return (
    <div>
      <Line data={dataDetails} options={options} height={300} width={350}/>
      {/* <canvas ref={chartRef} height={300} width={350}></canvas> */}
    </div>
  );
};

export default LineChart;









// import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js/auto'; // Import Chart.js

// import { Line } from "react-chartjs-2";

// const LineChart = ({ chartRef, chartInstanceRef, dataDetails }) => {

//   // useEffect(() => {
//   //   const ctx = chartRef.current.getContext('2d');
//   //   const data = { ...dataDetails }
//   // const options = {
//   //   responsive: true,
//   //   maintainAspectRatio: false,
//   //   scales: {
//   //     y: {
//   //       beginAtZero: true,
//   //       min: 0,
//   //       max: 1200,
//   //       ticks: {
//   //         stepSize: 400,
//   //         color: "#666", // Adjust this to match theme
//   //       },
//   //     },
//   //     x: {
//   //       ticks: {
//   //         color: "#666", // Adjust this to match theme
//   //       },
//   //     },
//   //   },
//   //   plugins: {
//   //     legend: {
//   //       display: true,
//   //       position: "bottom",
//   //       align: "start",
//   //       labels: {
//   //         usePointStyle: true,
//   //         pointStyle: 'circle',
//   //         color: "#333", // Adjust legend color
//   //         boxWidth: 10,
//   //         padding: 10,
//   //       },
//   //     },
//   //     layout: {
//   //       padding: 0, // Adjusts padding around the chart
//   //     },
//   //     tooltip: {
//   //       callbacks: {
//   //         label: function (context) {
//   //           return `${context.dataset.label}: ${context.parsed.y}`;
//   //         },
//   //       },
//   //     },
//   //   },
//   // };

//   //   // Initialize Chart.js chart
//   //   if (chartInstanceRef.current) {
//   //     chartInstanceRef.current.destroy(); // Destroy previous chart instance to avoid duplicates
//   //   }

//   //   chartInstanceRef.current = new Chart(ctx, {
//   //     type: 'line',
//   //     data: data,
//   //     options: options,
//   //   });

//   //   // Cleanup chart on component unmount
//   //   return () => {
//   //     chartInstanceRef.current.destroy();
//   //   };
//   // }, []);


//   // const data = {
//   //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   //   datasets: [
//   //     {
//   //       label: "First dataset",
//   //       data: [33, 53, 85, 41, 44, 65],
//   //       fill: true,
//   //       backgroundColor: "rgba(75,192,192,0.2)",
//   //       borderColor: "rgba(75,192,192,1)",
//   //     },
//   //     {
//   //       label: "Second dataset",
//   //       data: [33, 25, 35, 51, 54, 76],
//   //       fill: false,
//   //       borderColor: "#742774",
//   //     },
//   //   ],
//   // };
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         min: 0,
//         max: 1200,
//         ticks: {
//           stepSize: 400,
//           color: "#666", // Adjust this to match theme
//         },
//       },
//       x: {
//         ticks: {
//           color: "#666", // Adjust this to match theme
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom",
//         align: "start",
//         labels: {
//           usePointStyle: true,
//           pointStyle: 'circle',
//           color: "#333", // Adjust legend color
//           boxWidth: 10,
//           padding: 10,
//         },
//       },
//       layout: {
//         padding: 0, // Adjusts padding around the chart
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `${context.dataset.label}: ${context.parsed.y}`;
//           },
//         },
//       },
//     },
//   };


//   return (
//     <div>

//       {dataDetails ? <Line data={dataDetails} /> : ""}


//       {/* <Line data={dataDetails} options={options} height={300} width={350} /> */}
//       {/* <canvas ref={chartRef} height={300} width={350}></canvas> */}
//     </div>
//   );
// };

// export default LineChart;
