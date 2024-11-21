import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyList,
  selectUser,
  updateUserGateWayDetails,
} from "app/store/userSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCompanies, selectCompanies } from "app/store/companiesSlice";
import { navigate, useNavigate } from "react-router-dom";
import { cpasshost, portalhost,connecthost } from "app/configs/navigationConfig";
import { getLocations } from "app/store/fuse/selectedlocationSlice";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Root = styled("div")(({ theme }) => ({
  "& .username, & .email": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  "& .avatar": {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%",
    },
  },
}));
const schema = yup.object().shape({
  institutionGatewayLocation: yup.string().required("Please Select User"),
});

function UserNavbarHeader(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const companies = useSelector(selectCompanies);
  const [company, setCompany] = React.useState("");
  const navigate = useNavigate();


  const hostName = window.location.hostname;
  const isCpass = cpasshost.includes(hostName);
  const isPortal = portalhost.includes(hostName);
  const isConnect = connecthost.includes(hostName);

  React.useEffect(() => {
    if (company) {
      const hostname = window.location.hostname;
      if (cpasshost.includes(hostname)) {
      } else if (portalhost.includes(hostname)) {
        navigate("/dashboard");
        navigate("/OP");
      } else if (connecthost.includes(hostname)) {
        navigate("/connect_dashboard");
      } else {
        navigate("/faceid_dashboard");
      }
    }
  }, [company]);
 

  React.useEffect(() => {
    dispatch(
      getCompanies({ institutionMasterId: user?.data?.institutionMasterId })
    );
  }, [dispatch]);
  React.useEffect(() => {
    if (companies?.length > 0) {
      setCompany(companies[0]?.institutionGatewayDetailId);
    }
  }, [companies]);

  const handleChange = (event) => {
    const value =
      companies?.length > 0
        ? companies?.find((e) => e?.id == event.target.value)
            ?.institutionGatewayLocation
        : "";
    setCompany(event.target.value);
    dispatch(getLocations({
      selectedLocation: value,
      institutionGatewayDetailId: event.target.value
    }));
  };

  let lableName;
  if (isCpass) {
    lableName = "Location";
  } else if (isPortal) {
    lableName = "Gateway";
  } else {
    lableName = "Location";
  }
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if(!company) dispatch(getLocations({
      selectedLocation: companies[0]?.institutionGatewayLocation,
      institutionGatewayDetailId: companies[0]?.institutionGatewayDetailId
    }));
  },[company, companies]);

  const [click, setClick] = React.useState();

  localStorage.setItem("institutionGatewayDetailId", click);

  return (
    <Root className="user relative flex flex-col  justify-center p-16 pb-14 shadow-0">
      <div className=" w-100%">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{lableName}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              company
            
            }
            color="secondary"
            label="Spio/Default"
            defaultValue={{ label: "Select an option", id: "someID" }}
            onChange={(e) => handleChange(e)}
          >
            {companies?.map((item) => {
          
              return isPortal ? (
                <MenuItem value={item?.institutionGatewayDetailId}>
                  {item?.institutionGatewayLocation}
                </MenuItem>
              ) : (
                <MenuItem
                  value={item?.institutionGatewayDetailId}
                >
                  {item?.institutionGatewayLocation}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <Typography className="username text-14 whitespace-nowrap font-medium">
        {/* {user.data.given_name}  */}
      </Typography>
      <Typography
        className="email text-13 whitespace-nowrap font-medium"
        color="text.secondary"
      >
      </Typography>
    </Root>
  );
}

export default UserNavbarHeader;
