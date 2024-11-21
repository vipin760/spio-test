import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../../@mock-api/mock-api.json'
import { Button, Checkbox, FormControlLabel, FormControl } from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { motion } from 'framer-motion'
function BasicInfoTab(props) {
  const methods = useFormContext()
  const tags = mockApi.components.examples.contacts_tags.value

  const { control, formState } = methods
  const { errors } = formState

  const categoryList = [
    { value: 'ACTIVE', title: 'Active' },
    { value: 'IN ACTIVE', title: 'InActive' },
  ]
  return (
    <motion.div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="mac_address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.mac_address}
            helperText={errors?.mac_address?.message}
            label="Mac Address"
            autoFocus
            id="mac_address"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="network"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="network"
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
            renderInput={(params) => (
              <TextField
                {...params}
                className="mt-8 mb-16"
                label="Network"
                placeholder="Network"
              />
            )}
          />
        )}
      />
      <Controller
        // key={}
        name="action"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <FormLabel variant="caption" className="font-medium">
              Enable Ping Monitoring
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
