import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox, Grid, Link } from "@mui/material";
import { motion } from "framer-motion";
import { FormControl, Switch } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import { getBranches } from "../store/branches";
import { getGatewayDetails, selectGateways } from "../store/gateways";
import { useEffect, useMemo, useState } from "react";
import { getInstitutes, selectInstitutes } from "../store/institutesSlice";
import { selectBranches } from "../store/branches";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getAllStatus, selectStatus } from "../store/StatusSlice";
import { getSecretKey } from "../store/secretKeySlice";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const dispatch = useDispatch();
  const institutes = useSelector(selectInstitutes);
  const branches = useSelector(selectBranches);
  const statusSlice = useSelector(selectStatus)
  const gateways = useSelector(selectGateways);
  const [defaultValue, setDefaultValue] = useState(null);
  const { control, formState, getValues, setValue } = methods;
  const { id } = useParams();
  const { errors } = formState
  const [filteredData, setFilteredData] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedInstitutionBranch, setSelectedInstitutionBranch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (id) {
      const currentValue = institutes?.find(
        (data) => data.institutionMasterId === id
      );
      setDefaultValue(currentValue);
    }
  }, [])
  useEffect(() => {
    dispatch(getInstitutes());
    if (id != 'new') {
      dispatch(getAllStatus())
    }
    getSecretKeyDetails()
  }, []);

  useEffect(() => {
    const initialValue = control._fields?.institutionMasterId?._f?.value;
    if (institutes?.length > 0 && initialValue) {
      const institution = institutes?.find(e => e.institutionMasterId === initialValue);
      if (institution) {
        setSelectedInstitution(institution?.institutionName);
      }
    }
    const initialBranchValue = control._fields?.institutionBranchName?._f?.value;
    if (branches?.length > 0 && initialBranchValue) {
      const inititutesbranch = branches?.find(m => m.institutionBranchName === initialBranchValue);
      if (inititutesbranch) {
        setSelectedInstitutionBranch(inititutesbranch?.institutionBranchName)
      }
    }
    const initialStatus = control._fields?.institutionGatewayStatusId?._f?.value;
    if (statusSlice?.length > 0 && initialStatus) {
      const instatus = statusSlice?.find(m => m.statusId === initialStatus);
      if (instatus) {
        setSelectedStatus(instatus?.statusName)
      }
    }
  }, [institutes, branches, statusSlice, control]);

  useMemo(() => {
    dispatch(
      getBranches({ institutionMasterId: getValues()?.institutionMasterId })
    );
  }, [getValues()?.institutionMasterId])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateSecretKey = () => {
    const characters = 'Aabcd0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleGenerateSecretKey = () => {
    const newSecretKey = generateSecretKey();
    setValue('institutionGatewaySecreatKey', newSecretKey, { shouldValidate: true });
  };

  const getSecretKeyDetails = async () => {
    try {
      let response = await dispatch(getSecretKey());
      const matchingObject = response?.payload?.find(
        (item) => item.institutionGatewayDetailId == getValues()?.institutionGatewayDetailId
      );
      if (matchingObject) {
        setFilteredData(matchingObject);
      } else {
        console.log('No matching object found');
      }
    } catch (error) {
      console.error('Error fetching secret key details:', error);
    }
  }
  return (
    <motion.div>

      <Controller
        name="institutionGatewayHashName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayHashName}
            required
            helperText={errors?.institutionGatewayHashName?.message}
            placeholder="Gateway  Name"
            label="Gateway Name"
            disabled={id == 'new' ? false : true}
            id="institutionGatewayHashName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      {id == 'new' ?
        null
        :
        <>
          <TextField
            disabled
            className="mt-8 mb-16"
            id="outlined-disabled"
            placeholder="Fas Path ID"
            label="Fas Path ID"
            fullWidth
            value={filteredData?.wifiSecretKeyId}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            disabled
            className="mt-8 mb-16"
            id="outlined-disabled"
            placeholder="Wi-Fi Secret Key"
            label="Wi-Fi Secret Key"
            fullWidth
            value={filteredData?.wifiSecretKey || ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </>
      }
      <Controller
        name="institutionGatewayLocation"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            name="institutionGatewayLocation"
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayLocation}
            helperText={errors?.institutionGatewayLocation?.message}
            label="Location Name"
            placeholder="Location Name"
            id="institutionGatewayLocation"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="institutionGatewayName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            name="institutionGatewayName"
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayName}
            helperText={errors?.institutionGatewayName?.message}
            label="Profile Name"
            required
            placeholder="Profile Name"
            id="institutionGatewayName"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />

      <Controller
        name="institutionGatewayUrl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayUrl}
            helperText={errors?.institutionGatewayUrl?.message}
            placeholder="Gateway URL"
            label="Gateway URL"
            id="institutionGatewayUrl"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="institutionGatewayMac"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayMac}
            helperText={errors?.institutionGatewayMac?.message}
            placeholder="Gateway MAC"
            label="Gateway MAC"
            required
            id="institutionGatewayMac"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      <Controller
        name="institutionGatewaySerialNo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionGatewaySerialNo}
            required
            helperText={errors?.institutionGatewaySerialNo?.message}
            placeholder="Gateway Serial No"
            label="Gateway Serial No"
            id="institutionGatewaySerialNo"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
      {id == 'new' ?
        <div class="flex flex-row items-center justify-center">
          <Controller
            name="institutionGatewaySecreatKey"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.institutionGatewaySecreatKey}
                required={id === 'new'}
                helperText={errors?.institutionGatewaySecreatKey?.message}
                placeholder="Gateway Secret Key"
                label="Gateway Secret Key"
                id="institutionGatewaySecreatKey"
                variant="outlined"
                style={{ width: '80%' }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={field.value || ''}
              />
            )}
          />
          <Link
            component="button"
            variant="body2"
            color={'#FF0000'}
            style={{ marginLeft: '10px', fontSize: '12px' }}
            onClick={handleGenerateSecretKey}
          >
            Generate Secret Key
          </Link>
        </div>

        :
        null
      }


      <Controller
        name="institutionMasterId"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            freeSolo
            options={institutes || []}
            getOptionLabel={(option) => option.institutionName}
            value={
              institutes?.find((e) => e.institutionMasterId === value) || null
            }
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(event, newValue) => {
              const id = newValue ? newValue.institutionMasterId : "";
              onChange(id);
              setValue("institutionMasterId", id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Institution"
                label="Select Institution"
                variant="outlined"
                error={!!errors.institutionMasterId}
                helperText={errors?.institutionMasterId?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.institutionMasterId}>
                {option.institutionName}
              </li>
            )}
          />
        )}
      />

      <Controller
        name="institutionBranchName"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            disabled={!formState.dirtyFields.institutionMasterId}
            //multiple
            freeSolo
            options={branches?.map((e) => e?.institutionBranchName) || []}
            value={selectedInstitutionBranch}
            onChange={(event, newValue) => {
              const id = branches?.find(
                (e) => e?.institutionBranchName == newValue
              )?.id;
              methods.setValue("institutionBranchId", id); // Set the value in the form
              onChange(id); // Pass the selected ID to the Controller
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Institution Branch"
                label={"Select Institution Branch"}
                variant="outlined"
                error={!!errors.institutionBranchName}
                helperText={errors?.institutionBranchName?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      {id == 'new' ?
        null
        :
        <>
          <Controller
            name="institutionGatewayStatusId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                className="mt-12 mb-16"
                freeSolo
                options={statusSlice?.map((e) => e?.statusName) || []}
                value={selectedStatus}
                onChange={(event, newValue) => {
                  const id = statusSlice?.find(
                    (e) => e?.statusName == newValue
                  )?.id;
                  methods.setValue("statusName", id); // Set the value in the form
                  onChange(id); // Pass the selected ID to the Controller
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Status"
                    label="Select Status"
                    variant="outlined"
                    error={!!errors.institutionGatewayStatusId}
                    helperText={errors?.institutionGatewayStatusId?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}
          />
          <Controller
            name="institutionGatewayAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name="institutionGatewayAddress"
                className="mt-8 mb-16"
                error={!!errors.institutionGatewayAddress}
                helperText={errors?.institutionGatewayAddress?.message}
                label="Gateway Address"
                placeholder="Gateway Address"
                id="gatewayaddress"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Controller
            name="institutionGatewayAuthdir"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name="institutionGatewayAuthdir"
                className="mt-8 mb-16"
                error={!!errors.institutionGatewayAuthdir}
                helperText={errors?.institutionGatewayAuthdir?.message}
                label="Authdir"
                placeholder="Authdir"
                id="authdir"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <Controller
            name="institutionGatewayVersion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name="institutionGatewayVersion"
                className="mt-8 mb-16"
                error={!!errors.institutionGatewayVersion}
                helperText={errors?.institutionGatewayVersion?.message}
                label="Gateway Version"
                placeholder="Gateway Version"
                id="gatewayviersion"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            name="institutionGatewayCreatedBy"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name="institutionGatewayCreatedBy"
                className="mt-8 mb-16"
                error={!!errors.institutionGatewayCreatedBy}
                helperText={errors?.institutionGatewayCreatedBy?.message}
                label="Created By"
                placeholder="Created By"
                disabled={true}
                id="institutionGatewayCreatedBy"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          <Controller
            name="institutionGatewayCreatedTime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name="institutionGatewayCreatedTime"
                className="mt-8 mb-16"
                error={!!errors.institutionGatewayCreatedTime}
                helperText={errors?.institutionGatewayCreatedTime?.message}
                label="Created Date"
                placeholder="Created Date"
                disabled={true}
                id="institutionGatewayCreatedTime"
                // value={getValues()?.institutionGatewayCreatedTime}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </>
      }

    </motion.div>
  );
}

export default BasicInfoTab;
