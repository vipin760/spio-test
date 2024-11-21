import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const Sms = () => {
  const [templateData, setTemplateData] = useState({
    sender: "SPIOLABS",
    message: "Hi Name,\nThanks for choosing us. We ask you to leave us a review.\n\nYour link",
  });
  const[data,setData] = useState({})

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    // Implement your save template logic here using templateData
    console.log("Template Saved:", templateData);
    setIsSaved(true);
    setData(templateData)
  };

  const handleChange = (field, value) => {
    setTemplateData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  

  return (
    <div className="m-[35px]">
      <h1 className="pb-[25px]">Edit Template</h1>
      <div className="flex flex-col sm:flex-row p-[35px] rounded-[32px] gap-[30px]" style={{ backgroundColor: "#FAFBFD" }}>
        <div className="flex justify-center w-full sm:w-2/5 h-[450px] gap-[30px] md:gap-[20px]">
          <img src="assets/images/settingTemplates/mobile.png" alt="" />
          <div className="flex absolute flex-col max-w-[195px] p-[15px] mt-[50px]">
            <h2 id="senderHeading" className="font-bold">
              {data.sender}
            </h2>
            <p id="messageParagraph" className="fontSize text-10 font-500 p-[10px]" style={{ backgroundColor: "#E6E7E9" }}>
              {data.message}
              <p className="text-red-500">Your link</p>
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-3/5">
          <p className="pt-[30px]">Team has good understanding and capabilities in Al</p>
          <TextField
            size="small"
            required
            id="outlined-required"
            label="Customize the sender"
            placeholder="SPIOLABS"
            className="mt-[30px] w-full sm:w-1/3"
            value={templateData.sender}
            onChange={(e) => handleChange("sender", e.target.value)}
          />
          <div className="flex flex-col sm:flex-row mt-[30px] gap-[20px]">
            <TextField
              id="outlined-multiline-static"
              label="Customize the message"
              multiline
              rows={5}
              value={templateData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full sm:w-1/2"
            />
            <div className="flex flex-col">
              <p>Insert</p>
              <div className="flex flex-row text-red gap-[20px] mt-[12px]">
                <p>Your link</p>
                <p>Name</p>
                <p>Company name</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSaveTemplate}
            className="mt-[25px] w-full sm:w-2/4  md:w-1/4 rounded-[8px]  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
            variant="contained"
          >
            Save template
          </Button>
          {isSaved && (
            <div className="mt-[25px] p-[10px] bg-green-100 rounded-[8px]">
              <p className="text-green-800">Template Saved!</p>
              <p>Sender: {templateData.sender}</p>
              <p>Message: {templateData.message}</p>
            </div>
          )}
          <p className="mt-[40px] font-sans font-semibold ">Send a test message</p>
          <div className="flex flex-col sm:flex-row gap-[20px] md:gap-[40px] items-center">
            <TextField size="small" id="outlined-required" label="Name" placeholder="John" className="mt-[25px] w-full sm:w-1/3" />
            <TextField
              size="small"
              id="outlined-required"
              label="Number"
              placeholder="+91 XXXXX XXXXX"
              className="mt-[25px] w-full sm:w-1/3"
            />
            <Button
              className="mt-[25px] w-full sm:w-1/3 md:w-1/4 rounded-[8px] py-[20px]  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
              variant="contained"
            >
              Send test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sms;
