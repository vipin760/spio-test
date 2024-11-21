import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
function BasicInfoTab(props) {
  const methods = useFormContext()
  const tags = mockApi.components.examples.contacts_tags.value

  const { control, formState } = methods
  const { errors } = formState

  const statusList = [
    { value: '1', title: 'Active' },
    { value: '0', title: 'InActive' },
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
            required
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
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="location"
            label="Location"
            type="text"
            //multiline
            //rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple categories"
                label="Categories"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      {/* <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple tags"
                label="Tags"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}

      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="status"
            className="mt-32"
            options={statusList}
            getOptionLabel={(option) => option.title}
            renderOption={(_props, option, { selected }) => (
              <li {..._props}>{option.title}</li>
            )}
            value={
              value ? value.map((id) => _.find(statusList, { value })) : []
            }
            onChange={(event, newValue) => {
              onChange(newValue.map((item) => item.value))
            }}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Status" placeholder="Status" />
            )}
          />
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
