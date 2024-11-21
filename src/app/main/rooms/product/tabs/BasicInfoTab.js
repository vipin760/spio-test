import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import { useEffect, useState } from 'react';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, watch, setValue,getValues } = methods;
  const { errors } = formState;
  const [bedsList, setBedsList] = useState([]);

  useEffect(()=>{
    const {beds,no_of_beds}=getValues();
    onSetBeds()
  },[getValues()]);

  const onSetBeds=()=>{
    const {room_name,beds,no_of_beds}=getValues();
    let value=no_of_beds;
    if(parseFloat(no_of_beds)>beds?.length){
      //setBedsList(beds)
      let bedsData=beds||[]
      value=parseFloat(no_of_beds)-beds?.length;
      Array.from({ length: value }).forEach((_, index) => {
        bedsData.push({
          "name": room_name+"B"+(index+1),
          "device_id": '',
          "status": "ACTIVE"
        })
      })
      setBedsList(bedsData)
      setValue('beds',bedsData)
    }else if(beds?.length>parseFloat(no_of_beds)){
      let data=beds;
      const arrayLength=beds?.length-parseFloat(no_of_beds);
      data=data.slice(0, -arrayLength);
      setBedsList(data);
      setValue('beds',data)
    }else{
      setBedsList(beds)
    }
   
  }
  // console.log("floorsList",floorsList)
  return (
    <div>
      {/* <div className='flex items-center px-24 sm:px-48'>
        <Controller
          control={control}
          name="branch_id"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="branch_id"
              className="mt-32"
              options={branchesList}
              getOptionLabel={(option) => option?.branch_name}
              renderOption={(_props, option, { selected }) => (
                <li {..._props}>
                  {option?.branch_name}
                </li>
              )}
              value={branchesList?.find((e) => e.id == value)}
              onChange={(event, newValue) => {
                onChange(newValue?.id);
                setValue('branch_name',newValue?.branch_name)
                setFloorsList(newValue?.floors);
                setRoomsList(newValue?.rooms)
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Branch" placeholder="Branch" />}
            />
          )}
        />
        <div>&nbsp;</div>
        <Controller
          control={control}
          name="floor_id"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="floor_id"
              className="mt-32"
              options={floorsList || []}
              getOptionLabel={(option) => option.name}
              renderOption={(_props, option, { selected }) => (
                <li {..._props}>
                  {option.name}
                </li>
              )}
              value={floorsList?.find((e) => e._id == value)||watch('floor_id')}
              onChange={(event, newValue) => {
                onChange(newValue?._id);
                setValue('floor_name',newValue?.name)
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Floor" placeholder="Floor" />}
            />
          )}
        />
        <div>&nbsp;</div>
        <Controller
          control={control}
          name="room_id"
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="room_id"
              className="mt-32"
              options={roomsList || []}
              getOptionLabel={(option) => option?.name}
              renderOption={(_props, option, { selected }) => (
                <li {..._props}>
                  {option?.name}
                </li>
              )}
              value={roomsList?.find((e) => e._id == value)||watch('_id')}
              onChange={(event, newValue) => {
                onChange(newValue?._id);
                setValue('room_name',newValue?.name)
                setValue('no_of_beds', newValue?.no_of_beds)
                onSetBeds(newValue?.no_of_beds)
              }}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Room" placeholder="room" />}
            />
          )}
        />
        <div>&nbsp;</div>

      </div> */}
      <div className="mt-16 w-full flex flex-col min-h-full">
        <Table stickyHeader className="min-w-l" aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="h-48 sm:h-64">
              {["S No", "Bed Name", "Device Number"].map((item) => (
                <TableCell
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className="p-4 md:p-16"
                  key={item}
                  align={"center"}
                  padding={'normal'}
                  sortDirection={false}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {bedsList&&bedsList?.map((_, index) => (
              <TableRow hover className="h-72 cursor-pointer">
                <TableCell
                  className="w-40 md:w-64 text-center"
                  padding="none"
                  key={index+'bed'}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  className="w-40 md:w-64 text-center"
                  padding="none"
                  key={index}
                >
                  <Controller
                    name="bedName"
                    control={control}
                    render={({ field :{onChange,value}}) => (
                      <TextField
                        defaultValue={_?.name}
                        className="mt-8 mb-16"
                        label="Bed Name"
                        id="bedNumber"
                        type="text"
                        variant="outlined"
                        autoFocus
                        value={_?.name}
                       onChange={(e) => {
                        const data=bedsList;
                          bedsList[index].name=e.target.value;
                          setBedsList(data);
                          setValue('beds',data)
                       }}
                      />
                    )}
                  />

                </TableCell>
                <TableCell
                  className="w-40 md:w-64 text-center"
                  padding="none"
                  key={index}
                >

                  <Controller
                    name="deviceId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        defaultValue={_?.device_id}
                        className="mt-8 mb-16"
                        label="Device Number"
                        id="bedNumber"
                        type="text"
                        variant="outlined"
                        value={_?.device_id}
                        autoFocus
                        onChange={(e) =>{
                          const data=bedsList;
                          bedsList[index].device_id=e.target.value;
                          setBedsList(data);
                          setValue('beds',data)
                        }}
                      />
                    )}
                  />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}

export default BasicInfoTab;
