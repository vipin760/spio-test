import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
function OwnerDetails(props) {
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
        name="ownerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ownerName}
            required
            helperText={errors?.ownerName?.message}
            label="OwnerName"
            autoFocus
            id="ownerName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="ownerEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ownerEmail}
            required
            helperText={errors?.ownerEmail?.message}
            label="Owner Email"
            autoFocus
            id="ownerEmail"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="ownerMobile"
        render={({ field }) => (
          <TextField
            {...field}
            className=""
            label="ownerMobile"
            placeholder="Mobile Number"
            variant="outlined"
            fullWidth
            error={!!errors.mobileNumber}
            helperText={errors?.mobileNumber?.message}
          />
        )}
      />
    </motion.div>
  )
}

export default OwnerDetails
