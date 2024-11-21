// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle,  } from 'recharts';

// const data = [
//     { name: 'Jan 24', Low: 10, gap: 1.5, Medium: 20, High: 40,  },
//     { name: 'Feb 24', Low: 52, gap: 1.5, Medium: 35, High: 21, },
//     { name: 'Mar 24', Low: 35, gap: 1.5, Medium: 25, High: 40,  },
//     { name: 'Apr 24', Low: 50, gap: 1.5, Medium: 30, High: 20, },
//     { name: 'May 24', Low: 20, gap: 1.5, Medium: 40, High: 40, },
//     { name: 'Jun 24', Low: 30, gap: 1.5, Medium: 20, High: 50 ,},
//     { name: 'Jul 24', Low: 25, gap: 1.5, Medium: 35, High: 40, },
//     { name: 'Aug 24', Low: 40, gap: 1.5, Medium: 25, High: 35 ,},
//     { name: 'Sep 24', Low: 20, gap: 1.5, Medium: 45, High: 35 , },
//     { name: 'Oct 24', Low: 35, gap: 1.5, Medium: 20, High: 45 ,},
//     { name: 'Nov 24', Low: 30, gap: 1.5, Medium: 30, High: 40 ,},
//     { name: 'Dec 24', Low: 45, gap: 1.5, Medium: 25, High: 30, },

// ];
// const CustomBarShape = (props) => {
//     const { fill, x, y, width, height } = props;
//     return (
//         <Rectangle
//             radius={[4, 4, 4, 4]}
//             fill={fill}
//             x={x}
//             y={y}
//             width={width}
//             height={height}

//         />
//     );
// };

// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`${label} : ${payload[0].value}`}</p>
//           <p className="intro">{getIntroOfPage(label)}</p>
//           <p className="desc">Anything you want can be displayed here.</p>
//         </div>
//       );
//     }
  
//     return null;
//   };

// const StackedBarChart = () => {
//     let allowEscapeViewBox={x:true,y:true}
//     return (
//         <ResponsiveContainer width="100%" height={300} >
//             <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} className="overflow-x: scroll"
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name"  />
//                 <YAxis />
//                 <Tooltip/>
//                 <Tooltip allowEscapeViewBox={allowEscapeViewBox} content={<CustomTooltip />}  />
//                 <Tooltip allowEscapeViewBox={allowEscapeViewBox} />
//                 <Legend />
                
//                 <Bar shape={<CustomBarShape />} dataKey="Low" stackId="a" fill='#5C9D4C' barSize={20} />
//                 <Bar shape={<CustomBarShape />} dataKey="gap" stackId="a" fill='#FFFFFF00' barSize={0} />
//                 <Bar shape={<CustomBarShape />} dataKey="Medium" stackId="a" fill="#FBB138" barSize={20} />
//                 <Bar shape={<CustomBarShape />} dataKey="gap" stackId="a" fill='rgba(255, 255, 255, 0)' barSize={0} />
//                 <Bar shape={<CustomBarShape />} dataKey="High" stackId="a" fill='#E44D4D' barSize={20} />
//             </BarChart>
//         </ResponsiveContainer>
//     );
// };

// export default StackedBarChart;


// ======================================================================================================

// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// const StackedBarChart = () => {
//   useEffect(() => {
//     const options = {
//       type: 'bar',
//       data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//           label: '# of Votes',
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: 'red'
//         },
//         {
//           label: '# of Points',
//           data: [7, 11, 5, 8, 3, 7],
//           backgroundColor: 'blue'
//         }]
//       },
//       options: {
//         tooltips: {
//           mode: 'index', // Changed mode to 'index' for stacked bar chart
//         },
//         scales: {
//           x: {
//             stacked: true, // X-axis is stacked
//           },
//           y: {
//             stacked: true, // Y-axis is stacked
//           }
//         }
//       }
//     };

//     const ctx = document.getElementById('chartJSContainer').getContext('2d');
//     new Chart(ctx, options);

//     // Clean up Chart instance when the component unmounts
//     return () => {
//       // Dispose the chart to avoid memory leaks
//       if (ctx) {
//         ctx.destroy();
//       }
//     };
//   }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

//   return (
//     <canvas id="chartJSContainer" width="600" height="400"></canvas>
//   );
// };

// export default StackedBarChart;

// ======================================================================================================

// import React, { useEffect } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// const StackedBarChart = () => {
//   useEffect(() => {
//     const data = {
//       labels: [
//         'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 
//         'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24'
//       ],
//       datasets: [
//         {
//           label: 'Low',
//           data: [10, 52, 35, 50, 20, 30, 25, 40, 20, 35, 30, 45],
//           backgroundColor: '#5C9D4C',
//           barThickness: 20,
//         },
//         {
//           label: 'Gap',
//           data: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
//           backgroundColor: 'rgba(255, 255, 255, 0)',
//           barThickness: 20,
//         },
//         {
//           label: 'Medium',
//           data: [20, 35, 25, 30, 40, 20, 35, 25, 45, 20, 30, 25],
//           backgroundColor: '#FBB138',
//           barThickness: 20,
//         },
//         {
//           label: 'High',
//           data: [40, 21, 40, 20, 40, 50, 40, 35, 35, 45, 40, 30],
//           backgroundColor: '#E44D4D',
//           barThickness: 20,
//         },
//       ],
//     };

//     const options = {
//       type: 'bar',
//       data: data,
//       options: {
//         plugins: {
//           tooltip: {
//             mode: 'nearest', // Tooltips for individual bars
//             intersect: false, // Show tooltip for the nearest data point
//             callbacks: {
//               label: function(tooltipItem) {
//                 const label = tooltipItem.dataset.label || '';
//                 const value = tooltipItem.raw || 0;
//                 return `${label}: ${value}`;
//               },
//             },
//             backgroundColor: 'rgba(0, 0, 0, 0.7)',
//             titleFontSize: 16,
//             titleFontColor: '#fff',
//             bodyFontColor: '#fff',
//             bodyFontSize: 14,
//             displayColors: false,
//           },
//           legend: {
//             labels: {
//               fontSize: 14,
//             },
//           },
//         },
//         scales: {
//           x: {
//             stacked: true, // X-axis is stacked
//           },
//           y: {
//             stacked: true, // Y-axis is stacked
//           },
//         },
//       },
//     };

//     const ctx = document.getElementById('chartJSContainer').getContext('2d');
//     const stackedBarChart = new Chart(ctx, options);

//     // Clean up Chart instance when the component unmounts
//     return () => {
//       stackedBarChart.destroy();
//     };
//   }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

//   return (
//     <canvas id="chartJSContainer" width="1000" height="400"></canvas>
//   );
// };

// export default StackedBarChart;

// ==================================================================================================

// import React, { useEffect, useState } from 'react';
// import Chart from 'chart.js/auto'; // Import Chart.js library


// const StackedBarChart = (props) => {
//     const {chartData}=props;
//     console.log('===========>chartData',chartData);
//     const [chartInstance, setChartInstance] = useState(null);

//   useEffect(() => {
//     const data = {
//       labels: [
//         'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24', 
//         'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24'
//       ],
//       datasets: [
//         {
//           label: 'Green Bar', // Removed label
//           data: [10, 52, 35, 50, 20, 30, 25, 40, 20, 35, 30, 45],
       
//           backgroundColor: '#5C9D4C',
//           barThickness: 20,
//         },
//         {
//           label: 'Gap', // Removed label
//           data: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
//           backgroundColor: 'rgba(255, 255, 255, 0)',
//           barThickness: 20,
//         },
//         {
//           label: 'Yellow Bar', // Removed label
//           data: [20, 35, 25, 30, 40, 20, 35, 25, 45, 20, 30, 25],
//           backgroundColor: '#FBB138',
//           barThickness: 20,
//         },
//         {
//           label: 'Gap', // Removed label
//           data: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
//           backgroundColor: 'rgba(255, 255, 255, 0)',
//           barThickness: 20,
//         },
//         {
//           label: 'Red', // Removed label
//           data: [40, 21, 40, 20, 40, 50, 40, 35, 35, 45, 40, 30],
//           backgroundColor: '#E44D4D',
//           barThickness: 20,
//         },

       
//       ],
//     };

//     const options = {
//       type: 'bar',
//       data: data,
//       options: {
//         plugins: {
//           tooltip: {
//             mode: 'nearest', // Tooltips for individual bars
//             intersect: false,
//             callbacks: {
//               label: function(tooltipItem) {
//                 const value = tooltipItem.raw || 0;
//                 if (tooltipItem.dataset.label === 'Gap') {
//                   return null;
//                 }
//                 return value;
//               },
//               labelTextColor: function(tooltipItem) {
//                 return tooltipItem.dataset.backgroundColor;
//               },
//             },
//             backgroundColor: 'white', // Background shadow for tooltip
//             titleFont: {
//               size: 16,
//               color: '#fff',
//             },
//             bodyFont: {
//               size: 14,
//               color: '#fff',
//             },
//             displayColors: false,
//           },
//           legend: {
//             display: false, // Remove legend
//           },
//         },
//         scales: {
//           x: {
//             stacked: true, // X-axis is stacked
//             grid: {
//               display: false, // Remove x-axis grid lines
//               borderDash: [10, 10],
             
//             },
           
//             ticks: {
//               font: {
//                 size: 12,
//               },
//             },
//           },
//           y: {
//             stacked: true, // Y-axis is stacked
//             grid: {
//               borderDash: [2, 2], // Dashed y-axis lines
//             },
//             ticks: {
//               font: {
//                 size: 12,
//               },
//             },
//           },
//         },
//         elements: {
//           bar: {
//             borderRadius: {
//               topLeft: 5,
//               topRight: 5,
//               bottomLeft: 5,
//               bottomRight: 5,
            
//             }, 
//           },
//         },
//       },
//     };

//     const ctx = document.getElementById('chartJSContainer').getContext('2d');
//     const stackedBarChart = new Chart(ctx, options);

   

//     // Clean up Chart instance when the component unmounts
//     return () => {
//       stackedBarChart.destroy();
//     };
//   }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount



//   return (
    
//     <canvas id="chartJSContainer" width="950" height="400" ></canvas>
    
//   );
// };

// export default StackedBarChart;


// ==============================================================================================


import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const StackedBarChart = ({ chartData }) => {
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    const yearData = chartData?.find(data => data.year === 2024)?.months;
    if (!yearData) {
      console.error('No data found for the year 2024');
      return;
    }

    const labels = Object.keys(yearData).map(month => month.charAt(0).toUpperCase() + month.slice(1));
    const positiveData = Object.values(yearData).map(monthData => monthData.positive);
    const commentsData = Object.values(yearData).map(monthData => monthData.comments);
    const negativeData = Object.values(yearData).map(monthData => monthData.negative);

    // Calculate totals for each month
    const totals = positiveData.map((val, index) => val + commentsData[index] + negativeData[index]);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Positive',
          data: positiveData,
          backgroundColor: '#5C9D4C',
          barThickness: 20,
        },
        {
          label: 'Comments',
          data: commentsData,
          backgroundColor: '#FBB138',
          barThickness: 20,
        },
        {
          label: 'Negative',
          data: negativeData,
          backgroundColor: '#E44D4D',
          barThickness: 20,
        },
      ],
    };

    const options = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          tooltip: {
            mode: 'nearest',
            intersect: false,
            callbacks: {
              label: function(context) {
                const dataset = context.dataset;
                const currentValue = dataset.data[context.dataIndex];
                const total = totals[context.dataIndex];
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return `${dataset.label}: ${percentage}%`;
               
                // return `${tooltipItem?.formattedValue}`;
              },
            },
            // backgroundColor: 'white',
            
            titleFont: {
              size: 16,
            //   color: '#000',
            },
            bodyFont: {
              size: 14,
            //   color: '#000',
            },
            displayColors: true,
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
          y: {
            stacked: true,
            grid: {
              borderDash: [2, 2],
            },
            ticks: {
              font: {
                size: 12,
              },
            },
          },
        },
        elements: {
          bar: {
            borderRadius: {
              topLeft: 5,
              topRight: 5,
              bottomLeft: 5,
              bottomRight: 5,
            },
          },
        },
      },
    };

    const ctx = document.getElementById('chartJSContainer').getContext('2d');
    const stackedBarChart = new Chart(ctx, options);
    setChartInstance(stackedBarChart);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]);

  return chartData ? <canvas id="chartJSContainer" width="950" height="400"></canvas> : <h1>No data found</h1>;
};

export default StackedBarChart;










