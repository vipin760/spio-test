import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox } from '@mui/material'
import { motion } from 'framer-motion'
import { FormControl, Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectInstitutes } from '../store/institutesSlice'
import { getBranches, selectBranches } from '../store/branches'
import { getGatewayDetails, selectGateways } from '../store/gateways'
import { useEffect } from 'react'
function BasicInfoTab(props) {
  const methods = useFormContext()
  const dispatch = useDispatch()
  const institutes = useSelector(selectInstitutes)
  const branches = useSelector(selectBranches);
  const gateways = useSelector(selectGateways)

  const { control, formState, getValues } = methods
  const { errors } = formState

  useEffect(() => {
    dispatch(getBranches({ institutionMasterId: getValues()?.institutionMasterId }))
  }, [getValues()?.institutionMasterId])
  useEffect(() => {
    dispatch(getGatewayDetails({ institutionBranchId: getValues()?.institutionBranchId, institutionMasterId: getValues()?.institutionMasterId }))
  }, [getValues()?.institutionBranchId])

  const categoryList = ['INDIVIDUAL', 'HOSPITAL', 'MEDICARE']
  return (
    <motion.div>
      <Controller
        name="institutionMasterId"
        control={control}
        // defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-12 mb-16"
            //multiple
            freeSolo
            options={institutes?.map((e) => e?.institutionName) || []}
            value={institutes?.length > 0 ? institutes?.find((e) => e?.institutionMasterId == value)?.institutionName : ""}
            onChange={(event, newValue) => {
              const id = institutes?.find((e) => e?.institutionName == newValue)?.institutionMasterId
              onChange(id);

            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Institution"
                label="Institution"
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
            value={branches?.length > 0 ? branches?.find((e) => e?.institutionBranchId == value)?.institutionBranchName : ""}
            onChange={(event, newValue) => {
              const id = branches?.find((e) => e?.institutionBranchName == newValue)?.institutionBranchId
              onChange(id);
              dispatch(getGatewayDetails({ institutionBranchId: id, institutionMasterId: getValues()?.institutionMasterId }))
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
      />z
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
            value={gateways?.length > 0 ? gateways?.find((e) => e?.institutionGatewayDetailId == value)?.institutionGatewayName : ""}
            onChange={(event, newValue) => {
              const id = gateways?.find((e) => e?.institutionGatewayName == newValue)?.institutionGatewayDetailId
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

      <Controller
        name="wifiSsid"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.wifiSsid}
            required
            helperText={errors?.wifiSsid?.message}
            label="Wifi Ssid"
            autoFocus
            id="wifiSsid"
            variant="outlined"
            fullWidth
          />
        )}
      />

    </motion.div>
  )
}

export default BasicInfoTab
