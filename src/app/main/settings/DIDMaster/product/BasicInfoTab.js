import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import _ from '@lodash'

function BasicInfoTab(props) {

  const methods = useFormContext()

  const { control, formState, getValues } = methods
  const { errors } = formState;

  return (
    <motion.div>
      <Controller
        name="did_no"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            helperText={errors?.did_no?.message}
            label="DID Number"
            autoFocus
            id="did_no"
            type="text"
            variant="outlined"
            placeholder='Enter DID Number'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}

          />
        )}
      />
      <Controller
        name="sip_line_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            helperText={errors?.sip_line_name?.message}
            className="mt-8 mb-16"
            id="sip_line_name"
            label="SIP Line Name"
            type="text"
            variant="outlined"
            placeholder='Enter SIP Line Name'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <Controller
        name="state_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            helperText={errors?.state?.message}
            className="mt-8 mb-16"
            id="state_name"
            label="State"
            type="text"
            variant="outlined"
            placeholder='Enter State'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="sip_location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            helperText={errors?.sip_location?.message}
            id="sip_location"
            label="Location"
            type="text"
            variant="outlined"
            placeholder='Enter Location'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
