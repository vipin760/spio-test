import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import DatePicker from '@mui/lab/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
// import { selectWifiUsers} from '../../../store/wifiUsersSlice'
import { useEffect, useState } from 'react'
import _ from '@lodash'
import moment from 'moment'
import { TimePicker } from '@mui/lab'
// import { selectSurfingPolicies } from '../../../store/surfingPoliciesSlice'

function BasicInfoTab(props) {
  const dispatch = useDispatch();
  // const surfingPolicies = useSelector(selectSurfingPolicies);
  // const wifiUsers = useSelector(selectWifiUsers);
  const methods = useFormContext()
  const [usersList, setUsersList] = useState([])
  // useEffect(() => {
  //   setUsersList(wifiUsers)
  // }, [wifiUsers])

  const { control, formState, watch } = methods
  const { errors } = formState;

  const options = ["Chennai", "Bangalore", "Mumbai"];

  console.log("watch",watch());

  return (
    <motion.div>
      <Controller
        name="did_unique_id"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="did_unique_id"
            label="DID ID"
            type="text"
            variant="outlined"
            placeholder='Enter DID Unique Id'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="virtual_no"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="virtual_no"
            label="Virtual Number"
            type="text"
            variant="outlined"
            placeholder='Enter Virtual Number'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <Controller
        name="campain_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="campain_name"
            label="Campain Name"
            type="text"
            variant="outlined"
            placeholder='Enter Campain Name'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <Controller
        name="start_datetime"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="start_datetime"
            label="Start Date"
            type="date"
            variant="outlined"
            placeholder='Start Date'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <Controller
        name="end_datetime"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="end_datetime"
            label="End Date"
            type="date"
            variant="outlined"
            placeholder='End Date'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />





      {/* <Controller
        name="profile"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={options}
            value={""}
            onChange={(event, newValue) => {
              const id = surfingPolicies?.find((e) => e?.wifiSurfingPolicyName == newValue)?.id
              onChange(id)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Profile"
                label="Profile"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}
      {/* <div className='flex justify-between gap-20'>
        <div className="flex flex-col w-[55%]">
          <Controller
            name="startDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                views={['year', 'month', 'day']}
                label="Start Date"
                value={value || null}
                inputFormat="yyyy-MM-dd"
                onChange={(newValue) => {
                  const date = moment(newValue).format("yyyy-MM-DD")
                  console.log("date", date, newValue)
                  onChange(date)
                }}
                renderInput={(params) => <TextField {...params} className="mt-20 mb-20" 
                InputLabelProps={{
                  shrink: true,
                }} />}
              />
            )}
          />
        </div>
        {/* <Controller
          name="startTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="Time"
              value={value ? new Date("01-02-2023 " + value) : null}
              inputFormat="HH:mm:ss"
              ampm={false}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss")
                onChange(time)
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-20 mb-20"
                InputLabelProps={{
                  shrink: true,
                }} />
              )}
            />
          )}
        />
      </div>
      <div className='flex justify-between gap-20'>
        <div className="flex flex-col w-[55%]">
          <Controller
            name="endDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                views={['year', 'month', 'day']}
                label="End Date"
                value={value || null}
                inputFormat="yyyy-MM-dd"
                onChange={(newValue) => {
                  const date = moment(newValue).format("yyyy-MM-DD")
                  console.log("date", date, newValue)
                  onChange(date)
                }}
                renderInput={(params) => <TextField {...params} className="mt-20 mb-20"
                InputLabelProps={{
                  shrink: true,
                }} />}
              />
            )}
          />
        </div>
        <Controller
          name="endTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="Time"
              value={value ? new Date("01-02-2023 " + value) : null}
              inputFormat="HH:mm:ss"
              ampm={false}
              onChange={(newValue) => {
                const time = moment(newValue).format("HH:mm:ss")
                onChange(time)
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-20 mb-20" 
                InputLabelProps={{
                  shrink: true,
                }}/>
              )}
            />
          )}
        />
      </div>
      <Controller
        name="campaign"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="campaign"
            label="Campaign"
            type="text"
            variant="outlined"
            placeholder='Enter campaign'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      /> */}
    </motion.div>
  )
}

export default BasicInfoTab
