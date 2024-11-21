import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { lighten } from '@mui/material/styles';
import { selectAlarms, getAlarms } from './store/bedAlarmsSlice';
import { useEffect } from 'react';
import { selectFilteredContacts } from './store/bedsSlice';
import BedItem from '../../Beds/BedItem';
import FileItem from '../../Beds/FileItem';

function BedAlarmList() {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilteredContacts);
  const alarms = useSelector(selectAlarms);
  const files = []


  useEffect(() => {
    if (filteredData.length > 0) {
      console.log('found beds', filteredData)
      const bedIds = filteredData.map(b => b.id);
      dispatch(getAlarms(bedIds))
    }
  }, [filteredData])
  useEffect(() => {
    if(filteredData?.length>0){
    const notifInterval = setInterval(() => {
      const bedIds = filteredData.map(b => b.id);
      dispatch(getAlarms(bedIds))
    }, 10000);

    return () => {
        console.log('unmounted component!');
        clearInterval(notifInterval);
    }
  }
})

  const ulCerAlarms = alarms.filter(a => a.ulCerStatus);
  const absenceAlarms = alarms.filter(a => a.absenceStatus);
  // console.log('absence', absenceAlarms);

  return (
    <div className={ulCerAlarms.length > 0||absenceAlarms.length > 0||files.length > 0 ?"p-32":""}>
      {ulCerAlarms.length > 0 && (
        <Box
          className="p-16 w-full rounded-16 mb-24 border"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
        >
          <Typography className="font-medium">Ulcer Alarms</Typography>

          <div className="flex flex-wrap -m-8 mt-8">
            {ulCerAlarms.map((item) => (
              <BedItem key={item.id} item={item} type={"ULCER"} />
            ))}
          </div>
        </Box>
      )}

      {absenceAlarms.length > 0 && (
        <Box
          className="p-16 w-full rounded-16 mb-24 border"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
        >
          <Typography className="font-medium">Absence Alarms</Typography>

          <div className="flex flex-wrap -m-8 mt-8">
            {absenceAlarms.map((item) => (
              <BedItem key={item.id} item={item} type={"ABSENT"} />
            ))}
          </div>
        </Box>
      )}

      {files.length > 0 && (
        <Box
          className="p-16 w-full rounded-16 mb-24 border"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
        >
          <Typography className="font-medium">Files</Typography>

          <div className="flex flex-wrap -m-8 mt-8">
            {files.map((item) => (
              <FileItem key={item.id} item={item} />
            ))}
          </div>
        </Box>
      )}
    </div>
  );
}

export default BedAlarmList;
