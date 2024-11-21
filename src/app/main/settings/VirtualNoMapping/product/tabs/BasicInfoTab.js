import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import mockApi from '../../../../../../../@mock-api/mock-api.json'
import { Checkbox, FormControl, FormControlLabel } from '@mui/material'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
function BasicInfoTab(props) {

  const methods = useFormContext()
  const routeParams = useParams()
  const tags = mockApi.components.examples.contacts_tags.value

  const { control, formState, getValues, watch } = methods
  const { errors } = formState
  const userTypeList = [{ id: 2, label: "Admin" }, { id: 3, label: "Viewer" }, { id: 4, label: "Marker" }];

  // console.log("getValues", getValues);

  const watchedValues = watch();

  console.log('Watched Values:', watchedValues);


  return (
    <motion.div>
      <Controller
        name="userProfileName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.userProfileName}
            required
            helperText={errors?.userProfileName?.message}
            label="Profile Name"
            autoFocus
            id="userProfileName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="userLoginName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.userLoginName}
            required
            helperText={errors?.userLoginName?.message}
            label="Login User Name"
            autoFocus
            id="userLoginName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      {routeParams?.id === "new" && <Controller
        name="userLoginPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.userLoginPassword}
            required
            helperText={errors?.userLoginPassword?.message}
            label="Login Password"
            autoFocus
            id="userLoginPassword"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />}

      <Controller
        name="userType"
        control={control}
        //defaultValue={userTypeList?.find((e)=>e?.value==getValues().userType)||""}
        render={({ field: { onChange, value } }) => {
          console.log("userType", value)
          return (

            <Autocomplete
              className="mt-8 mb-16"
              //multiple
              freeSolo
              options={userTypeList}
              value={value && userTypeList?.find((e) => e?.id == value)?.label || ""}
              onChange={(event, newValue) => {
                onChange(newValue?.id)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="User Type"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )
        }}
      />


      <Controller
        control={control}
        name="user2faStatus"
        className="mb-20"
        label="2Factor Authentication"
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <FormControlLabel
              label="2Factor Authentication"
              control={
                <Checkbox
                  checked={value == 1 ? true : false}
                  onChange={(event) => {
                    onChange(event.target.checked ? 1 : 0)
                  }}
                  size="small"
                />
              }
            />
          </FormControl>
        )}
      />
      {routeParams?.id !== "new" && <Controller
        control={control}
        name="userStatusId"
        className="mb-20"
        label="Active Status"
        render={({ field: { onChange, value } }) => (
          <FormControl>
            <FormControlLabel
              label="Active status"
              control={
                <Checkbox
                  checked={value === 1}
                  onChange={(event) => {
                    onChange(event.target.checked ? 1 : 0)
                  }}
                  size="small"
                />
              }
            />
          </FormControl>
        )}
      />}
    </motion.div>
  )
}

export default BasicInfoTab
