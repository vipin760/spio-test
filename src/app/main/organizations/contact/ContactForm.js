import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  addOrganiozation,
  getOrganization,
  newOrganization,
  removeOrganization,
  selectOrganization,
  updateOrganization,
} from '../store/organizationSlice';
import { selectCountries } from '../store/countriesSlice';
//import { selectTags } from '../store/tagsSlice';
import ContactEmailSelector from './email-selector/ContactEmailSelector';
import PhoneNumberSelector from './phone-number-selector/PhoneNumberSelector';
import CountryCodeSelector from './phone-number-selector/CountryCodeSelector';
import { CircularProgress } from '@mui/material';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  email: yup.string().required('You must enter email'),

});

const ContactForm = (props) => {
  const contact = useSelector(selectOrganization);
  const countries = useSelector(selectCountries);
  //const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  const [btnLoading,setBtnLoading]=useState(false);

  useEffect(() => {
    if (routeParams.id === 'new') {
      dispatch(newOrganization());
    } else {
      console.log("dddd", contact)
      dispatch(getOrganization(routeParams.id));
    }
  }, [dispatch, routeParams]);

  useEffect(() => {
    console.log("dddd", contact)
    reset({ ...contact });
  }, [contact, reset]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }

  /**
   * Form Submit
   */
  function onSubmit(data) {
    console.log("payload data", data)
    setBtnLoading(true)
    if (routeParams.id === 'new') {
      dispatch(addOrganiozation(data)).then(({ payload }) => {
        setBtnLoading(false)
        navigate(`/organizations`);
      });
    } else {
      dispatch(updateOrganization(data)).then(({ payload }) => {
        setBtnLoading(false)
        navigate(`/organizations`);
      });;
    }
  }

  function handleremoveOrganization() {
    dispatch(removeOrganization(contact.id)).then(() => {
      navigate('/organizations');
    });
  }

  if (_.isEmpty(form) || !contact) {
    return <FuseLoading />;
  }
  const statusList = [{ value: "ACTIVE", title: "Active" }, { value: "IN ACTIVE", title: "InActive" }]
  const categoryList = [{ value: "INDIVIDUAL", title: "INDIVIDUAL" }, { value: "HOSPITAL", title: "HOSPITAL" }, { value: "MEDICARE", title: "MEDICARE" }]

  return (
    <>

      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Organization Name"
              placeholder="Name"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:user-circle</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-32"
              label="Email"
              placeholder="Email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors?.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="contacts"
          render={({ field }) => <PhoneNumberSelector className="mt-32" {...field} />}
        />
        {/* <div className='flex'>
      <Controller
        control={control}
        name="contacts.contact"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-32 mr-16"
            label="Phone Number"
            placeholder="Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            InputProps={{
              startAdornment: (
                <Controller
                  control={control}
                  name="country"
                  render={({ field: _field }) => (
                    <InputAdornment position="start">
                      <CountryCodeSelector {..._field} />
                    </InputAdornment>
                  )}
                />
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="contacts.tag"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-32"
            label="Label"
            placeholder="Label"
            variant="outlined"
            fullWidth
            error={!!errors.label}
            helperText={errors?.label?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FuseSvgIcon size={20}>heroicons-solid:tag</FuseSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      </div> */}
        <Controller
          control={control}
          name="website"
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-32"
              label="Website"
              placeholder="Website"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors?.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:mail</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="category"
              className="mt-32"
              options={categoryList}
              getOptionLabel={(option) => option.title}
              renderOption={(_props, option, { selected }) => (
                <li {..._props}>
                  {option.title}
                </li>
              )}
              value={value ? _.find(categoryList, { value }) : null}
              onChange={(event, newValue) => {
                onChange(newValue.value);
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Category" placeholder="Category" />}
            />
          )}
        />
        {/* <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Category"
              placeholder="Category"
              id="category"
              error={!!errors.title}
              helperText={errors?.title?.message}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:briefcase</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        /> */}
        <div className='w-full flex justify-between'>
          <Controller
            control={control}
            name="address.address_line1"
            render={({ field }) => (
              <TextField
                className="mt-32 mr-16"
                {...field}
                label="Address Line1"
                placeholder="Address Line1"
                id="addressLine1"
                error={!!errors.address}
                helperText={errors?.address?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="address.address_line2"
            render={({ field }) => (
              <TextField
                className="mt-32"
                {...field}
                label="Address Line2"
                placeholder="Address Line2"
                id="addressLine1"
                error={!!errors.address}
                helperText={errors?.address?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className='w-full flex justify-between'>
          <Controller
            control={control}
            name="address.city"
            render={({ field }) => (
              <TextField
                className="mt-32 mr-16"
                {...field}
                label="City"
                placeholder="City"
                id="city"
                error={!!errors.city}
                helperText={errors?.city?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="address.state"
            render={({ field }) => (
              <TextField
                className="mt-32"
                {...field}
                label="State"
                placeholder="State"
                id="state"
                error={!!errors.state}
                helperText={errors?.state?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className='w-full flex justify-between'>
          <Controller
            control={control}
            name="address.country"
            render={({ field }) => (
              <TextField
                className="mt-32 mr-16"
                {...field}
                label="Country"
                placeholder="Country"
                id="country"
                // error={!!errors.country}
                // helperText={errors?.country?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="address.zip_code"
            render={({ field }) => (
              <TextField
                className="mt-32"
                {...field}
                label="ZIP Code"
                placeholder="ZIP Code"
                id="zipcode"
                // error={!!errors.address}
                // helperText={errors?.address?.message}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FuseSvgIcon size={20}>heroicons-solid:location-marker</FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="status"
              className="mt-32"
              options={statusList}
              getOptionLabel={(option) => option.title}
              renderOption={(_props, option, { selected }) => (
                <li {..._props}>
                  {option.title}
                </li>
              )}
              value={value ? _.find(statusList, { value }) : statusList[0]}
              onChange={(event, newValue) => {
                onChange(newValue.value);
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Status" placeholder="Status" />}
            />
          )}
        />
      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: 'background.default' }}
      >
        {routeParams.id !== 'new' && (
          <Button color="error" onClick={handleremoveOrganization}>
            Delete
          </Button>
        )}
        <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
          Cancel
        </Button>
        <Button
          className="ml-8 px-16"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid||btnLoading}
          onClick={handleSubmit(onSubmit)}
          endIcon={btnLoading ? <CircularProgress size={20} /> : null}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default ContactForm;
