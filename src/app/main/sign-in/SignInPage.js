import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import jwtService from "../../auth/services/jwtService";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TermsConditions from "./termsandConditions";
import { getCompanies } from "../../store/companiesSlice";
import { selectUser, getGatewayStatus } from "app/store/userSlice";
import { useSelector } from "react-redux";
import BasicInfoTab from "../Hardware/More/product/tabs/BasicInfoTab";
import axios from "axios";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  // remember: yup
  //   .bool()
  //   .required("error")
  //   .oneOf([true], "The terms and conditions must be accepted."),
});

const schema1 = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  confirmPassword: yup
    .string()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
});
const otpSchema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  otp: yup.string().required("enter OTP."),
});
const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});
const gateWaySchema = yup.object().shape({
  institutionGatewayName: yup.string().required("Please enter Intitute name"),
  institutionGatewayVersion: yup
    .string()
    .required("Please enter Gateway Version"),

  institutionGatewaySecreatKey: yup
    .string()
    // .email("You must enter a valid email")
    .required("You must enter a Institute Gateway Secreat Key "),
  institutionGatewayUrl: yup
    .string()
    .required("Please enter your Institute Url."),
  institutionGatewayMac: yup
    .string()
    .required("Please enter mac.")
    .min(6, "Mac is too short - must be at least 6 chars."),
});

const defaultValues = {
  email: "",
  password: "",
  otp: "",
  confirmPassword: "",
  remember: false,

  institutionGatewayName: "",
  institutionGatewaySecreatKey: "",
  institutionGatewayUrl: "",
  institutionGatewayMac: "",
  institutionGatewayVersion: "",
};

function SignInPage() {
  const [isForget, setIsForget] = useState(0);
  const [gateWayFound, setGatewayFound] = useState(false);
  const [otpId, setOtpId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user2faStatus, setUser2faStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCheck, setIscheck] = useState(false);
  const user = useSelector(selectUser);

  console.log("useeeeeeeeeee", user);
  const gateWay = localStorage.getItem("gateway");

  const getSchema = () => {
    if (gateWayFound) {
      gateWaySchema;
    } else {
      switch (isForget) {
        case 1:
          return emailSchema;
        case 2:
          return otpSchema;
        case 3:
          return schema1;
        default:
          return schema;
      }
    }
  };
  const { control, formState, handleSubmit, setError, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(getSchema()),
    });

  const { isValid, dirtyFields, errors } = formState;
  console.log("dirtyFields", dirtyFields);
  const navigate = useNavigate();
  // open a dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };
  // close a dialog box
  const handleClose = () => {
    setOpen(false);
    if (!isCheck) {
      setIscheck(true);
      dirtyFields.remember = true;
    }
  };
  const generateOtpCall = (email) => {
    jwtService
      .generateOtp({ userLoginName: email })
      .then((response) => {
        setLoading(false);
        if (response?.responseStatus == 200) {
          setIsForget(2);
          setOtpId(response?.otpId);
        }

        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        setLoading(false);
        _errors.forEach((error) => {
          setError(error.type, {
            type: "manual",
            message: error.message,
          });
        });
      });
  };
  const onSubmit = async ({
    email,
    password,
    otp,
    confirmPassword,
    remember,
  }) => {
    setLoading(true);
    if (isForget == 1) {
      generateOtpCall(email);
    } else if (isForget == 2) {
      jwtService
        .checkOtp({
          otpId: otpId,
          otp: otp,
        })
        .then((response) => {
          setLoading(false);
          if (response?.otpCheck == 1) {
            if (user2faStatus == 1) {
              jwtService.emit("onLogin");
            } else {
              setIsForget(3);
            }
          }
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((_errors) => {
          setLoading(false);
          _errors.forEach((error) => {
            setError(error.type, {
              type: "manual",
              message: error.message,
            });
          });
        });
    } else if (isForget == 3) {
      if (password === confirmPassword) {
        jwtService
          .changePassword({
            userLoginName: email,
            userLoginPassword: password,
            otpId: otpId,
          })
          .then((response) => {
            setLoading(false);
            if (response?.statusCode == 200) {
              setIsForget(0);
              jwtService
                .signInWithEmailAndPassword(email, password)
                .then((user) => {
                  // No need to do anything, user data will be set at app/auth/AuthContext
                })
                .catch((_errors) => {
                  setLoading(false);
                  _errors.forEach((error) => {
                    setError(error.type, {
                      type: "manual",
                      message: error.message,
                    });
                  });
                });
            }
            // No need to do anything, user data will be set at app/auth/AuthContext
          })
          .catch((_errors) => {
            setLoading(false);
            _errors.forEach((error) => {
              setError(error.type, {
                type: "manual",
                message: error.message,
              });
            });
          });
      } else {
        setLoading(false);
        setError(
          "confirmPassword",
          {
            type: "manual",
            message: "Password and custom password should be same",
          },
          errors
        );
        // setError('confirmPassword',{ type: 'manual',
        // message: "ddddd",})
      }
    } else {
      jwtService
        .signInWithEmailAndPassword(email, password, remember)
        .then((data) => {
          // console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
          if (data?.user2faStatus == 1) {
            setUser2faStatus(1);
            generateOtpCall(email);
          }

          setLoading(false);
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((_errors) => {
          _errors.forEach((error) => {
            setLoading(false);
            setError(error.type, {
              type: "manual",
              message: error.message,
            });
          });
        });
    }
  };
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const removespace = (e) => {
    if (e.which === 32 && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };
  //for gateway creation
  // async function handleSaveProduct() {
  //   // dispatch(saveProduct(getValues()).then(()=>enqueueSnackbar('Gateway Added Successfully')));
  //   // navigate(-1);
  //   props.setTabValue(0);
  //   enqueueSnackbar("Gateway added successfully", { variant: "success" });
  //   try {
  //     setLoader(true);
  //     let a = await dispatch(saveProduct(getValues())).then((response) => {
  //       if (response) {
  //         localStorage.setItem("isRefreshList", true);
  //         //dispatch(getUsers({lastIndex:9,startIndex: 0}))
  //         enqueueSnackbar(a?.payload || "Error Occured", {
  //           variant: "success",
  //         });
  //         props.setTabValue(0);
  //       }
  //     });
  //     if (a?.error?.message) {
  //       enqueueSnackbar(a?.payload || "Error Occured", {
  //         variant: "error",
  //       });
  //       return;
  //     }
  //     navigate(-1);
  //   } catch (err) {
  //     enqueueSnackbar("Error Occured", {
  //       variant: "error",
  //     });
  //   }
  //   setLoader(false);
  // }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2   sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-520 sm:w-520 mx-auto sm:mx-0">
          <div className=" px-64">
            <img
              width={185}
              src="assets/images/logo/logo-image.png "
              alt="logo"
            />
          </div>
          <div className="pt-0 px-64 pb-64">
            {isForget == 1 && (
              <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight font-size">
                Enter Your Email Id
              </Typography>
            )}
            {isForget == 2 && (
              <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
                Enter OTP
              </Typography>
            )}
            {isForget == 3 && (
              <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
                Set New Password
              </Typography>
            )}
            {!isForget && (
              <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight">
                Welcome Back
              </Typography>
            )}
            {isForget == 2 && (
              <Typography>Enter OTP sent to your email</Typography>
            )}
            {isForget == 1 && (
              <Typography>An OTP will send to your Email</Typography>
            )}
            {!isForget && (
              <Typography>Continue with Email Id to login into SPIO</Typography>
            )}

            <>
              <form
                name="loginForm"
                noValidate
                className="flex flex-col justify-center w-full mt-32"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onKeyDown={removespace}
                      className="mb-24"
                      label="Email ID"
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                {isForget == 2 && (
                  <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="OTP"
                        type="text"
                        error={!!errors.otp}
                        helperText={errors?.otp?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                )}

                {(!isForget || isForget === 3) && (
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="outlined"
                        required
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClick} edge="end">
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                )}
                {isForget === 3 && (
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-24"
                        label="Confirm Password"
                        type="password"
                        error={!!errors.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                )}
                {!isForget && (
                  <div className="flex justify-start">
                    <Controller
                      name="remember"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          onClick={
                            isCheck
                              ? () => setIscheck(false)
                              : () => setIscheck(true)
                          }
                          id="remember"
                          {...field}
                          checked={isCheck ? isCheck : ""}
                          className="mb-24"
                          fullWidth
                        />
                      )}
                    />
                    <Typography
                      className="font-medium"
                      sx={{
                        color: "secondary.main",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                      onClick={handleClickOpen}
                    >
                      Terms & Conditions*
                    </Typography>
                  </div>
                )}

                {!isForget && (
                  <div className="flex justify-end">
                    <Typography
                      className="font-medium"
                      sx={{ color: "secondary.main", cursor: "pointer" }}
                      onClick={() => {
                        setIsForget(1);
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </div>
                )}
                {!isForget ? (
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    className=" w-full mt-16"
                    aria-label="Sign in"
                    disabled={!isCheck || !isValid}
                    type="submit"
                    size="large"
                    loading={loading}
                  >
                    Login
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    className=" w-full mt-16"
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="large"
                    loading={loading}
                  >
                    {isForget == 2 && "Verify OTP"}
                    {(isForget == 1 || isForget == 3) && "Submit"}
                  </LoadingButton>
                )}
              </form>
              <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-center">
                {!isForget && (
                  <Typography className="text-lg font-large mt-20 ">
                    Not a user?
                  </Typography>
                )}
                {isForget == 1 && (
                  <>
                    <Typography className="text-lg font-large mt-20 ">
                      Already a User?
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-25 mt-16 ml-10"
                      aria-label="Sign in"
                      //disabled={_.isEmpty(dirtyFields)}
                      onClick={() =>setIsForget(0)}
                      size="large"
                    >
                      Login
                    </Button>
                  </>
                )}
                {!isForget && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className="w-25 mt-16 ml-10"
                    aria-label="Sign in"
                    //disabled={_.isEmpty(dirtyFields)}
                    onClick={() => navigate("/sign-up")}
                    size="large"
                  >
                    Sign up
                  </Button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center">
                {isForget === 1 && (
                  <>
                    <Typography className="text-lg font-large mt-10 ">
                      Not a user?
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      className="w-25 mt-16 ml-10"
                      aria-label="Sign in"
                      //disabled={_.isEmpty(dirtyFields)}
                      onClick={() => navigate("/sign-up")}
                      size="large"
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </>
          </div>
        </div>
      </Paper>
      <Box className="relative hidden md:flex flex-auto items-center justify-center h-full overflow-hidden">
        <div
          className="z-10 w-full max-w-3xl h-auto"
          style={{ ".&dot": { borderRadius: "8px", minWidth: "100%" } }}
        >
          <Carousel
            autoPlay={true}
            infiniteLoop
            showThumbs={false}
            showArrows={false}
            width={"100%"}
          >
            <div>
              <img width="100%" src="assets/images/slide_image1.png" />
              <p
                className="legend"
                style={{
                  background: "transparent",
                  opacity: 1,
                  transition: "none",
                }}
              >
                <div
                  className="font-bold "
                  style={{
                    fontSize: "32px",
                    lineHeight: "48px",
                  }}
                >
                  <div>Easy way to connect multiple users</div>
                </div>
                <div className="mt-24 text-lg">
                  A smart connection management connecting single devices to
                  multiple users in easy and smart way
                </div>
              </p>
            </div>
            <div>
              <img width="100%" src="assets/images/slide_image2.png" />
              <p
                className="legend"
                style={{
                  background: "transparent",
                  opacity: 1,
                  transition: "none",
                }}
              >
                <div
                  className="text-7xl font-bold "
                  style={{
                    fontSize: "32px",
                    lineHeight: "48px",
                  }}
                >
                  <div>Easy way to connect multiple users</div>
                </div>
                <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
                  A smart connection management connecting single devices to
                  multiple users in easy and smart way
                </div>
              </p>
            </div>
            <div>
              <img width="100%" src="assets/images/slide_image3.png" />
              <p
                className="legend"
                style={{
                  background: "transparent",
                  opacity: 1,
                  transition: "none",
                }}
              >
                <div
                  className="text-7xl font-bold "
                  style={{
                    fontSize: "32px",
                    lineHeight: "48px",
                  }}
                >
                  <div>Easy way to connect multiple users</div>
                </div>
                <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
                  A smart connection management connecting single devices to
                  multiple users in easy and smart way
                </div>
              </p>
            </div>
          </Carousel>
        </div>
      </Box>

      {/* Terms &Conditions dialog */}
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Terms and conditions"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="leading-loose"
            >
              {TermsConditions.map((data, index) => {
                return (
                  <>
                    <div className="mt-10">{data.trems}</div>
                    {data.header && (
                      <>
                        <strong>{data.header}</strong>
                        {data.subcontent.map((term) => {
                          return (
                            <>
                              <li className="ml-20">{term.trems}</li>
                              {term.subTrems?.map((term) => {
                                return <li className="ml-40">{term.term}</li>;
                              })}
                            </>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button  onClick={handleClose}>Agree</Button> */}
            <Button
              color="secondary"
              className="w-25 mt-10  mr-20 text-16"
              aria-label="Sign up"
              onClick={handleClose}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default SignInPage;
