// import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js/auto'; // Import Chart.js

// const DonutChart = ({ chartRef, chartInstanceRef, dataDetails, fetchedData, virtualMappingLabels }) => {

//   // const dataDetails = {

//   //   labels: ['Profile 1', 'Profile 2', 'Profile 3', 'Profile 4', 'Profile 5', 'Profile 6'], // Chart labels
//   //   datasets: [
//   //     {
//   //       data: virtualMappingLabels, // Chart data (donut sections)
//   //       backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'], // Colors for each section
//   //       hoverBackgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'], // Hover colors
//   //       borderWidth: 2, // Border thickness
//   //     },
//   //   ],
//   // };

//   // console.log("/////", virtualMappingLabels, dataDetails);

//   console.log("dataDetails", dataDetails);




//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d'); // Get canvas context

//     const data = { ...dataDetails };

//     const options = {
//       responsive: true,
//       cutout: '40%', // Equivalent to the donut size (45% of the chart)
//       plugins: {
//         legend: {
//           display: true, // Show the legend
//           align: "start",
//           position: 'bottom', // Position the legend (top, bottom, left, right)
//           labels: {
//             usePointStyle: true,
//             pointStyle: 'circle',
//             boxWidth: 10, // Size of the legend color box
//             padding: 10, // Space between legend items
//             color: '#333', // Legend text color
//           },
//         },
//       },
//       layout: {
//         padding: 0, // Adjusts padding around the chart
//       },
//     };

//     // Initialize Chart.js chart
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy(); // Destroy previous chart instance to avoid duplicates
//     }

//     chartInstanceRef.current = new Chart(ctx, {
//       type: 'doughnut', // Donut chart type in Chart.js
//       data: data,
//       options: options,
//     });

//     // Cleanup chart on component unmount
//     return () => {
//       chartInstanceRef.current.destroy();
//     };
//   }, []);

//   return (
//     <>

//       {/* {
//         fetchedData?.map((data, index) =>
//           <>{data?.Profile1}</>
//         )
//       } */}

//       <div className="chart-container" style={{}}>
//         <canvas ref={chartRef} />
//       </div>
//     </>
//   );
// };

// export default DonutChart;



// // "use client";
import React, { useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = (props) => {

  const { dataaa } = props

  let data = dataaa ? dataaa : []

  const options = {
    plugins: {
      legend: {
        display: true,
        align: "start",
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          padding: 10,
          color: '#333',
        },
      },
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <>
      <Doughnut data={finalData} options={options} />
    </>
  )
}
export default DonutChart;