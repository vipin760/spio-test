import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import _ from '@lodash'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { removeProduct, saveProduct, updateAdminUser } from '../store/productSlice'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { selectUser } from 'app/store/userSlice'
import moment from 'moment'

function ProductHeader(props) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const methods = useFormContext()
  const { formState, watch, getValues } = methods
  const { isValid, dirtyFields } = formState
  const featuredImageId = watch('featuredImageId')
  const images = watch('images')
  const name = watch('branch_name')
  const theme = useTheme()
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  console.log("user", user);



  async function handleSaveProduct() {

    try {
      console.log("getValues", getValues())
      setLoader(true)
      const formData = getValues();
      let params = {
        ...formData,
        "institutionMasterId": user?.data?.institutionMasterId,
        "parentUserId": user?.data?.userId,
        "userCreatedBy": user?.data?.userId
      }
      let a;
      if (!formData?.userId) {
        params = { ...params, userStatusId: 1, userCreatedTime: moment().format("YYYY-MM-DDD HH:MM:ss") }

        a = await dispatch(saveProduct(params))
      } else {

        a = await dispatch(updateAdminUser(params))
      }
      if (a?.error?.message) {
        enqueueSnackbar(a?.payload || 'Error Occured', {
          variant: 'error',
        })
        return
      }
      navigate(-1)
    } catch (err) {
      enqueueSnackbar('Error Occured', {
        variant: 'error',
      })
    }
    setLoader(false)
  }

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate('/administrators')
    })
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        {/* <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/administrators"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">
            </span>
          </Typography>
        </motion.div> */}

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || 'Administration'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Administration Details
            </Typography>
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
          Close
        </Button>
        <LoadingButton
          loading={loader || false}
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveProduct}
        >
          Save
        </LoadingButton>
      </motion.div>
    </div>
  )
}

export default ProductHeader
