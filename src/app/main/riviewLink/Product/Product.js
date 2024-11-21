import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Rating, Select, TextField, } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Navbar from "../../Navbar/Navbar";
import { fetchData, updateData } from "src/actions/dataActions";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { connect, useSelector } from "react-redux";
import { nanoid } from 'nanoid';

const userTypeList = [
  { id: 1, label: "Star Review", enabled: true },
  { id: 2, label: "Number Review", enabled: false },
];

const Product = (props) => {
  const [imageFile, setImageFile] = React.useState(null);
  const [logoFile, setLogoFile] = React.useState(null);
  const { userType, setUserType } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [isEnabled, setIsEnabled] = useState("");
  const [editIconForRating, setEditIconForRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [showBlock, setShowBlock] = useState(false);
  const [optionBlock, setOptionBlock] = useState(false);
  const inputRef = useRef(null);
  const inputRefForReviewLink = useRef(null);
  const [numRating, setNumRating] = useState(false);
  const [defaultRating, setDefaultRating] = useState(userTypeList[0]);
  const companyIds = useSelector((state) => state.companies.ids);
  const [reviewLinkData, setReviewLinkData] = useState({
    review_link_url: "https://spiolabs.com",
    rating_type: 1,
    description: "Please give us your valuable feedback.",
    review_link_text: "Where your feedback?",
  });

  const createdBy = localStorage.getItem("userId");
  const handleFetch = async () => {
    const response = await fetchData(createdBy);
    if (response.status == 200) {
      setReviewLinkData(response.data.data);
      const defaultRatingObject = userTypeList.find(
        (ratingType) => ratingType.id === response.data.rating_type
      );
      setDefaultRating(defaultRatingObject);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleEditIconClick = () => {
    inputRefForReviewLink.current.focus();
  };

  const handleTextIconClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
      inputRefForReviewLink.current.blur();
    }
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleImageEditClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleRating = (ele, index) => {
    setSelectedRating(index + 1);
    setShowBlock(false);
  };

  const handleLogoEditClick = () => {
    const logoInput = document.getElementById("logoInput");
    logoInput.click();
  };

  const handleLogoChange = (event) => {
    const selectedLogo = event.target.files[0];
    if (selectedLogo) {
      setLogoFile(selectedLogo);
    }
  };

  const handleChangeLinkUrl = (e, fieldName) => {
    const reviewLinkObject = { ...reviewLinkData };
    reviewLinkObject[`${fieldName}`] = e.target.value;
    setReviewLinkData(reviewLinkObject);
  };

  const handleReviewRatingType = (value) => {
    const reviewLinkObject = { ...reviewLinkData };
    reviewLinkObject[`rating_type`] = value;
    setReviewLinkData(reviewLinkObject);
  };

  const [uniqueCode, setUniqueCode] = useState('');

  return (
    <div>
      <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} />
      <div className="p-[20px] sm:p-[48px]">
        <div className="flex flex-col w-4/5 md:w-1/2 gap-[16px]">
          <h1 className="font-jakarta-sans font-500 text-black font-plus">
            Edit your Review Link
          </h1>
          <p className="font-500 text-#6B6B6B text-[16px] whitespace-nowrap">
            This is the link your customers will visit to leave you a
            review,Customize the page by changing texts and images.
          </p>
        </div>
        <div
          className="flex flex-col md:flex-row gap-[48px] rounded-[32px] p-[40px]  sm:w-5/6 xl:w-[3/4] mt-[48px] "
          style={{
            boxShadow: "0 4px 6px rgba(14, 31, 53, 0.25)",
            backgroundColor: "#FAFBFD",
          }}
        >
          <TextField
            className="w-full md:w-1/3"
            variant="outlined"
            id="edit-review-link-url"
            label="Edit Review Link URL"
            type="text"
            value={reviewLinkData?.review_link_url}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChangeLinkUrl(e, "review_link_url")}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <EditIcon
                  onClick={handleEditIconClick}
                  sx={{ color: "action.active", cursor: "pointer" }}
                />
              ),
            }}
            inputRef={inputRefForReviewLink}
            disabled
          />

          <TextField
            className="w-full md:w-1/3"
            variant="outlined"
            id="edit-review-link-text"
            label="Edit Review Link Text"
            type="text"
            value={reviewLinkData?.review_link_text}
            onChange={(e) => handleChangeLinkUrl(e, "review_link_text")}
            onKeyDown={handleKeyDown}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <EditIcon
                  onClick={handleTextIconClick}
                  sx={{ color: "action.active", cursor: "pointer" }}
                />
              ),
            }}
            inputRef={inputRef}
          />
          <Autocomplete
            popupIcon={<ArrowDropDownIcon />}
            options={userTypeList}
            getOptionLabel={(option) => option.label}
            size="medium"
            value={defaultRating}
            name="rating_type"
            style={{ minWidth: 200 }} // Set a fixed minimum width here
            InputProps={{
              style: {
                minWidth: 200, // Set the minimum width here
              },
            }}
            onChange={(event, newValue) => {
              const val = userTypeList?.find(
                (e) => e?.label === newValue.label
              );
              setSelectedRating(0);
              setDefaultRating(val);
              handleReviewRatingType(val.id);
              setIsEnabled(val.id);
              setEditIconForRating(true);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Choose the initial page" />
            )}
          />
        </div>

        <div className="gap-[16px] pt-[48px]">
          <h1 className="font-jakarta-sans font-500 text-black font-plus mb-[16px]">
            Edit your Review Link
          </h1>

          <div
            className="flex flex-col items-center w-fit md:flex-row  justify-center md:h-[600px] md:rounded-tr-3xl md:rounded-br-3xl md:rounded-tl-3xl md:rounded-bl-3xl "
            style={{
              boxShadow: "0 4px 6px rgba(14, 31, 53, 0.25)",
              backgroundColor: "#FAFBFD",
            }}
          >
            <div className="w-[50%]">
              <div className="flex justify-center items-center flex-col">
                <div className="flex flex-row justify-center items-end pb-[48px]">
                  <div className="flex w-[171px] h-[50px] ">
                    {logoFile ? (
                      <img
                        src={URL.createObjectURL(logoFile)}
                        alt="company logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={
                          reviewLinkData?.logo_url ||
                          "/assets/images/logo/logo-image.png"
                        }
                        alt="company logo"
                        className="w-full h-full object-contain"
                      />
                    )}

                  </div>
                  <input
                    type="file"
                    id="logoInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                  <button
                    className="flex justify-center items-center mt-[20px] w-[45px] h-[45px] text-white bg-red rounded-full hover:bg-red-900 hover:text-white hover:no-underline"
                    variant="contained"
                    onClick={handleLogoEditClick}
                  >
                    <CreateOutlinedIcon fontSize="small" />
                  </button>
                </div>
                <div className="flex flex-row justify-center items-center px-[10px]">
                  {isEditing ? (
                    <div>
                      <TextField
                        id="filled-multiline-flexible"
                        multiline
                        maxRows={4}
                        autoFocus
                        onFocus={(event) => event.target.select()}
                        onKeyPress={handleInputKeyPress}
                        onBlur={() => setIsEditing(false)}
                        onChange={(e) => handleChangeLinkUrl(e, "description")}
                        value={reviewLinkData?.description}
                        style={{ backgroundColor: "none" }}
                        className=" font-500 font-roboto text-[30px]  text-center sm:text-20  md:text-36  "
                      />
                    </div>
                  ) : (
                    <h1 className="flex justify-center font-500 font-roboto text-s text-[30px]  text-center sm:text-20  md:text-36  ">
                      {reviewLinkData?.description}
                    </h1>
                  )}
                  <button
                    className="flex justify-center items-center p-[15px] mt-[20px] ml-[8px] w-[45px] h-[45px] text-white bg-red rounded-full  hover:bg-red-900 hover:text-white hover:no-underline"
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    <CreateOutlinedIcon fontSize="small" />
                  </button>
                </div>

                {reviewLinkData?.rating_type === 1 && (
                  <Rating
                    className="pt-[48px] text-7xl"
                    name="size-large"
                    value={5}
                    readOnly
                    size="large"
                  />
                )}

                {reviewLinkData?.rating_type === 2 && (
                  <>
                    <div className="flex mt-20">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        let circleColor;
                        if (num <= 3) {
                          circleColor = "red";
                        } else if (num <= 6) {
                          circleColor = "orange";
                        } else {
                          circleColor = "green";
                        }
                        return (
                          <div
                            className="w-28 h-28 p-5 rounded-full flex items-center justify-center mr-5 mt-20"
                            style={{
                              backgroundColor: circleColor,
                              color: "white",
                            }}
                          >
                            <p>{num}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="flex justify-around">
                  {editIconForRating && <div className="mx-5"></div>}

                  <div className="mx-5">
                    {showBlock && isEnabled === "Star Review" && (
                      <div className="h-150 w-200 shadow-md p-12 rounded-lg bg-white mt-8 ml-6 cursor-pointer">
                        {starRating.map((ele, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                onClick={(e) => handleRating(e, index)}
                                className="mb-10"
                              >
                                {ele.label}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] md:w-[50%] h-full overflow-hidden flex justify-end">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="company logo"
                  className="w-full h-[600px] md:rounded-tr-3xl md:rounded-br-3xl"
                />
              ) : (
                <img
                  src={
                    reviewLinkData?.image_url ||
                    "/assets/images/review-link/manSitting.png"
                  }

                  alt="experience image"
                  className="w-full h-[600px] md:rounded-tr-3xl md:rounded-br-3xl"
                />
              )}

              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <button
                className="flex absolute mr-[30px] justify-center items-center p-[15px] mt-[100px] w-[48px] h-[48px] text-white bg-red rounded-full hover:bg-red-900 hover:text-white hover:no-underline"
                variant="contained"
                onClick={handleImageEditClick}
              >
                <CreateOutlinedIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-10">
          <Button
            className="rounded-md mt-[20px]"
            variant="outlined"
            onClick={() => {

              const formData = new FormData();
              formData.append("review_link_url", reviewLinkData?.review_link_url);
              formData.append("company_id", createdBy);
              formData.append("review_link_text", reviewLinkData?.review_link_text);
              formData.append("description", reviewLinkData?.description);
              formData.append("rating_type", reviewLinkData?.rating_type);
              formData.append("logo", logoFile);
              formData.append("image", imageFile);
              updateData(formData);

              const code = nanoid(10);
              setUniqueCode(code);
            }}
            disabled={reviewLinkData.rating_type === ""}
          >
            <a

              href={`${process.env.REACT_APP_USEREVIEW_LINK}${createdBy}/${uniqueCode}`}
              // href={`http://localhost:3001/${createdBy}/${uniqueCode}`}

              target="_blank"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "inline-block",
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
            >
              Visit the Link
            </a>
          </Button>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { fetchData })(Product);