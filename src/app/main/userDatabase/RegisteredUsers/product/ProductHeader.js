import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { removeProduct, saveProduct } from "../../store/productSlice";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { selectUser } from "app/store/userSlice";
import { getUsers } from "../../store/productsSlice";

function ProductHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const user = useSelector(selectUser);
  const { formState, watch, getValues, setValue } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images");
  const name = watch("branch_name");
  const theme = useTheme();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  console.log("dirtyFields", dirtyFields, "..............", isValid);


  async function handleSaveProduct() {
    try {
      setLoader(true);
      const params = {
        ...getValues(),
        institutionMasterId: user?.data?.institutionMasterId,
        institutionGatewayDetailId: user?.data?.gateWay,
        wifiUserCreatedBy: user?.data?.userId,
        wifiSurfingPoliciesId: getValues()?.wifiUsersType,
      };
      let a = await dispatch(saveProduct(params)).then((response) => {
        if (response) {
          if (response.payload.statusCode === '400') {
            enqueueSnackbar(response.payload.status, {
              variant: "error",
            });
          }
          if (response.payload.statusCode === '200') {
            enqueueSnackbar(response.payload.status, {
              variant: "success",
            });
          }
          setTimeout(() => {
            navigate("/registered_users");
          }, 1000);
          localStorage.setItem("isRefreshList", true);
          //dispatch(getUsers({lastIndex:9,startIndex: 0}))
        }

        // navigate("/registered_users");
      });
      if (a?.error?.message) {
        enqueueSnackbar(a?.payload || "Error Occured 2", {
          variant: "error",
        });
        return;
      }
      // navigate("/registered_users");
    } catch (err) {
      enqueueSnackbar("Error Occured 3", {
        variant: "error",
      });
    }
    setLoader(false);
  }

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate("/registered_users");
    });
  }

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
            to="/registered_users"
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
              {name || "New Registered Users"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Registered Users Details
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {/* <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveProduct}
          startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
        >
          Remove
        </Button> */}
        <LoadingButton
          className="whitespace-nowrap mx-4"
          // loading={loader || false}
          // loading={true}
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          // disabled={_.isEmpty(dirtyFields) || tre}
          onClick={handleSaveProduct}
        >
          {/* wifiUserMobileNo wifiUserLoginId */}
          Save
        </LoadingButton>
      </motion.div>
    </div >
  );
}

export default ProductHeader;
