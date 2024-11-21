import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchReviews,
  postBusiness,
  postBusinessLocation,
} from "./store/productSlice"; // Assuming fetchReviews is an action creator
import { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
} from "@mui/material";
import SuccessPopUp from "./SuccessPopUp";
import { textAlign } from "@mui/system";
import { navbarClose } from "app/store/fuse/navbarSlice";
// import { Box } from "@mui/system";

const Account = () => {
  const path = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { reviews, review_error } = useSelector((state) => state.fuse.reviews);
  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [fetchedData, setItFetchedData] = useState([]);

  const [secondDropDown, setSecondDropDown] = useState(false);

  const [msg, setMsg] = useState('');

  const [Locations, setLocation] = useState([]);

  const urlParams = new URLSearchParams(path?.search).get("code");
  useEffect(() => {
    const error = new URLSearchParams(path?.search).get("error");
    if (error) {
      navigate("/integration");
    } else {
      dispatch(navbarClose());
    }
  }, []);

  const ul = `google/business/accounts?code=${urlParams}&platform_id=1&gateway_details_id=${institutionGatewayDetailId}`;
  const [selectedItem, setSelectedItem] = useState(
    fetchedData && fetchedData[0]?.name
  );

  const handleBusinessAccount = async (name) => {
    try {
      const res = await dispatch(
        postBusiness({ name, institutionGatewayDetailId })
      );
      setSecondDropDown(true);
      setLocation(res?.payload?.data?.locations);
      setSelectedItem(null);
    } catch (err) {
      console.log("...........ERRR", err);
    }
  };
  function sendDataAndClose(data) {
    if (window.opener) {
      window.opener.postMessage(data, "*");
    }
    window.close();
  }

  const handleBusinessLocation = async (name) => {
    try {
      setMsg("Google Integration has been completed successfully");
      const res = await dispatch(
        postBusinessLocation({ name, institutionGatewayDetailId })
      );
      setSecondDropDown(true);
      setMsg(res?.payload?.message);
    } catch (err) {
      setMsg("");
    }
  };

  const dispatchFetchReviews = async () => {
    if (urlParams && institutionGatewayDetailId) {
      const response = await dispatch(fetchReviews({ url: ul }));
      if ("error" in response) {
        navigate("/integration");
      }
    }
  };

  useEffect(() => {
    dispatchFetchReviews();
  }, [path.search, dispatch, institutionGatewayDetailId]);

  useEffect(() => {
    if (reviews?.accounts) {
      setItFetchedData(reviews.accounts);
    }
  }, [reviews]);


  return (
    <>
      {msg && <SuccessPopUp message={msg} open={!!msg} /> }

      <Grid
        container
        sx={{
          bgcolor: "",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {fetchedData && fetchedData.length > 0 && !secondDropDown ? (
          <Box
            sx={{
              width: 500,
              bgcolor: "",
              borderRadius: 5,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              mb: 5,
              pb: 5,
              // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }}
          >
            <Grid container sx={{ justifyContent: "center" }}>
              <Box
                component="img"
                src="/assets/images/logo/logo-image.png"
                sx={{ width: "45%" }}
              />
            </Grid>

            <Grid container sx={{ justifyContent: "center", mb: 5 }}>
              {fetchedData.length === 0 && (
                <h2 style={{ textAlign: "center", width: "100%" }}>
                  No bussiness accounts found
                </h2>
              )}
              {fetchedData.length === 1 && (
                <h2 style={{ textAlign: "center", width: "100%" }}>
                  Found "<b>{fetchedData[0]?.accountName}</b>" Account
                </h2>
              )}
              {fetchedData.length > 1 && (
                <FormControl
                  sx={{
                    width: 300,
                    textAlign: "center",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Select Business Account
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={selectedItem ? selectedItem : fetchedData[0]?.name}
                    value={""}
                    label="Select Business Account"
                  >
                    {fetchedData?.map((data, index) => (
                      <MenuItem
                        onClick={() => {
                          setSelectedItem(data?.accountName);
                          handleBusinessAccount(data?.name);
                        }}
                        value={data?.name}
                      >
                        {data?.accountName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/* locality */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                bgcolor: "",
                mt: 3,
              }}
            >
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  border: "1px solid #000",
                  borderRadius: "8px",
                  color: " #000",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "12px 20px 12px 20px",
                  "&:hover": {
                    bgcolor: "red",
                    color: " #FFFFFF",
                    border: "1px solid #FFFFFF",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleBusinessAccount(
                    selectedItem
                      ? selectedItem
                      : fetchedData && fetchedData[0]?.name
                  );
                }}
                autoFocus
                disabled={!fetchedData?.length}
                style={{
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: "#F30002",
                  color: " #FFFFFF",
                  fontSize: "16px",
                  padding: "12px 20px 12px 20px",
                }}
              >
                Continue
              </Button>
            </Box>
          </Box>
        ) : null}

        {secondDropDown && Location.length == 0 ? (
          <Box
            sx={{
              width: 500,
              bgcolor: "",
              borderRadius: 5,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              mb: 5,
              pb: 5,
            }}
          >
            <Grid container sx={{ justifyContent: "center" }}>
              <Box
                component="img"
                src="/assets/images/logo/logo-image.png"
                sx={{ width: "45%" }}
              />
            </Grid>

            <Grid container sx={{ justifyContent: "center", mb: 5 }}>
              {Locations.length === 0 && (
                <h2 style={{ textAlign: "center", width: "100%" }}>
                  No Locations found
                </h2>
              )}
              {Locations.length === 1 && (
                <h2 style={{ textAlign: "center", width: "100%" }}>
                  Found "<b>{`${Locations[0]?.title}/${Locations[0]?.storefrontAddress?.locality}`}</b>" Location
                </h2>
              )}
              {/* <h1 style={{ textAlign: 'center' }}>{Locations[0]?.title}</h1> */}

              {Locations.length > 1 &&  
                <FormControl
                sx={{
                  width: 300,
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select Business Location
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={selectedItem ? selectedItem : Locations[0]?.name}
                  value={""}
                  label="Age"
                >
                  {Locations?.map((data, index) => (
                    <MenuItem
                      onClick={() => {
                        onClick(data?.name);
                        handleBusinessLocation(data?.name);
                      }}
                      value={data?.name}
                    >
                      {data?.title}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              }
            </Grid>

            {Locations?.length == 1 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  bgcolor: "",
                  mt: 3,
                }}
              >
                <Button
                  onClick={() => navigate(-1)}
                  sx={{
                    border: "1px solid #000",
                    borderRadius: "8px",
                    color: " #000",
                    fontSize: "16px",
                    cursor: "pointer",
                    padding: "12px 20px 12px 20px",
                    "&:hover": {
                      bgcolor: "red",
                      color: " #FFFFFF",
                      border: "1px solid #FFFFFF",
                    },
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    handleBusinessLocation(
                      selectedItem
                        ? selectedItem
                        : Locations && Locations[0]?.name
                    );
                  }}
                  disabled={!Locations?.length}
                  autoFocus
                  style={{
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: "#F30002",
                    color: " #FFFFFF",
                    fontSize: "16px",
                    padding: "12px 20px 12px 20px",
                    // marginLeft: '0'
                  }}
                >
                  Continue
                </Button>
              </Box>
            )}
          </Box>
        ) : null}
      </Grid>
    </>
  );
};

export default Account;
