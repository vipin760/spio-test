import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import _ from '@lodash'
import { useParams } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function BasicInfoTab(props) {

  const methods = useFormContext()

  const { control, formState, getValues } = methods
  const { errors } = formState;
  const routeParams = useParams();
  const { id } = routeParams;

  const filterOptions = [{
    id: 1,
    value: "Active",
  }, {
    id: 3,
    value: "Inactive",
  }]

  return (
    <motion.div>
      <Controller
        name="tbl_connect_employee_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            helperText={errors?.did_no?.message}
            label="Employee Name"
            autoFocus
            id="employee_name"
            type="text"
            variant="outlined"
            placeholder='Enter employee name'
            value={field.value || ""}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}

          />
        )}
      />
      {id !== "new" && <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ top: '0' }}>
          Select Status
        </InputLabel>
        <Controller
          name="tbl_connect_employee_status"
          className="mt-8 mb-16"
          control={control}
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select status"
              {...field}
              value={field.value || ""}
              sx={{
                width: '100%'
              }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {
                filterOptions?.map((option, index) => (
                  <MenuItem
                    value={option?.id} key={index + 1}>
                    {option?.value}
                  </MenuItem>
                ))
              }
            </Select>
          )}
        />
      </FormControl>}
    </motion.div>
  )
}

export default BasicInfoTab;
