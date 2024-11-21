import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

function FloorsTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  const [noOfRooms, setRooms] = useState(0)
  const [roomsData, setRoomsData] = useState(0)
  const [open, setOpen] = useState(false);

  function getFloorName(_no){
    return 'Floor-'+_no;
  }
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const setNoOfRoomsData=(value)=>{
    setRoomsData(value)
    setTimeout(()=>{
      if(!open&&value){
        setOpen(true)
      }
    },500)
    
  }
  function CustomizedDialogs() {
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  

   
    return (
      <div>
        <BootstrapDialog
          onClose={handleClose}
          //aria-labelledby="customized-dialog-title"
          open={open}
          
        >
          <DialogContent dividers sx={{overflowY:'unset'}} >
          

          <div className="w-full flex flex-col ">
          
        <Table stickyHeader sx={{minWidth:500,maxHeight:'30vh'}} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="w-full h-48 sm:h-64">
              {["S No", "Room Name","No of Beds"].map((item,i) => (
                <TableCell
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  className={i==0?"w-20 p-4 md:p-16":"p-4 md:p-16"}
                  key={item+1}
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
            {Array.from({ length: roomsData }).map((_, index) => (
              <TableRow hover className="h-72 cursor-pointer">
                <TableCell
                  className="w-20 md:w-64 text-center"
                  padding="none"
                  key={index}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  className="w-30  md:w-64 text-center"
                  padding="none"
                  key={index+_}
                >

                  <Controller
                    name="roomNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        defaultValue={"R"+(index+1)}
                        className="mt-8 mr-16 mb-16"
                        label="Room Name"
                        id="roomNumber"
                        type="text"
                        variant="outlined"
                        autoFocus
                        //onChange={(e) => setBedsData(e.target.value)}
                      />
                    )}
                  />

                </TableCell>
                <TableCell
                  className="w-30 md:w-64 text-center"
                  padding="none"
                  key={index}
                >

                  <Controller
                    name="noOfBeds"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        //defaultValue={"B1F1R1B"+(index+1)}
                        className="mt-8 mb-16"
                        label="No of Beds"
                        id="noOfBeds"
                        type="number"
                        variant="outlined"
                        
                        autoFocus
                        //onChange={(e) => setBedsData(e.target.value)}
                      />
                    )}
                  />

                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }
  console.log("open",open)

  return (
    <div>
      <Controller
        name="noOfFloors"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="No Of Floors"
            id="noOfFloors"
            type="number"
            variant="outlined"
            autoFocus
            onChange={(e) => setRooms(e.target.value)}
          />
        )}
      />
      <div className="w-60 flex flex-col min-h-full">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="h-48 sm:h-64">
              {["S No", "Floor Name", "No Of Rooms"].map((item) => (
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
            {Array.from({ length: noOfRooms }).map((_, index) => (
              <TableRow hover className="h-72 cursor-pointer">
                <TableCell
                  className="w-40 md:w-64 text-center"
                  padding="none"
                  key={index}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  className="w-40 md:w-64 text-center"
                  padding="none"
                  key={index}
                >

                  <Controller
                    name="FloorName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        value={index+1}
                        className="mt-8 mb-16"
                        label="Floor Name"
                        id="floorName"
                        type="number"
                        variant="outlined"
                        autoFocus
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
                    name="noOfRooms"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 mb-16"
                        label="No of Rooms"
                        id="noOfRooms"
                        type="number"
                        variant="outlined"
                        autoFocus
                        onChange={(e) => setNoOfRoomsData(e.target.value) }
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
{open&&CustomizedDialogs()}
    </div>
  );
}

export default FloorsTab;
