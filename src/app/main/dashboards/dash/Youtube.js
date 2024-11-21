import { Rating } from "@mui/material";
import { useState, useRef } from "react";
import ReactApexChart from "react-apexcharts";
import MovingIcon from "@mui/icons-material/Moving";
import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "chart.js/auto";


const Youtube = () => {
    const chartContainerRef = useRef(null);

    useEffect(() => {
      if (chartContainerRef.current) {
        const ctx = chartContainerRef.current.getContext("2d");
        const feedbackChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Positive", "Comments", "Negative"],
            datasets: [
              {
                label: "Feedback",
                data: [1245, 359, 741],
                backgroundColor: ["#5C9D4C", "#FBB138", "#065FD4"],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, 
            circumference: 180,
            rotation: 270,
            cutout: "75%",
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    var label = context.label,
                      value = context.raw;
                    var total = context.dataset.data.reduce(function (
                      previousValue,
                      currentValue
                    ) {
                      return previousValue + currentValue;
                    });
                    var percentage = Math.floor((value / total) * 100 + 0.5);
                    return label + ": " + percentage + "%";
                  },
                },
              },
            },
            animation: {
              animateRotate: false,
            },
          },
        });
  
        return () => feedbackChart.destroy();
      }
    }, []);
  return (
    <div>
         <div className="relative w-full max-w-md h-64 lg:h-96">
              <canvas className="z-index z-9999 absolute" ref={chartContainerRef} id="feedbackChart"></canvas>
              <div className="z-index z-0 absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <img
                  src="assets/images/dashboard/Youtube.png"
                  alt="Google"
                  className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                />
                <span className="text-xs md:text-sm font-bold pb-[20px]">Youtube</span>
              </div>
            </div>

            <div className="flex justify-center items-center w-full mt-5">
              <div id="positive" className="mx-2 text-center">
                <span className="text-xl md:text-3xl"style={{color:"#5C9D4C"}}>1,524</span>
                <span className="text-xs md:text-sm text-gray-500 block">
                  Likes
                </span>
              </div>
              <div id="comments" className="mx-2 text-center">
                <span className="text-xl md:text-3xl"style={{color:"#FBB138"}}>359</span>
                <span className="text-xs md:text-sm text-gray-500 block">
                  Comments
                </span>
              </div>
              <div id="negative" className="mx-2 text-center">
                <span className="text-xl md:text-3xl"style={{color:"#065FD4"}}>741</span>
                <span className="text-xs md:text-sm text-gray-500 block">
                  Shares
                </span>
              </div>
            </div>
          </div>
  )
}

export default Youtube