import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import { FormControl, Switch } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../store/branches";
import { getGatewayDetails, selectGateways } from "../store/gateways";
import { useEffect } from "react";
import { selectInstitutes } from "../store/institutesSlice";
import { selectBranches } from "../store/branches";

function BasicInfoTab(props) {

  const methods = useFormContext();
  const dispatch = useDispatch();
  const institutes = useSelector(selectInstitutes);
  const branches = useSelector(selectBranches);
  const gateways = useSelector(selectGateways);
  const { control, formState, getValues } = methods;
  const { errors } = formState;

  console.log("institutes", institutes);

  // console.log("...............", getValues()?.institutionMasterId);


  useEffect(() => {
    dispatch(
      getBranches({ institutionMasterId: getValues()?.institutionMasterId })
    );


  }, [getValues()?.institutionMasterId]);

  useEffect(() => {
    dispatch(
      getGatewayDetails({
        institutionBranchId: getValues()?.institutionBranchId,
        institutionMasterId: getValues()?.institutionMasterId,
      })
    );
  }, [getValues()?.institutionBranchId]);


  const SurfingPolicy = [
    {
      id: 7,
      policyName: "Private User",
    },
    {
      id: 4,
      policyName: "IOT Access",
    },
    {
      id: 5,
      policyName: "Staff Access",
    },
    {
      id: 17,
      policyName: "VIP Access",
    },
    {
      id: 6,
      policyName: "Dorms/Guest",
    },
  ];

  return (
    <motion.div>
      {/* <Controller
        name="wifiSurfingPolicyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.wifiSurfingPolicyName}
            required
            helperText={errors?.wifiSurfingPolicyName?.message}
            label="Surfing Policy Name"
            autoFocus
            id="wifiSurfingPolicyName"
            variant="outlined"
            fullWidth
          />
        )}
      /> */}

      <Controller
        name="wifiSurfingPolicyName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.wifiSurfingPolicyName}
            required
            helperText={errors?.wifiSurfingPolicyName?.message}
            label="Surfing Policy Name"
            autoFocus
            id="wifiSurfingPolicyName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

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
            label="Astria"
            id="institutionMasterName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {/* <Controller
        name="institutionMasterName"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={institutes?.map((e) => e?.institutionName) || []}
            value={
              institutes?.length > 0
                ? institutes?.find((e) => e?.institutionMasterId == value)
                    ?.institutionName
                : institutes[0]?.institutionMasterName
            }
            onChange={(event, newValue) => {
              const id = institutes?.find(
                (e) => e?.institutionName == newValue
              )?.institutionMasterId;
              onChange(id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Institution"
                label="Institution"
                id="institutionName"
                variant="outlined"
                error={!!errors.institutionMasterId}
                helperText={errors?.institutionMasterId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}

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

      <div className="flex flex-col">
        {/* <Controller
          name="wifiUpLimitKbps"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="Upload Speed"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="w-100">
                    MBPS
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}
        <Controller
          name="wifiUpLimitKbps"
          control={control}
          // defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-12 mb-16"
              //multiple
              freeSolo
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Upload Speed"
                  variant="outlined"
                  disableClearable={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event, newValue) => {
                    const id = Number(event.target.value) * 1000;
                    onChange(id.toString());
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" className="w-100">
                        MBPS
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Controller
          name="wifiDownLimitKbps"
          control={control}
          // defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-12 mb-16"
              //multiple
              freeSolo
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="DownLoad Speed"
                  variant="outlined"
                  disableClearable={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event, newValue) => {
                    const id = Number(event.target.value) * 1000;
                    onChange(id.toString());
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" className="w-100">
                        MBPS
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        {/* <Controller
          name="wifiDownLimitKbps"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="DownLoad Speed"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="w-100">
                    MBPS
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}
        <Controller
          name="wifiBandwidthUpLimitKbps"
          control={control}
          // defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-12 mb-16"
              //multiple
              freeSolo
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Upload Bandwidth"
                  variant="outlined"
                  disableClearable={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event, newValue) => {
                    const id = Number(event.target.value) * 1000;
                    onChange(id.toString());
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" className="w-100">
                        GBPS
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        {/* <Controller
          name="wifiBandwidthUpLimitKbps"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="Upload Bandwidth"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="w-100">
                    GBPS
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}

        <Controller
          name="wifiBandwidthDownLimitKbps"
          control={control}
          // defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-12 mb-16"
              //multiple
              freeSolo
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Download Bandwidth"
                  variant="outlined"
                  disableClearable={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event, newValue) => {
                    const id = Number(event.target.value) * 1000;
                    onChange(id.toString());
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" className="w-100">
                        GBPS
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        {/* <Controller
          name="wifiBandwidthDownLimitKbps"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="Download Bandwidth"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">GBPS</InputAdornment>
                ),
              }}
            />
          )}
        /> */}
        <Controller
          name="wifiUsageTimeMins"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="Duration Time"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Mins</InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="wifiAuthTimesLimit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-start-adornment"
              className="mt-16"
              label="Authorization Time"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="w-100">
                    Time
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </div>
    </motion.div>
  );
}

export default BasicInfoTab;
