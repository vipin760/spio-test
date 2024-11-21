import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  getGateway,
  selectProductsSearchText,
  setProductsSearchText,
} from "../store/productsSlice";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
// import Button from '@mui/material/Button';

function ProductsHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectProductsSearchText);
  const [anchorEl, setAnchorEl] = useState(null);
  const [institutionName, setinstitutionName] = useState([]);
  const [selectinstitution, setSelectinstitution] = useState("");
  const [branchName, setBranchName] = useState([]);
  const [selectBranch, setSelectBranch] = useState("");
  const [gatewayName, setGatewayName] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [serialNo, setSerialNo] = useState()
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  useEffect(() => {
    if (selectinstitution != "") {
      getAllBranch();
    }
  }, [selectinstitution]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    getAllInstitutes();
    getAllBranch();
    dispatch(getGateway());
  }, []);


  const getAllInstitutes = async () => {
    const data = {
      startIndex: 0,
      lastIndex: 0,
    };
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getAllInstitutes,
        data
      );
      const result = response?.data?.content;
      setinstitutionName(result);
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
  };

  const getAllBranch = async () => {
    const data = {
      startIndex: 0,
      lastIndex: 10,
      institutionMasterId: selectinstitution,
    };
    try {
      const response = await JwtService.post(
        jwtServiceConfig.getInstitutionBranches,
        data
      );
      const result = response?.data?.content;
      setBranchName(result);
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
  };

  const submitHandler = async () => {
    const data = {
      institutionGatewaySerialNo: serialNo,
      institutionGatewayMac: macAddress,
      institutionGatewayName: gatewayName,
      institutionMasterId: selectinstitution,
      institutionBranchId: selectBranch,
    };

    try {
      const response = dispatch(getGateway(data));
      setSelectBranch("");
      setSelectinstitution("");
      setMacAddress("");

      handleClose();
    } catch (error) {
      if (error?.response?.status == 403) {
        JwtService.logout();
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-20 md:text-20 font-extrabold tracking-tight"
      >
        Gateway
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        <div
          className="rounded-full border border-black flex justify-center items-center h-[48px] w-[48px]"
          style={{ borderColor: "black" }}
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          <FilterListOutlinedIcon />
        </div>
        <Popover
          id={id}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 150, left: 900 }}
          elevation={2}
        >
          <div className="flex flex-col md:flex-row gap-2 p-[35px] w-[500px] justify-between">
            <div className="flex flex-col w-full md:w-1/2">
              <TextField
                label="Serial No."
                placeholder="Serial No."
                id="serialNo"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="border border-gray-300 rounded-md px-4 py-2 mb-[33px]"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
              />
              <TextField
                label="MAC"
                placeholder="MAC"
                id="mac"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="border border-gray-300 rounded-md px-4 py-2 mb-[33px] "
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
              />

              <TextField
                id="outlined-select-currency"
                select
                label="Branch Name"
                // placeholder='Branch'
                defaultValue=""
                color="#000000"
                className="mb-[33px] px-4 py-2"
                value={selectBranch}
                disabled={!selectinstitution}
                onChange={(e) => setSelectBranch(e.target.value)}
                InputLabelProps={{
                  shrink: true, // Shrink the label to make space for the placeholder
                  placeholder: "Select a Branch", // Set the placeholder text
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select a Branch</em>
                </MenuItem>
                {branchName.map((option) => (
                  <MenuItem
                    key={option?.institutionBranchId}
                    value={option?.institutionBranchId}
                  >
                    {option?.institutionBranchName}
                  </MenuItem>
                ))}
              </TextField>

            </div>

            <div className="flex flex-col w-full md:w-1/2">

              <TextField
                label="Gateway Name"
                placeholder="Gateway Name"
                id="gatewayName"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className="border border-gray-300 rounded-md px-4 py-2 mb-[33px]"
                value={gatewayName}
                onChange={(e) => setGatewayName(e.target.value)}
              />


              <TextField
                id="outlined-select-currency"
                select
                label="Institution Name"
                placeholder="Branch"
                defaultValue="branch"
                className="mb-[33px] px-4 py-2"
                value={selectinstitution}
                onChange={(e) => setSelectinstitution(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  placeholder: "Select a Branch",
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select Institution Name</em>
                </MenuItem>
                {institutionName.map((option) => (
                  <MenuItem
                    key={option?.institutionMasterId}
                    value={option?.institutionMasterId}
                  >
                    {option?.institutionName}
                  </MenuItem>
                ))}
              </TextField>


            </div>
          </div>

          <div className="flex justify-end mb-[40px] mr-[40px]">
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={submitHandler}
            >
              Submit
            </Button>
          </div>
        </Popover>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            component={Link}
            to="/gateways_settings/new"
            variant="contained"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
          >
            Add
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductsHeader;
