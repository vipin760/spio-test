import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../../store/productSlice";
import reducer from "../../store";
import ProductHeader from "./ProductHeader";
import BasicInfoTab from "./BasicInfoTab";
import { selectUsers } from "../../store/productsSlice";

/**
 * Form Validation Schema
 */

const schema = yup.object().shape({
  wifiUserName: yup
    .string()
    .trim()
    .required("Please enter name")
    .min(4, "Fullname is too short - must be at least 4 chars.")
    .max(20, "Fullname is too long - not more then 20 chars."),
  wifiUserLoginId: yup
    .string()
    .trim()
    .email("You must enter a valid email")
    .when(["wifiUserMobileNo"], {
      is: (wifiUserMobileNo) => !wifiUserMobileNo,
      then: yup.string().required("Atleast one contact field is required."),
    })
    .required("You must enter a email"),
  wifiUserPassword: yup
    .string()
    .trim()
    .required("Please enter your password.")
    .min(4, "Password is too short - must be at least 4 chars."),
  wifiUserMobileNo: yup
    .string()
    .trim()
    .required("Please enter Mobile number")
    .max(10, "Mobile number is too long - not more then 10 chars."),
  wifiUserMac: yup
    .string()
    .required('You must enter a product mac'),
  wifiUserMaxDevices: yup.string().required("You must enter a Max Devices"),
  institutionBranchId: yup.string().required("You must select a Branch"),
  wifiUsersType: yup.string().required("You must select a Users Type"),
  // wifiUserLoginId: yup
  //   .string()
  //   .email("Please enter a valid email address")
  //   .when(["wifiUserMobileNo"], {
  //     is: (wifiUserMobileNo) => !wifiUserMobileNo,
  //     then: yup.string().required("You must enter a email or mobile number."),
  //   }),

  // wifiUserMobileNo: yup.number()
  //   .typeError("Please enter a number.")
  //   .when(["wifiUserLoginId"], {
  //     is: (wifiUserLoginId) => !wifiUserLoginId,
  //     then: yup.number().required("Atleast one contact field is required."),
  //   }),
});




// const schema = yup.object().shape({
//   wifiUserName: yup
//     .string()
//     .trim()
//     .required("Please enter name")
//     .min(4, "Fullname is too short - must be at least 4 chars.")
//     .max(20, "Fullname is too long - not more then 20 chars."),
//   // wifiUserLoginId: yup
//   //   .string()
//   //   .trim()
//   //   .email("You must enter a valid email")
//   //   .when(["wifiUserMobileNo"], {
//   //     is: (wifiUserMobileNo) => !wifiUserMobileNo,
//   //     then: yup.string().required("Atleast one contact field is required."),
//   //   })
//   //   .required("You must enter a email"),
//   wifiUserPassword: yup
//     .string()
//     .trim()
//     .required("Please enter your password.")
//     .min(4, "Password is too short - must be at least 4 chars."),
//   // wifiUserMobileNo: yup
//   //   .string()
//   //   .trim()
//   //   .required("Please enter Mobile number")
//   //   .max(10, "Mobile number is too long - not more then 10 chars."),
//   wifiUserMaxDevices: yup.string().required("You must enter a Max Devices"),
//   institutionBranchId: yup.string().required("You must select a Branch"),
//   wifiUsersType: yup.string().required("You must select a Users Type"),
//   wifiUserLoginId: yup
//     .string()
//     .email("Please enter a valid email address")
//     .when(["wifiUserMobileNo"], {
//       is: (wifiUserMobileNo) => !wifiUserMobileNo,
//       then: yup.string().required("You must enter a email or mobile number."),
//     }),
//   wifiUserMac: yup
//     .string()
//     .required('You must enter a product mac')
//   // wifiUserMobileNo: yup.number()
//   //   .typeError("Please enter a number.")
//   //   .when(["wifiUserLoginId"], {
//   //     is: (wifiUserLoginId) => !wifiUserLoginId,
//   //     then: yup.number().required("Atleast one contact field is required."),
//   //   }),
// });
// const schema = yup.object().shape({
//   // wifiUserName: yup
//   //   .string()
//   //   .required('You must enter a product name')
//   //   .min(4, 'The product name must be at least 5 characters'),
//   //   wifiUserLoginId:yup
//   //   .string()
//   //   .required('You must enter a product name')
//   //   .min(4, 'The product name must be at least 5 characters'),
//     wifiUserMac:yup
//     .string()
//     .required('You must enter a product mac')
//     // .min(4, 'The product name must be at least 5 characters'),
// })

function Product(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectUsers);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [numLength, setNumlength] = useState(false);

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [product, setProduct] = useState(null);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
  // const [numLength, setNumlength] = useState(false);

  const form = watch();

  useEffect(() => {
    const { id } = routeParams;

    if (id == "new") {
      /**
       * Create New Product data
       */
      dispatch(newProduct());
    } else {
      if (products?.length > 0) {
        const resp = products?.find((ele) => ele.id == id);
        setProduct(resp);
      } else {
        navigate(-1);
      }
    }
  }, [products, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    console.log("product data", product);
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  // useEffect(() => {
  //   return () => {
  //     /**
  //      * Reset Product on component unload
  //      */
  //     dispatch(resetProduct())
  //     setNoProduct(false)
  //   }
  // }, [dispatch])

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such user!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/registered_users"
          color="inherit"
        >
          Go to Registered Users Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form)
  // ) {
  //   return <FuseLoading />
  // }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ProductHeader />}
        content={
          <>
            {/* <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Building" />
              <Tab className="h-64" label="Floors" />
            </Tabs> */}
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab setNumlength={setNumlength} numLength={numLength} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("userDatabase", reducer)(Product);
