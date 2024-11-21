import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Button, Checkbox } from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { Divider, FormControlLabel, FormControl } from '@mui/material'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
        name="ruleName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ruleName}
            required
            helperText={errors?.ruleName?.message}
            label="Rule Name"
            autoFocus
            id="ruleName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="service"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="service"
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
                label="Service"
                placeholder="Service"
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="category"
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
                label="Category"
                placeholder="Category"
              />
            )}
          />
        )}
      />
      <div className="flex flex-row items-center">
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-16 mb-16"
              error={!!errors.url}
              required
              helperText={errors?.url?.message}
              label="Enter Url"
              autoFocus
              id="url"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <Button
          className=""
          component={Link}
          to=""
          variant="contained"
          color="secondary"
        >
          Add
        </Button>
      </div>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="category"
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
                label="Select Client"
                className="mt-8 mb-16"
                placeholder="Select Client"
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
              Action
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="allow"
                control={<Radio />}
                label="Allow"
              />
              <FormControlLabel
                value="block"
                control={<Radio />}
                label="Block"
              />
            </RadioGroup>
          </FormControl>
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
