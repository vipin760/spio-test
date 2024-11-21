import { Button, Switch, TextField } from "@mui/material";
import React, { useState } from "react";

const Product = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
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
  return (
    <div className="mt-[10px] p-[20px] sm:mt-[40px] sm:p-[30px]">
      <h2 className="font-500 ">
        Send an automatic SMS reminder every 3 and/or 7 days if the customer did
        not leave a review.
      </h2>
      <div className="gap-[30px] flex-col flex sm:flex-row mt-[10px]">
      <div className="w-full sm:w-1/2 p-[30px] rounded-[30px] shadow-md" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="flex flex-row items-center">
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "Toggle switch" }}
          />
          <p>Trigger Reminders After 3 Day</p>
        </div>

          <div className="flex flex-col mt-[20px] gap-[20px]">
            <TextField
              id="outlined-multiline-static"
              label="Customize the message"
              multiline
              rows={5}
              defaultValue={`Hi Name,
Thanks for choosing us. We ask you to leave us a review.

Your link`}
              className="w-full sm:w-2/3"
            />
            <div className="flex flex-col mt-[30px] w-full sm:w-1/2">
              <p>Insert</p>
              <div className="flex flex-row text-red gap-[20px] mt-[12px]">
                <p>Your link</p>
                <p>Name</p>
                <p>Company name</p>
              </div>
            </div>
          </div>
          <Button
            className="mt-[25px]  rounded-[8px]  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
            variant="contained"
          >
            Save
          </Button>
      </div>
      <div className="w-full sm:w-1/2 p-[30px] rounded-[30px] shadow-md" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="flex flex-row items-center">
          <Switch
            checked={checked2}
            onChange={handleChange2}
            inputProps={{ "aria-label": "Toggle switch" }}
          />
          <p>Trigger Reminders After 7 Day</p>
        </div>

          <div className="flex flex-col mt-[20px] gap-[20px]">
            <TextField
              id="outlined-multiline-static"
              label="Customize the message"
              multiline
              rows={5}
              defaultValue={`Hi Name,
Thanks for choosing us. We ask you to leave us a review.
              
  Your link`}
              className="w-full sm:w-2/3"
            />
            <div className="flex flex-col mt-[30px] w-full sm:w-1/2">
              <p>Insert</p>
              <div className="flex flex-row text-red gap-[20px] mt-[12px]">
                <p>Your li  nk</p>
                <p>Name</p>
                <p>Company name</p>
              </div>
            </div>
          </div>
          <Button
            className="mt-[25px]  rounded-[8px]  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
            variant="contained"
          >
            Save
          </Button>
      </div>

      </div>
      <div className="flex flex-col w-full sm:w-4/5 mt-[30px] font-sans py-[20px]">
        <h2 className="font-sans font-500">Email notifications and replies</h2>
        <p>Get notified whenever you receive a new review on the integrated platforms, a negative feedback or a video testimonial. Edit the email your clients will reply to when receiving review requests.</p>
      </div>
      <div className="w-full md:w-2/4 flex flex-col md:flex-row gap-[25px] justify-center mt-[30px]">
      <div className="w-full sm:w-1/2 flex flex-col gap-[30px] rounded-[16px] p-[30px] shadow-md"style={{ backgroundColor: "#FAFBFD" }}>
        <div className="flex flex-row justify-start items-center">
          <Switch
            checked={checked3}
            onChange={handleChange3}
            inputProps={{ "aria-label": "Toggle switch" }}
          />
          <p>Notifications</p>
          </div>
          <TextField
            id="outlined-required"
          label="Email for notification"
          defaultValue="Kiran@spiolabs.com"
        />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col gap-[30px] rounded-[16px] p-[30px] shadow-md"style={{ backgroundColor: "#FAFBFD" }}>
        <div className="flex flex-row justify-start items-center">
          {/* <Switch
            checked={checked4}
            onChange={handleChange4}
            inputProps={{ "aria-label": "Toggle switch" }}
          /> */}
          <p className="p-[9px]">Replies</p>
          </div>
          <TextField
          id="outlined-required"
          label="Email for replies to review requests"
          defaultValue="Kiran@spiolabs.com"
        />
        </div>
      </div>
    </div>
  );
};

export default Product;


