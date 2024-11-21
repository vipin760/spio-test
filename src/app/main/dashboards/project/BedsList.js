import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { getBeds, selectFilteredContacts, selectGroupedFilteredContacts } from './store/bedsSlice';
import BedsTable from './BedsData/BedsTable';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { selectOrganizations } from './store/organizationsSlice';

const schema = yup.object().shape({
  id: yup.string().required('Please Select Organization'),
}); 

function BedsList(props) {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilteredContacts);
  const organizations= useSelector(selectOrganizations)
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(true)
  const [showNoUsers, setshowNoUsers] = useState(false)
  // useEffect(() => {
  //   console.log("valueeee",getValues())
  //   dispatch(getBeds({org_id:watch('id')})).then((res) => {
  //     setDataFetched(true)
  //   })
  // }, [])
  useEffect(() => {
    if (filteredData.length === 0) {
      setshowNoUsers(true)
      setLoading(false)
    } else if (filteredData.length > 0) {
      setLoading(false)
    }

  }, [dispatch])


  if (loading||_.isEmpty(organizations)||_.isEmpty(filteredData)) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (filteredData&&filteredData.length === 0 && showNoUsers&&organizations?.length>0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="text.secondary" variant="h5">
          There are no Beds!
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
      <BedsTable />
    </motion.div>
  );
}

export default BedsList;
