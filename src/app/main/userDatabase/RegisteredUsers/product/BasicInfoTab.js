import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectInstitutionBranches } from "../../store/institutionBranchesSlice";
import * as yup from "yup";
import { selectUser } from "app/store/userSlice";
import { useState } from "react";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const branches = useSelector(selectInstitutionBranches);
  const user = useSelector(selectUser);
  const { control, formState, getValues } = methods;
  const { errors, isValid, dirtyFields } = formState;

  // console.log("erroccccccccccr", user?.data?.institutionType);

  const statusList = [
    { value: "ACTIVE", title: "Active" },
    { value: "IN ACTIVE", title: "InActive" },
  ];
  const removespace = (e) => {
    // 45
    console.log("charcode", e);
    if (e.code === "Minus") {
      e.preventDefault();
    } else if (e.which === 32 && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  };

  const OnlyNumber1 = (e) => {
    if (e.which > 31 && (e.which < 48 || e.which > 57)) {
      e.preventDefault();
    }
    if (getValues().wifiUserMobileNo?.length >= 1) {
      props.setNumlength(true);
    }
    if (getValues().wifiUserMobileNo?.length === 9) {
      props.setNumlength(false);
    }
    return true;
  };
  const OnlyNumber = (e) => {
    if (e.which > 31 && (e.which < 48 || e.which > 57)) {
      e.preventDefault();
    }

    return true;
  };

  // { id: 17, label: "VIP" },
  // { id: 4, label: "IOT" },
  // { id: 5, label: "STAFF"},
  // { id: 7, label: "Private User" },
  // { id: 6, label: "Dorms/Guest" },
  // getValues().user?.data?.institutionType
  const userTypeList = [
    // Hospital
    { id: 17, label: "OP", institutionType: "1" },
    { id: 6, label: "IP", institutionType: "1" },
    { id: 5, label: "Employee", institutionType: "1" },
    { id: 7, label: "Doctor", institutionType: "1" },
    { id: 4, label: "IOT", institutionType: "1" },
    // institutions
    { id: 17, label: "Student", institutionType: "2" },
    { id: 4, label: "IOT", institutionType: "2" },
    { id: 5, label: "Faculty/Admin users", institutionType: "2" },
    { id: 7, label: "Private User", institutionType: "2" },
    { id: 6, label: "Dorms/Guest", institutionType: "2" },
    //Retail
    { id: 17, label: "VIP", institutionType: "3" },
    { id: 4, label: "IOT", institutionType: "3" },
    { id: 5, label: "Personal Access", institutionType: "3" },
    { id: 7, label: "Regular Visitor", institutionType: "3" },
    { id: 6, label: "Vendors", institutionType: "3" },
  ];
  let id=user?.data?.institutionType ? user?.data?.institutionType :"1"

  const userTypes = userTypeList.filter(
    (each) => each.institutionType === id 
  );
  console.log("users,,,,,,.............", getValues());
  return (
    <motion.div>
      <Controller
        name="wifiUserName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.wifiUserName}
            required
            helperText={errors?.wifiUserName?.message}
            label="User Name"
            onKeyDown={removespace}
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: !!field?.value,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="wifiUserLoginId"
        render={({ field }) => (
          <TextField
            {...field}
            className=""
            label="Email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            onKeyDown={removespace}
            required={!dirtyFields.wifiUserMobileNo}
            error={!!errors.wifiUserLoginId}
            helperText={errors?.wifiUserLoginId?.message}
            InputLabelProps={{
              shrink: !!field?.value,
            }}
          />
        )}
      />

      <Controller
        name="wifiUserPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mb-24 mt-24"
            label="Password"
            onKeyDown={removespace}
            //type="password"
            // required
            error={!!errors.wifiUserPassword}
            helperText={errors?.wifiUserPassword?.message}
            variant="outlined"
            fullWidth
            required
            InputLabelProps={{
              shrink: !!field?.value,
            }}
          />
        )}
      />
      <Controller
        name="wifiUserMobileNo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="mobileNumber"
            onKeyDown={OnlyNumber1}
            label="Mobile Number"
            // type="number"
            error={props?.numLength}
            helperText={
              props?.numLength ? "mobile number must contain 10 numbers" : ""
            }
            min="0"
            OnlyNumber={true}
            // oninput="this.value = Math.abs(this.value)"
            //multiline
            //rows={5}
            required={!dirtyFields.wifiUserLoginId}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: !!field?.value,
            }}
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
            id="wifiUserMac"
            label="MAC Address"
            type="text"
            //multiline
            //rows={5}
            onKeyDown={removespace}
            error={!!errors.wifiUserMac}
            helperText={errors?.wifiUserMac?.message}
            // required
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: !!field?.value,
            }}
          />
        )}
      />
      <Controller
        name="wifiUserMaxDevices"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="wifiUserMaxDevices"
            label="Max Devices"
            // type="number"
            onKeyDown={OnlyNumber}
            required
            //multiline
            //rows={5}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: !!field?.value,
            }}
          />
        )}
      />

      <Controller
        name="institutionBranchId"
        control={control}
        //defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            //multiple
            freeSolo
            options={branches?.map((e) => e?.institutionBranchName)}
            value={
              branches?.find((e) => e?.institutionBranchId == value)
                ?.institutionBranchName || ""
            }
            onChange={(event, newValue) => {
              const obj = branches?.find(
                (e) => e?.institutionBranchName == newValue
              );
              onChange(obj?.institutionBranchId);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Branch"
                onKeyDown={removespace}
                label="Branch"
                required
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
        name="wifiUsersType"
        control={control}
        //defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            //multiple
            freeSolo
            options={userTypes?.map((e) => e.label)}
            value={userTypes?.find((e) => e?.id == value)?.label || ""}
            onChange={(event, newValue) => {
              const obj = userTypes?.find((e) => e?.label == newValue);
              onChange(obj?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="User Type"
                label="User Type"
                onKeyDown={removespace}
                required
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
