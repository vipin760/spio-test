
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import Grid from '@mui/material/Grid';
import TableComponent from './tableComponent';
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchReviews } from './store/productSlice';
import { motion } from 'framer-motion'
import { Typography } from '@mui/material';

const voteSummaryColumns = [
    { id: 'profile', label: 'Profile' },
    { id: 'votes', label: 'Votes' }
];

function createData(profile, votes) {
    return { profile, votes };
}


const recentAccessLogColumns = [
    { id: 'logTime', label: 'Log Time' },
    { id: 'userName', label: 'User Name' },
    { id: 'activity', label: 'Activity' }
];

function createRecentAccessLogData(logTime, userName, activity) {
    return { logTime, userName, activity };
}

const AnalyticsDashboard = () => {

    const dispatch = useDispatch();
    const [fetchedData, setFetchedData] = useState()
    const [virtualMappingLabels, setvirtualMappingLabels] = useState([])
    const [virtualNoMappingData, setVirtualNoMappingData] = useState([])
    let [didActivity, setDidActivity] = useState([])
    const [lineChartData, setLineChartData] = useState([])

    // FETCH DATA FROM API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(fetchReviews());
                setFetchedData(result?.payload?.data?.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [dispatch]);

    //  FORMATING DATE START
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);

        if (isNaN(date.getTime())) {
            console.error("Invalid date:", isoDate);
            return "Invalid Date";
        }

        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options)?.format(date);
        console.log("formatted", formattedDate);


        return formattedDate;
    };
    //  FORMATING DATE END

    const vots = []
    let accessLogs = []
    const rgbaColors = ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD']

    fetchedData?.map((data, index) => {

        vots.push(createData(data?.profile, data?.votes))
        accessLogs.push(createRecentAccessLogData(`${formatDate(data?.log_time)}`, data?.profile, data?.activity),)

        virtualMappingLabels.push(data?.virtual_no)

        virtualNoMappingData.push({

            label: data?.profile,
            value: data?.virtual_no,
            color: rgbaColors[index],
            cutout: "50%",
        })

        lineChartData?.push(
            {
                label: data?.profile,
                data: [370, 780, 1150, 1100, 900, 470, 390],
                borderColor: "#9F34F4", // Line color for dataset 1
                backgroundColor: "#9F34F4", // Area under line
            }
        )

    })

    // CREATING DATA FOR DID ACTIVITY
    didActivity = [
        {
            label: "Active",
            value: fetchedData?.filter(item => item.did_activity === 1).length,
            color: "#F7464A",
            cutout: "50%",
        },
        {
            label: "Not Active",
            value: fetchedData?.length - fetchedData?.filter(item => item.did_activity === 1).length,
            color: "#FDB45C",
            cutout: "50%",
        }
    ];

    const profileVotes = {};

    fetchedData?.forEach((entry) => {
        const { profile, votes } = entry;
        if (profileVotes[profile]) {
            profileVotes[profile].push(votes);
        } else {
            profileVotes[profile] = [votes];
        }
    });

    let groupData = Object.keys(profileVotes).map((profile) => ({
        profile,
        votes: profileVotes[profile],
    }))

    const datasets = groupData?.map((data, index) => ({
        label: data?.profile,
        data: data?.votes,
        borderColor: rgbaColors[index],
        backgroundColor: rgbaColors[index],
    }));

    const getLastFiveDays = () => {
        const dates = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            dates.push(formattedDate);
        }
        return dates;
    };

    const lastFiveDays = getLastFiveDays();

    const voteByDaysData = useMemo(() => ({
        labels: lastFiveDays.reverse(),
        datasets: datasets?.length > 0 ? datasets : [],
    }), [fetchedData]);

    const dataSetVoteByTime = groupData?.map((data, index) => ({
        label: data?.profile,
        data: data?.votes,
        borderColor: rgbaColors[index],
        backgroundColor: rgbaColors[index],
    }))

    const voteByHoursData = {
        labels: ["12 AM", "2 AM", "4 PM", "6 PM", "8 AM", "10 AM", "12 PM"],
        datasets: dataSetVoteByTime
    };

    if (fetchedData?.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There are no records!
                </Typography>
            </motion.div>
        )
    }

    return (
        <div>
            {/* <Navbar Component={() => <div></div>} sx={{ minHeight: 40 }} /> */}
            <div className='p-[20px] sm:p-[48px]'>
                <Grid container rowGap={4} gap={2}>


                    <Grid item xs={12} lg={7} xl={8} className='shadow-md p-10 rounded-xl'>
                        <h1 className='text-[20px] font-medium pl-16 pb-15'>Votes by Day</h1>
                        <div style={{ paddingTop: '15px' }}>

                            {
                                voteByDaysData && (

                                    <LineChart dataDetails={voteByDaysData} />

                                )
                            }

                        </div>
                    </Grid>

                    <Grid item xs={12} lg={4.7} xl={3.8} className='shadow-md p-10 rounded-xl'>
                        <h1 className='text-[20px] font-medium pl-16 p-15'>Vote Summary</h1>
                        <TableComponent rows={vots} columns={voteSummaryColumns} />
                    </Grid>


                    <Grid item xs={12} lg={4.7} xl={3.8} className='shadow-md p-10 rounded-xl'>
                        <h1 className='text-[20px] font-medium pl-16'>Virtual No Mapping</h1>
                        <div style={{ width: '100%', maxWidth: '350px', paddingTop: '15px' }}>

                            {
                                virtualNoMappingData && (
                                    <DonutChart
                                        dataaa={virtualNoMappingData}
                                    />
                                )
                            }

                        </div>
                    </Grid>


                    <Grid item xs={12} lg={7} xl={8} className='shadow-md p-10 rounded-xl pb-15'>
                        <h1 className='text-[20px] font-medium pl-16'>Votes by hour</h1>
                        <div style={{ paddingTop: '15px' }}>
                            <LineChart dataDetails={voteByHoursData} />
                        </div>
                    </Grid>

                    <Grid item xs={12} lg={7} xl={8} className='shadow-md p-10 rounded-xl'>
                        <h1 className='text-[20px] font-medium pl-16 pb-15'>Recent Access Log</h1>
                        <TableComponent
                            rows={accessLogs}
                            columns={recentAccessLogColumns} maxheight={350} />
                    </Grid>
                    <Grid item xs={12} lg={4.7} xl={3.8} className='shadow-md p-10 rounded-xl'>
                        <h1 className='text-[20px] font-medium pl-16 pb-15'>DID Activity</h1>
                        <div style={{ width: '100%', maxWidth: '350px', paddingTop: '15px' }}>
                            {
                                didActivity && (
                                    <DonutChart dataaa={didActivity} />
                                )
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default AnalyticsDashboard
