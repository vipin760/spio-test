import TextField from '@mui/material/TextField'
import { Controller, useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import _ from '@lodash'
import { Autocomplete } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProducts } from '../../DIDMaster/store/productsSlice'
import { DatePicker, DateTimePicker } from '@mui/lab'
import moment from 'moment'

function BasicInfoTab(props) {

  const [usersList, setUsersList] = useState(null);
  const methods = useFormContext();
  const { control, formState, getValues } = methods
  const { errors } = formState;
  const { isDidUniqueIdReadOnly } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await dispatch(getProducts());  // Wait for the dispatch to complete
        setUsersList(response?.payload?.data); // Log the response
      } catch (error) {
        console.error("Error fetching products:", error);  // Handle any errors
      }
    };

    fetchProducts();  // Call the async function

  }, [dispatch]);

  return (
    <motion.div>
      <Controller
        name="did_unique_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={usersList || []}
            getOptionLabel={(option) => option?.did_no || ""}
            value={usersList?.find((e) => e?.tbl_connect_did_unique_id === value) || null}
            onChange={(event, newValue) => {
              onChange(newValue ? newValue?.tbl_connect_did_unique_id : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search DID No"
                label="DID No"
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
        name="profile_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="profile_name"
            label="Profile Name"
            type="text"
            variant="outlined"
            placeholder='Enter Profile Name'
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

          {/* <Controller
        name="start_datetime"
        control={control}
        defaultValue={null} // Set a default value if necessary
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            label="Start Date"
            value={value || null}
            onChange={(newValue) => {
              if (newValue) {
                const formattedDate = moment(newValue).format('YYYY-MM-DD HH:mm:ss');
                console.log("Selected Start Date:", formattedDate); // Log selected start date
                if (moment(newValue).format('HH:mm:ss') === '00:00:00') {
                  formattedDate = moment(newValue).startOf('day').format('YYYY-MM-DD HH:mm:ss');
                }
                onChange(formattedDate);
              }
            }}
            renderInput={(params) => <TextField className="mt-8 mb-16" fullWidth InputLabelProps={{ shrink: true }} {...params} />}
          />
        )}
      /> */}

      <Controller
        name="start_datetime"
        control={control}
        defaultValue={null} // Set a default value if necessary
        render={({ field: { onChange, value } }) => (
          <DatePicker
          label="Start Date"
          value={value}
          onChange={(val)=>{
            const formattedDate = moment(val).format('YYYY-MM-DD 00:00:00');
            onChange(formattedDate);
          }}
          renderInput={(params) => <TextField className="mt-8 mb-16" InputLabelProps={{ shrink: true}} fullWidth {...params} />} // Use TextField or your preferred input
          />
        )}
        />

      <Controller
        name="end_datetime"
        control={control}
        defaultValue={null} // Set a default value if necessary
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label="End Date"
            value={value}
            onChange={(val)=>{
              const formattedDate = moment(val).format('YYYY-MM-DD 00:00:00');
              onChange(formattedDate);
            }}
            renderInput={(params) => <TextField className="mt-8 mb-16" InputLabelProps={{ shrink: true}} fullWidth {...params} />} // Use TextField or your preferred input
          />
        )}
      />
    </motion.div>
  )
}

export default BasicInfoTab
