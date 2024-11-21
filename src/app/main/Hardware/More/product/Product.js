import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import ActiveWAN from "./tabs/ActiveWAN";
import HardwareDetails from "./tabs/HardwareDetails";
import History from "./tabs/History";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "./store/productSlice";
import reducer from "./store";
import ProductHeader from "./ProductHeader"
import { styled } from "@mui/material/styles";
import FusePageSimple from '@fuse/core/FusePageSimple';


import { selectProductById, selectBranches } from "./store/productsSlice";
import BasicInfoTab from "./tabs/BasicInfoTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  branch_name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Product(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const pageLayout = useRef(null);

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  //const [product, setProduct] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { productId } = routeParams;

      if (productId === "new") {
        /**
         * Create New Product data
         */
        dispatch(newProduct());
      } else {
        //const resp=branches?.find((branch)=>branch._id==productId)
        //setProduct(resp)
        /**
         * Get Product data
         */
        console.log("productId list", productId);
        dispatch(getProduct(productId));

        dispatch(getProduct(productId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

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
  //         to="/institution"
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
  // if (
  //   _.isEmpty(form) ||
  //   (product &&
  //     routeParams.productId !== product.id &&
  //     routeParams.productId !== 'new')
  // ) {
  //   return <FuseLoading />
  // }

  return (
    <FormProvider {...methods}>
    <FusePageCarded
      header={<ProductHeader />}
      content={
        <>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64 border-b-1' }}
          >
            <Tab className="h-64" label="Active WAN" />
            <Tab className="h-64" label="Hardware Details" />
            <Tab className="h-64" label="History" />
            <Tab className="h-64" label="Add Gateway Details" />

          </Tabs>
          <div className="p-16 sm:p-24 max-w-3xl">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <ActiveWAN />
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <HardwareDetails />
            </div>
            <div className={tabValue !== 2 ? 'hidden' : ''}>
              <History />
            </div>
            <div className={tabValue !== 3 ? 'hidden' : ''}>
              <BasicInfoTab setTabValue={setTabValue} />
            </div>
          </div>
        </>
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  </FormProvider>
  );
}

export default withReducer("eCommerceApp", reducer)(Product);
