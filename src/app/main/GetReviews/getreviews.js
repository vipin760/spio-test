import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Radio,
  FormControl,
  Checkbox,
  Divider,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/lab";
import moment from "moment";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, sendReviewRequest } from "app/store/fuse/getReviewSlice";
import { ExcelRenderer } from "react-excel-renderer";
import toast from "react-hot-toast";
import DownloadIcon from "@mui/icons-material/Download";

const GetReview = () => {
  const methods = useFormContext();
  const { control, formState, getValues, setValue } = methods;
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [mobileBox, setMobileBox] = useState([{ id: 1, mobNo: "" }]);
  const { mobileReviews, total_count } = useSelector(
    (state) => state.fuse.getReviews
  );
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [messageToggle, setMessageToggle] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [extractedContactData, setExtractedContactData] = useState([]);
  const [companyId] = useSelector((state) => state.companies.ids);
  const createdBy = localStorage.getItem("userId");


  const [requestBodyData, setRequestBodyData] = useState(
    `Hi, thank you for choosing us! We value your opinion. Could you spare a moment to share your feedback through the link "${process.env.REACT_APP_USEREVIEW_LINK}${createdBy}" Thanks!`
  );
  const dispatch = useDispatch();

  console.log(mobileReviews);

  useEffect(() => {
    dispatch(
      getReviews({
        page,
        limit: rowsPerPage,
        url: `/reviews/request-review?${createdBy}`,
      })
    );
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleReviewSubmit = () => {
    let contacts = [];
    mobileBox.map((mob) => {
      if (mob.mobNo != "") {
        contacts.push({
          mobile_number: mob.mobNo,
        });
      }
    });
    contacts.push(...extractedContactData);
    const invalidNumbers = contacts.filter(
      (data) => data.mobile_number.length !== 10
    );
    console.log(invalidNumbers, "invalidNumbers");
    if (invalidNumbers.length)
      return toast.error("Enter 10 digit mobile number");
    dispatch(
      sendReviewRequest({
        url: `/reviews/request-review?${createdBy}`,
        contacts,
        message_body: requestBodyData,
      })
    ).then((res) => {
      console.log({ submitResponse: res });
      if (res.error) {
        return toast.error("Something went wrong, Try again !!!");
      }
      const customDate = selectedDate
        ? moment(selectedDate).format("YYYY-MM-DD")
        : "";
      dispatch(
        getReviews({
          mob: mobileNumber,
          date: customDate,
          url: `/reviews/request-review?${createdBy}`,
        })
      );
      toast.success("Updated Successfully");
      setMobileBox([{ id: 1, mobNo: "" }]);
      setExtractedContactData([]);
      setUploadedFileName("");
      // setRequestBodyData("");
      setMessageToggle(false);
    });
  };

  const downloadExcelFile = () => {
    // Construct the download URL using PUBLIC_URL and the path to the Excel file
    const excelUrl =
      process.env.PUBLIC_URL +
      "https://spio-app-images.s3.ap-south-1.amazonaws.com/format.xlsx";

    // Create a link element
    const link = document.createElement("a");
    link.href = excelUrl;
    link.setAttribute("download", "format.xlsx"); // Specify the file name
    link.setAttribute(
      "type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ); // Specify the file type

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click event to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month}, ${day} ${year}`;
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        const modifyData = resp.rows?.slice(1).map((item, index) => {
          console.log({ item });
          return {
            mobile_number: `${item[0]}` || "",
          };
        });
        setExtractedContactData(modifyData);
      }
    });
    setUploadedFileName(file.name);
    console.log(file, file.name);
  };

  console.log({ extractedContactData });
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleAdd = (id) => {
    setMobileBox([...mobileBox, { id: mobileBox.length + 1, mobNo: "" }]);
  };

  const handleRemoveMobileBox = (id) => {
    const filterBox = mobileBox.filter((data) => data.id != id);
    setMobileBox(filterBox);
  };

  const handleChangeMobBox = (id, event) => {
    const input = event.target.value;
    console.log(input)
    // Restrict input to 10 digits
    if (/^\d{0,10}$/.test(input)) {
      let duplicate = mobileBox.find((data) => {
        return data.mobNo == input;
      });
      if (duplicate?.mobNo) {
        return toast.error("mobile number already exist");
      }
      const updatedMobileBox = mobileBox.map((mob) => {
        if (mob.id === id) {
          mob.mobNo = input;
        }
        return mob;
      });
      setMobileBox(updatedMobileBox);
    }
  };

  const sendFilteredData = ({ mob = mobileNumber, date = selectedDate }) => {
    const customDate = date ? moment(date).format("YYYY-MM-DD") : "";
    dispatch(
      getReviews({
        mob,
        date: customDate,
        url: `/reviews/request-review?${createdBy}`,
      })
    );
  };

  const handlemobChange = (e) => {
    const newValue = e.target.value.slice(0, 10);
    setMobileNumber(newValue);
    sendFilteredData({ mob: newValue });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    sendFilteredData({ date });
  };

  return (
    <>
      <h3 className="font-medium text-2xl font-sans">
        Request reviews via SMS
      </h3>
      <Grid container className="mt-20">
        <Grid
          item
          md={5}
          xs={12}
          className=" border-black bg-slate-50 border-y border-x p-[20px]"
          style={{ backgroundColor: "#fafbfd", borderRadius: 16, boxShadow: "0 1.98px 4.61px rgba(14, 31, 53, 0.25)", }}
        >
          {mobileBox.map((mob) => {
            console.log({ id: mob.id, length: mobileBox.length });
            return (
              <div className="flex justify-start items-center gap-14 mt-25 mb-16">
                <div style={{ width: "67%" }}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Mobile Number."
                    type="number"
                    size="small"
                    placeholder="+91"
                    className="w-full rounded  text-gray-800"
                    InputLabelProps={{
                      style: { fontFamily: "Roboto", color: "#3E3E3E" },
                    }}
                    error={mob.mobNo.length > 10}
                    helperText={
                      mob.mobNo.length > 10 && "Invalid mobile number"
                    }
                    value={mob.mobNo}
                    onChange={(e) => handleChangeMobBox(mob.id, e)}
                  />
                </div>
                <div className=" flex justify-row gap-14 ">
                  <Button
                    variant="outlined"
                    size="small"
                    className="rounded-4  min-w-8 h-[40px]"
                    onClick={() => handleAdd(mob.id)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={mob.id == 1}
                    className="rounded-4  min-w-10 min-h-10"
                    onClick={() => handleRemoveMobileBox(mob.id)}
                  >
                    <RemoveIcon />
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="flex w-full mb-20 mt-20  ">
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={4}
              value={requestBodyData}
              className="w-full mt-20 mb-10 "
              onChange={(e) => setRequestBodyData(e.target.value)}
              InputProps={{
                style: {
                  lineHeight: "2rem",
                  color: "#3E3E3E",
                  borderRadius: "8px",
                  borderColor: "#0E1F35",
                  fontFamily: "Roboto",
                },
              }}
              InputLabelProps={{
                style: { fontFamily: "Roboto", color: "#3E3E3E" },
              }}
            />
          </div>

          <Divider className="text-gray-600 mt-6">OR</Divider>

          {/* <div className="font-bold text-lg leading-7 tracking-wide">  Do you have Bulk Contacts</div> */}
          <div className="font-roboto font-semibold text-base leading-26px tracking-wide mt-20 mb-20">
            {" "}
            Do you have Bulk Contacts{" "}
          </div>

          <div className="flex gap-[20px] mb-20 mt-20">
            <div className="w-1/2">
              <Button
                variant="outlined"
                size="small"
                className="rounded-4 p-[10px] w-full gap-3"
                // href="/assets/files/document_format.xlsx"
                onClick={downloadExcelFile}
              >
                <DownloadIcon />
                Download CSV
              </Button>
            </div>
            <div className="flex w-1/2 ">
              <button
                style={{
                  border: "1px solid black",
                  padding: 10,
                  borderRadius: 6,
                }}
                className="button-upload w-full"
                onClick={handleClick}
              >
                <div className="flex justify-center">
                  {" "}
                  <img
                    className="mr-10"
                    src="assets/images/logo/uploadicon.png"
                  />{" "}
                  Upload a CSV{" "}
                </div>
              </button>
              <input
                style={{ display: "none" }}
                type="file"
                ref={hiddenFileInput}
                onChange={handleFileUpload}
              />
            </div>
          </div>
          {extractedContactData.length ? (
            <p className="text-green-400 font-medium">{`file uploaded: ${uploadedFileName}`}</p>
          ) : (
            ""
          )}
          <div className="flex justify-start mt-25">
            <Radio
              id="remember"
              className=" mb-24"
              fullWidth
              checked={messageToggle}
              onClick={() => setMessageToggle(!messageToggle)}
            />
            <Typography
              className=" font-medium"
              sx={{
                color: "#000000",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              I have consent to send messages to this contact
            </Typography>
          </div>
          <div className="flex justify-end flex-col mt-3 gap-3 md:flex-row md:gap-0 md:mt-0">
            <Button
              style={{ borderRadius: 8 }}
              className=""
              to="/registered_users/new"
              variant="contained"
              color="secondary"
              disabled={!messageToggle}
              onClick={() => handleReviewSubmit()}
            >
              Request a Review
            </Button>
          </div>
        </Grid>

        <Grid
          item
          md={6.7}
          xs={12}
          className=" border-black bg-slate-50 border-y border-x relative ml-[20px] pt-[20px] pl-[28px]"
          style={{ backgroundColor: "#fafbfd", borderRadius: 16, boxShadow: "0 1.98px 4.61px rgba(14, 31, 53, 0.25)", }}
        >
          <div className="text-base">
            <b>Request Sent History</b>
          </div>
          <div className="flex justify-between input-container  flex-col md:flex-row mb-3 mt-20">
            <div className="mt-20 font-bold"> S.No</div>
            <TextField
              className="mt-8 mb-16 pr-10 "
              required
              label="Mobile no."
              type="number"
              autoFocus
              id="sms"
              variant="outlined"
              error={mobileNumber.length > 10}
              size="small"
              value={mobileNumber}
              sx={{ width: "183px", borderRadius: "6px" }}
              onChange={handlemobChange}
            ></TextField>
            <Controller
              name=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  className="mt-8 pr-10"
                  views={["year", "month", "day"]}
                  label="Date"
                  value={moment(selectedDate).format("yyyy-MM-DD") || null}
                  inputFormat="yyyy-MM-dd"
                  onChange={(newValue) => {
                    const date = moment(newValue).format("yyyy-MM-DD");
                    onChange(date); // Update the value state with the selected date
                    handleDateChange(date); // Call handleDateChange with the selected date
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="mt-8 mr-12 pr-10"
                      size="small"
                      sx={{ width: "183px" }}
                    />
                  )}
                />
              )}
            />
          </div>

          <div>
            <Grid>
              <div className="mb-[50px]">
                {mobileReviews.length ? (
                  mobileReviews?.map((data, index) => (
                    <div
                      className="flex justify-between items-center"
                      key={data.id}
                    >
                      <div className="flex text-start w-[10%]">
                        <Typography
                          variant="subtitle2 flex justify-start "
                          sx={{ lineHeight: 3 }}
                        >
                          {/* {index + 1} */}
                          {(page - 1) * rowsPerPage + index + 1} 
                        </Typography>
                      </div>
                      <div className="flex text-start w-[40%] justify-start">
                        <Typography variant="subtitle2 flex  ">
                          {data.mob_number}
                        </Typography>
                      </div>
                      <div className="flex text-start w-[40%] justify-start">
                        <Typography variant="subtitle2 flex">
                          {formatDate(data.create_time)}
                        </Typography>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Data not found</div>
                )}
              </div>

              <div
                className="flex  items-center right-2 bottom-0 relative mt-3 justify-end"
                style={{ position: "absolute", bottom: 0 }}
              >
                <div className="sm:flex flex-row items-center gap-9 hidden">
                  <Typography>Rows per page:</Typography>
                  <Select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    className="w-70 h-40 px-2 py-1 rounded border border-gray-300" // Apply Tailwind classes
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </div>
                <div className="flex items-end justify-end ">
                  <TablePagination
                    component="div"
                    count={total_count || 20}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                  />
                </div>
              </div>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default GetReview;
