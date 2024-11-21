import React, { useState } from "react";
import "../review.css";
import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Switch, TextField } from "@mui/material";
import moment from "moment";
import ReplayIcon from "@mui/icons-material/Replay";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { fetchReviews } from "app/store/fuse/reviewSlice";
import categories from "../../../../static.json";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../../Analytics/Product/DateRangePicker";
import { apiClient } from "app/configs/apiClient";
import { message } from 'antd';

const Filters = ({ handleChange1, checked1, setSelectedDate, review }) => {
  const methods = useFormContext();
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isAnswer, setIsAnswer] = useState("");
  const [sources, setSources] = useState("");
  const [openDaterang, setOpenDateRange] = useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dates, setDates] = useState("");
  const { control, formState, getValues, setValue } = methods;
  const [isActive, setIsActive] = useState(false);
  const [companyId] = useSelector((state) => state.companies.ids);
  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );
  const { source, answerStatus, datePeriods } = categories;

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();



  const handleFilter = () => {
    console.log({ date: moment(endDate).add(1, "days") });
    setSelectedDate(dates)
    let data = {
      search: searchText,
      startDate: startDate,
      endDate: endDate ? moment(endDate).format() : endDate,
      isAnswered: isAnswer,
      datePeriod: dates,
      source: sources,
      institutionGatewayDetailId: !checked1 ? institutionGatewayDetailId : "",
    };

    dispatch(
      fetchReviews({
        page: page,
        limit: rowsPerPage,
        data,
        url: `/reviews/`,
      })
    );
    setStartDate(null), setEndDate(null);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 100);
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
    setSources("1");
  };

  const formatDateRange = (start, end) => {
    if (start && end) {
      return `${format(start, "MM/dd/yyyy")} - ${format(end, "MM/dd/yyyy")}`;
    }
    return "Select range...";
  };


  const handleSyncSave = async () => {
    try {
      const response = await apiClient().post(`/google/business/sync_reviews`, {
        platform_id: 1,
        gateway_details_id: institutionGatewayDetailId
      }).then((res) => {
        console.log("res", res?.status);

        messageApi
          .open({
            type: res?.status == 200 ? 'success' : info,
            content: res?.data?.message,
            duration: 2,
          })
      })
    } catch (error) {
      toast.error("Error for post data");
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="mb-[30px]">
        <div className="flex justify-end lg:mr-[116px] xl:mr-[170px] ">
          <h6>Assessment</h6>
        </div>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={12} md={4} lg={1.7}>
            <div className="flex flex-row items-center">
              <Switch
                checked={checked1}
                onChange={handleChange1}
                inputProps={{ "aria-label": "Toggle switch" }}
              />
              <div className="mt-10 text-xs font-semibold">All Businesses</div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={1.8}>
            <TextField
              id="outlined-password-input"
              type="Search"
              size="small"
              autoComplete="current-password"
              variant="outlined"
              placeholder="Search"
              className="w-full"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={1.8}>
            <Controller
              name=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  popupIcon={<ArrowDropDownIcon />}
                  size="small"
                  value={value}
                  options={source}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.value : null);
                    setSources(newValue ? newValue.value : null);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sources"
                      InputLabelProps={{
                        style: { fontFamily: "Roboto", color: "#3E3E3E" },
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={1.8}>
            <Controller
              name="isAnswer"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  popupIcon={<ArrowDropDownIcon />}
                  options={answerStatus}
                  getOptionLabel={(option) => option.name}
                  size="small"
                  value={value}
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.isAnswer : "");
                    setIsAnswer(newValue ? newValue.isAnswer : "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Answer" />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={1.8}>
            <FormControl className="w-full h-[40px]">
              <InputLabel id="page-select">Date</InputLabel>
              <Select
                labelId="page-select"
                id="page-select"
                value={dates}
                label="Choose the initial page"
                onChange={(e) => {
                  setDates(e.target.value);
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
                  {sources == 2
                    ? formatDateRange(startDate, endDate)
                    : "Custom"}
                </MenuItem>
              </Select>
              {openDaterang && (
                <div className="z-99">
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
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={1.8}>
            <div className="flex flex-row gap-5">
              <div>
                <Button
                  sx={{
                    width: 40,
                    border: "1.8px solid rgba(22, 22, 20, 0.1)",
                    borderRadius: 1, // This is the theme's shape.borderRadius unit
                    padding: 0, // Reducing padding might help maintain the smaller width
                    minWidth: 0, // Important if the default min-width is too large
                  }}
                >
                  <img
                    src="assets/images/logo/ThumbsUp.png"
                    style={{ width: 16 }}
                  />
                </Button>
              </div>
              <div className="">
                {/* <Button variant="outlined" className="rounded-6"> */}
                <Button
                  sx={{
                    width: 40,
                    border: "1.8px solid rgba(22, 22, 20, 0.1)",
                    borderRadius: 1, // This is the theme's shape.borderRadius unit
                    padding: 0, // Reducing padding might help maintain the smaller width
                    minWidth: 0, // Important if the default min-width is too large
                  }}
                >
                  <img
                    src="assets/images/logo/ThumbsDown.png"
                    style={{ width: 16 }}
                  />
                </Button>
              </div>

              {
                !checked1 && review?.length != 0 ?

                  <div className="">
                    <button
                      style={{
                        borderRadius: "10px",
                        background: "#F30002",
                        color: " #FFFFFF",
                        width: "70px",
                        fontSize: "16px",
                      }}
                      className={`h-[40px] bg-red text-white ${isActive ? "button-active" : ""
                        } '&:hover': { backgroundColor: 'transparent'`}
                      onClick={() => handleSyncSave()}
                    >
                      Synch
                    </button>

                  </div> : ''
              }

              <div className="">
                <button
                  style={{
                    borderRadius: "10px",
                    background: "#F30002",
                    color: " #FFFFFF",
                    width: "87px",
                    fontSize: "16px",
                  }}
                  className={`h-[40px] bg-red text-white ${isActive ? "button-active" : ""
                    } '&:hover': { backgroundColor: 'transparent'`}
                  onClick={() => handleFilter()}
                >
                  <ReplayIcon />
                  Reload
                </button>


              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Filters;
