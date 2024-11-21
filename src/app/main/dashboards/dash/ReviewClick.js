import { useState, useRef, useEffect } from "react";
import MovingIcon from "@mui/icons-material/Moving";
import Chart from "chart.js/auto";

const ReviewClick = ({ data }) => {
  const [loadedData, setLoadedData] = useState(null);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (data) {
      setLoadedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (loadedData && chartContainerRef.current) {
      const ctx = chartContainerRef.current.getContext("2d");
      const reviewReplyRate = loadedData?.replyPercent ?? 0;
      const remaining = 100 - reviewReplyRate;

      const feedbackChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Reply", "Not Reply"],
          datasets: [
            {
              label: "Feedback",
              data: [reviewReplyRate, remaining],
              backgroundColor: ["#5C9D4C", "#EDEDED"],
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
                  const label = context.label || "";
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                  const percentage = Math.floor((value / total) * 100 + 0.5);
                  return `${label}: ${percentage}%`;
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
  }, [loadedData]);

  return (
    <div>
      {loadedData ? (
        <div>
          <div className="relative w-full max-w-md h-64 lg:h-96">
            <p className="text-lg font-medium flex justify-start">Review Reply Rate</p>
            <canvas className="z-index z-9999 absolute md:mt-[16px]" ref={chartContainerRef} id="feedbackChart"></canvas>
            <div className="z-index z-0 absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <p className="font-medium text-base mt-[40px] mb-[4px]">Replied</p>
              <h1 className="text-5xl md:text-3xl font-medium">{loadedData.replyPercent}%</h1>
            </div>
          </div>

          <div className="flex justify-center items-center w-full mt-[24px] gap-1">
            <p className="font-medium text-lg mt-[20px] mb-[0px] mr-[3px]">{loadedData.totalReviews}</p>
            <p className="mt-[20px] mb-[0px]">Reviews Total</p>
          </div>

          <div className="font-medium mt-[35px]">
            <h3>Response Time</h3>
            <div className="flex flex-row justify-center ml-[10px] mt-[20px] gap-[12px]">
              <h1 className="text-center">{loadedData.responsetime}</h1>
              <div className="flex flex-col ml-[10px]">
                <div className="flex flex-row gap-[2px] justify-center">
                  <MovingIcon className="text-[#5C9D4C]" />
                  <p>{loadedData.valueThisWeek}</p>
                </div>
                <h6>{loadedData.lableThisWeek}</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ReviewClick;
