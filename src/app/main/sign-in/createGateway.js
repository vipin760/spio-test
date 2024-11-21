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

const logOut = () => {
  jwtService.setSession(null)
}

function CreateGateway() {


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
          <div className="pt-0 px-64 pb-50">
            <Typography className="mt-16 text-4xl font-extrabold tracking-tight leading-tight pb-10">
              Create Location
            </Typography>
            <div>
              <BasicInfoTab />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-center">
            <>
              <Typography className="text-lg font-large mt-20 ">
                Back to Login?
              </Typography>
              <Button
                component={Link}
                color="secondary"
                className="w-25 mt-20 text-16"
                aria-label="Sign up"
                // onClick={() =>}
                to="/sign-in"
                size="large"
                onClick={logOut}
              >
                Login
              </Button>

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
    </div>
  );
}

export default CreateGateway;
