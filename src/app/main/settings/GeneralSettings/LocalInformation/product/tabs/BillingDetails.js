import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
function BillingDetails(props) {
  const methods = useFormContext()
  const tags = mockApi.components.examples.contacts_tags.value

  const { control, formState } = methods
  const { errors } = formState

  const statusList = [
    { value: 'ACTIVE', title: 'Active' },
    { value: 'IN ACTIVE', title: 'InActive' },
  ]
  const categoryList = ['INDIVIDUAL', 'HOSPITAL', 'MEDICARE']
  return (
    <motion.div>
      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.company}
            helperText={errors?.company?.message}
            label="Company"
            autoFocus
            id="company"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="taxId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.taxId}
            helperText={errors?.taxId?.message}
            label="Tax Id"
            autoFocus
            id="taxId"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="billingAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.address}
            helperText={errors?.adress?.message}
            label="Address"
            autoFocus
            id="billingAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="billingCountry"
        control={control}
          render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                placeholder="Country"
                label="Country "
                autoFocus
                id="billingCountry"
                variant="outlined"
                fullWidth
              />
            )}
      />
      <Controller
        name="billingState"
        control={control}
        render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                placeholder="State"
                label="State"
                autoFocus
                id="billingState"
                variant="outlined"
                fullWidth
              />
            )}
      />
      <Controller
        name="billingCity"
        control={control}
        render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                placeholder="City"
                label="City"
                autoFocus
                id="billingCity"
                variant="outlined"
                fullWidth
              />
            )}
      />
      <Controller
        control={control}
        name="billingPincode"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Pincode"
            placeholder="Pin Code"
            variant="outlined"
            fullWidth
            error={!!errors.pinCode}
            helperText={errors?.pinCode?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="billingMobile"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Mobile"
            placeholder="Mobile Number"
            variant="outlined"
            fullWidth
            error={!!errors.mobileNumber}
            helperText={errors?.mobileNumber?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="billingEmail"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        )}
      />
    </motion.div>
  )
}

export default BillingDetails
