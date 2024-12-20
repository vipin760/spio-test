import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectUser, getGatewayStatus } from "app/store/userSlice";
import axios from "axios";
import { faceIdhost } from "app/configs/navigationConfig";
import { useSelect } from "@mui/base";

function UserMenu(props) {
  const user = useSelector(selectUser);
  const [companyId] = useSelector((state) => state.companies.ids);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };
  const data = user?.data?.gateWayDetails;
  console.log("dashboard", user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let intervalId;

  //   if (companyId) {
  //     intervalId = setInterval(() => {
  //       dispatch(getGatewayStatus());
  //       console.log("called");
  //     }, 1000);
  //   }

  //   // return () => {
  //   //   if (intervalId) {
  //   //     clearInterval(intervalId);
  //   //   }
  //   // };
  // }, [companyId, dispatch]);


  // useEffect(() => {
  //   setInterval(
  //     () => () => {
  //       getGatewayStatus();
  //       console.log("called");
  //     },
  //     1000
  //   );
  // },[]);

  // useEffect(() => {
  //   setInterval(async () => {
  //     if (companyId) {
  //       const response = await axios.get(
  //         `dashBoard/dashBoardApis?institutionGatewayId=${companyId}`
  //       );
  //       const data = await response.data;
  //     }
  //   }, 10000);
  // });

  const hostName = window.location.hostname;
  const isFaceId = faceIdhost.includes(hostName);

  return (
    <>
      {!isFaceId ? (
        <>
          <Button
            variant="outlined"
            color={data?.gateWayStatus == "Online" ? "success" : "secondary"}
            className="py-20 mr-10 "
          >
            <MenuItem component={Link} to="/users" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon
                  color={
                    data?.gateWayStatus == "Online" ? "success" : "secondary"
                  }
                  size={32}
                >
                  material-solid:router
                </FuseSvgIcon>
              </ListItemIcon>
              <div className="flex flex-col align-items-start">
                <Typography
                  color="GrayText"
                  className=" text-11 font-medium capitalize text-4xl font-bold text-left"
                >
                  Gateway Status
                </Typography>
                <ListItemText
                  primary={data ? data?.gateWayStatus : ""}
                  className="text-11 font-medium capitalize text-4xl font-bold flex"
                />
              </div>
            </MenuItem>
          </Button>
          <Button
            variant="outlined"
            color={data?.sessionCount ? "success" : "secondary"}
            className="py-20 "
          >
            <MenuItem component={Link} to="/users" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon
                  color={data?.sessionCount ? "success" : "secondary"}
                  size={32}
                >
                  material-solid:online_prediction
                </FuseSvgIcon>
              </ListItemIcon>
              <div className="flex flex-col align-items-start">
                <Typography className="text-11 font-medium capitalize text-4xl font-bold text-left">
                  {data?.sessionCount || 0}
                </Typography>
                <ListItemText
                  primary={"Online Users"}
                  className="text-11 font-medium capitalize text-4xl font-bold"
                />
              </div>
            </MenuItem>
          </Button>
        </>
      ) : (
        ""
      )}
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.data.given_name}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="text.secondary"
          >
            {user?.data?.userTypeName}
            {/* {(!user.role ||
              (Array.isArray(user.role) && user.role.length === 0)) &&
              'Guest'} */}
          </Typography>
        </div>
        <Avatar className="md:mx-4">{user.data.given_name}</Avatar>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            {/* <MenuItem
              component={Link}
              to="/apps/profile"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem> */}
            {/* <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem> */}
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
