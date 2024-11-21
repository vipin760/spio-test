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
  const number = [1, 2, 3, 4, 5, 6, 7]
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
                label="User"
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
        name="Attendant"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            //multiple
            freeSolo
            options={number}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Attendant "
                label="Attendant "
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}
      <div className="flex flex-col ">
        <Controller
          name="wifiUserAccessStartDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              views={['year', 'month', 'day']}
              label="Access Start Date"
              value={value||null}
              inputFormat="yyyy-MM-dd"
              onChange={(newValue) => {
                const date = moment(newValue).format("yyyy-MM-DD")
                console.log("date", date, newValue)
                onChange(date)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
        <Controller
          name="wifiUserAccessStartTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="Access Start Time"
              value={value?new Date("01-02-2023 "+value):null}
              inputFormat="HH:mm:ss"
              ampm={false}
              onChange={(newValue) => {
                const time=moment(newValue).format("HH:mm:ss")
                onChange(time)
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-20 mb-20" />
              )}
            />
          )}
        />
      </div>
     <div className="flex flex-col ">
        <Controller
          name="wifiUserAccessRevokeDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              views={['year', 'month', 'day']}
              label="Access Revoke Date"
              value={value||null}
              inputFormat="yyyy-MM-dd"
              onChange={(newValue) => {
                const date = moment(newValue).format("yyyy-MM-DD")
                console.log("date", date, newValue)
                onChange(date)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
        <Controller
          name="wifiUserAccessRevokeTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="Access Revoke Time"
              value={value?new Date("01-02-2023 "+value):null}
              ampm={false}
              inputFormat="HH:mm:ss"
              onChange={(newValue) => {
                const time=moment(newValue).format("HH:mm:ss")
                onChange(time)
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-20 mb-20" />
              )}
            />
          )}
        />
      </div>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Note"
            type="text"
            multiline
            rows={5}
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
