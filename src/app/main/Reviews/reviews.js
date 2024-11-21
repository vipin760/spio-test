import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import "./review.css";
import {
  Button,
  Grid,
  MenuItem,
  Rating,
  Select,
  Typography,
  Modal,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  autoGenerateReviews,
  deleteUserReview,
  fetchReviews,
  replyReview,
  getEmployees,
} from "app/store/fuse/reviewSlice";
import SendIcon from "@mui/icons-material/Send";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import toast from "react-hot-toast";
import moment from "moment";
import { apiClient } from "src/app/configs/apiClient";
import Filters from "./Component/Filters";
import ExportToPDFButton from "./ExportToPDFButton";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ReviewDeleteModal from "./Modals/deleteModal";
import ReviewAlertModal from "./Modals/alertModal";
import SideModal from "./Modals/SideModal";

const Review = () => {
  const methods = useFormContext();

  const { reviews, total_reviews, review_error } = useSelector(
    (state) => state.fuse.reviews
  );

  const [toggleInput, setToggleInput] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [customData, setCustomData] = useState([]);
  const [selectedCustom, setSelectedCustom] = useState("");
  const [checked1, setChecked1] = useState(true);
  const [autoGenerateOption, setAutoGenerateOption] = useState(false);
  const [autoReplyPayload, setAutoReplyPayload] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState({
    review_id: "",
    _id: "",
  });

  const [commentPrevId, setCommentPrevId] = useState(null);
  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );
  const previousIdRef = useRef(null);

  const [generatedReview, setGeneratedReview] = useState([]);

  const [clickedProfile, setClickedProfile] = useState({});

  const [selectedItem, setSelectedItem] = useState();

  const [placeholder, setPlaceholder] = useState("");

  const [customDataValues, setCustomDataValues] = useState({});

  const [selecetedDate, setSelectedDate] = useState()

  const [chnageUse, setChangeUse] = useState(true);

  const [one, setOne] = useState(false);

  const dispatch = useDispatch();

  const createdBy = localStorage.getItem("userId");

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
  };

  console.log("ONe", one);


  // FETCH REVIEWS
  useEffect(() => {
    if (createdBy) {
      dispatch(
        fetchReviews({
          page: page,
          limit: rowsPerPage,
          selecetedDate,
          data: {
            institutionGatewayDetailId: !checked1 ? institutionGatewayDetailId : "",
          },
          url: `/reviews`,
        })
      );
    }
  }, [page, rowsPerPage, institutionGatewayDetailId, checked1, selecetedDate]);

  const [allEmployee, setAllEmployee] = useState();
  const [selectedEmp, setSelectedEmp] = useState();

  // FETCH ALL EMPLOYEES
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await dispatch(getEmployees());
        setAllEmployee(data?.payload?.data);
      } catch (error) {
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (review_error) {
      toast.error(review_error);
    }
  }, [review_error]);

  const replyTextRef = useRef(null);

  useEffect(() => {
    if (toggleInput && replyTextRef.current) {
      replyTextRef.current.focus();
    }
  }, [toggleInput, selectedId]);

  // FUNCTION FOR PAGINATION
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  //Create a function to conditionally display text field based on whether a reply command exists or not
  const handleButtonClick = async (id, val) => {
    const value = placeholder ? placeholder : val;

    setToggleInput(!toggleInput);
    setSelectedId(id);
    setCommentPrevId(previousIdRef.current);
    previousIdRef.current = id;
    if (value.length !== 0) {
      if ((toggleInput && selectedId === id) || selectedId === null) {
        setReplyText("");
        setAutoGenerateOption(false);
        setGeneratedReview([]);
      } else {
        setAlertModalOpen(true);
      }
    }
  };



  // HANDLE FUNCTION FOR CREATING TYPING EFFECT
  useEffect(() => {
    let i = -1;
    function type() {
      if (i < replyText?.length) {
        setPlaceholder((prev) => prev + replyText?.charAt(i));
        i++;
        setTimeout(type, 20);
      }
    }
    type();
    return () => {
      setPlaceholder("");
    };
  }, [replyText]);

  const [va, setVa] = useState()

  // HANDLE FUNCTION FOR REPLYING AUTOGENERATED REPLY OR MANUALLY MADE REPLY AND SAVING IT
  const handleReply = async (id, val) => {
    const value = placeholder ? placeholder : replyText;
    setToggleInput(false);
    setReplyText("");

    if (replyText.length !== 0) {
      try {
        textValues(replyText);
        await dispatch(replyReview({ id, replyText }));
        dispatch(
          fetchReviews({
            page: page,
            limit: rowsPerPage,
            url: `/reviews`,
          })
        );
        setAutoGenerateOption(false);
        setGeneratedReview([]);
      } catch (error) {
      }
    }
  };

  const formatDateTime = (dateString) => {
    return moment(dateString).format("dddd, D MMMM YYYY , H:mm");
  };

  function customFloor(value) {
    const integerValue = Math.floor(value);
    const decimalPart = value - integerValue;
    if (decimalPart > 0) {
      return integerValue + 1;
    } else {
      return integerValue;
    }
  }

  //FUNCTION - DELETING SELECTED REPLY COMMENT 
  const handleDeleteComment = (review_id, _id) => {
    setDeleteModalOpen(true);
    setDeleteReviewId({
      review_id,
      _id,
    });
  };


  const handleOpen = async (id) => {
    setSelectedCustom(id);
    setOpen(true);

    try {
      const response = await apiClient().get(`/custom/value/${id}`);
      const customDatas = response.data.customValue;
      setCustomData(customDatas);
    } catch (error) {
      toast.error("Error fetching custom data");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeText = (index, e) => {
    setCustomDataValues((prevValues) => ({
      ...prevValues,
      [customData[index].column_name]: e.target.value,
    }));
  };

  // FUNCTION FOR SAVING EMPLOYEES
  const handleSave = async () => {
    const formData = {
      selectedEmp,
      ...customDataValues,
    };

    try {
      const response = await apiClient().post(`/employee/save-employee?review_id=${selectedCustom}`, formData);
      toast.success("Added Successfully");
      setOpen(false);
      setSelectedEmp("");
      setCustomDataValues({});
    } catch (error) {
      toast.error("Error for post data");
    }
  };

  // FUNCTION FOR CREATING AUTOGENERATED REPLY BY TYPE LIKE SHORTER,LONGER...
  const handleAutogenerateReply = async (
    id,
    value,
    styleValue,
    GR_name,
    rating
  ) => {
    try {
      if (value) {
        textValues(value);
        const response = await dispatch(
          autoGenerateReviews({ id, value, styleValue, GR_name, rating })
        );
        setReplyText(response.payload);
        setGeneratedReview([...generatedReview, response.payload]);
        setOne(false);
      }
      setPlaceholder("");
    } catch (err) {
    }
  };

  const handleDiscardFunc = () => {
    setPlaceholder("");
    setReplyText("");
    setToggleInput(true);
    setAlertModalOpen(false);
  };

  const textValues = (val) => {
    console.log("Val", val);

    setReplyText;
    setChangeUse(false);
    setPlaceholder(replyText);
    setOne(true);
  };

  return (
    <div>
      {Array.isArray(generatedReview) && generatedReview?.length > 1 && (
        <SideModal
          generatedReview={generatedReview}
          setGeneratedReview={setGeneratedReview}
          clickedProfile={clickedProfile}
          setReplyText={setReplyText}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setOne={setOne}
        />
      )}

      <Filters handleChange1={handleChange1} setSelectedDate={setSelectedDate} checked1={checked1} review={reviews} />

      <div className="grid grid-cols-1 gap-40">
        {reviews.length ? (
          reviews.map((data) => (
            <div
              className="flex flex-col pt-[24px] pr-[120px] pb-[24px] pl-[120px] gap-[32px] "
              style={{
                padding: "20px",
                borderRadius: "16px",
                backgroundColor: "#FAFBFD",
                boxShadow: "0 1.98px 4.61px rgba(14, 31, 53, 0.25)",
                backgroundColor: "#FAFBFD",
              }}
            >
              <div className="flex flex-col md:flex-row  md:justify-between">
                <div className="flex flex-row gap-12 w-full">
                  <div className="flex justify-center items-center align-middle">
                    <img
                      className="flex w-[51px] h-[51px] rounded-full"
                      src={data?.source_logo_url}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex-col ">
                      {data?.source == "GOOGLE" && (
                        <p className="font-500 text-lg">Google Review</p>
                      )}
                      {data?.source == "SPIO" && (
                        <p className="font-500 text-lg">SPIO</p>
                      )}

                      <div className=" flex align-center">
                        {data?.spio_rating_type == 1 && (
                          <Rating
                            name="read-only"
                            readOnly
                            value={data?.rating_in_number}
                          />
                        )}
                        {data?.spio_rating_type == 2 && (
                          <div className="flex flex-col items-center ">
                            <div
                              className="border flex justify-center items-center"
                              style={{
                                border: "none",
                              }}
                            >
                              <span
                                className={`border flex justify-center text-white font-[20px] py-[6px] px-[12px] rounded-[4px] ${data.rating_in_number <= 3
                                  ? "bg-[#F41A1C]"
                                  : data.rating_in_number <= 6
                                    ? "bg-[#3cb371]"
                                    : "bg-[#5C9D4C]"
                                  }`}
                              >
                                {data?.rating_in_number}
                              </span>
                              /10
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      {data?.location && (
                        <img
                          className="mr-10"
                          src="assets/images/logo/locationIcon.svg"
                        />
                      )}
                      <span>{data?.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              {data ? (
                <div className="flex flex-row  gap-[8px]">
                  <div>
                    {data?.reviewer_profile_photo_url ? (
                      <img
                        className="w-[46px] h-[46px] rounded-full"
                        src={data?.reviewer_profile_photo_url}
                        alt="profileImages"
                      />
                    ) : (
                      <img
                        src={"/assets/images/logo/profilepic.svg"}
                        alt="profileImages"
                      />
                    )}
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                    }}
                    className="w-full"
                  >
                    <div className="flex flex-col justify-end gap-10 ">
                      <div className="flex flex-col">
                        <div>
                          <div
                            className="pt-[10px] px-[16px] pb-[16px] w-[85%]"
                            style={{
                              backgroundColor: "#F4F2F2",
                              borderRadius: "16px",
                            }}
                          >
                            <p className="font-500 text-[14px] text-[#161614]">
                              {data?.reviewer_display_name || "Guest user"}
                            </p>
                            <p
                              className="py-4 rounded-full relative z-10 text-[#3E3E3E] text-[16px] leading-[22px]"
                              style={{
                                borderRadius: "30px",
                              }}
                            >
                              {data?.comment}
                            </p>

                            <Grid
                              container
                              className="gap-y-12 md:gap-x-0 lg:gap-x-10 xl:gap-x-0"
                            >
                              {data?.media?.map((media, index) => {
                                if (media.media_format === "PHOTO") {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={3}
                                      key={index}
                                    >
                                      <img
                                        src={media.source_url}
                                        className="w-[250px] h-[200px] "
                                        alt={`Image ${index}`}
                                      />
                                    </Grid>
                                  );
                                } else {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={3}
                                      className="h-[fit-content]"
                                      key={index}
                                    >
                                      <video
                                        className=" w-[250px] min-h-[200px] object-cover"
                                        controls
                                      >
                                        <source
                                          src={media.source_url}
                                          type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    </Grid>
                                  );
                                }
                              })}
                            </Grid>
                          </div>
                          <span className="ml-10 mt-3 flex self-end mb-[8px]">
                            {formatDateTime(data.create_time)}
                          </span>
                          {data?.reply_comment?.map((comments, index) => {
                            return (
                              <div className="mb-[8px]">
                                <div
                                  className="flex group justify-end mx-20"
                                  key={index}
                                >
                                  <button
                                    className="hidden group-hover:block mr-[8px]"
                                    onClick={() =>
                                      handleDeleteComment(
                                        data?.review_id,
                                        comments?._id
                                        // comments.comment,
                                      )
                                    }
                                  >
                                    <img
                                      style={{ background: "#8F8F8F" }}
                                      className="w-[3rem] border rounded-[16px] p-6"
                                      src="assets/images/logo/delete.svg"
                                      alt="Delete Icon"
                                    />
                                  </button>
                                  <div className="flex h-[auto] items-center">
                                    <span className="px-20 py-10 items-center relative z-0 rounded-[16px] bg-[#8F8F8F] flex justify-end text-white mr-[8px] text-[16px] lg:text-[18px] max-w-[80rem]">
                                      {comments.comment}
                                    </span>
                                    <img
                                      src="assets/images/logo/replyProfile.svg"
                                      alt="reply person icon"
                                      className="w-[48px] h-[48px]"
                                    />
                                  </div>
                                  {/* </div> */}
                                </div>
                                <div class="flex group justify-end">
                                  <p
                                    className="px-20 mr-10 relative z-0 rounded-full w-1/8 md:w-1/8 flex items-end md:mr-[56px] text-[14px] text-[#3E3E3E]"
                                    style={{
                                      borderRadius: "30px",
                                    }}
                                  >
                                    {formatDateTime(comments.updateTime)}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {toggleInput && selectedId === data.review_id && (
                        <div className="flex items-end bg-white border !border-black rounded-xl text-red-500 p-10 relative">
                          <div className="flex flex-col h-full w-[100%]">
                            <InputEmoji
                              ref={replyTextRef}
                              value={one ? replyText : placeholder}
                              readOnly
                              onChange={(value) => {
                                textValues(value);
                                setOne(true)
                              }}
                              cleanOnEnter
                              onEnter={() =>
                                handleReply(data.review_id, replyText)
                              }
                              placeholder="Type a reply"
                              className="w-4/5 mr-2 react-emoji-picker--wrapper text-red-500 custom-emoji "
                            />

                            {autoGenerateOption && replyText && (
                              <div className="flex gap-10 pl-10 pb-5 mt-10 flex-wrap">
                                <div
                                  className={`border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option ${autoReplyPayload === "shorter"
                                    ? "active-option"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    handleAutogenerateReply(
                                      data.review_id,
                                      data.comment,
                                      "shorter",
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    );
                                    setAutoReplyPayload("shorter");
                                    setGeneratedReview(
                                      ...generatedReview,
                                      replyText
                                    );
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                      style: "shorter",
                                    });
                                  }}
                                >
                                  <FilterListIcon
                                    className={`mr-[5px] ${autoReplyPayload === "shorter"
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                      }`}
                                  />
                                  <span>Shorter</span>
                                </div>

                                <div
                                  className={`border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option ${autoReplyPayload === "longer"
                                    ? "active-option"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                      style: "longer",
                                    });
                                    handleAutogenerateReply(
                                      data.review_id,
                                      data.comment,
                                      "longer",
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    );
                                    setAutoReplyPayload("longer");
                                  }}
                                >
                                  <SortIcon
                                    className={`mr-[5px] ${autoReplyPayload === "longer"
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                      }`}
                                  />
                                  <span>Longer</span>
                                </div>

                                <div
                                  className={`border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option ${autoReplyPayload === "simpler"
                                    ? "active-option"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                      style: "simpler",
                                    });
                                    handleAutogenerateReply(
                                      data.review_id,
                                      data.comment,
                                      "simpler",
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    ),
                                      setAutoReplyPayload("simpler");
                                  }}
                                >
                                  <CheckCircleOutlineRoundedIcon
                                    className={`mr-[5px] ${autoReplyPayload === "simpler"
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                      }`}
                                  />
                                  <span>Simpler</span>
                                </div>
                                <div
                                  className={`border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option ${autoReplyPayload === "more casual"
                                    ? "active-option"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                      style: "more casual",
                                    });
                                    handleAutogenerateReply(
                                      data.review_id,
                                      data.comment,
                                      "more casual",
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    );
                                    setAutoReplyPayload("more casual");
                                  }}
                                >
                                  {/* updated */}
                                  <GroupOutlinedIcon
                                    className={`mr-[5px] ${autoReplyPayload === "more casual"
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                      }`}
                                  />
                                  <span>More casual</span>
                                </div>
                                <div
                                  className={`border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option ${autoReplyPayload === "more peofessional"
                                    ? "active-option"
                                    : ""
                                    }`}
                                  onClick={() => {
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      style: "more professional",
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                    });
                                    handleAutogenerateReply(
                                      data.review_id,
                                      data.comment,
                                      "more professional",
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    );
                                    setAutoReplyPayload("more profesional");
                                  }}
                                >
                                  <WorkOutlineOutlinedIcon
                                    className={`mr-[5px] ${autoReplyPayload === "more peofessional"
                                      ? "text-gray-500"
                                      : "text-gray-500"
                                      }`}
                                  />
                                  <span>More Professional </span>
                                </div>

                                <div
                                  className="border rounded-full px-[1rem] py-[0.2rem] !border-gray-400 auto-generate-option"
                                  onClick={() => {
                                    setClickedProfile({
                                      id: data.review_id,
                                      coment: data.comment,
                                      style: "simpler",
                                      reviewer_display_name:
                                        data?.reviewer_display_name,
                                      rating: data?.rating_in_number,
                                    });
                                    handleAutogenerateReply(
                                      data.review_id,
                                      replyText,
                                      null,
                                      data?.reviewer_display_name,
                                      data?.rating_in_number
                                    );
                                    setAutoReplyPayload("simpler");
                                  }}
                                >
                                  <CachedOutlinedIcon className="text-gray-500 mr-[5px]" />
                                  <span>Regenerate</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setAutoGenerateOption(!autoGenerateOption);
                              setAutoReplyPayload("simpler");
                              if (!autoGenerateOption)
                                handleAutogenerateReply(
                                  data.review_id,
                                  data.comment,
                                  autoReplyPayload,
                                  data?.reviewer_display_name,
                                  data?.rating_in_number
                                );
                            }}
                            className="text-red-500 mr-[30px] pb-[5px]"
                          >
                            <img src="assets/images/reviews/aiicon.svg" />
                          </div>

                          <SendIcon
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleReply(
                                data.review_id,
                                placeholder,
                                data?.reviewer_display_name,
                                data?.rating_in_number
                              )
                            }
                            className="text-red-500 mr-[5px] pb-[5px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className=" flex flex-row-reverse gap-10">
                {data.source !== "SPIO" ? (
                  <Button
                    className="hover:bg-red"
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#F30002",
                      color: " #FFFFFF",
                      fontSize: "16px",
                      padding: "12px 20px 12px 20px",
                      "&:hover": {
                        bgcolor: "#FF4142",
                        boxShadow:
                          "0 1px 3px 1px rgba(0,0,0,0.15),0 1px 2px 0px rgba(0,0,0,0.3)",
                      },
                      "&:focused": {
                        bgcolor: "#FF3739",
                      },
                    }}
                    onClick={() => handleButtonClick(data.review_id, replyText)}
                  >
                    Reply
                  </Button>
                ) : (
                  ""
                )}
                <button
                  className="flex flex-row align-center justify-center text-center items-center"
                  style={{
                    padding: "10px",
                    border: "1px solid",
                    borderRadius: "7px",
                    color: "#161614",
                    height: "38px",
                    width: "100",
                  }}
                  onClick={() => handleOpen(data.review_id)}
                >
                  <span style={{}}>
                    <img className="mr-10" src="assets/images/logo/Edit.svg" />
                  </span>
                  <span style={{ fontSize: "16px" }}>Custom</span>
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                  BackdropProps={{
                    style: {
                      backgroundColor: "rgba(0,0,0,0.1)",
                    },
                  }}
                  className=""
                >
                  <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 bg-white border-2 border-black p-20 md:p-40 rounded-[16px]">
                    <h2 id="child-modal-title mb-10 text-500 ">
                      Fill the custom fields
                    </h2>
                    <div
                      className="flex fex-col justify-center items-center bg-opacity-100  w-full mt-20"
                      style={{ maxHeight: "470px", overflowY: "auto" }}
                    >
                      <form>
                        <span className="uppercase pb-5">SELECT EMPLOYEE</span>
                        <FormControl className="w-full mb-16" fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Select Emoloyee
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="outlined-basic"
                            value={selectedEmp}
                            onChange={(e) => setSelectedEmp(e.target.value)}
                          >
                            {allEmployee?.filter((item, i) => item?.tbl_connect_employee_view == "active").map((data, index) => (
                              <MenuItem value={data?.tbl_connect_employee_id}>
                                {data?.tbl_connect_employee_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <span></span>

                        {customData?.map((item, index) => {
                          return (
                            <>
                              <span className="uppercase pb-5">
                                {item.column_name}
                              </span>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                className="w-full mb-16"
                                size="small"
                                value={customDataValues[item.column_name] || ""}
                                required
                                autoComplete="off"
                                onChange={(e) => handleChangeText(index, e)}
                                inputProps={{
                                  pattern:
                                    item.column_name === "Phone number"
                                      ? "[0-9]*"
                                      : item.column_name === "Movie ID" || item.column_name === "Customer ID"
                                        ? "[A-Za-z0-9]*"
                                        : "[A-Za-z]*",
                                }}
                                onKeyDown={(e) => {
                                  if (item.column_name === "Phone number") {
                                    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                      e.preventDefault();
                                    }
                                  } else if (item.column_name === "Movie ID" || item.column_name === "Customer ID") {
                                    if (!/[A-Za-z0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                      e.preventDefault();
                                    }
                                  } else {
                                    if (!/[A-Za-z]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                                      e.preventDefault();
                                    }
                                  }
                                }}
                              />
                            </>
                          );
                        })}
                      </form>
                    </div>
                    <div className="flex flex-row justify-end gap-10">
                      <Button
                        variant="outlined"
                        className="rounded-6 h-[40px] bg-red text-white"
                        size="small"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        className="rounded-6 h-[40px]"
                        size="small"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Box>
                </Modal>
                <ExportToPDFButton
                  reviewId={data.review_id}
                  reviews={reviews}
                  customData={customData}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center  h-[70vh] text-3xl text-grey-500">
            <img src="assets/images/logo/Nodatafound.png" />
            <h1 className="text-gray-700 font-medium text-2xl items-center mt-[20px] ml-[15px]">
              No reviews found
            </h1>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-between mt-20">
        <div className="flex flex-row items-center gap-9">
          <Typography>Showing:</Typography>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="w-70 h-40 px-2 py-1 rounded border border-gray-300"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>
        <div className="flex items-end justify-end">
          <Stack spacing={2}>
            <Pagination
              count={customFloor(total_reviews / rowsPerPage)}
              onChange={handleChangePage}
            />
          </Stack>
        </div>
      </div>
      <ReviewDeleteModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        deleteReviewId={deleteReviewId}
      />
      <ReviewAlertModal
        open={alertModalOpen}
        handleClose={() => {
          setAlertModalOpen(false);
          setSelectedId(commentPrevId);
          setToggleInput(true);
        }}
        handleFunction={handleDiscardFunc}
      />
    </div>
  );
};

export default Review;
