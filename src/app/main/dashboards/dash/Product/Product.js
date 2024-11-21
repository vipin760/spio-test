import { Rating, Typography } from "@mui/material";
import { useState, useRef } from "react";
import MovingIcon from "@mui/icons-material/Moving";
import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "chart.js/auto";
import ReviewClick from "../ReviewClick";
import Avatar from "@mui/material/Avatar";
import { Button, Progress } from "reactstrap";
import { Grid, Popup } from "semantic-ui-react";
import StackedBarChart from "./stackedBarChart";
import FeedbackBar from "./progressbar";
import { selectUser, getGatewayStatus } from "app/store/userSlice";
import { fetchDashboard } from "src/actions/dataActions";
import { useSelector } from "react-redux";

const Product = () => {
  const user = useSelector(selectUser);
  const companyIds = useSelector((state) => state.companies.ids);
  const [value, setValue] = useState(4);
  const chartContainerRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);


  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const getColumnClasses = (itemCount) => {
    switch (itemCount) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      default:
        return "grid-cols-4";
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetchDashboard(`${companyIds[0]}`);
        setDashboardData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (chartContainerRef.current && dashboardData) {
      const ctx = chartContainerRef.current.getContext("2d");
      const positive =
        dashboardData?.overAllRating?.ratingTypes[0]?.positive ?? 0;
      const comments =
        dashboardData?.overAllRating?.ratingTypes[0]?.comments ?? 0;
      const negative =
        dashboardData?.overAllRating?.ratingTypes[0]?.negative ?? 0;
      const feedbackChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Comments", "Negative"],
          datasets: [
            {
              label: "Feedback",
              data: [positive, comments, negative],
              backgroundColor: ["#5C9D4C", "#FBB138", "#E44D4D"],
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
          elements: {
            arc: {
              borderRadius: 5, 
            },
          },
        },
      });

      return () => feedbackChart.destroy();
    }
  }, [dashboardData]);

  return (
    <>
      {!dashboardData?.chartData.length != 0 ? (
        <>
        <div className="flex flex-col justify-center items-center h-[70vh] text-3xl text-grey-500">
              <img src="assets/images/logo/Nodatafound.png" />
              <h1 className="text-gray-700 font-medium text-2xl items-center mt-[20px] ml-[15px]">
                No Data found
              </h1>
            </div>
        </>
      ) : (
        <div>
          <div
            className="flex justify-end w-full shadow-md"
            style={{ backgroundColor: "#FFFFFF", minHeight: 40 }}
          >
            <Button
              className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6 flex"
              onClick={userMenuClick}
              color="inherit"
            >
              <div className="hidden md:flex flex-col mx-4 items-end">
                <Typography component="span" className="font-semibold flex">
                  {user.data.given_name}
                </Typography>
                <Typography
                  className="text-11 font-medium capitalize"
                  color="text.secondary"
                >
                  {user?.data?.userTypeName}
                </Typography>
              </div>
              <Avatar className="md:mx-4">{user.data.given_name}</Avatar>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <h1>Loading...</h1>
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid spacing={4} gap-[20px] xl:gap-[32px] grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-[30px] xl:p-[48px] items-center w-full">
                <div
                  className="rounded-[20px] p-[20px] md:min-h-[390px] sm:min-h-[250px] sm:min-w-[200px] shadow-md sm:col-span-1 md:col-span-1 lg:col-span-1"
                  style={{ backgroundColor: "#FAFBFD" }}
                >
                  <div className="sm:text-[40px] lg:text-[16px] xl:text-[20px] font-500 ">
                    OVERALL RATING
                  </div>

                  <div className="flex flex-row justify-around mb-[25px] xl:mb-[35px] gap-[10px]">
                    <div className="flex flex-col item-center align-middle justify-center w-[55%] ">
                      <h3 className="text-center font-500 text-[40px] xl:text-[56px]">
                        {dashboardData?.overAllRating?.overAllRating || "-"}
                      </h3>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        className="pb-[5px] lg:icon-size-20 xl:icon-size-24 justify-center sm:justify-start"
                      />
                      <div className="flex flex-row items-baseline gap-[5px] justify-center">
                        <h2 className="font-bold text-[14px] xl:text-[20px] lg:[6px] xl:pt-[8px]">
                          {dashboardData?.overAllRating?.totalReviews || "-"}
                        </h2>
                        <h5 className="text-[10px] xl:[14px]">Reviews</h5>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center w-[45%] items-center ">
                      <div className="flex flex-row gap-[2px] justify-center">
                        <MovingIcon className="text-[#5C9D4C]" />
                        <p>
                          {dashboardData?.overAllRating?.starThisWeek || "-"}
                        </p>
                      </div>
                      <p className="lg:text-[11px] xl:text-[14px] font-400">
                        This week
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-[15px] ">
                    <div className="relative w-full max-w-md h-64 lg:h-96">
                      <canvas
                        className="z-index z-9999 absolute"
                        ref={chartContainerRef}
                        id="feedbackChart"
                      ></canvas>
                      <div className="z-index z-0 absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pt-[10px]">
                        <img
                          src="assets/images/dashboard/Google.png"
                          alt="Google1"
                          className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                        />
                        <span className="text-xs md:text-sm font-medium pb-[20px] pt-[5px]">
                          Google
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center items-center w-full mt-10 gap-10">
                      <div id="positive" className="mx-2 text-center">
                        <span className="text-xl md:text-xl text-[#5C9D4C]">
                          {
                            dashboardData?.overAllRating?.ratingTypes[0]
                              ?.positive
                          }
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 block">
                          Positive
                        </span>
                      </div>
                      <div id="comments" className="mx-2 text-center">
                        <span
                          className="text-xl md:text-xl"
                          style={{ color: "#FBB138" }}
                        >
                          {
                            dashboardData?.overAllRating?.ratingTypes[0]
                              ?.comments
                          }
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 block">
                          Comments
                        </span>
                      </div>
                      <div id="negative" className="mx-2 text-center">
                        <span
                          className="text-xl md:text-xl"
                          style={{ color: "#E44D4D" }}
                        >
                          {
                            dashboardData?.overAllRating?.ratingTypes[0]
                              ?.negative
                          }
                        </span>
                        <span className="text-xs md:text-sm text-gray-500 block">
                          Negative
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-grow sm:col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-20 min-h-[385px]">
                  {Object.keys(dashboardData?.locations || {}).map(
                    (locationKey, index) => {
                      const location = dashboardData.locations[locationKey];
                      return (
                        <div
                          key={index}
                          className="rounded-[20px] p-[20px] shadow-md rounded-16 min-w-[185px] min-h-[180px] bg-[#FAFBFD] flex flex-col"
                        >
                          <div className="flex justify-start items-center w-full">
                            <div className="flex flex-col">
                              <div className="font-roboto font-medium text-base w-[79px]">
                                {locationKey.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="">
                              <h3 className="text-center font-500 text-[32px] xl:text-[]">
                                {location?.overAllRating}
                              </h3>
                            </div>
                            <div>
                              <Rating
                                name="half-rating-read"
                                value={Number(location?.overAllRating)}
                                readOnly
                                precision={0.5}
                                className="icon-size-16"
                              />
                              <div className="flex flex-row items-baseline gap-[5px] justify-center">
                                <h3 className="font-bold text-[14px] xl:text-[20px] lg:[6px] xl:pt-[8px]">
                                  {location?.totalReviews || "0"}
                                </h3>
                                <h6 className="text-[10px] xl:[14px]">
                                  Reviews
                                </h6>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                              <div className="flex flex-row gap-[2px] justify-center">
                                <MovingIcon className="text-[#5C9D4C]" />
                                <p>{location?.starThisWeek.toFixed(2)}</p>
                              </div>
                              <p className="lg:text-[11px] xl:text-[14px] font-400">
                                This week
                              </p>
                            </div>
                          </div>

                          <div className="relative w-full max-w-md h-64 lg:h-24">
                            {hover && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  left: 80,
                                }}
                              >
                                <Popup
                                  content="Add users to your feed"
                                  trigger={<div>20%</div>}
                                />
                              </div>
                            )}
                            <div style={{ padding: "3px" }}>
                              <FeedbackBar
                                positive={Number(
                                  location?.ratingTypes?.positive || 0
                                )}
                                comments={Number(
                                  location?.ratingTypes?.comments || 0
                                )}
                                negative={Number(
                                  location?.ratingTypes?.negative || 0
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row mt-5 gap-10 justify-between w-fill">
                            <div
                              id="positive"
                              className="mx-2 text-center flex-1"
                            >
                              <span className="text-lg xs:text-2xl md:text-lg text-[#5C9D4C]">
                                {location?.ratingTypes?.positive}
                              </span>
                              <span className="text-xs md:text-xs text-gray-500 block">
                                Positive
                              </span>
                            </div>
                            <div
                              id="comments"
                              className="mx-2 text-center flex-1"
                            >
                              <span
                                className="text-lg xs:text-2xl md:text-lg"
                                style={{ color: "#FBB138" }}
                              >
                                {location?.ratingTypes?.comments}
                              </span>
                              <span className="text-xs md:text-xs text-gray-500 block">
                                Comments
                              </span>
                            </div>
                            <div
                              id="negative"
                              className="mx-2 text-center flex-1"
                            >
                              <span
                                className="text-lg xs:text-2xl md:text-lg"
                                style={{ color: "#E44D4D" }}
                              >
                                {location?.ratingTypes?.negative}
                              </span>
                              <span className="text-xs md:text-xs text-gray-500 block">
                                Negative
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div
                  className="rounded-[20px] p-[20px] min-h-[385px] shadow-md sm:col-span-1 md:col-span-1 lg:col-span-1"
                  style={{ backgroundColor: "#FAFBFD" }}
                >
                  <ReviewClick data={dashboardData?.reviewReplyRate} />
                </div>
              </div>
              <div>
                <Grid container spacing={2} className="overflow-x-scroll">
                  <Grid
                    item
                    md={12}
                    xs={12}
                    className="rounded-[20px] p-[20px] h-[424px] shadow-md min-w-full"
                    style={{ backgroundColor: "#FAFBFD" }}
                  >
                    <h2 className="font-roboto font-medium text-lg">
                      Reviews Volume{" "}
                    </h2>
                    <StackedBarChart chartData={dashboardData?.chartData} />
                  </Grid>
                </Grid>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[70vh] text-3xl text-grey-500">
              <img src="assets/images/logo/Nodatafound.png" />
              <h1 className="text-gray-700 font-medium text-2xl items-center mt-[20px] ml-[15px]">
                No Data found
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
