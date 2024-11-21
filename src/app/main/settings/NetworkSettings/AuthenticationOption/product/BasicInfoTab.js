import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

import { Checkbox, FormLabel } from "@mui/material";
import { motion } from "framer-motion";
import { FormControl, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectInstitutes } from "../store/institutesSlice";
import { getBranches, selectBranches } from "../store/branches";
import { getGatewayDetails, selectGateways } from "../store/gateways";
import { useEffect } from "react";
function BasicInfoTab(props) {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const institutes = useSelector(selectInstitutes);
  const branches = useSelector(selectBranches);
  const gateways = useSelector(selectGateways);

  const { control, formState, getValues } = methods;
  const { errors, dirtyFields } = formState;

  useEffect(() => {
    dispatch(getBranches());
  }, [getValues()?.institutionMasterId]);
  useEffect(() => {
    dispatch(getGatewayDetails());
  }, [getValues()?.institutionBranchId]);

  console.log("......dis", dirtyFields);

  const categoryList = ["INDIVIDUAL", "HOSPITAL", "MEDICARE"];
  return (
    <motion.div>
      <Controller
        name="institutionMasterName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            disabled
            value={
              institutes[0]?.institutionName
                ? institutes[0]?.institutionName
                : ""
            }
            className="mt-8 mb-16"
            error={!!errors.institutionMasterId}
            helperText={errors?.institutionMasterId?.message}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Institution"
            label="Institution"
            id="institutionMasterName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="institutionBranchId"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={branches?.map((e) => e?.institutionBranchName) || []}
            value={
              branches?.length > 0
                ? branches?.find((e) => e?.institutionBranchId == value)
                    ?.institutionBranchName
                : ""
            }
            onChange={(event, newValue) => {
              const id = branches?.find(
                (e) => e?.institutionBranchName == newValue
              )?.institutionBranchId;
              onChange(id);
              dispatch(
                getGatewayDetails({
                  institutionBranchId: id,
                  institutionMasterId: getValues()?.institutionMasterId,
                })
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Institution Branch"
                label="Institution Branch"
                variant="outlined"
                error={!!errors.institutionBranchId}
                helperText={errors?.institutionBranchId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="institutionGatewayDetailId"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            disabled={!dirtyFields.institutionBranchId}
            freeSolo
            options={gateways?.map((e) => e?.institutionGatewayName) || []}
            value={
              gateways?.length > 0
                ? gateways?.find((e) => e?.institutionGatewayDetailId == value)
                    ?.institutionGatewayName
                : ""
            }
            onChange={(event, newValue) => {
              const id = gateways?.find(
                (e) => e?.institutionGatewayName == newValue
              )?.institutionGatewayDetailId;
              onChange(id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Institution Gateway"
                label="Institution Gateway"
                variant="outlined"
                error={!!errors.institutionGatewayDetailId}
                helperText={errors?.institutionGatewayDetailId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <div className="w-full flex flex-row space-x-40">
        <Controller
          name={"wifiAuthEmailOtp"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              component="fieldset"
              className="FuseSettings-formControl"
            >
              Email Option
              {console.log("checked", value)}
              <Switch
                checked={value ? true : false}
                onChange={(ev) => onChange(ev.target.checked ? 1 : 0)}
                aria-label={"Email Option"}
              />
            </FormControl>
          )}
        />
        <Controller
          name={"wifiAuthmobileOtp"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              component="fieldset"
              className="FuseSettings-formControl"
            >
              Mobile Option
              {console.log("checked", value)}
              <Switch
                checked={value ? true : false}
                onChange={(ev) => onChange(ev.target.checked ? 1 : 0)}
                aria-label={"Mobile Option"}
              />
            </FormControl>
          )}
        />
      </div>

      <div className="w-full flex flex-row space-x-40">
        <Controller
          name={"wifiAuthLogin"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              component="fieldset"
              className="FuseSettings-formControl"
            >
              Login Option
              {console.log("checked", value)}
              <Switch
                checked={value ? true : false}
                onChange={(ev) => onChange(ev.target.checked ? 1 : 0)}
                aria-label={"Login Option"}
              />
            </FormControl>
          )}
        />
        <Controller
          name={"wifiAuthMac"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              component="fieldset"
              className="FuseSettings-formControl"
            >
              Auth Mac
              {console.log("checked", value)}
              <Switch
                checked={value ? true : false}
                onChange={(ev) => onChange(ev.target.checked ? 1 : 0)}
                aria-label={"Auth Mac"}
              />
            </FormControl>
          )}
        />
      </div>
    </motion.div>
  );
}

export default BasicInfoTab;
