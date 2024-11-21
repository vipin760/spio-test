import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { removeProduct, saveProduct } from "../store/productSlice";
import { useState } from "react";
import { useSnackbar } from "notistack";

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

  // console.log("getValues", getValues())
  async function handleSaveProduct() {
    // try {
    //   setLoader(true)
    //   let a = await dispatch(saveProduct(getValues()))
    //   if (a?.error?.message) {
    //     enqueueSnackbar(a?.payload || 'Error Occured', {
    //       variant: 'error',
    //     })
    //     return
    //   }
    //   navigate(-1)
    // } catch (err) {
    //   enqueueSnackbar('Error Occured', {
    //     variant: 'error',
    //   })
    // }
    setLoader(false);
  }

  function handleRemoveProduct() {
    // dispatch(removeProduct()).then(() => {
    //   navigate('/license_billing')
    // })
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-20 md:text-20 font-extrabold tracking-tight"
      >
        Billing Details
      </Typography>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
        {/* <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
        > */}
          {/* <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

          <Input
            placeholder="Search User"
            className="flex flex-1"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setProductsSearchText(ev))}
          /> */}
        {/* </Paper> */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            className=""
            // component={Link}
            // to="/license_billing/new"
            variant="contained"
            color="secondary"
            // startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Save
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductHeader;
