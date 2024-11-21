
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";
import moment from 'moment';
import DatePicker from '@mui/lab/DatePicker';

export default function FilterModalDialog({ open, handleClose, setFilterdMonth, setFilterModalOpen, filteringOptions }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const methods = useFormContext();
    const { control, formState, getValues } = methods;

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState();
    const customDate = `startDate=${getValues().styleStartDate}&&endDate=${getValues().styleEndDate}`

    const filterOptions = filteringOptions ? filteringOptions : [
        {
            name: "Today",
            value: 'day=1'
        },
        {
            name: "Last Week",
            value: "week=1"
        },
        {
            name: "Last 3 Month",
            value: "month=3"
        },
        {
            name: "Last 6 Month",
            value: "month=6"
        },
        {
            name: "12 Month",
            value: "month=12"
        },
        {
            name: "Custom",
            value: "Custom"
        },

    ];

    const [clicked, setClicked] = useState(filteringOptions ? filterOptions[5]?.value : filterOptions[4]?.value)


    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '4px',
                        minWidth: 600,
                        padding: '0 0 15px 0'
                    }
                }}
            >
                <DialogTitle id="responsive-dialog-title" className='text-[20px]'>
                    {"All Filter"}
                </DialogTitle>
                <DialogContent>

                    <div>
                        <h1 className='text-[16px] pb-20'>Review information</h1>
                        <div className=''>
                            <div className='inputGroup w-[200px]'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" sx={{ top: '-8px' }}>
                                        Last 12 months
                                    </InputLabel>
                                    <Controller
                                        name="selectMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Select Option"
                                                {...field} // Connects the Select input with react-hook-form
                                                size="small"
                                                value={clicked}

                                            >
                                                {
                                                    filterOptions?.map((option, index) => (
                                                        <MenuItem
                                                            onClick={() => {
                                                                setClicked(option?.value)
                                                                setStartDate(null)
                                                            }}
                                                            value={option?.value} key={index + 1}>
                                                            {option?.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </div>

                            {getValues().selectMonth == "Custom" && <div className='pb-[20px] flex items-center gap-[20px]'>
                                <Controller
                                    name="styleStartDate"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            label="Start Date"
                                            value={value || null}
                                            inputFormat="yyyy-MM-dd"
                                            onChange={(newValue) => {
                                                const date = moment(newValue).format("yyyy-MM-DD")
                                                onChange(date)
                                                setStartDate(date)
                                            }}
                                            renderInput={(params) => <TextField size='small' {...params} />}
                                        />
                                    )}
                                />
                                <Controller
                                    name="styleEndDate"
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            views={['year', 'month', 'day']}
                                            label="End Date"
                                            value={value || null}
                                            inputFormat="yyyy-MM-dd"
                                            onChange={(newValue) => {
                                                const date = moment(newValue).format("yyyy-MM-DD")
                                                onChange(date)
                                                setEndDate(date)
                                            }}
                                            renderInput={(params) => <TextField size='small' {...params} />}
                                        />
                                    )}
                                />
                            </div>}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className='px-[24px] flex items-center justify-flex-end gap-[10px]'>
                    <Button onClick={handleClose} sx={{
                        borderRadius: '4px',
                        border: '1px solid rgb(107 114 128)',
                        paddingX: '16px',
                    }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setFilterdMonth(startDate && endDate ? customDate : clicked)
                            setFilterModalOpen(false)
                        }}
                        autoFocus sx={{
                            background: "#1976d2",
                            borderRadius: '4px',
                            color: '#fff',
                            border: '1px solid #1976d2',
                            paddingX: '16px',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#1976d2',
                            },
                        }}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}