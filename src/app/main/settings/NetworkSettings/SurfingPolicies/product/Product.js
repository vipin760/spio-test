import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect } from '@fuse/hooks'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import withReducer from 'app/store/withReducer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import _ from '@lodash'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from '../store/productSlice'
import reducer from '../store'
import ProductHeader from './ProductHeader'
import BasicInfoTab from './BasicInfoTab'

import { selectProductById, selectBranches } from '../store/productsSlice'
import { getInstitutes } from '../store/institutesSlice'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  wifiSurfingPolicyName: yup
    .string()
    .required('You must Select Surfing Policy'),
    // .min(5, 'The product name must be at least 5 characters'),
    wifiUsageTimeMins:yup
    .string()
    .required('You must enter usage time'),
    wifiAuthTimesLimit:yup
    .string()
    .required('You must enter auth time'),
    wifiUpLimitKbps:yup
    .string()
    .required('You must enter Upload speed'),
    wifiDownLimitKbps:yup
    .string()
    .required('You must enter download speed'),
    wifiBandwidthUpLimitKbps:yup
    .string()
    .required('You must enter bandwith Upload speed'),
    wifiBandwidthDownLimitKbps:yup
    .string()
    .required('You must enter bandwith Upload speed'),

})

function Product(props) {
  const dispatch = useDispatch()
  const product = useSelector(selectProduct)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

  const routeParams = useParams()
  const [tabValue, setTabValue] = useState(0)
  //const [product, setProduct] = useState(0);
  const [noProduct, setNoProduct] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch, control, onChange, formState } = methods
  const form = watch()

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { id } = routeParams
      dispatch(getInstitutes())
      if (id === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newProduct())
      } else {
        //const resp=branches?.find((branch)=>branch._id==id)
        //setProduct(resp)
        /**
         * Get Product data
         */
        console.log('id list', id)
        dispatch(getProduct(id))

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

    updateProductState()
  }, [dispatch, routeParams])

  useEffect(() => {
    if (!product) {
      return
    }
    /**
     * Reset the form on product state changes
     */
    reset(product)
  }, [product, reset])

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct())
      setNoProduct(false)
    }
  }, [dispatch])

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value)
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
          to="/surfing_policies"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    )
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form)
  ) {
    return (  <div className="w-full flex items-center justify-center h-full">
    <FuseLoading />
  </div>)
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
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default withReducer('surfingPolicies', reducer)(Product)
