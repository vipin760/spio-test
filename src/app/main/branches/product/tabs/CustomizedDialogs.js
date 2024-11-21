import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CustomizedDialogs = ({ open, handleClose, roomsData, setBedsName, setNoOfBedsData, control }) => {


    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                disableEnforceFocus
                disableEscapeKeyDown
            >
                <DialogContent dividers sx={{ overflowY: 'unset' }} >
                    <div className="w-full flex flex-col ">
                        <Table stickyHeader sx={{ minWidth: 500, maxHeight: '30vh' }} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow className="w-full h-48 sm:h-64">
                                    {["S No", "Room Name", "No of Beds"].map((item, i) => (
                                        <TableCell
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? lighten(theme.palette.background.default, 0.4)
                                                        : lighten(theme.palette.background.default, 0.02),
                                            }}
                                            className={"p-4 md:p-16"}
                                            key={i + item}
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
                                {roomsData?.map((_, index) => (
                                    <TableRow hover className="h-72 cursor-pointer">
                                        <TableCell
                                            className="w-30 md:w-64 text-center"
                                            padding="none"
                                            key={index + 'sno'}
                                        >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell
                                            className="w-30  md:w-64 text-center"
                                            padding="none"
                                            key={index + _.name}
                                        >

                                            <Controller
                                                name="roomNumber"
                                                control={control}
                                                render={({ field: { onChange } }) => (
                                                    <TextField
                                                        defaultValue={_.name}
                                                        className="mt-8 mr-16 mb-16"
                                                        label="Room Name"
                                                        id="roomNumber"
                                                        type="text"
                                                        variant="outlined"
                                                        autoFocus
                                                        onChange={(e) => {
                                                            onChange(e.target.value);
                                                            setBedsName(e.target.value, index)
                                                        }}
                                                    />
                                                )}
                                            />

                                        </TableCell>
                                        <TableCell
                                            className="w-30 md:w-64 text-center"
                                            padding="none"
                                            key={index + _.no_of_beds}
                                        >
                                            <Controller
                                                name="noOfBeds"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <TextField
                                                        value={_.no_of_beds}
                                                        className="mt-8 mb-16"
                                                        label="No of Beds"
                                                        id="noOfBeds"
                                                        type="number"
                                                        variant="outlined"
                                                        autoFocus
                                                        onChange={(e) => {
                                                            onChange(e.target.value)
                                                            setNoOfBedsData(e.target.value, index)
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

export default CustomizedDialogs;