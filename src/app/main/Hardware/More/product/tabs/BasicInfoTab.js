import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useForm, useFormContext } from "react-hook-form";
import mockApi from "../../../../../../@mock-api/mock-api.json";
import { Button, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { saveProduct } from "../store/productSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import history from "@history";
import { cpasshost } from "app/configs/navigationConfig";
import {
  faceIdhost,
  portalhost,
} from "../../../../../configs/navigationConfig";
import { getGateway } from "src/app/main/settings/NetworkSettings/Gateways/store/productsSlice";
import jwtServiceConfig from "src/app/auth/services/jwtService/jwtServiceConfig";
import JwtService from "src/app/auth/services/jwtService";
import { Navigate, useNavigate, useNavigationType } from "react-router-dom";

const schemaForSpio = yup.object().shape({
  institutionGatewayName: yup.string().required("Please enter Intitute name"),
  institutionGatewaySecreatKey: yup
    .string()
    // .email("You must enter a valid email")
    .required("You must enter a Institute Gateway Secreat Key "),
  institutionGatewayUrl: yup
    .string()
    .required("Please enter your Institute Url."),
  institutionGatewayMac: yup
    .string()
    .required("Please enter mac.")
    .min(6, "Mac is too short - must be at least 6 chars."),
  institutionGatewayVersion: yup
    .string()
    .required("Please enter Gateway Version"),
});

const schemaForCpass = yup.object().shape({
  institutionGatewayName: yup.string().required("Please enter Location name"),
  institutionGatewaySerialNo: yup
    .string()
    .required("Please enter your Institute Gateway Serial Number."),
});

const hostname = window.location.hostname;
const isCpass = cpasshost.includes(hostname);
const isFaceIdHost = faceIdhost.includes(hostname);
const isPortalHost = portalhost.includes(hostname);
const schema = isCpass || isPortalHost ? schemaForCpass : schemaForSpio;
const defaultValues = {
  institutionGatewayName: "",
  institutionGatewaySecreatKey: "",
  institutionGatewayUrl: "",
  institutionGatewayMac: "",
  institutionGatewayVersion: "",
  institutionGatewaySerialNo: "",
};
function BasicInfoTab(props) {
  const methods = useFormContext();
  const tags = mockApi.components.examples.contacts_tags.value;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { control, formState, handleSubmit, setError, setValue, getValues } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });
  const { isValid, dirtyFields, errors } = formState;
  console.log("dirtyFields", dirtyFields.institutionGatewaySerialNo)

  const instId = localStorage.getItem("institutionMasterId");
  const branchId = localStorage.getItem("institutionBranchId")

  async function handleSaveProduct() {

    try {
      setLoader(true);
      let a = await dispatch(saveProduct(getValues())).then((response) => {
        enqueueSnackbar("Location Added Successfully", {
          variant: "success",
        });

        if (instId) {
          localStorage.removeItem("institutionMasterId");
          localStorage.removeItem("institutionBranchId");
          localStorage.removeItem("userId");
        }
      });

      if (a?.error?.message) {
        enqueueSnackbar(a?.payload || "Error Occured", {
          variant: "error",
        });
        return;
      }
      // navigate(-1);
    } catch (err) {
      console.log("a?.error?.message", err);
      enqueueSnackbar("Error Occured", {
        variant: "error",
      });
    }
    setLoader(false);
  }
  const OnlyNumber = (e) => {
    if (e.which > 31 && (e.which < 48 || e.which > 57)) {
      e.preventDefault();
    }
    return true;
  };

  const locationSubmitHandler = async () => {
    let data = {
      institutionGatewaySerialNo: getValues().institutionGatewaySerialNo
    }
    try {
      const response = await JwtService.post(jwtServiceConfig.getAllGateway, data);
      const result = response?.data?.content;
      const institutionGatewayDetailId = result[0]?.institutionGatewayDetailId
      if (result) {
        const updateData = {
          institutionGatewayDetailId: institutionGatewayDetailId,
          institutionMasterId: instId,
          institutionBranchId: branchId,
          institutionGatewayStatusId: result[0]?.institutionGatewayStatusId,
          institutionGatewayUrl: result[0]?.institutionGatewayUrl,
          institutionGatewayName: result[0]?.institutionGatewayName,
          institutionGatewayMac: result[0]?.institutionGatewayMac,
          institutionGatewayVersion: result[0]?.institutionGatewayVersion,
          institutionGatewayHashName: result[0]?.institutionGatewayHashName,
          institutionGatewayLocation: result[0]?.institutionGatewayLocation,
          institutionGatewayAuthdir: result[0]?.institutionGatewayAuthdir,
          institutionGatewayCreatedBy: result[0]?.institutionGatewayCreatedBy,
        }
        try {
          const response = await JwtService.post(jwtServiceConfig.getwayUpdate + "?institutionGatewaySecreatKey=", updateData)
          if (response?.data?.statusCode === '200') {
            enqueueSnackbar(response?.data?.status, {
              variant: "success",
            })
            setTimeout(() => {
              history.push({ pathname: `/dash` })
              window.location.reload()
            }, 1000);

            if (instId) {
              localStorage.removeItem("institutionMasterId");
              localStorage.removeItem("institutionBranchId");
              localStorage.removeItem("userId");
            }
          }
          if (response?.data?.statusCode === '400') {
            enqueueSnackbar("Incorrect Serial Number", {
              variant: "error",
            })
          }




          // <Navigate to="/dash" replace />
        }
        catch (error) {
          console.log('update Errorr', error)
          enqueueSnackbar("Error Occured", {
            variant: "error",
          });
        }
      }
    } catch (error) {
      console.log("serial number errror", error);
      enqueueSnackbar("Error Occured", {
        variant: "error",
      });
    }
  }

  return (
    <motion.div>
      <Controller
        name="institutionGatewayName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.institutionGatewayName}
            required
            helperText={errors?.institutionGatewayName?.message}
            label="Location Name"
            autoFocus
            id="institutionGatewayName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      {isPortalHost && (
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
              label="Gateway Serial No."
              autoFocus
              id="institutionGatewaySerialNo"
              variant="outlined"
              fullWidth
            // onKeyDown={OnlyNumber}
            />
          )}
        />
      )}

      {isFaceIdHost && (
        <Controller
          name="institutionGatewaySecreatKey"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.institutionGatewaySecreatKey}
              required
              helperText={errors?.institutionGatewaySecreatKey?.message}
              label="Gateway Secreat Key"
              autoFocus
              id="GatewaySecreatKey"
              variant="outlined"
              fullWidth
              onKeyDown={OnlyNumber}
            />
          )}
        />
      )}

      {isFaceIdHost && (
        <Controller
          name="institutionGatewayUrl"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.institutionGatewayUrl}
              required
              helperText={errors?.institutionGatewayUrl?.message}
              label="Gateway Organization Url"
              autoFocus
              id="institutionGatewayUrl"
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}

      {isFaceIdHost && (
        <Controller
          name="institutionGatewayVersion"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.institutionGatewayVersion}
              required
              helperText={errors?.institutionGatewayVersion?.message}
              label="Gateway Version "
              autoFocus
              id="institutionGatewayVersion"
              variant="outlined"
              fullWidth
              onKeyDown={OnlyNumber}
            />
          )}
        />
      )}

      {isFaceIdHost && (
        <Controller
          name="institutionGatewayMac"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.institutionGatewayMac}
              required
              helperText={errors?.institutionGatewayMac?.message}
              label="Gateway Mac "
              autoFocus
              id="institutionGatewayMac"
              variant="outlined"
              fullWidth
            />
          )}
        />
      )}
      {
        !isPortalHost &&

        <LoadingButton
          variant="contained"
          color="secondary"
          className=" w-full mt-16"
          aria-label="Sign in"
          disabled={!getValues().institutionGatewayName == "" ? false : true}
          onClick={handleSaveProduct}
          type="submit"
          size="large"
          loading={loader || false}
        >
          Create Location
        </LoadingButton>
      }

      {
        isPortalHost &&
        <LoadingButton
          variant="contained"
          color="secondary"
          className=" w-full mt-16"
          aria-label="Sign in"
          disabled={!getValues().institutionGatewaySerialNo == "" ? false : true}
          onClick={locationSubmitHandler}
          type="submit"
          size="large"
          loading={loader || false}
        >
          Create Location
        </LoadingButton>
      }
      {/* <Button
        className="whitespace-nowrap mx-4"
        variant="contained"
        color="secondary"
        // onClick={handleRemoveProduct}
      >
        Cancel
      </Button>
      <LoadingButton
        className="whitespace-nowrap mx-4"
        variant="contained"
        color="secondary"
        loading={loader || false}
        disabled={_.isEmpty(dirtyFields) || !isValid}
        onClick={handleSaveProduct}
      >
        Save
      </LoadingButton> */}
    </motion.div>
  );
}

export default BasicInfoTab;
