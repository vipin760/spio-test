import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lighten, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import Navbar from "../../Navbar/Navbar";
import DatePicker from "./DateRangePicker";
import { format } from "date-fns";
import categories from "../../../../static.json";

const Product = (props) => {
  const [selectedDate, setSelectedDate] = useState(dayjs("2022-04-17"));
  const [totalRating, setTotalRating] = useState(324);
  const [userType, setUserType] = useState("");
  const theme = useTheme();
  //
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [openDaterang, setOpenDateRange] = useState(false);
  const [endDate, setEndDate] = useState(null);

  const { datePeriods } = categories;

  // Format the date range for display
  const formatDateRange = (start, end) => {
    if (start && end) {
      return `${format(start, "MM/dd/yyyy")} - ${format(end, "MM/dd/yyyy")}`;
    }
    return "Select range...";
  };

  const handleConfirm = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setOpenDateRange(false);
  };

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setOpenDateRange(false);
    setUserType("1");
  };

  // charts
  const chartOptions = {
    chart: {
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "100%",
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#FBE38E", "#9A89FF"], // Average Rate Growth, Reviews Growth
    dataLabels: {
      enabled: false,
      enabledOnSeries: false,
      background: {
        borderRadius: 5,
        borderWidth: 1,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      line: {
        markers: {
          size: 10,
          shape: "circle",
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 0.75,
        },
      },
    },
    stroke: {
      width: [3, 3],
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return `<div style="text-align: left; padding: 10px; ">
                        <span style="color:${w.config.colors[seriesIndex]}">${w.globals.seriesNames[seriesIndex]}:</span> ${w.globals.series[seriesIndex][dataPointIndex]}
                    </div>`;
      },
      theme: theme.palette.mode,
    },
    xaxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -16,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      axisBorder: {
        show: true,
      },
      tickAmount: 10,
      min: -1000,
      max: 1000,
      tickPositions: [
        -1000, -800, -600, -400, -200, 0, 200, 400, 600, 800, 1000,
      ],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
      markers: {
        width: 35,
        height: 16,
        radius: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      formatter: function (seriesName, opts) {
        return `<div style="font-size: 12px; text-align: left; padding: 5px; ">
                      <span style="color: black">${seriesName}</span>
                  </div>`;
      },
    },
  };
  const chartSeries = [
    {
      name: "Average Rate Growth",
      data: [-900, 900, 400, 100, -100, -300, 0],
    },
    {
      name: "Reviews Growth",
      data: [-900, -500, -700, -500, -200, -500, 0],
    },
  ];

  return (
    <div>
      <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
      <div className="p-[20px] sm:p-[48px]">
        <h1 className="font-jakarta-sans font-500 text-black font-plus mb-[16px]">
          Analytics
        </h1>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 md:w-2/4">
            <p className="font-500 text-#6B6B6B text-[16px]">
              Monitor how your online reputation is improving over time. The
              reported data is updated once a day
            </p>
          </div>
          <div className="flex flex-row items-center w-full sm:w-1/2 md:w-2/4  gap-[15px]">
            <Button
              className="flex text-white bg-red rounded-[8px] hover:bg-red-900 hover:text-white hover:no-underline"
              variant="contained"
            >
              Reload
            </Button>
            <FormControl className="w-full md:w-1/2">
              <InputLabel id="page-select">Choose the initial page</InputLabel>
              <Select
                labelId="page-select"
                id="page-select"
                value={userType}
                label="Choose the initial page"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              >
                {datePeriods.map((period) => (
                  <MenuItem key={period.id} value={period.value}>
                    {period.name}
                  </MenuItem>
                ))}
                <MenuItem
                  value="2"
                  onClick={() => {
                    setOpenDateRange(true);
                  }}
                >
                  {userType == 2
                    ? formatDateRange(startDate, endDate)
                    : "Custom"}
                </MenuItem>
              </Select>
              {openDaterang && (
                <div>
                  <DatePicker
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                </div>
              )}
            </FormControl>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  mt-[35px]  gap-[35px]">
          <div
            className=" w-full sm:w-2/3 md:w-1/3 rounded-[32px]"
            style={{
              boxShadow: "0 4px 6px rgba(14, 31, 53, 0.25)",
              backgroundColor: "#FAFBFD",
            }}
          >
            <div className="flex flex-col   p-[35px]">
              <p className="text-[18px] mb-7">
                Since {selectedDate.format("MMMM DD YYYY")}
              </p>
              <h1 className="text-[24px] font-bold">New Public Reviews</h1>
              <h1 className="text-[50px]">+ {totalRating}</h1>
            </div>
            <div
              style={{
                borderBottom: "2px solid black",
                marginLeft: "35px",
                marginRight: "35px",
              }}
            ></div>
            <div className="flex flex-col  p-[30px]">
              <p className="text-[16px] mb-4 font-500">
                Number of New Public Reviews
              </p>
              <div className="flex items-center flex-row p-3 gap-2">
                <p>5</p>
                <p>Star</p>
                <Rating
                  name="customized-11"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
                <div
                  className="border border-grey-900"
                  style={{
                    width: "300px",
                    height: "10px",
                    border: "1px solid #000",
                  }}
                >
                  <div
                    style={{
                      width: `${(324 / totalRating) * 100}%`,
                      height: "100%",
                      background: "#FFC107",
                    }}
                  ></div>
                </div>
                (115)
              </div>

              <div className="flex items-center p-5 gap-2">
                <p>4</p>
                <p>Star</p>
                <Rating
                  name="customized-11"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
                <div
                  className="border border-grey-900"
                  style={{
                    width: "300px",
                    height: "10px",
                    border: "1px solid #000",
                  }}
                >
                  <div
                    style={{
                      width: `${(0 / totalRating) * 100}%`,
                      height: "100%",
                      background: "#FFC107",
                    }}
                  ></div>
                </div>
                (0)
              </div>
              <div className="flex items-center p-5 gap-2">
                <p>3</p>
                <p>Star</p>
                <Rating
                  name="customized-11"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
                <div
                  className="border border-grey-900"
                  style={{
                    width: "300px",
                    height: "10px",
                    border: "1px solid #000",
                  }}
                >
                  <div
                    style={{
                      width: `${(0 / totalRating) * 100}%`,
                      height: "100%",
                      background: "#FFC107",
                    }}
                  ></div>
                </div>
                (0)
              </div>

              <div className="flex items-center p-5 gap-2">
                <p>2</p>
                <p>Star</p>
                <Rating
                  name="customized-11"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
                <div
                  className="border border-grey-900"
                  style={{
                    width: "300px",
                    height: "10px",
                    border: "1px solid #000",
                  }}
                >
                  <div
                    style={{
                      width: `${(0 / totalRating) * 100}%`,
                      height: "100%",
                      background: "#FFC107",
                    }}
                  ></div>
                </div>
                (0)
              </div>
              <div className="flex items-center p-5 gap-2">
                <p>1</p>
                <p>Star</p>
                <Rating
                  name="customized-11"
                  defaultValue={1}
                  max={1}
                  readOnly
                />
                <div
                  className="border border-grey-900"
                  style={{
                    width: "300px",
                    height: "10px",
                    border: "1px solid #000",
                  }}
                >
                  <div
                    style={{
                      width: `${(0 / totalRating) * 100}%`,
                      height: "100%",
                      background: "#FFC107",
                    }}
                  ></div>
                </div>
                (0)
              </div>
            </div>
          </div>
          <div
            className="flex justify-center w-full md:w-2/3  p-[30px] rounded-[32px]"
            style={{
              boxShadow: "0 4px 6px rgba(14, 31, 53, 0.25)",
              backgroundColor: "#FAFBFD",
            }}
          >
            <ReactApexChart
              className="flex-auto w-full "
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={350}
            />
          </div>
        </div>
        <div
          className="  p-[30px] mt-[35px] rounded-[32px]"
          style={{
            boxShadow: "0 4px 6px rgba(14, 31, 53, 0.25)",
            backgroundColor: "#FAFBFD",
          }}
        >
          <h1 className="text-[24px] pb-[20px] font-500">Review Funnel</h1>
          <div className="grid gap-20 grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div
              className="rounded-[20px]  p-[30px] shadow-md"
              style={{ backgroundColor: "#FAFBFD" }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Invites Sent</h1>
                <h1 className="text-2xl font-semibold">1</h1>
              </div>
            </div>

            <div
              className="rounded-[20px] p-[30px] shadow-md"
              style={{ backgroundColor: "#FAFBFD" }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Total Unique Visits</h1>
                <h1 className="text-2xl font-semibold">1</h1>
              </div>
            </div>

            <div
              className="rounded-[20px] p-[30px] shadow-md"
              style={{ backgroundColor: "#FAFBFD" }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">
                  QR Code Unique Visits
                </h1>
                <h1 className="text-2xl font-semibold">1</h1>
              </div>
            </div>

            <div
              className="rounded-[20px] p-[30px] shadow-md"
              style={{ backgroundColor: "#FAFBFD" }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">New Public Reviews</h1>
                <h1 className="text-2xl font-semibold">1</h1>
              </div>
            </div>

            <div
              className="rounded-[20px] p-[30px]  shadow-md"
              style={{ backgroundColor: "#FAFBFD" }}
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Negative Feedback</h1>
                <h1 className="text-2xl font-semibold">1</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
