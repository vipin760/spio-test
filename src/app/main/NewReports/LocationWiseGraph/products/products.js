import React, { useEffect, useMemo, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
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
import '../locationwisegraph.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationWiseData } from '../store/store';
import { motion } from 'framer-motion'


const schema = yup.object().shape({

});


const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("horizontalbarchart");
  const [fetchedData, setFetchedData] = useState([])
  const [filterdMonth, setFilterdMonth] = useState("12monthsago");

  const dispatch = useDispatch()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},  
    resolver: yupResolver(schema)
  });
  const { reset, watch, control, onChange, formState } = methods;

  // FETCH DATA FROM API 
  useEffect(() => {
    if (institutionGatewayDetailId) {
      dispatch(getLocationWiseData({ filterdMonth, institutionGatewayDetailId }))
        .then((res) => setFetchedData(res?.payload?.data?.data || []));
    }
  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

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

  // HANDLIMG REVIEW DATA AND USED FOR USEMEMO FOR REDUSING RECALCULATION
  const fetchData1 = useMemo(() => ({
    xaxislabel: fetchedData?.location_data?.map((data) => data?.location),
    label: "Reviews",
    data: fetchedData?.location_data?.map((data) => data?.total_reviews_by_location),
    yid: 'y-reviews',
    optionTitle: "Number of Reviews",
    minlimit: 0,
    maxlimit: Math.ceil(fetchedData?.overall_data?.total_reviews_overall) + 200,
    stepsize: 1000,
  }), [fetchedData]);

  // HANDLIMG RATING DATA AND USED FOR USEMEMO FOR REDUSING RECALCULATION
  const fetchData2 = useMemo(() => ({
    xaxislabel: fetchedData?.location_data?.map((data) => data?.location),
    label: "Rating",
    data: fetchedData?.location_data?.map((data) => data?.average_rating),
    yid: 'y-ratings',
    optionTitle: "Rating (1-5)",
    stepsize: 1,
    minlimit: 1,
    maxlimit: 5,
  }), [fetchedData]);


  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <ReviewsAndRatingsChart data1={fetchData1} data2={fetchData2} />
      default:
        return <HorizontalBarChart data1={fetchData1} data2={fetchData2} />

    }
  }

  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Relative location rank within all locations</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Relative location rank within all locations</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>{fetchedData?.overall_data?.total_reviews_overall || 0}</h2>
                  <span className='text-[rgb(107,114,128)]'>Reviews</span>
                </div>
                <div>

                  <h2 className='flex items-center text-[24px] gap-5'>
                    {fetchedData?.overall_data?.average_rating_overall || 0}
                    <IoStar color='#FDCC0D' /></h2>
                  <span className='text-[rgb(107,114,128)]'>Ratings</span>
                </div>
              </div>
            </div>
            <div className='main-content-right'>
              <span><RiEqualizerLine onClick={() => setChartStyleModalOpen(true)} cursor={'pointer'} /></span>
            </div>
          </div>

          <div>
            {renderCharts()}
          </div>
        </div>

        <FilterModalDialog
          setFilterdMonth={setFilterdMonth}
          filteringOptions={filteringOptions}
          open={filterModalOpen} handleClose={() => setFilterModalOpen(false)}
          setFilterModalOpen={setFilterModalOpen}
        />

        <ChartStyleModalSlide
          filteringOptions={filteringOptions}
          setChartStyleModalOpen={setChartStyleModalOpen}
          setFilterdMonth={setFilterdMonth}
          open={chartStyleModalOpen}
          handleClose={() =>
            setChartStyleModalOpen(false)}
          setChartType={setChartType}
          chartType={chartType}
        />
      </div>
    </FormProvider>
  )
}

export default Products