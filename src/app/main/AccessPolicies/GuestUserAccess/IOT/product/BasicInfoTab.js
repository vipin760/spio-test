import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import { selectSurfingPolicies } from '../../../store/surfingPoliciesSlice'
import { selectWifiUsers} from '../../../store/wifiUsersSlice'
import { useEffect, useState } from 'react'
import _ from '@lodash'
import moment from 'moment'
import { TimePicker } from '@mui/lab'

function BasicInfoTab(props) {
  const dispatch = useDispatch();
  const surfingPolicies = useSelector(selectSurfingPolicies);
  const wifiUsers = useSelector(selectWifiUsers);
  const methods = useFormContext()
  const [usersList, setUsersList] = useState([])
  useEffect(() => {
    setUsersList(wifiUsers)
  }, [wifiUsers])

  const { control, formState } = methods
  const { errors } = formState

  const categoryList = ['INDIVIDUAL', 'HOSPITAL', 'MEDICARE']
  return (
    <motion.div>
     <Controller
        name="wifiUserId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={usersList?.map((e) => e?.wifiUserName)||[]}
            value={usersList?.length>0?usersList?.find((e) => e?.id == value)?.wifiUserName:""}
            onChange={(event, newValue) => {
              const val = usersList?.find((e) => e?.wifiUserName == newValue)
              onChange(val?.id)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search user Name"
                label="Device Name"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="wifiUserMac"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.wifiUserMac}
            // required
            helperText={errors?.wifiUserMac?.message}
            label="Mac Address"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="wifiSurfingPoliciesId"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={surfingPolicies?.map((e) => e?.wifiSurfingPolicyName)||[]}
            value={surfingPolicies?.length>0?surfingPolicies?.find((e)=>e?.id==value)?.wifiSurfingPolicyName:""}
            onChange={(event, newValue) => {
              const id=surfingPolicies?.find((e)=>e?.wifiSurfingPolicyName==newValue)?.id
              onChange(id)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Surfing Policies"
                label="Surfing Policies"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
