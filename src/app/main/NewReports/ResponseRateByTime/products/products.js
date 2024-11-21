import React, { useEffect, useMemo, useState } from 'react';
import { BiFilterAlt } from "react-icons/bi";
import { RiEqualizerLine } from "react-icons/ri";
import ReviewsAndRatingsChart from '../../Charts/reviewsAndRatingsChart';
import FilterModalDialog from '../../Modals/filterModal';
import ChartStyleModalSlide from '../../Modals/chartStyleModal';
import HorizontalBarChart from '../../Charts/horizontalBarChart';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../responseratebycity.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRoutes } from 'react-router-dom';
import { getReports } from '../../store/productSlice';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { getData } from '../store/productsSlice';
import ResponseRateChart from '../../Charts/responseRateByCity';

const schema = yup.object().shape({

});

const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;

  const dispatch = useDispatch()

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("horizontalbarchart");
  const [storedData, setStoredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([])
  const [filterdMonth, setFilterdMonth] = useState("12monthsago");

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
    }
  ];

  // FETCH DATA FROM API
  useEffect(() => {
    if (institutionGatewayDetailId) {
      dispatch(getData({ chnageDate: filterdMonth, institutionGatewayDetailId })).then((res) => {
        setFetchedData(res?.payload?.data?.data ? res?.payload?.data?.data[0] : '')
      })
    }
  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

  // COOKING REVIEW DATA FOR CHART
  const fetchData1 = useMemo(() => ({
    xaxislabel: fetchedData?.cities?.map((data, index) => data?.city),
    label: "Responded",
    data: fetchedData?.cities?.map((data, index) => data?.totalResponded),
    yid: 'y-reviews',
    optionTitle: "Number of Reviews",
    minlimit: 0,
    maxlimit: fetchedData?.totalRespondedOverall + 100,
  }), [fetchedData])

  // COOKING RAITING DATA FOR CHART
  const fetchData2 = useMemo(() => (
    {
      xaxislabel: fetchedData?.cities?.map((data, index) => data?.city),
      label: "Not Responded",
      data: fetchedData?.cities?.map((data, index) => data?.totalNotResponded),
      yid: 'y-ratings',
      optionTitle: "Rating (1-5)",
      minlimit: 0,
      minlimit: 1,
      maxlimit: fetchedData?.totalNotRespondedOverall + 100,
    }
  ), [fetchedData])

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
          <h1 className='title'>Response rate By city</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>


        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Response rate by city</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData ? fetchedData?.overallResponseRate?.toFixed(1) : 0}%</h2>
                  <span className='text-[rgb(107,114,128)]'>Response rate</span>
                </div>
                <div>
                  <h2 className='text-[24px] '>{fetchedData ? fetchedData?.totalRespondedOverall : 0} </h2>
                  <span className='text-[rgb(107,114,128)]'>Responded</span>
                </div>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData ? fetchedData?.totalNotRespondedOverall : 0}</h2>
                  <span className='text-[rgb(107,114,128)]'>Not responded</span>
                </div>
                <div>
                  <h2 className='flex items-center text-[24px] gap-5'>{fetchedData ? fetchedData?.totalReviewsOverall : 0}</h2>
                  <span className='text-[rgb(107,114,128)]'>Total Reviews</span>
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
          open={chartStyleModalOpen}
          handleClose={() => setChartStyleModalOpen(false)}
          setChartType={setChartType} chartType={chartType}
          setFilterdMonth={setFilterdMonth}
          setChartStyleModalOpen={setChartStyleModalOpen}
          filteringOptions={filteringOptions}
        />
      </div>
    </FormProvider>
  )
}

export default withReducer('ResponseRateByCity', reducer)(Products)