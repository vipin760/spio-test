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
import '../reviewdistribution.css';
import RatingsHorizontalBarChart from '../../Charts/ratingsHorizontalChart';
import { useDispatch, useSelector } from 'react-redux';
import { getResponceTime } from '../store/store';
import RatingVerticalChart from '../../Charts/ratingVerticalChart';

const schema = yup.object().shape({

});

const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [chartType, setChartType] = useState("horizontalbarchart");
  const [filterdMonth, setFilterdMonth] = useState("month=12");
  const [fetchedData, setFetchedData] = useState([])

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch()

  // FETCH DATA FROM API
  useEffect(() => {
    dispatch(getResponceTime({ chnageDate: filterdMonth, institutionGatewayDetailId })).then((res) => {
      setFetchedData(res?.payload?.data?.data)
    })

  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

  // RENDERING CHART TYPE WITH CONDITION
  const renderCharts = () => {
    switch (chartType) {
      case 'barchart':
        return <RatingsHorizontalBarChart type="x" fetchedData={fetchedData} />
      default:
        return <RatingsHorizontalBarChart fetchedData={fetchedData} />
    }
  }

  return (
    <FormProvider {...methods}>
      <div className='px-20 pt-20 relative'>
        {/* title section */}
        <div className='header-content'>
          <h1 className='title'>Reviews distribution by employee</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        {/* main content */}
        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Reviews distribution by employee</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>{fetchedData ? fetchedData?.totalReviews : ''}</h2>
                  <span className='text-[rgb(107,114,128)]'>Reviews</span>
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
        {/* <div className='absolute bg-red w-[30%] right-0 top-0 h-[100vh] z-10'>

      </div> */}
        <FilterModalDialog
          open={filterModalOpen}
          handleClose={() => setFilterModalOpen(false)}
          setFilterdMonth={setFilterdMonth}
          setFilterModalOpen={setFilterModalOpen}
        />

        <ChartStyleModalSlide
          open={chartStyleModalOpen}
          handleClose={() => {
            setFilterdMonth("month=12")
            setChartStyleModalOpen(false)
          }}
          setChartType={setChartType} chartType={chartType}
          setFilterdMonth={setFilterdMonth}
          setChartStyleModalOpen={setChartStyleModalOpen}
        />
      </div>
    </FormProvider>
  )
}

export default Products