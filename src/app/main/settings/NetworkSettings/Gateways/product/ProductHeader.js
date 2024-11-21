import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { removeProduct, saveProduct } from "../store/productSlice";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { addGatewayDetails, getGateway, getProducts, updateGatewayDetails } from "../store/productsSlice";
import { getGatewayStatus, selectUser } from "app/store/userSlice";
import JwtService from "src/app/auth/services/jwtService";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";

function ProductHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images");
  const name = watch("branch_name");
  const theme = useTheme();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector(selectUser);
  const routeParams = useParams();
  const [getwayStaus, setGetwayStaus] = useState({})
  const { id } = routeParams


  useEffect(() => {
    if (getValues()?.institutionGatewayDetailId) {
      getUserStatus()
    }
  }, [getValues()?.institutionGatewayDetailId])


  async function handleSaveProduct() {
    if (id != 'new') {
      try {
        const updateData = {
          institutionGatewayStatusId: getValues()?.institutionGatewayStatusId,
          institutionGatewayVersion: getValues()?.institutionGatewayVersion,
          institutionGatewayAuthdir: getValues()?.institutionGatewayAuthdir,
          institutionGatewayHashName: getValues()?.institutionGatewayHashName,
          institutionGatewayName: getValues()?.institutionGatewayName,
          institutionGatewaySerialNo: getValues()?.institutionGatewaySerialNo,
          institutionGatewaySecreatKey: getValues()?.institutionGatewaySecreatKey,
          institutionGatewayLocation: getValues()?.institutionGatewayLocation,
          institutionGatewayUrl: getValues()?.institutionGatewayUrl
            ? getValues()?.institutionGatewayUrl
            : null,
          institutionGatewayMac: getValues()?.institutionGatewayMac
            ? getValues()?.institutionGatewayMac
            : null,
          institutionBranchId: getValues()?.institutionBranchId
            ? getValues()?.institutionBranchId
            : null,
          institutionMasterId: getValues()?.institutionMasterId
            ? getValues()?.institutionMasterId
            : null,
          institutionGatewayDetailId: getValues()?.institutionGatewayDetailId
            ? getValues()?.institutionGatewayDetailId
            : null
        }
        setLoader(true);
        let a = await dispatch(updateGatewayDetails(updateData))
        if (a?.payload?.statusCode === "200") {
          enqueueSnackbar(a?.payload?.status, {
            variant: "success",
          });
          localStorage.setItem("isRefreshList", true);
          setLoader(false);
          // dispatch(getGateway())
          navigate(-1)
          if (a?.payload?.statusCode === "400") {
            enqueueSnackbar(a?.payload.status, {
              variant: "error",
            });
            setLoader(false)
          }
        } else {
          enqueueSnackbar(a?.payload.status, {
            variant: "error",
          });
          setLoader(false)
        }
      } catch (err) {
        enqueueSnackbar("Error Occured", {
          variant: "error",
        });
      }
      setLoader(false);
    }
    else {
      try {
        setLoader(true);
        const data = {
          institutionGatewayStatusId: 1,
          institutionGatewayVersion: "0",
          institutionGatewayAuthdir: "0",
          institutionGatewayHashName: getValues()?.institutionGatewayHashName,
          institutionGatewayName: getValues()?.institutionGatewayName,
          institutionGatewaySerialNo: getValues()?.institutionGatewaySerialNo,
          institutionGatewaySecreatKey: getValues()?.institutionGatewaySecreatKey,
          institutionGatewayLocation: getValues()?.institutionGatewayLocation,
          institutionGatewayUrl: getValues()?.institutionGatewayUrl
            ? getValues()?.institutionGatewayUrl
            : null,
          institutionGatewayMac: getValues()?.institutionGatewayMac
            ? getValues()?.institutionGatewayMac
            : null,
          institutionBranchId: getValues()?.institutionBranchId
            ? getValues()?.institutionBranchId
            : null,
          institutionMasterId: getValues()?.institutionMasterId
            ? getValues()?.institutionMasterId
            : null,
        };
        let a = await dispatch(addGatewayDetails(data))
        if (a?.payload?.statusCode === "200") {
          enqueueSnackbar(a?.payload?.status, {
            variant: "success",
          });
          navigate(-1)
          if (a?.payload.statusCode === "400") {
            enqueueSnackbar(a?.payload.status, {
              variant: "error",
            });
          }
        } else {
          enqueueSnackbar(a?.payload?.status, {
            variant: "error",
          });
        }
        localStorage.setItem("isRefreshList", true);
      }
      catch (err) {
        enqueueSnackbar("Error Occured", {
          variant: "error",
        });
      }
      setLoader(false);
    }

  }

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate("/gateways_settings");
    });
  }
  const getUserStatus = async () => {
    try {
      const response = await JwtService.getList(
        jwtServiceConfig.getGatewayStatus + `?institutionGatewayId=${getValues()?.institutionGatewayDetailId}`)
      setGetwayStaus(response.data)
    }
    catch (error) {
      console.log('response error status=====>', error)
    }
  }
  console.log('getawayUSerStatus', getwayStaus)

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/gateways_settings"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">
              {/* shdkagshfajfvjhvasjhvash */}
            </span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "Gateway"}
            </Typography>
            {id == 'new' ?
              <Typography variant="caption" className="font-medium">
                Gateway Details
              </Typography>
              :
              <div className="flex flex-row items-center">
                <FuseSvgIcon
                  color={
                    getwayStaus?.gateWayStatus == "Online" ? "success" : "secondary"
                  }
                  size={26}
                >
                  material-solid:router
                </FuseSvgIcon>
                <Typography className="text-10 sm:text-12 truncate font-semibold"
                  style={{ color: getwayStaus?.gateWayStatus == "Online" ? "green" : "red", paddingTop: '6px' }}>
                  {getwayStaus?.gateWayStatus}
                </Typography>
              </div>
            }

          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveProduct}
        >
          Cancel
        </Button>
        <LoadingButton
          className="whitespace-nowrap mx-4"
          loading={loader || false}
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveProduct}
        >
          Save
        </LoadingButton>
      </motion.div>
    </div>
  );
}

export default ProductHeader;
