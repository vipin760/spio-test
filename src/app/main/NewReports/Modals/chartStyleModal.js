import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { BsBarChartFill } from "react-icons/bs";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function ChartStyleModalSlide({ open, handleClose, setChartType, chartType, setFilterdMonth, setFilterModalOpen, setChartStyleModalOpen, filteringOptions }) {
    const filterOptions = filteringOptions ? filteringOptions : [
        { name: "Today", value: 'day=1' },
        { name: "Last Week", value: "week=1" },
        { name: "Last Month", value: "month=1" },
        { name: "Last 3 Month", value: "month=3" },
        { name: "Last 6 Month", value: "month=6" },
        { name: "12 Month", value: "month=12" },
        { name: "Custom", value: "Custom" },
    ];

    const theme = useTheme();
    const methods = useFormContext();
    const { control } = methods;

    const [clicked, setClicked] = useState(filterOptions[5]?.value);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [error, setError] = useState(null);
    const maxDate = moment().endOf("day");

    const handleStartDateChange = (newValue, onChange) => {
        const date = moment(newValue).format("YYYY-MM-DD");
        if (moment(date).isSameOrBefore(endDate)) {
            setError(null);
            onChange(date);
            setStartDate(date);
        } else {
            setError("Start date cannot be later than end date.");
        }
    };

    const handleEndDateChange = (newValue, onChange) => {
        const date = moment(newValue).format("YYYY-MM-DD");
        if (moment(date).isSameOrAfter(startDate) && moment(date).isSameOrBefore(maxDate)) {
            setError(null);
            onChange(date);
            setEndDate(date);
        } else if (moment(date).isBefore(startDate)) {
            setError("End date cannot be earlier than start date.");
        } else {
            setError(`End date cannot be later than today's date.`);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    style: {
                        position: 'fixed',
                        bottom: 0,
                        right: 0,
                        height: '100vh',
                        maxHeight: '100vh',
                        width: '30%',
                        margin: 0,
                        borderRadius: 0,
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                    },
                }}
            >
                <DialogTitle>{"Chart Style"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='pb-10 flex flex-wrap gap-[15px]'>
                            <div style={{ padding: '5px', border: chartType === 'horizontalbarchart' ? '2px solid #388ee2' : "", display: 'inline-block', borderRadius: '4px', cursor: 'pointer', background: '#e9f5fb', color: '#388ee2' }} onClick={() => { setChartType('horizontalbarchart'); handleClose(); }}><RiBarChartHorizontalFill size={'40px'} /></div>
                            <div style={{ padding: '5px', display: 'inline-block', border: chartType === 'barchart' ? '2px solid #388ee2' : "", borderRadius: '4px', cursor: 'pointer', background: '#e9f5fb', color: '#388ee2' }} onClick={() => { setChartType('barchart'); handleClose(); }}><BsBarChartFill size={'40px'} /></div>
                        </div>
                        <div>
                            <div className='pt-[15px]'>
                                <h1 className='text-[16px]'>Filter</h1>
                                <FormControl fullWidth className='py-[20px]'>
                                    <InputLabel id="demo-simple-select-label" sx={{ top: '14px' }}>
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
                                                {...field}
                                                size="small"
                                                value={clicked}
                                            >
                                                {filterOptions.map((option, index) => (
                                                    <MenuItem
                                                        onClick={() => {
                                                            setClicked(option.value);
                                                            setStartDate(null);
                                                            setError(null);
                                                        }}
                                                        value={option.value} key={index + 1}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>

                                {clicked === "Custom" ? (
                                    <div className='pb-[20px] flex items-center gap-[20px]'>
                                        <Controller
                                            name="styleStartDate"
                                            control={control}
                                            render={({ field: { value, onChange } }) => (
                                                <DatePicker
                                                    views={['year', 'month', 'day']}
                                                    label="Start Date"
                                                    value={value || null}
                                                    inputFormat="yyyy-MM-dd"
                                                    disableFuture
                                                    onChange={(newValue) => handleStartDateChange(newValue, onChange)}
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
                                                    disableFuture
                                                    onChange={(newValue) => handleEndDateChange(newValue, onChange)}
                                                    renderInput={(params) => <TextField size='small' {...params} />}
                                                />
                                            )}
                                        />
                                    </div>
                                ) : null}
                                {error && (
                                    <Typography color="error" variant="body2" className='pb-[20px]'>
                                        {error}
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex items-center justify-flex-end gap-[10px]'>
                    <Button onClick={() => {
                        setFilterdMonth(filteringOptions ? "12monthsago" : "month=12");
                        setClicked(filterOptions[4]?.value);
                        setChartStyleModalOpen(false);
                        setError(null);
                    }} sx={{
                        borderRadius: '4px',
                        border: '1px solid rgb(107 114 128)',
                        paddingX: '16px',
                    }}>
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            setFilterdMonth(startDate && endDate ? `startDate=${startDate}&&endDate=${endDate}` : clicked);
                            setChartStyleModalOpen(false);
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
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
