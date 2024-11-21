import React, { useState } from "react";
import { Button, TextField, Tooltip } from "@mui/material";

const Googleform = () => {
  const [googleform, setGooglefor] = useState({
    name:"",
    email:"",
    phone:"",
    key:""
  });

  const handleChange=(name,e)=>{
   setGooglefor({
    ...googleform,
    [name] : e.target.value
   })
  
  }

  const handleSubmit=()=>{
 console.log(googleform,"googleform")
  }

  return (
    <div>
      <div className="flex justify-start flex-col items-center  gap-40 mt-8 mb-16">
        <div className=" flex flex-col w-1/2 md:w-3/5 gap-10">
          <TextField
            required
            id="outlined-required"
            label="Enter Name"
            type="text"
            size="small"
            className="w-full"
            value={googleform.name}
            onChange={(e) => handleChange("name",e)}
          />
          <TextField
            required
            id="outlined-required"
            label="Enter Email"
            type="text"
            size="small"
            className="w-full"
            value={googleform.email}
            onChange={(e) => handleChange("email",e)}
          />
          <TextField
            required
            id="outlined-required"
            label="Enter Phone Number"
            type="text"
            size="small"
            className="w-full"
            value={googleform.phone}
            onChange={(e) => handleChange("phone",e)}
          />
          <TextField
            required
            id="outlined-required"
            label="Enter Authentication Key"
            type="text"
            size="small"
            className="w-full"
            value={googleform.key}
            onChange={(e) => handleChange("key",e)}
          />
        </div>
        <div className="flex w-full justify-end items-end gap-10 mt-12">
          <Button
            style={{ borderRadius: 8 }}
            className=""
            to="#"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            style={{ borderRadius: 8 }}
            className=""
            to="#"
            variant="contained"
            //   color="primary"
            // onClick={() => handleReviewSubmit()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Googleform;
