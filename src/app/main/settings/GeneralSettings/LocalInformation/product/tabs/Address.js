import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
function Address(props) {
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
        name="locationAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.address}
            helperText={errors?.adress?.message}
            label="Address"
            autoFocus
            id="locationAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="locationCountry"
        control={control}
          render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                placeholder="Country"
                label="Country"
                autoFocus
                id="locationCountry"
                variant="outlined"
                fullWidth
              />
        )}
      />
      <Controller
        name="locationState"
        control={control}
          render={({ field }) => (
              <TextField
                // {...params}
                {...field}
                className="mt-8 mb-16"
                placeholder="State"
                label="State"
                autoFocus
                id="locationState"
                variant="outlined"
                fullWidth
              />
        )}
      />
      <Controller
        name="locationCity"
        control={control}
          render={({ field }) => (
              <TextField
                // {...params}
                {...field}
                 className="mt-8 mb-16"
                placeholder="City"
                label="City"
                autoFocus
                id="locationCity"
                variant="outlined"
                fullWidth
              />
            )}
      />
      <Controller
        control={control}
        name="locationPincode"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Pin Code"
            placeholder="Pin Code"
            variant="outlined"
            fullWidth
            error={!!errors.pinCode}
            helperText={errors?.pinCode?.message}
          />
        )}
      />
    </motion.div>
  )
}

export default Address
