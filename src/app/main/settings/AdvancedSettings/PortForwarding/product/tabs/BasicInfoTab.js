import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
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
        name="extranalPort"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.extranalPort}
            helperText={errors?.extranalPort?.message}
            label="Extranal Port"
            autoFocus
            id="extranalPort"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="internalPort"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.internalPort}
            helperText={errors?.internalPort?.message}
            label="Internal Port"
            autoFocus
            id="internalPort"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="institute"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="institute"
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
                label="Select a Reserved Client"
                placeholder="Select a Reserved Client"
                className="mt-8 mb-16"
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name="institute"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="institute"
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
              <TextField {...params} label="Protocal" placeholder="Protocal" />
            )}
          />
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
