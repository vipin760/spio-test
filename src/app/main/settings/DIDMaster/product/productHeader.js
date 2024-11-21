import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { get, useFormContext } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { selectUser } from "app/store/userSlice";
import { saveProduct, updateProduct } from "../store/productSlice";
import { getProducts, searchFilter, selectBranches } from '../store/productsSlice'

function ProductHeader(props) {

  const { id } = useParams();
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
  const searchText = useSelector((state) => state?.didMaster?.products?.searchText)
  // console.log("getValues", getValues())

  // const formValues = watch()

  async function handleSaveProduct() {
    try {
      setLoader(true);
      const params = { ...getValues() }; // Form values
      let actionResult;
      if (id == "new") {
        actionResult = await dispatch(saveProduct(params));
      } else {
        actionResult = await dispatch(updateProduct({ ...params, id }));
      }

      if (actionResult?.meta?.requestStatus === "fulfilled") {
        // If the request was successful, navigate back
        navigate(-1);
      } else {
        // Log the error and show the snackbar
        enqueueSnackbar(actionResult?.payload || "Error saving/updating product", { variant: "error" });
      }
      dispatch(searchFilter({ val: searchText }));
      // dispatch(getProducts());
    } catch (err) {
      // Catch unexpected errors
      enqueueSnackbar("Unexpected error", { variant: "error" });
    } finally {
      setLoader(false); // Stop the loader in any case
    }
  }

  function handleRemoveProduct() {
    navigate(-1);
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
            to="/did_master"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">
            
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
              {name || "DID Master"}
            </Typography>
            <Typography variant="caption" className="font-medium"></Typography>
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
