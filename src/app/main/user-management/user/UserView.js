import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/system/Box";
import format from "date-fns/format";
import _ from "@lodash";
import { getContact, selectContact } from "../store/userSlice";
import { selectCountries } from "../store/countriesSlice";
import { selectTags } from "../store/tagsSlice";

const UserView = () => {
  const contact = useSelector(selectContact);
  const countries = useSelector(selectCountries);
  const tags = useSelector(selectTags);
  const routeParams = useParams();
  const dispatch = useDispatch();
  // const [state, setState] = useState(contact.entities[routeParams.id]);
  console.log("userxxxxxxxxxxxxxxxx", contact);

  useEffect(() => {
    dispatch(getContact(routeParams.id));
  }, [dispatch, routeParams]);

  function getCountryByIso(iso) {
    return countries.find((country) => country.iso === iso);
  }
  if (contact?.length < 0 || !contact) {
    return <FuseLoading />;
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
                to="/users"
                className="ml-5"
              >
                <FuseSvgIcon size={20}>heroicons-outline:x</FuseSvgIcon>
                <span className="mx-8">Close</span>
              </Button>
            </div>
          </div>

          <Typography className="mt-12 text-4xl font-bold truncate">
            {contact.userProfileName}
          </Typography>

          <div className="flex flex-wrap items-center mt-8">
            {contact?.role && (
              <Chip
                key={contact.role}
                label={_.find(tags, { id: contact.role }).title}
                className="mr-12 mb-12"
                size="small"
              />
            )}
          </div>

          <Divider className="mt-16 mb-24" />

          <div className="flex flex-col space-y-32">
            {contact.userTypeName && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:briefcase</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.userTypeName}</div>
              </div>
            )}

            {contact.institutionMasterName && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:office-building</FuseSvgIcon>
                <div className="ml-24 leading-6">
                  {contact.institutionMasterName}
                </div>
              </div>
            )}

            {contact?.userLoginName && (
              <div className="flex">
                <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                <div className="min-w-0 ml-24 space-y-4">
                  <div className="flex items-center leading-6">
                    <a
                      className="bg-inherita hover:underline text-primary-500"
                      href={`mailto: ${contact?.userLoginName}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact?.userLoginName}
                    </a>
                    
                  </div>
                </div>
              </div>
            )}

            {contact?.emails?.length &&
              contact.emails.some((item) => item.email.length > 0) && (
                <div className="flex">
                  <FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
                  <div className="min-w-0 ml-24 space-y-4">
                    {contact.emails.map(
                      (item) =>
                        item.email !== "" && (
                          <div
                            className="flex items-center leading-6"
                            key={item.email}
                          >
                            <a
                              className="hover:underline text-primary-500"
                              href={`mailto: ${item.email}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.email}
                            </a>
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
                        )
                    )}
                  </div>
                </div>
              )}

            {contact?.contacts &&
              contact.contacts?.some((item) => item.contact.length > 0) && (
                <div className="flex">
                  <FuseSvgIcon>heroicons-outline:phone</FuseSvgIcon>
                  <div className="min-w-0 ml-24 space-y-4">
                    {contact.contacts.map(
                      (item, index) =>
                        item.contact !== "" && (
                          <div
                            className="flex items-center leading-6"
                            key={index}
                          >
                            <Box
                              className="hidden sm:flex w-24 h-16 overflow-hidden"
                              sx={{
                                background:
                                  "url('/assets/images/apps/contacts/flags.png') no-repeat 0 0",
                                backgroundSize: "24px 3876px",
                                backgroundPosition:
                                  getCountryByIso("us")?.flagImagePos,
                              }}
                            />

                            <div className="sm:ml-12 font-mono">
                              {getCountryByIso("us")?.code}
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
                        )
                    )}
                  </div>
                </div>
              )}

            {contact.address && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:location-marker</FuseSvgIcon>
                <div className="ml-24 leading-6">{contact.address}</div>
              </div>
            )}

            {contact.dob && (
              <div className="flex items-center">
                <FuseSvgIcon>heroicons-outline:cake</FuseSvgIcon>
                <div className="ml-24 leading-6">
                  {format(new Date(contact.dob), "MMMM d, y")}
                </div>
              </div>
            )}

            {contact.notes && (
              <div className="flex">
                <FuseSvgIcon>heroicons-outline:menu-alt-2</FuseSvgIcon>
                <div
                  className="max-w-none ml-24 prose dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: contact.notes }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserView;
