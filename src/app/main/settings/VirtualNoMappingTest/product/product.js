

import FuseLoading from '@fuse/core/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded'
import { useDeepCompareEffect } from '@fuse/hooks'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import withReducer from 'app/store/withReducer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
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
import ProductHeader from './productHeader'
import BasicInfoTab from './BasicInfoTab'
import moment from 'moment'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  did_unique_id: yup.string().required('You must enter DID number'),
  virtual_no: yup.string().required('You must enter virtual number'),
  profile_name: yup.string().required('You must enter the profile name'),
  campain_name: yup.string().required('You must enter the campaign name'),
  start_datetime: yup.date().required('You must select the start date'),
  end_datetime: yup.date().required('You must select the end date'),
})

function Product(props) {
  const dispatch = useDispatch()
  const product = useSelector(selectProduct)
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
  const routeParams = useParams()
  const [noProduct, setNoProduct] = useState(false)

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  })
  const { reset, watch, control, formState, getValues } = methods
  const form = watch();  

  // Format date function
  function formatDate(isoDate) {
    // return isoDate ? moment.utc(isoDate).format('YYYY-MM-DD HH:mm:ss') : ''
    return isoDate ? new Date(isoDate).toLocaleDateString('en-CA') : ''
  }

  const { id } = routeParams

  useDeepCompareEffect(() => {
    async function updateProductState() {

      if (id === 'new') {
        dispatch(newProduct())
      } else {
        const res = await dispatch(getProduct(id))
        if (getProduct.fulfilled.match(res)) {
          const productData = res.payload
          const formattedProduct = {
            ...productData,
            //  start_datetime: '23-12-2000',
            start_datetime: formatDate(productData.start_datetime),
            end_datetime: formatDate(productData.end_datetime),
          }
          reset(formattedProduct)
        } else {
          setNoProduct(true)
        }
      }
    }

    updateProductState()
  }, [dispatch, routeParams, reset])

  const isDidUniqueIdReadOnly = id == 'new' ? false : true

  useEffect(() => {
    return () => {
      dispatch(resetProduct())
      setNoProduct(false)
    }
  }, [dispatch])

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
          <div className="p-16 sm:p-24 max-w-3xl">
            <BasicInfoTab isDidUniqueIdReadOnly={isDidUniqueIdReadOnly} />
          </div>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  )
}

export default withReducer('virtualNoMapping', reducer)(Product)
