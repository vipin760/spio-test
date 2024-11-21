import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Rating from "@mui/material/Rating";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import { Switch, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import copy from "clipboard-copy";

const Card = [
  {
    name: "Mahmoud Adebe",
    date: "January 20, 2024",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    name: "Mahmoud Adebe 2",
    date: "January 20, 2020",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const Corousel = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyValue, setCopyValue] = useState(
    "<div id='wid_1706269075097'></div>"
  );
  const copyValueRef = useRef();

//   const handleCopyClick = async () => {
//     try {
//       console.log({ copyValue });
//       await copy(copyValue);
//       setIsCopied(true);
//     } catch (error) {
//       console.error("Error copying to clipboard", error);
//     }
//   };
  const handleCopyClick = async () => {
    try {
        console.log({ copyValue });
              await copy(copyValue);
              setIsCopied(true);
    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
  };
  const handleChange2 = () => {
    setChecked2((prev) => !prev);
  };
  const handleChange3 = () => {
    setChecked3((prev) => !prev);
  };
  const handleChange4 = () => {
    setChecked4((prev) => !prev);
  };
  const handleChange5 = () => {
    setChecked5((prev) => !prev);
  };
  const handleChange6 = () => {
    setChecked6((prev) => !prev);
  };

  const onChange = (event) => {
    console.log({ target: event.target });
    setCopyValue(event.target.value);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = Card.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className="m-[20px] sm:m-[30px]">
      <div className="flex flex-col">
        <h1 className="">Your Website Widgets</h1>
        <p className="py-[20px] w-full sm:w-3/5">
          Widgets only show 4 and 5 star reviews with text. Share these widgets
          on your website to communicate trust and increase conversions. Copy
          the code and paste it into your website as an HTML element. If you
          want to remove a review from the widgets you can do it from the
          Reviews section, by clicking on Remove from widgets
        </p>
      </div>
      <div
        style={{ backgroundColor: "#FAFBFD" }}
        className="flex justify-center flex-col items-center"
      >
        <div>
          <div className="flex flex-row justify-center items-center p-[40px] gap-[13px]">
            <img src="assets/images/widgets/google.png" alt="google" />
            <p> 5.0 </p>
            <img src="assets/images/widgets/start.png" alt="start" />
          </div>
          <div className="flex justify-center">
            <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
              <Paper
                square
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: 0,
                  pl: 2,
                  bgcolor: "background.default",
                }}
              >
                <Typography>{Card[activeStep].label}</Typography>
              </Paper>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {Card.map((step, index) => (
                  <div key={index}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <div
                        className="flex flex-col p-[30px]"
                        style={{ backgroundColor: "#FFFFFF" }}
                      >
                        <div className="flex flex-row w-[100%] items-center ">
                          <div className="flex justify-start w-[100%]">
                            <img
                              src="assets/images/widgets/man.png"
                              alt="google rewiew image"
                            />
                            <div className="flex flex-col ju">
                              <h2>{step.name}</h2>
                              <p>{step.date}</p>
                            </div>
                          </div>
                          <img
                            className="w-fit h-fit"
                            src="assets/images/widgets/image 22.png"
                            alt=""
                          />
                        </div>
                        <Rating
                          className="flex justify-start py-[15px]"
                          name="half-rating"
                          defaultValue={2.5}
                          precision={0.5}
                        />
                        <p>
                          Team has good understanding and capabilities in Al
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                style={{ backgroundColor: "#FAFBFD" }}
                className="flex justify-center items-center"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                // nextButton={
                //   <Button
                //     size="small"
                //     onClick={handleNext}
                //     disabled={activeStep === maxSteps - 1}
                //   >
                //     Next
                //     {theme.direction === "rtl" ? (
                //       <KeyboardArrowLeft />
                //     ) : (
                //       <KeyboardArrowRight />
                //     )}
                //   </Button>
                // }
                // backButton={
                //   <Button
                //     size="small"
                //     onClick={handleBack}
                //     disabled={activeStep === 0}
                //   >
                //     {theme.direction === "rtl" ? (
                //       <KeyboardArrowRight />
                //     ) : (
                //       <KeyboardArrowLeft />
                //     )}
                //     Back
                //   </Button>
                // }
              />
            </Box>
          </div>
        </div>
        <div className="flex flex-col w-fit items-center mb-[30px]">
          <Button
            size="small"
            className="rounded-lg w-fit mb-[10px]"
            variant="outlined"
          >
            Edit
          </Button>
          <img
            className="h-[28px]"
            src="assets/images/widgets/created.png"
            alt="created"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row  gap-[30px] mt-[30px] ">
        <div
          className="w-full sm:w-1/2 md:w-2/5 rounded-[30px] shadow-md p-[30px]"
          style={{ backgroundColor: "#FAFBFD" }}
        >
          <h1 className="pb-[30px]">Filters</h1>
          <div className="flex flex-col sm:flex-row  gap-[20px]">
            <div className="flex flex-col w-full sm:w-1/2 gap-[20px]">
              <div className="flex flex-row">
                <Switch
                  checked={checked1}
                  onChange={handleChange1}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>Remove "Verified By"</p>
              </div>
              <div className="flex flex-row">
                <Switch
                  checked={checked2}
                  onChange={handleChange2}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>Hide "Leave A Review"</p>
              </div>
              <div className="flex flex-row">
                <Switch
                  checked={checked3}
                  onChange={handleChange3}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>Hide Profile Photos</p>
              </div>
            </div>
            <div className="flex flex-col w-ful sm:w-1/2 gap-[20px]">
              <div className="flex flex-row">
                <Switch
                  checked={checked4}
                  onChange={handleChange4}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>Dark Mode</p>
              </div>
              <div className="flex flex-row">
                <Switch
                  checked={checked5}
                  onChange={handleChange5}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>Hide Scores</p>
              </div>
              <div className="flex flex-row">
                <Switch
                  checked={checked6}
                  onChange={handleChange6}
                  inputProps={{ "aria-label": "Toggle switch" }}
                />
                <p>All Businesses</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-full sm:w-2/3 md:w-3/5 p-[20px] h-2/3 rounded-[30px] shadow-md "
          style={{ backgroundColor: "#FAFBFD" }}
        >
          <TextField
            label="company"
            value={copyValue}
            onChange={onChange}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <>
                  <IconButton onClick={handleCopyClick} color="primary">
                    <FileCopyIcon style={{color:"black"}}/>
                  </IconButton>
                  {isCopied && (
                    <span style={{ color: "green", marginLeft: "10px" }}>
                      Copied!
                    </span>
                  )}
                </>
              ),
            }}
            inputRef={copyValueRef}
          />
          <p className="pt-[20px]" style={{ color: "#6B6B6B" }}>
            Copy this code and paste it as HTML element in your website
          </p>
        </div>
      </div>
    </div>
  );
};

export default Corousel;
