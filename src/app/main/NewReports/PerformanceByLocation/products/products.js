import React, { useEffect, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../perfomancebylocation.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRoutes } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '@mui/material';
import PerformanceByStateTable from '../components/performanceByTable';
import PerfomanceByCategory from '../components/perfomanceByCategory';
import PerfomanceByTopics from '../components/performanceByTopics';

const schema = yup.object().shape({

});

const Products = () => {

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    const { reset, watch, control, onChange, formState, getValues } = methods;

    const dispatch = useDispatch()

    const router = useParams();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const PerformanceTitle = ({content}) => {
       return <div className='main-content-title'>
            <h1 className='text-[rgb(107,114,128)]'>Perfomance by {content}</h1>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
        </div>
    }


    return (
        <FormProvider {...methods}>
            <div className='px-20 pt-20 relative'>
                {/* title section */}
                <div className='header-content'>
                    <h1 className='title'>Perfomance by Location</h1>
                </div>

                {/* <h1 onClick={() => { setCheck(!check) }}>AA</h1> */}
                {/* main content */}
                <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: '#388ee2', // Change the indicator (underscore) color
                                        },
                                    }}>
                                    <Tab label="Locations" value="1" sx={{
                                        '&.Mui-selected': { color: '#003d62', fontWeight: 600 },
                                    }} />
                                    <Tab label="Categories" value="2" sx={{
                                        '&.Mui-selected': { color: '#003d62', fontWeight: 600 },
                                    }} />
                                    <Tab label="Topics" value="3" sx={{
                                        '&.Mui-selected': { color: '#003d62', fontWeight: 600 },
                                    }} />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                    <PerformanceTitle content={"state"} />
                                    <PerformanceByStateTable />
                            </TabPanel>
                            <TabPanel value="2">
                                    <PerformanceTitle content={"category"} />
                                    <PerfomanceByCategory />
                            </TabPanel>
                            <TabPanel value="3">
                                    <PerformanceTitle content={"topics"} />
                                    <PerfomanceByTopics />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </FormProvider>
    )
}

export default withReducer('PerformanceByLocation', reducer)(Products)
