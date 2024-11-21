import Button from '@mui/material/Button'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FuseLoading from '@fuse/core/FuseLoading'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import Box from '@mui/system/Box'
import format from 'date-fns/format'
import _ from '@lodash'
import { getOrganization, selectOrganization } from '../store/organizationSlice'
import { selectCountries } from '../store/countriesSlice'
//import { selectTags } from '../store/tagsSlice';

const ContactView = () => {
  const contact = useSelector(selectOrganization)
  const countries = useSelector(selectCountries)
  //const tags = useSelector(selectTags);
  const routeParams = useParams()
  const dispatch = useDispatch()

  console.log('dddd', contact, countries)

  useEffect(() => {
    dispatch(getOrganization(routeParams.id))
  }, [dispatch, routeParams])

  useEffect(() => {
    console.log('contactorg', contact)
    //dispatch(getOrganization(routeParams.id));
  }, [contact])
  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso)
  }

  if (!contact) {
    return <FuseLoading />
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="w-full max-w-3xl">
          <div className="flex flex-auto items-end mt-10">
            <div className="flex items-center ml-auto mb-4">
              <Button
                variant="contained"
                color="secondary"
                component={NavLinkAdapter}
                to="edit"
                className="ml-5"
              >
                <FuseSvgIcon size={20}>
                  heroicons-outline:pencil-alt
                </FuseSvgIcon>
                <span className="mx-8">Edit</span>
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={NavLinkAdapter}
                to="/organizations"
                className="ml-5"
              >
                <FuseSvgIcon size={20}>heroicons-outline:x</FuseSvgIcon>
                <span className="mx-8">Close</span>
              </Button>
            </div>
          </div>

          <Typography className="mt-12 text-4xl font-bold truncate">
            {contact.name}
          </Typography>

          <Divider className="mt-16 mb-24" />

          <div className="flex flex-col space-y-32">
            {contact.name && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact?.name}</div>
              </div>
            )}

            {contact.company && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:office-</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact?.website}</div>
              </div>
            )}
            {contact?.email && (
              <div className="flex items-center leading-6" key={contact?.email}>
                <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                <a
                  className="hover:underline text-primary-500 ml-16"
                  href={`mailto: ${contact?.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact?.email}
                </a>
              </div>
            )}

            {/* {/* {contact.emails.length && contact.emails.some((item) => item.email.length > 0) && (
              <div className="flex">
                <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                <div className="min-w-0 ml-24 space-y-4">
                  {contact.emails.map(
                    (item) =>
                      item.email !== '' && (
                        <div className="flex items-center leading-6" key={item.email}>
                          <a
                            className="hover:underline text-primary-500"
                            href={`mailto: ${item.email}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.email}
                          </a>
                          {item.label && (
                            <>
                              <Typography className="text-md truncate" color="text.secondary">
                                <span className="mx-8">&bull;</span>
                                <span className="font-medium">{item.label}</span>
                              </Typography>
                            </>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )} */}

            {contact.contacts.length &&
              contact.contacts.some((item) => item.contact.length > 0) && (
                <div className="flex">
                  <FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
                  <div className="min-w-0 ml-24 space-y-4">
                    {contact.contacts.map(
                      (item, index) =>
                        item.contact && (
                          <div
                            className="flex items-center leading-6"
                            key={index}
                          >
                            <Box
                              className="hidden sm:flex w-24 h-16 overflow-hidden"
                              sx={{
                                background:
                                  "url('/assets/images/apps/contacts/flags.png') no-repeat 0 0",
                                backgroundSize: '24px 3876px',
                                backgroundPosition: getCountryByIso(item?.iso)
                                  ?.flagImagePos,
                              }}
                            />

                            <div className="sm:ml-12 font-mono">
                              {getCountryByIso(item?.iso)?.code}
                            </div>

                            <div className="ml-10 font-mono">
                              {item.contact}
                            </div>

                            {item.tag && (
                              <>
                                <Typography
                                  className="text-md truncate"
                                  color="text.secondary"
                                >
                                  <span className="mx-8">&bull;</span>
                                  <span className="font-medium">
                                    {item.tag}
                                  </span>
                                </Typography>
                              </>
                            )}
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

            {contact.address && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
                <div className="ml-24 leading-6">
                  {contact?.address?.address_line1}{' '}
                  {contact?.address?.address_line2} {contact?.address?.city}{' '}
                  {contact?.address?.state} {contact?.address?.country}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactView
