import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FusePageCarded from "@fuse/core/FusePageCarded";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  addUser,
  getContact,
  newUser,
  resetContact,
  removeContact,
  selectContact,
  updateContact,
} from "../store/userSlice";
import { selectCountries } from "../store/countriesSlice";
import { selectTags } from "../store/tagsSlice";
import ContactEmailSelector from "./email-selector/ContactEmailSelector";
import PhoneNumberSelector from "./phone-number-selector/PhoneNumberSelector";
import { getUsers } from "../store/usersSlice";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  userProfileName: yup.string().required("You must enter a name"),
  userLoginName: yup
    .string()
    .trim()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const UserForm = (props) => {
  const user = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  console.log("ddsdsds", user);

  const { isValid, dirtyFields, errors } = formState;
  const [btnLoading, setBtnLoading] = useState(false);
  const form = watch();

  useEffect(() => {
    if (routeParams.id === "new") {
      dispatch(newUser());
    } else {
      dispatch(getContact(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    reset({ ...user });
  }, [user, reset]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    setBtnLoading(true);
    if (routeParams.id === "new") {
      dispatch(addUser(data)).then(({ payload }) => {
        dispatch(getUsers());
        setBtnLoading(false);
        navigate(`/users`);
      });
    } else {
      const params = { ...data, id: routeParams.id };
      console.log("params data", params);
      dispatch(addUser(params)).then(({ payload }) => {
        dispatch(getUsers());
        setBtnLoading(false);
        navigate(`/users`);
      });
    }
  }

  function handleRemoveContact() {
    dispatch(removeContact(user.id)).then(() => {
      navigate("/apps/contacts");
    });
  }

  if (_.isEmpty(form) || !user) {
    return <FuseLoading />;
  }

  return (
    <>
      <FusePageCarded
        // header={<ProductHeader />}
        content={
          <>
            {/* <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Building" />
              <Tab className="h-64" label="Floors" />
            </Tabs> */}
            <div className="p-16 sm:p-24 max-w-3xl">
              {/* <div className={tabValue !== 0 ? "hidden" : ""}> */}
              <motion.div>
                <Controller
                  control={control}
                  name="userProfileName"
                  render={({ field }) => (
                    <TextField
                      className="mt-32"
                      {...field}
                      label="Name"
                      placeholder="Name"
                      id="userProfileName"
                      error={!!errors.userProfileName}
                      helperText={errors?.userProfileName?.message}
                      variant="outlined"
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FuseSvgIcon size={20}>
                              heroicons-solid:user-circle
                            </FuseSvgIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mt-32"
                      id="location"
                      label="Location"
                      type="text"
                      //multiline
                      //rows={5}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <div className="flex flex-col ">
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Title"
                        placeholder="Job title"
                        id="title"
                        error={!!errors.title}
                        helperText={errors?.title?.message}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:briefcase
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="userLoginName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-32"
                        label="Email"
                        type="email"
                        error={!!errors.userLoginName}
                        helperText={errors?.userLoginName?.message}
                        variant="outlined"
                        required
                        fullWidth
                      />
                    )}
                  />
                </div>
                {routeParams.id !== "new" && (
                  <Controller
                    control={control}
                    name="institutionMasterName"
                    render={({ field }) => (
                      <TextField
                        className="mt-32"
                        {...field}
                        label="Organization"
                        placeholder="Organization"
                        id="institutionMasterName"
                        error={!!errors.company}
                        helperText={errors?.company?.message}
                        variant="outlined"
                        fullWidth
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FuseSvgIcon size={20}>
                                heroicons-solid:office-building
                              </FuseSvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                )}

                <Controller
                  control={control}
                  name="emails"
                  render={({ field }) => (
                    <ContactEmailSelector className="mt-32" {...field} />
                  )}
                />

                <Controller
                  control={control}
                  name="contacts"
                  render={({ field }) => (
                    <PhoneNumberSelector className="mt-32" {...field} />
                  )}
                />

                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <TextField
                      className="mt-32"
                      {...field}
                      label="Address"
                      placeholder="Address"
                      id="address"
                      error={!!errors.address}
                      helperText={errors?.address?.message}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FuseSvgIcon size={20}>
                              heroicons-solid:location-marker
                            </FuseSvgIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Box
                  className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
                  sx={{ backgroundColor: "background.default" }}
                >
                  {routeParams.id !== "new" && (
                    <Button color="error" onClick={handleRemoveContact}>
                      Delete
                    </Button>
                  )}
                  <Button
                    className="ml-auto"
                    component={NavLinkAdapter}
                    to={-1}
                    onClick={resetContact}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="ml-8"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid || btnLoading}
                    onClick={handleSubmit(onSubmit)}
                    endIcon={btnLoading ? <CircularProgress size={20} /> : null}
                  >
                    Save
                  </Button>
                </Box>
              </motion.div>
              {/* </div> */}
            </div>
          </>
        }
        // scroll={isMobile ? "normal" : "content"}
      />
    </>
  );
};

export default UserForm;
