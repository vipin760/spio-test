import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import mockApi from "../../../../../../@mock-api/mock-api.json";
import { Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import { FormControl, Switch } from "@mui/material";
import DatePicker from "@mui/lab/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getSurfingPolicies,
  selectSurfingPolicies,
} from "../../../store/surfingPoliciesSlice";
import { useEffect } from "react";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const tags = mockApi.components.examples.contacts_tags.value;
  const surfingPolicies = useSelector(selectSurfingPolicies);
  const { control, formState, getValues } = methods;
  const { errors } = formState;
  console.log("formState", getValues());
  const { skipKYC, skipSignup } = getValues();

  console.log("...............................", surfingPolicies);
  function onSwithChange(id) {
    dispatch(updateBed(id));
  }
  useEffect(() => {
    getSurfingPolicies();
  }, []);

  return (
    <motion.div>
      <Controller
        name="voucherName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Voucher Number"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
       <Controller
        name="Qatar_ID"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.Qatar_ID}
            required
            helperText={errors?.Qatar_ID?.message}
            label="Qatar ID"
            autoFocus
            id="Qatar_ID"
            variant="outlined"
            fullWidth
          />
        )}
      />
      {/* <Controller
        name="Qatar_ID"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.Qatar_ID}
            required
            helperText={errors?.Qatar_ID?.message}
            label="Qatar ID"
            type="number"
            // autoFocus
            id="Qatar_ID"
            variant="outlined"
            fullWidth
          />
        )}
      /> */}

      <div className="flex flex-col ">
        <Controller
          name="password"
          control={control}
          render={({ field: { date, onChange } }) => (
            <DatePicker
              dateFormat="yy/mm/dd"
              timepicker={false}
              label="Usable From Date"
              value={date}
              onChange={(newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => <TextField className="mt-8 mb-16" {...params} />}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="usable from Time"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-25 mb-20" />
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
              label="Expire Date"
              value={value}
              onChange={(newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => <TextField {...params}className="mt-20 mb-16" />}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TimePicker
              label="Expiry Time"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} className="mt-25 mb-20" />
              )}
            />
          )}
        />
      </div>
      <Typography variant="caption" className="font-medium">
        Options
      </Typography>
      <div className="flex flex-row space-x-16">
        <div>
          <Controller
            control={control}
            name="skipKYC"
            className="mb-20"
            label="Active"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                {console.log("Active value", value)}
                <FormControlLabel
                  label="Skip KYC"
                  control={
                    <Checkbox
                      checked={value === true}
                      onChange={(event) => {
                        onChange(event.target.checked);
                      }}
                      size="small"
                    />
                  }
                />
              </FormControl>
            )}
          />
        </div>
        <div className={skipKYC !== true ? "hidden" : ""}>
          <Controller
            control={control}
            name="skipSignup"
            className="mb-20"
            render={({ field: { onChange, value } }) => (
              <FormControl>
                {console.log("skip", value)}
                <FormControlLabel
                  label="Skip Signup"
                  control={
                    <Checkbox
                      //checked={value === true}
                      onChange={(event) => {
                        onChange(event.target.checked);
                      }}
                      size="small"
                    />
                  }
                />
              </FormControl>
            )}
          />
        </div>
      </div>
      <Controller
        name="wifiSurfingPoliciesId"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={
              surfingPolicies?.map((e) => e?.wifiSurfingPolicyName) || []
            }
            value={
              surfingPolicies?.length > 0
                ? surfingPolicies?.find((e) => e?.id == value)
                    ?.wifiSurfingPolicyName
                : ""
            }
            onChange={(event, newValue) => {
              const id = surfingPolicies?.find(
                (e) => e?.wifiSurfingPolicyName == newValue
              )?.id;
              onChange(id);
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
  );
}

export default BasicInfoTab;
