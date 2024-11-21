import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Navbar from "src/app/main/Navbar/Navbar";

const Product = () => {
  const [selectedColor, setSelectedColor] = useState("#6d2c2c");
  const [backgroundSelectedColor, setbackgroundSelectedColor] = useState("#aac5b7");
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
  };
  const handleBackgroundColorChange = (event) => {
    const newColor = event.target.value;
    setbackgroundSelectedColor(newColor);
  };

  return (
    <div>
      <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
      <div className="m-[35px]">
        <h1>Integrations</h1>
        <p className="w-full sm:w-3/4 pt-[15px]">
          Integrate the platforms where you receive or want to receive reviews.
          Connect wsith Google and Facebook directly via the login, so you can
          reply to reviews from the Public reviews section. For the other
          platforms, simply enter your page link to import reviews. We don’t
          import all the reviews but the most recent ones.
        </p>
        <div className="w-full md:w-2/4 flex sm:flex-row gap-[25px] justify-center mt-[30px]">
          <div
            className="w-1/2 flex flex-col justify-center items-center rounded-[16px] p-[30px] shadow-md"
            style={{ backgroundColor: "#FAFBFD" }}
          >
            <img
              className="w-[70px] h-[70px] mb-[15px]"
              src="assets/images/social/fb.png"
              alt="fb"
            />
            <p>Facebook</p>
            <Button
              className=" mt-[15px] px-[50px] rounded-[8px] flex justify-center  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
              variant="contained"
              size="small"
            >
              Connect
            </Button>
          </div>
          <div
            className="w-1/2 flex flex-col justify-center items-center rounded-[16px] p-[30px] shadow-md"
            style={{ backgroundColor: "#FAFBFD" }}
          >
            <img
              className="w-[70px] h-[70px] mb-[15px]"
              src="assets/images/social/insta.png"
              alt="fb"
            />
            <p>Instagram</p>
            <Button
              className=" mt-[15px] px-[50px] rounded-[8px] flex justify-center  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
              variant="contained"
              size="small"
            >
              Show more
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] sm:gap-0 sm:flex-row items-center justify-center content-center mt-[30px]">
          <div
            className="flex flex-col w-full sm:w-1/2 p-[30px] mt-[30px] shadow-md rounded-[30px]"
            style={{ backgroundColor: "#FAFBFD" }}
          >
            <p className="mb-[30px]">
              Team has good understanding and capabilities in Al
            </p>
            <div className="flex items-center mb-[30px]">
              <TextField
                id="colorInput"
                size="small"
                required
                label="Brand color"
                placeholder="SPIOLABS"
                className="w-full sm:w-1/2"
                value={selectedColor}
                InputProps={{
                  endAdornment: (
                    <React.Fragment>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                        className=""
                      />
                    </React.Fragment>
                  ),
                }}
              />
            </div>
            <div className="flex items-center mb-[30px]">
              <TextField
                id="colorInput"
                size="small"
                required
                label="Background color"
                placeholder="SPIOLABS"
                className="w-full sm:w-1/2"
                value={backgroundSelectedColor}
                InputProps={{
                  endAdornment: (
                    <React.Fragment>
                      <input
                        type="color"
                        value={backgroundSelectedColor}
                        onChange={handleBackgroundColorChange}
                        className=""
                      />
                    </React.Fragment>
                  ),
                }}
              />
            </div>
            <div className="flex flex-col mt-[20px] gap-[20px]">
              <TextField
                id="outlined-multiline-static"
                label="Text of the post"
                multiline
                rows={5}
                defaultValue="Thank you Name for your review on Source!
            “Text”
            See review: Review URL"
                className="w-full sm:w-1/2"
              />
              <div className="flex flex-col mt-[30px]">
                <p>Insert</p>
                <div className="flex flex-row text-red gap-[20px] mt-[12px]">
                  <p>Your link</p>
                  <p>Name</p>
                  <p>Company name</p>
                </div>
              </div>
            </div>
            <Button
              className="mt-[25px] w-full rounded-[8px]  text-white bg-red hover:bg-red-900 hover:text-white hover:no-underline"
              variant="contained"
            >
              Save
            </Button>
          </div>
          <div className="w-full sm:w-1/2 pl-[30px]">
            <div className="h-[600px] flex justify-start">
              <img src="assets/images/social/instafull.png" alt="instapage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
