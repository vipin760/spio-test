import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
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
import moment from "moment";
import { Autocomplete, IconButton, InputAdornment } from "@mui/material";
import { Tune, Visibility, VisibilityOff } from "@mui/icons-material";
import TermsConditions from "../sign-in/termsandConditions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { faceIdhost } from "app/configs/navigationConfig";
/**
 * Form Validation Schema
 */
const schemaforFaceId = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required("Please enter name")
    .min(4, "Fullname is too short - must be at least 4 chars.")
    .max(50, "Fullname is too long - not more then 20 chars."),
  email: yup
    .string()
    .trim()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .trim()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  companyName: yup
    .string()
    .trim()
    .required("Please enter company name")
    .min(4, "company name is too short - must be at least 4 chars.")
    .max(20, "company name is too long - not more then 20 chars."),
  industry_type: yup.string().trim().required("Please select Industry Type."),
  // remember: yup
  //   .bool()
  //   .required("error")
  //   .oneOf([true], "The terms and conditions must be accepted."),
});

const schemaforSpio = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required("Please enter name")
    .min(4, "Fullname is too short - must be at least 4 chars.")
    .max(50, "Fullname is too long - not more then 50 chars."),
  email: yup
    .string()
    .trim()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  password: yup
    .string()
    .trim()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  companyName: yup
    .string()
    .trim()
    .required("Please enter company name")
    .min(4, "company name is too short - must be at least 4 chars.")
    // .max(20, "company name is too long - not more then 20 chars."),
  // industry_type: yup.string().trim().required("Please select Industry Type."),
  // remember: yup
  //   .bool()
  //   .required("error")
  //   .oneOf([true], "The terms and conditions must be accepted."),
});

const currentHost = window.location.hostname;
const isFaceIdHost = faceIdhost.includes(currentHost) ;
// const hostname = window.location.hostname
// const isFaceId = faceIdhost.includes

const schema = isFaceIdHost ? schemaforFaceId : schemaforSpio

const defaultValues = {
  fullName: "",
  email: "",
  password: "",
  companyName: "",
  remember: false,
  industry_type: "",
};

function SignUpPage() {
  const [open, setOpen] = useState(false);
  const [isCheck, setIscheck] = useState(false);


  
 

  const { control, formState, handleSubmit, setError, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async ({
    fullName,
    email,
    password,
    companyName,
    remember,
    industry_type,
  }) => {
    const data = {
      userLoginName: email,
      userLoginPassword: password,
      userProfileName: fullName,
      companyName: companyName,
      termsAndConditions: remember ? 1 : 0,
      institutionType: industry_type,
    };
    jwtService
      .createUser(data)
      .then((response) => {

        if (response?.statusCode == 200) {
          navigate("/sign-in");
        } else {
          setError(error.type, {
            type: "manual",
            message: response?.status,
          });
        }

        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        console.log(_errors)
        _errors?.forEach((error) => {
          setError(error.type, {
            type: "manual",
            message: error.message,
          });
        });
        // setError(error.type, {
        //   type: 'manual',
        //   message: _errors,
        // });
      });
  };
  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  //industury list
  const categoryList = [
    {
      id: 1,
      institutionName: "Hospital",
    },
    {
      id: 2,
      institutionName: "Instituation",
    },
    {
      id: 2,
      institutionName: "Retail",
    },
    // 'HOSPITALS', 'INSTITUTIONS', 'RETAILS'
  ];
  
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
  const removespace = (e) => {
    if (e.which === 32 && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2   sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-520 sm:w-520 mx-auto sm:mx-0">
          <div className="flex flex-row sm:flex-row items-center justify-end sm:justify-right space-x-16 px-64">
            <Typography className="text-md font-large mt-20 ">
              Already a User?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className="w-25 mt-16"
              aria-label="Sign in"
              //disabled={_.isEmpty(dirtyFields)}
              onClick={() => navigate("/sign-in")}
              size="large"
            >
              Login
            </Button>
          </div>
          <div className="px-64">
            <div className=" max-w-120 sm:w-120 mx-auto sm:mx-0">
              <img width="185" src="assets/images/logo/logo-image.png " alt="logo" />
            </div>
          </div>
          <div className="pt-10 px-64 pb-64">
            <Typography className="mt-40 text-4xl font-extrabold tracking-tight leading-tight">
              Sign up
            </Typography>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="fullName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="mb-24"
                    label="Full Name"
                    autoFocus
                    type="fullName"
                    error={!!errors.fullName}
                    helperText={errors?.fullName?.message}
                    variant="outlined"
                    required
                    fullWidth
                    onKeyDown={removespace}
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      const stripped = val.replace(/[^0-9a-zA-Z ]+/gi, "");
                      onChange(stripped);
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email ID/User Name"
                    autoFocus
                    type="email"
                    onKeyDown={removespace}
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

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
                    onKeyDown={removespace}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClick} edge="end">
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
              <Controller
                name="companyName"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    className="mb-24"
                    label="Company Name"
                    autoFocus
                    type="companyName"
                    error={!!errors.companyName}
                    helperText={errors?.companyName?.message}
                    variant="outlined"
                    required
                    onKeyDown={removespace}
                    fullWidth
                    value={value}
                    onChange={(e) => {
                      const val = e.target.value;
                      const stripped = val.replace(/[^0-9a-zA-Z ]+/gi, "");
                      onChange(stripped);
                    }}
                  />
                )}
              />
              
              {isFaceIdHost && (
              <Controller
                name="industry_type"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="mt-8 mb-16"
                    freeSolo
                    // value={value}
                    id="combo-box-demo"
                    options={categoryList.map((e) => e.institutionName) || []}
                    value={
                      categoryList?.length > 0
                        ? categoryList?.find((e) => e.id == value)
                            ?.institutionName
                        : ""
                    }
                    onChange={(event, newValue) => {
                      const id = categoryList?.find(
                        (e) => e?.institutionName == newValue
                      )?.id;
                      onChange(id);
                    }}
                    renderInput={(params) => (
                      
                      <TextField
                        {...params}
                        placeholder="Industry Type"
                        label="Industry Type "
                        variant="outlined"
                        className="mb-24"
                        type="industry_type"
                        required
                        onKeyDown={removespace}
                        fullWidth
                        error={!!errors.industry_type}
                        helperText={errors?.industry_type?.message}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                       
                    )}
                  />
                )}
              />
              )}
            
           

              <div className="flex justify-start">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onClick={handleClickOpen}
                      // onClick={
                      //   isCheck
                      //     ? () => setIscheck(false)
                      //     : () => setIscheck(true)
                      // }
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
                  I agree to terms and conditions*
                </Typography>
              </div>

              {/* <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="I agree to terms and conditions"
                        control={<Checkbox size="small" {...field} />}
                      />
                    </FormControl>
                  )}
                />
              </div> */}

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-16"
                aria-label="Sign in"
                disabled={!isCheck || !isValid}
                type="submit"
                size="large"
              >
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </Paper>
      <Box className="relative hidden md:flex flex-auto items-center justify-center h-auto overflow-hidden">
        <div
          className="z-10 w-full max-w-4xl h-auto"
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
          // onClose={handleClose}
          disableBackdropClick
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

export default SignUpPage;
