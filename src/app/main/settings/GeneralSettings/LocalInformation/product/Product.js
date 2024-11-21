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
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import BillingDetails from "./tabs/BillingDetails";
import BasicDetails from "./tabs/BasicDetails";
import Address from "./tabs/Address";
import OwnerDetails from "./tabs/OwnerDetails";
import SupportDetails from "./tabs/SupportDetails";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/productSlice";
import reducer from "../store";
import ProductHeader from "./ProductHeader";

import { selectProductById, selectBranches } from "../store/productsSlice";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  branch_name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

function Product(props) {
  const dispatch = useDispatch();
  const productData = useSelector(selectProduct);
  const products = useSelector(selectProduct);
  const navigate = useNavigate();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [product, setProduct] = useState();
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { id } = routeParams;

      if (id === "new") {
        /**
         * Create New Product data
         */
        dispatch(newProduct());
      } else {
        //const resp=branches?.find((branch)=>branch._id==id)
        //setProduct(resp)
        /**
         * Get Product data
         */
        if (products?.length > 0) {
          const data = products?.find((e) => e.id == id);
          setProduct(data);

          //dispatch(getProduct(id,products))
        } else {
          navigate("/account_information");
        }

        // dispatch(getProduct(id)).then((action) => {
        //   /**
        //    * If the requested product is not exist show message
        //    */
        //   if (!action.payload) {
        //     setNoProduct(true);
        //   }
        // });
      }
    }

    updateProductState();
  }, [productData, routeParams]);

  // useDeepCompareEffect(() => {
  //   function updateProductState() {
  //     const { productId } = routeParams

  //     if (productId === 'new') {
  //       /**
  //        * Create New Product data
  //        */
  //       dispatch(newProduct())
  //     } else {
  //       // const resp=branches?.find((branch)=>branch._id==productId)
  //       // setProduct(resp)
  //       /**
  //        * Get Product data
  //        */
  //       console.log('productId list', productId)
  //       // dispatch(getProduct(productId))

  //       // dispatch(getProduct(productId)).then((action) => {
  //       //   /**
  //       //    * If the requested product is not exist show message
  //       //    */
  //       //   if (!action.payload) {
  //       //     setNoProduct(true);
  //       //   }
  //       // });
  //     }
  //   }

  //   updateProductState(()=>{
  //     setProduct(productdata)
  //   })
  // }, [productdata, routeParams])

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
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/institution"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

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
        header={<ProductHeader tabValue={tabValue} setTabValue={setTabValue} />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Details" />
              <Tab className="h-64" label="Location Address" />
              <Tab className="h-64" label="Billing Details" />
              <Tab className="h-64" label="Owner Details " />
              <Tab className="h-64" label="Support Details " />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicDetails />
              </div>

              <div className={tabValue !== 1 ? "hidden" : ""}>
                <Address />
              </div>
              <div className={tabValue !== 2 ? "hidden" : ""}>
                <BillingDetails />
              </div>
              <div className={tabValue !== 3 ? "hidden" : ""}>
                <OwnerDetails />
              </div>
              <div className={tabValue !== 4 ? "hidden" : ""}>
                <SupportDetails />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("eCommerceApp", reducer)(Product);
