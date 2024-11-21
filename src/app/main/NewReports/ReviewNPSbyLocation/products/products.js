import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BiFilterAlt } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import { RiEqualizerLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import ReviewsAndRatingsChart from '../../Charts/reviewsAndRatingsChart';
import FilterModalDialog from '../../Modals/filterModal';
import ChartStyleModalSlide from '../../Modals/chartStyleModal';
import HorizontalBarChart from '../../Charts/horizontalBarChart';
import LineChart from '../../Charts/lineChart';
import SmoothLineChart from '../../Charts/smoothLineCharts';
import ScatterChart from '../../Charts/scatterChart';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../reviewnpsbylocation.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRoutes } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import RatingsHorizontalBarChart from '../../Charts/ratingsHorizontalChart';
import NPSBarLineChart from '../../Charts/reviewNpsByLocationCharts';
import NPSBarLineChartHorizontal from '../../Charts/reviewNpsByLocationCharts';
import { getResponceTime } from '../store/productsSlice';

const schema = yup.object().shape({

});

const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("barchart");
  const reduxData = useSelector((state) => state?.ReviewNPSbyLocation?.products?.data || []);
  const [fetchedData, setFetchedData] = useState([])
  const [filterdMonth, setFilterdMonth] = useState("12monthsago");

  const [storedData, setStoredData] = useState([]);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getResponceTime({ chnageDate: filterdMonth, institutionGatewayDetailId })).then((res) => {
      setFetchedData(res?.payload?.data?.data)
    })

  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <NPSBarLineChartHorizontal fetchedData={fetchedData} />
      default:
        return <NPSBarLineChartHorizontal fetchedData={fetchedData} type="x" />
    }
  }

  const filteringOptions = [
    {
      name: "Today",
      value: 'today'
    },
    {
      name: "Last Week",
      value: "7daysago"
    },
    {
      name: "Last Month",
      value: "30daysago"
    },
    {
      name: "Last 3 Month",
      value: "3monthsago"
    },
    {
      name: "Last 6 Month",
      value: "6monthsago"
    },
    {
      name: "12 Month",
      value: "12monthsago"
    },
    {
      name: "Custom",
      value: "Custom"
    },

  ];

  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Review NPS by location</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        {/* <h1 onClick={() => { setCheck(!check) }}>AA</h1> */}
        {/* main content */}
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Review NPS by location</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>{fetchedData?.[0]?.promotersPercentage?.toFixed(1) || 0}% </h2>
                  <span className='text-[rgb(107,114,128)]'>Promoters</span>
                </div>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData?.[0]?.passivesPercentage?.toFixed(1) || 0}%</h2>
                  <span className='text-[rgb(107,114,128)]'>Passives</span>
                </div>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData?.[0]?.detractorsPercentage?.toFixed(1) || 0}%</h2>
                  <span className='text-[rgb(107,114,128)]'>Detractors</span>
                </div>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData?.[0]?.NPS?.toFixed(1) || 0}%</h2>
                  <span className='text-[rgb(107,114,128)]'>NPS</span>
                </div>
              </div>
            </div>
            <div className='main-content-right'>
              <span><RiEqualizerLine onClick={() => setChartStyleModalOpen(true)} cursor={'pointer'} /></span>
            </div>
          </div>

          {/* charts */}
          <div>
            {renderCharts()}
          </div>
        </div>

        <FilterModalDialog
          filteringOptions={filteringOptions}
          open={filterModalOpen}
          handleClose={() => setFilterModalOpen(false)}
          setFilterdMonth={setFilterdMonth}
          setFilterModalOpen={setFilterModalOpen}
        />

        <ChartStyleModalSlide
          filteringOptions={filteringOptions}
          open={chartStyleModalOpen}
          handleClose={() => setChartStyleModalOpen(false)}
          setChartType={setChartType} chartType={chartType}
          setFilterdMonth={setFilterdMonth}
          setChartStyleModalOpen={setChartStyleModalOpen}
        />
      </div>
    </FormProvider>
  )
}

export default withReducer('ReviewNPSbyLocation', reducer)(Products);
