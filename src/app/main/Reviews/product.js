import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
// import {
//   getProduct,
//   newProduct,
//   resetProduct,
//   selectProduct,
// } from '../../store/productSlice'
import reducer from "../../store";
import Review from "./reviews";
// import ProductHeader from './ProductHeader'
// import BasicInfoTab from './BasicInfoTab'
// import { getSurfingPolicies } from '../../store/surfingPoliciesSlice'
// import { getWifiUsers } from '../../store/wifiUsersSlice'
// import { selectAccessPolicies } from '../../store/productsSlice'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  Name: yup.string().required("Please Enter Name"),
  mobileNumber: yup.string().required("Please Enter Mobile NUmber"),
  userName: yup.string().required("Please Enter User Name"),
  sms: yup.string().required("Type your text here"),
});

function Product(props) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noProduct, setNoProduct] = useState(false);
  const [product, setProduct] = useState(null);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  // if (noProduct) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1, transition: { delay: 0.1 } }}
  //       className="flex flex-col flex-1 items-center justify-center h-full"
  //     >
  //       <Typography color="text.secondary" variant="h5">
  //         There is no such product!
  //       </Typography>
  //       <Button
  //         className="mt-24"
  //         component={Link}
  //         variant="outlined"
  //         to="/vip_access"
  //         color="inherit"
  //       >
  //         Go to Products Page
  //       </Button>
  //     </motion.div>
  //   )
  // }

  /**
   * Wait while product data is loading and form is setted
   */
  //   if (loading ) {
  //     return <div className='w-full flex items-center justify-center h-full'><FuseLoading /></div>
  //   }

  return (
    <FormProvider {...methods}>
      {/* <FusePageCarded
        header={''}
        content={
          <>
            
          </>
        }
        // scroll={isMobile ? 'normal' : 'content'}
      /> */}
      <div className="p-16 sm:p-24 " style={{ background: " #FFFFFF" }}>
        <div>
          <Review />
        </div>
      </div>
    </FormProvider>
  );
}

export default Product;
