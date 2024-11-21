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
import '../responsiveTime.css';
import { useDispatch, useSelector } from 'react-redux';
import { getResponceTime } from '../store/store';

const schema = yup.object().shape({

});


const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("barchart");

  const [filterdMonth, setFilterdMonth] = useState("12monthsago");

  const [fetchedData, setFetchedData] = useState([])

  const dispatch = useDispatch()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const getLastNMonthsData = (data, months) => {

    const filteredResults = data?.results?.slice(-months);

    return {
      overall_average_response_time: data?.overall_average_response_time,
      results: filteredResults
    };
  };

  // FETCH DATA FROM API  
  useEffect(() => {
    dispatch(getResponceTime({ filterdMonth, institutionGatewayDetailId })).then((res) => {
      let data = res?.payload?.data?.data;
      // FILTERING WITH MONTHS
      switch (filterdMonth) {
        case "1monthsago":
          setFetchedData(getLastNMonthsData(data, 1));
          break;

        case "3monthsago":
          setFetchedData(getLastNMonthsData(data, 3));
          break;

        case "6monthsago":
          setFetchedData(getLastNMonthsData(data, 6));
          break;

        case "12monthsago":
          setFetchedData(getLastNMonthsData(data, 12));
          break;

        default:
          setFetchedData(data);
          break;
      }
    })

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

  const ar = fetchedData?.results?.map((data, index) => data?.average_response_time_by_month)

  let largestValue = ar ? ar[0] : [];

  for (let i = 1; i < ar?.length; i++) {
    if (ar[i] > largestValue) {
      largestValue = ar[i];
    }
  }

  // COMVERTING MONTHS TO JAN-YEAR LIKE THIS FORMAT
  const monthMap = {
    january: 'Jan',
    february: 'Feb',
    march: 'Mar',
    april: 'Apr',
    may: 'May',
    june: 'Jun',
    july: 'Jul',
    august: 'Aug',
    september: 'Sep',
    october: 'Oct',
    november: 'Nov',
    december: 'Dec',
  };

  const convertMonthFormat = (months) => {
    return months?.map((monthStr) => {
      const [year, month] = monthStr?.split('-');
      const shortMonth = monthMap[month?.toLowerCase()];
      const shortYear = year.slice(-2);
      return `${shortMonth}-${shortYear}`;
    });
  };

// COOKING THE DATA FOR 
  const fetchData1 = useMemo(() => (
    {
      xaxislabel: convertMonthFormat(fetchedData?.results?.map((data, index) => data?.month)),
      label: "Response time",
      data: fetchedData?.results?.map((data, index) => data?.average_response_time_by_month),
      yid: 'y-reviews',
      optionTitle: "",
      minlimit: 0,
      maxlimit: largestValue + 3000,
      stepsize: 0.1,
    }
  ), [fetchedData])

  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <ReviewsAndRatingsChart data1={fetchData1} />
      default:
        return <HorizontalBarChart data1={fetchData1} />

    }
  }

  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Response time</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        {/* main content */}
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Response time over time</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>{Math.ceil((fetchedData?.overall_average_response_time) / 24)} Days</h2>
                  <span className='text-[rgb(107,114,128)]'>Response Time</span>
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