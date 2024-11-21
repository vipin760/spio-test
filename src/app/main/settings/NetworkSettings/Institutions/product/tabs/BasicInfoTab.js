import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import mockApi from "../../../../../../../@mock-api/mock-api.json";
import { Checkbox } from "@mui/material";
import { motion } from "framer-motion";
function BasicInfoTab(props) {
  const methods = useFormContext();
  const tags = mockApi.components.examples.contacts_tags.value;

  const { control, formState } = methods;
  const { errors } = formState;

  const statusList = [
    { value: "ACTIVE", title: "Active" },
    { value: "IN ACTIVE", title: "InActive" },
  ];
  const institutionList = [
    {
      id: 1,
      institutionName: "Hospital",
    },
    {
      id: 2,
      institutionName: "Instituation",
    },
    {
      id: 2,
      institutionName: "Retail",
    },
    // 'HOSPITALS', 'INSTITUTIONS', 'RETAILS'
  ];
  return (
    <motion.div>
      <Controller
        name="instituteName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.instituteName}
            // required
            helperText={errors?.instituteName?.message}
            label="Institute Name"
            autoFocus
            id="instituteName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="industryType"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            freeSolo
            // value={value}
            id="combo-box-demo"
            options={institutionList.map((e) => e.institutionName) || []}
            value={
              institutionList?.length > 0
                ? institutionList?.find((e) => e.id == value)?.institutionName
                : ""
            }
            onChange={(event, newValue) => {
              const id = institutionList?.find(
                (e) => e?.institutionName == newValue
              )?.id;
              onChange(id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                // placeholder="Industry Typ/e"
                label="Industry Type "
                variant="outlined"
                // className="mb-16"
                type="industryType"
                // required
                fullWidth
                error={!!errors.industryType}
                helperText={errors?.industryType?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        name="orgAppURL"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.orgAppURL}
            // required
            helperText={errors?.orgAppURL?.message}
            label="Organization APP URL"
            id="orgAppURL"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="panNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.panNumber}
            // required
            helperText={errors?.panNumber?.message}
            label="PAN Number"
            id="panNumber"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="gstNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.gstNumber}
            // required
            helperText={errors?.gstNumber?.message}
            label="GST Number"
            id="gstNumber"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="billingAddress"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.billingAddress}
            // required
            helperText={errors?.billingAddress?.message}
            label="Billing address"
            id="billingAddress"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.state}
            // required
            helperText={errors?.state?.message}
            label="state"
            id="state"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="pinCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.pinCode}
            // required
            helperText={errors?.pinCode?.message}
            label="Pincode"
            id="pinCode"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="ContactPersonName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ContactPersonName}
            // required
            helperText={errors?.ContactPersonName?.message}
            label="Contact Person Name"
            id="ContactPersonName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="ContactPersonEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ContactPersonEmail}
            // required
            helperText={errors?.ContactPersonEmail?.message}
            label="Contact Person Email"
            id="ContactPersonEmail"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="ContactPersonNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.ContactPersonNumber}
            // required
            helperText={errors?.ContactPersonNumber?.message}
            label=" Contact Person Number"
            id="ContactPersonNumber"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </motion.div>
  );
}

export default BasicInfoTab;
