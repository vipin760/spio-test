import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import mockApi from '../../../../../@mock-api/mock-api.json'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import { FormControl, Switch } from '@mui/material'
import DatePicker from '@mui/lab/DateTimePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import InputAdornment from '@mui/material/InputAdornment'
import { Divider, FormControlLabel } from '@mui/material'
function BasicInfoTab(props) {
  const methods = useFormContext()
  const tags = mockApi.components.examples.contacts_tags.value

  const { control, formState } = methods
  const { errors } = formState

  function onSwithChange(id) {
    dispatch(updateBed(id))
  }

  const categoryList = ['INDIVIDUAL', 'HOSPITAL', 'MEDICARE']
  return (
    <motion.div>
      <Controller
        name="Gateways"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            //multiple
            freeSolo
            options={categoryList}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Report Type"
                label="Report Type"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <div className="flex flex-col ">
        <Controller
          name="password"
          control={control}
          render={({ field: { date, onChange } }) => (
            <DatePicker
              dateFormat="yy/mm/dd"
              timeFormat={false}
              label="From Date"
              value={date}
              onChange={(newValue) => {
                onChange(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} className="mb-20" />
              )}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              dateFormat="yy/mm/dd"
              label="To Date"
              value={value}
              onChange={(newValue) => {
                onChange(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </div>
    </motion.div>
  )
}

export default BasicInfoTab
