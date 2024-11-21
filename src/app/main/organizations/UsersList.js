import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { selectFilteredOrganizations, selectGroupedFilteredOrganizations } from './store/organizationsSlice';
import UserListItem from './UserListItem';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

function UsersList(props) {
  const filteredData = useSelector(selectFilteredOrganizations);
  const groupedFilteredCrganizations = useSelector(selectGroupedFilteredOrganizations);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (filteredData.length) {
      setLoading(false)
    }
  }, [groupedFilteredCrganizations])

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  });


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

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no Organizations!
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
      {Object.entries(groupedFilteredCrganizations).map(([key, group]) => {
        return (
          <div key={key} className="relative">
            <Typography color="text.secondary" className="px-32 py-4 text-14 font-medium">
              {key}
            </Typography>
            <Divider />
            <List className="w-full m-0 p-0">
              {group.children.map((item) => (
                item ? <UserListItem key={item.id} organization={item} /> : null
              ))}
            </List>
          </div>
        );
      })}
    </motion.div>
  );
}

export default UsersList;
