import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import mockApi from "../../../../../../../@mock-api/mock-api.json";
import { Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import DatePicker from "@mui/lab/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
function BasicDetails(props) {
  const methods = useFormContext();
  const tags = mockApi.components.examples.contacts_tags.value;

  const { control, formState } = methods;
  const { errors } = formState;

  const statusList = [
    { value: "ACTIVE", title: "Active" },
    { value: "IN ACTIVE", title: "InActive" },
  ];
  const categoryList = [
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
  ];
  return (
    <motion.div>
      <Controller
        name="locationIndustry"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-10"
            label="Location Industry"
            placeholder="Location"
            variant="outlined"
            required
            fullWidth
            error={!!errors.locationName}
            helperText={errors?.locationName?.message}
          />
        )}
      />
      <Controller
        name="industry_type"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-10"
            freeSolo
            // value={value}
            id="combo-box-demo"
            options={categoryList.map((e) => e.institutionName) || []}
            value={
              categoryList?.length > 0
                ? categoryList?.find((e) => e.id == value)?.institutionName
                : ""
            }
            onChange={(event, newValue) => {
              const id = categoryList?.find(
                (e) => e?.institutionName == newValue
              )?.id;
              onChange(id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Industry Type"
                label="Industry Type "
                variant="outlined"
                className="mt-8 mb-10"
                type="industry_type"
                required
                // onKeyDown={removespace}
                fullWidth
                error={!!errors.industry_type}
                helperText={errors?.industry_type?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        control={control}
        name="locationArea"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Location Area  (Sqft)"
            placeholder="Area"
            variant="outlined"
            fullWidth
            required
            error={!!errors.area}
            helperText={errors?.area?.message}
          />
        )}
      />
    </motion.div>
  );
}

export default BasicDetails;
