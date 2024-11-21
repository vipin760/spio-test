import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
function BasicInfoTab(props) {
  const methods = useFormContext()

  const { control, formState,getValues} = methods
  const { errors } = formState

  const categoryList = [
    { value: 1, title: 'Active' },
    { value: 2, title: 'InActive' },
  ]
  return (
    <motion.div>
      <Controller
        name="institutionBranchName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionBranchName}
            required
            helperText={errors?.institutionBranchName?.message}
            label="Institute Branch Name"
            autoFocus
            id="institutionBranchName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink:field?.value
            }}
          />
        )}
      />
      {getValues()?.institutionBranchId&&<Controller
        control={control}
        name="isActive"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="isActive"
            options={categoryList}
            getOptionLabel={(option) => option.title}
            renderOption={(_props, option, { selected }) => (
              <li {..._props}>{option.title}</li>
            )}
            value={value ? _.find(categoryList, { value }) : categoryList[0]}
            onChange={(event, newValue) => {
              onChange(newValue.value)
            }}
            fullWidth
            disableClearable={true}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Status"
                placeholder="Status"
              />
            )}
          />
        )}
      />}
      <Controller
        name="institutionBranchAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-16 mb-16"
            error={!!errors.institutionBranchAddress}
            required
            helperText={errors?.institutionBranchAddress?.message}
            label="Institute Branch Address"
            autoFocus
            id="institutionBranchAddress"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink:field?.value
            }}
          />
        )}
      />
      <Controller
        name="institutionBranchContactNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionBranchContactNumber}
            required
            helperText={errors?.institutionBranchContactNumber?.message}
            label="Institute Branch Contact Number"
            autoFocus
            id="institute_ContactNumber"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink:field?.value
            }}
          />
        )}
      />
      <div className="flex flex-row justify-between space-x-16 align-center">
        <Controller
          name="institutionBranchGst"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.institutionBranchGst}
              required
              helperText={errors?.institutionBranchGst?.message}
              label="Institute Branch Gst Number"
              autoFocus
              id="institutionBranchGst"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink:field?.value
              }}
            />
          )}
        />
      </div>
    </motion.div>
  )
}

export default BasicInfoTab
