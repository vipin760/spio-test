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
import '../reportsandratings.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRoutes } from 'react-router-dom';
import { getReports } from '../../store/productSlice';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { getProducts } from '../store/productsSlice';
import CityHorizontalBarChart from '../../Charts/responseRateByCity';
import { motion } from 'framer-motion'

const schema = yup.object().shape({

});

const Products = () => {

  const { institutionGatewayDetailId } = useSelector(
    (state) => state.fuse.selectLocation
  );

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [chartStyleModalOpen, setChartStyleModalOpen] = useState(false);
  const [age, setAge] = useState("");
  const [chartType, setChartType] = useState("barchart");
  const dispatch = useDispatch()
  const [filterdMonth, setFilterdMonth] = useState("month=12");


  // FUNCTION HANDLING FOR MONTHLY FORMAT
  const formatMonthlyData = (monthlyData) => {

    const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    return monthlyData.map((data) => {
      const { month, year } = data._id;
      const shortMonth = monthNames[month - 1];
      const shortYear = year.toString().slice(-2);
      return `${shortMonth} ${shortYear}`;
    });
  };

  const [fetchedData, setFetchedData] = useState([])

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;


  // FETCH DATA FROM API
  useEffect(() => {

    dispatch(getProducts({ chnageDate: filterdMonth, institutionGatewayDetailId })).then((res) => {
      setFetchedData(res?.payload)
      if (res?.payload?.monthlyReviews.length == 0) {
        setFetchedData([])
      }
    })

  }, [dispatch, filterdMonth, institutionGatewayDetailId]);

  // filterdMonth === "day=1" ? console.log();


  // CONVERTING DATE
  const currentDate = new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[currentDate.getDay()];
  const convertDate = (() => {
    if (filterdMonth === "week=1") {
      return [currentDay, currentDay];
    } else if (filterdMonth === "day=1") {
      return [currentDay];
    } else {
      const monthlyData = fetchedData?.monthlyReviews?.[0]?.monthlyData || [];
      return formatMonthlyData(monthlyData);
    }
  })();


  const data = fetchedData?.lastDayReviews?.map((data, index) => data?.totalReviews).length > 0 ? fetchedData?.lastDayReviews?.map((data, index) => data?.totalReviews) : fetchedData?.monthlyReviews ? fetchedData?.monthlyReviews[0]?.monthlyData?.map((item, index) => item?.reviews) : ''

  const large = Math?.max(...data)

  // SHOWING REVIEWS
  const fetchData1 = useMemo(() => ({
    xaxislabel: filterdMonth === "day=1" ? convertDate?.map((data, index) => data) : filterdMonth == "week=1" ? convertDate?.map((data, index) => data) : [...new Set(convertDate)],
    label: "Reviews",
    data: data,
    yid: 'y-reviews',
    optionTitle: "Number of Reviews",
    minlimit: 0,
    maxlimit: large + 20,
    stepsize: 100,
  }), [fetchedData])

  // SHOWING AVERAGE RATING
  const fetchData2 = useMemo(() => ({
    xaxislabel: convertDate,
    label: "Rating",
    data: fetchedData?.lastDayReviews?.map((data, index) => data?.averageRating).length > 0 ? fetchedData?.lastDayReviews?.map((data, index) => data?.averageRating) : fetchedData?.monthlyReviews ? fetchedData?.monthlyReviews[0]?.monthlyData?.map((item, index) => item?.averageRating) : '',
    yid: 'y-ratings',
    optionTitle: "Rating (1-5)",
    minlimit: 1,
    maxlimit: 5.5,
  }), [fetchedData])

  // CONDITIONALLY RENDERING THE SELECTED CHART COMPONENT
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
          <h1 className='title'>Reviews & ratings over time</h1>
          <div className='reports-filter-container'>
            <span className='filter-icon'><BiFilterAlt color='#B9BABC' onClick={() => setFilterModalOpen(true)} style={{ cursor: 'pointer' }} /></span>
          </div>
        </div>

        <div className='my-10 shadow-[0_3px_8px_rgba(0,0,0,0.24)] p-20'>
          <div className='main-content-title'>
            <div className='main-content-left'>
              <h1 className='text-[rgb(107,114,128)]'>Reviews & ratings over time</h1>
              <div className='main-content-innerwrapper'>
                <div>
                  <h2 className='text-[24px]'>
                    {filterdMonth === "day=1"
                      ? fetchedData?.lastDayReviews?.[0]?.totalReviews || 0
                      : fetchedData?.monthlyReviews?.[0]?.totalReviews || 0}
                  </h2>
                  <span className='text-[rgb(107,114,128)]'>Reviews</span>
                </div>
                <div>
                  <h2 className='text-[24px]'>
                    {filterdMonth === "day=1"
                      ? fetchedData?.lastDayReviews?.[0]?.averageRating || 0
                      : fetchedData?.monthlyReviews?.[0]?.averageRating || 0}
                  </h2>
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
          open={filterModalOpen}
          handleClose={() => setFilterModalOpen(false)}
          setFilterdMonth={setFilterdMonth}
          setFilterModalOpen={setFilterModalOpen}

        />

        <ChartStyleModalSlide
          open={chartStyleModalOpen}
          handleClose={() => {
            setFilterdMonth('month=12')
            setChartStyleModalOpen(false)
          }}
          setChartType={setChartType}
          chartType={chartType}
          setFilterdMonth={setFilterdMonth}
          setChartStyleModalOpen={setChartStyleModalOpen}
        />
      </div>
    </FormProvider>
  )
}

export default withReducer('ReviewsAndReports', reducer)(Products)
