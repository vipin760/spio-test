import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useCallback, } from "react";
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
} from "../store/productSlice";
import reducer from "../store";
import ProductHeader from "./ProductHeader";
import BasicInfoTab from "./BasicInfoTab";

import { selectProductById, selectBranches, getGateway } from "../store/productsSlice";
import { getInstitutes } from "../store/institutesSlice";





function Product(props) {
  const dispatch = useDispatch();
  const products = useSelector(selectBranches);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [loading, setLoading] = useState(true);
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = routeParams

  
const schema = yup.object().shape(
  id==='new' ?
  {
    institutionGatewayHashName: yup
    .string()
    .matches(/^[a-z]+$/,"Institution Gateway Name must match the following: /^[a-z]+$/")
    .required("You Must Enter Gateway Name"),
  institutionGatewayName: yup
    .string()
    .required("Institution Profile Name Is Required"),
  institutionGatewaySecreatKey: yup
    .string()
    .required("You Must Enter Secret Key"),
  institutionGatewaySerialNo: yup
    .string()
    .required("You Must Enter Serial Number"),
  }
:
{
institutionGatewayHashName: yup
    .string()
    .matches(/^[a-z]+$/)
    .required("You Must Enter Gateway Name"),
  institutionGatewayName: yup
    .string()
    .required("Profile Name Is Required"),
  institutionGatewaySerialNo: yup
    .string()
    .required("You Must Enter Serial Number"),
    
  }
);


  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const memoizedResetProduct = useMemo(() => resetProduct, []);


  useDeepCompareEffect(() => {
    function updateProductState() {
    setLoading(false)
      dispatch(getGateway())
      if (id === "new") {
        dispatch(newProduct());
      } else {
        if (products?.length > 0) {
          const result = products?.find((e) => e?.id == id)
          console.log('result update fetch result',result)
          if (result) {
            setProduct(result)
          } else {
            setNoProduct(true);
          }
        } else {
          navigate(-1)
        }
      }
    }
    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }

    reset(product);
  }, [product, reset,routeParams]);
  
  

  const memoizedReset = useCallback(() => {
    dispatch(memoizedResetProduct());
    setNoProduct(false);
  }, [dispatch, memoizedResetProduct]);

  useEffect(() => {
    return () => {
      memoizedReset();
    };
  }, [memoizedReset]);
  function handleTabChange(event, value) {
    setTabValue(value);
  }

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
          to="/surfing_policies"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

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
                <BasicInfoTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("surfingPolicies", reducer)(Product);
