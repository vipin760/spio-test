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
  getOneProduct,
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from '../store/productSlice'
import reducer from '../store'
import ProductHeader from './productHeader'
import BasicInfoTab from './BasicInfoTab'

import { selectProductById } from '../store/productsSlice'
// import { getInstitutes } from '../store/institutesSlice'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  did_unique_id: yup
    .string()
    .required('You must enter DID number'),
  virtual_no: yup
    .string()
    .required('You must enter SIP line number'),
  campain_name: yup
    .string()
    .required('You must select the state'),
  start_datetime: yup
    .date()
    .required('You must enter the location'),
  end_datetime: yup
    .date()
    .required('You must enter the location'),
})

function Product(props) {
  const dispatch = useDispatch()
  const product = useSelector((state)=>{
    console.log("data",state);
    
    state?.virtualNomapping?.products.data
  })
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

  // console.log("product", product);


  useDeepCompareEffect(() => {
    function updateProductState() {
      const { id } = routeParams
      if (id === 'new') {
        dispatch(newProduct())
      } else {
        console.log('id list', id)
        dispatch(getProduct(id))
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

  useEffect(() => {
    dispatch(getOneProduct(routeParams?.id))
    // console.log("DATA", data);

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

export default withReducer('virtualNoMapping', reducer)(Product)



