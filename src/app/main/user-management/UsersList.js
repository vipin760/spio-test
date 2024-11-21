import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { getUsers, selectFilteredContacts, selectGroupedFilteredContacts } from './store/usersSlice';
import UserListItem from './UserListItem';
import FuseLoading from '@fuse/core/FuseLoading';
import { useEffect, useState } from 'react';

function UsersList(props) {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilteredContacts);
  const groupedFilteredContacts = useSelector(selectGroupedFilteredContacts);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false)
  const [showNoUsers, setshowNoUsers] = useState(false)

  useEffect(() => {
    dispatch(getUsers()).then(() => {
      setDataFetched(true)
    })
  }, [])

  useEffect(() => {
    if (filteredData.length == 0 && dataFetched) {
      setshowNoUsers(true)
      setLoading(false)
    } else if (filteredData.length > 0) {
      setLoading(false)
    }

  }, [groupedFilteredContacts, filteredData, dataFetched])


  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }
  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0 && showNoUsers) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no users!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-col flex-auto w-full max-h-full"
    >
      {Object.entries(groupedFilteredContacts).map(([key, group]) => {
        return (
          <div key={key} className="relative">
            <Typography color="text.secondary" className="px-32 py-4 text-14 font-medium">
              {key}
            </Typography>
            <Divider />
            <List className="w-full m-0 p-0">
              {group.children.map((item) => (
                <UserListItem key={item.id} contact={item} />
              ))}
            </List>
          </div>
        );
      })}
    </motion.div>
  );
}

export default UsersList;
