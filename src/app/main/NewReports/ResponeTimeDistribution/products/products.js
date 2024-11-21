import React, { useEffect, useMemo, useState } from 'react';
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
import '../responsetimedistribution.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/store';

const schema = yup.object().shape({

});

const Products = () => {

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema)
  });
  const { reset, watch, control, onChange, formState } = methods;

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("barchart");
  const [fetchedData, setFetchedData] = useState([])
  const [filterdMonth, setFilterdMonth] = useState("12monthsago");

  const dispatch = useDispatch()

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
      value: "1monthsago"
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

  // FUNCTION FETCH DATA FROM API
  useEffect(() => {
    dispatch(getProducts({ filterdMonth: filterdMonth, institutionGatewayDetailId })).then((res) => {
      setFetchedData(res?.payload?.data?.data)
    })
  }, [dispatch, filterdMonth, institutionGatewayDetailId])

  // COOKING DATA FOR X AXIS 

  const ratingMap = {
    "6": "No rating",
    "ONE": "1 rating",
    "TWO": "2 rating",
    "THREE": "3 rating",
    "FOUR": "4 rating",
    "FIVE": "5 rating"
  };

  const starOrderMap = {
    "No rating": 0,
    "1 rating": 1,
    "2 rating": 2,
    "3 rating": 3,
    "4 rating": 4,
    "5 rating": 5
  };

  const sortedRatings = fetchedData?.map(item => ({
    ...item,
    ratingLabel: ratingMap[item.rating] || item.rating
  }))
    .sort((a, b) => starOrderMap[a.ratingLabel] - starOrderMap[b.ratingLabel]);

  // COOKING DATA FOR CHART 
  const fetchData1 = useMemo(() => ({
    xaxislabel: sortedRatings?.map((data, index) => data?.ratingLabel),
    label: "Response time",
    data: sortedRatings?.map((data, index) => data?.average_response_time),
    yid: 'y-reviews',
    optionTitle: "",
    minlimit: 0,
    maxlimit: Math.max(...sortedRatings?.map((data, index) => data?.average_response_time)) + 2000,
    stepsize: 100,
  }), [fetchedData])

  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <ReviewsAndRatingsChart data1={{ ...fetchData1 }} />
      default:
        return <HorizontalBarChart data1={{ ...fetchData1, label: "Rating" }} />
    }
  }


  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Response time distribution</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        {/* main content */}
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Response time distribution</h1>
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