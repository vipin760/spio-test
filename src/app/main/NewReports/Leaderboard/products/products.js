import React, { useEffect, useMemo, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { RiEqualizerLine } from "react-icons/ri";
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
import '../leaderboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../../store/productSlice';

const schema = yup.object().shape({

});

const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("horizontalbarchart");

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const dispatch = useDispatch()
  const [fetchedData, setFetchedData] = useState([])
  const [filterdMonth, setFilterdMonth] = useState("12monthsago")

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

  // FETCH DATA FROM API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getReports({ filterdMonth: filterdMonth, institutionGatewayDetailId }));
        setFetchedData(data?.payload?.data?.data)
      } catch (error) {
      }
    };
    fetchData();
  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

  // TAKING THE ARRAY OF REVIEW COUNT TO GET THE LARGEST VALUE
  const a = fetchedData?.employeeData?.map((data, index) => data?.reviewCount)

  let largestNumber = a ? a[0] : '';

  for (let i = 1; i < a?.length; i++) {
    if (a[i] > largestNumber) {
      largestNumber = a[i];
    }
  }

  // COOKING DATA FOR THE CHART COMPONENT
  const fetchData1 = useMemo(() => ({
    xaxislabel: fetchedData?.employeeData?.map((data, index) => data?.employeeName),
    label: "Request",
    data: fetchedData?.employeeData?.map((data, index) => data?.reviewCount),
    yid: 'y-request',
    optionTitle: "Number of Request",
    minlimit: 0,
    maxlimit: largestNumber ? largestNumber + 100 : 100,
    stepsize: 200,
  }), [fetchedData])

  //RENDERING CHART COMPONENTS CONDITIONALY
  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <ReviewsAndRatingsChart data1={fetchData1} />
      default:
        return <HorizontalBarChart data1={{ ...fetchData1, label: "Rating", stepsize: 200 }} />
    }
  }


  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Leaderboard</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        {/* main content */}
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Review requested by employee</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>{fetchedData && fetchedData?.overallData?.totalReviews || 0}</h2>
                  <span className='text-[rgb(107,114,128)]'>Requests</span>
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
          open={filterModalOpen}
          handleClose={() => setFilterModalOpen(false)}
          setFilterdMonth={setFilterdMonth}
          setFilterModalOpen={setFilterModalOpen}
          filteringOptions={filteringOptions}
        />


        <ChartStyleModalSlide
          open={chartStyleModalOpen}
          handleClose={() => setChartStyleModalOpen(false)}
          setChartType={setChartType} chartType={chartType}
          setFilterdMonth={setFilterdMonth}
          setFilterModalOpen={setChartStyleModalOpen}
          setChartStyleModalOpen={setChartStyleModalOpen}
          filteringOptions={filteringOptions}
        />
      </div>
    </FormProvider>
  )
}

export default Products