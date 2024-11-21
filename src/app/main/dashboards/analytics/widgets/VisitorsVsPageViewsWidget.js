import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Tooltip } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { selectWidgets } from '../store/widgetsSlice';
import { useEffect, useState } from 'react';

function VisitorsVsPageViewsWidget(props) {
  const theme = useTheme();
  const widgets = {
    "overallScore": 472,
    "averageRatio": 45,
    "predictedRatio": 55,
    "series": [
      {
        "name": "Download Bandwidth",
        "data": [
          {
            "x": "2021-12-18T09:21:32.665Z",
            "y": 4769
          },
          {
            "x": "2021-12-19T09:21:32.665Z",
            "y": 4901
          },
          {
            "x": "2021-12-20T09:21:32.665Z",
            "y": 4640
          },
          {
            "x": "2021-12-21T09:21:32.665Z",
            "y": 5128
          },
          {
            "x": "2021-12-22T09:21:32.665Z",
            "y": 5015
          },
          {
            "x": "2021-12-23T09:21:32.665Z",
            "y": 5360
          },
          {
            "x": "2021-12-24T09:21:32.665Z",
            "y": 5608
          },
          {
            "x": "2021-12-25T09:21:32.665Z",
            "y": 5272
          },
          {
            "x": "2021-12-26T09:21:32.665Z",
            "y": 5660
          },
          {
            "x": "2021-12-27T09:21:32.665Z",
            "y": 6026
          },
          {
            "x": "2021-12-28T09:21:32.665Z",
            "y": 5836
          },
          {
            "x": "2021-12-29T09:21:32.665Z",
            "y": 5659
          },
          {
            "x": "2021-12-30T09:21:32.665Z",
            "y": 5575
          },
          {
            "x": "2021-12-31T09:21:32.665Z",
            "y": 5474
          },
          {
            "x": "2022-01-01T09:21:32.665Z",
            "y": 5427
          },
          {
            "x": "2022-01-02T09:21:32.665Z",
            "y": 5865
          },
          {
            "x": "2022-01-03T09:21:32.665Z",
            "y": 5700
          },
          {
            "x": "2022-01-04T09:21:32.665Z",
            "y": 6052
          },
          {
            "x": "2022-01-05T09:21:32.665Z",
            "y": 5760
          },
          {
            "x": "2022-01-06T09:21:32.665Z",
            "y": 5648
          },
          {
            "x": "2022-01-07T09:21:32.665Z",
            "y": 5510
          },
          {
            "x": "2022-01-08T09:21:32.665Z",
            "y": 5435
          },
          {
            "x": "2022-01-09T09:21:32.665Z",
            "y": 5239
          },
          {
            "x": "2022-01-10T09:21:32.665Z",
            "y": 5452
          },
          {
            "x": "2022-01-11T09:21:32.665Z",
            "y": 5416
          },
          {
            "x": "2022-01-12T09:21:32.665Z",
            "y": 5195
          },
          {
            "x": "2022-01-13T09:21:32.665Z",
            "y": 5119
          },
          {
            "x": "2022-01-14T09:21:32.665Z",
            "y": 4635
          },
          {
            "x": "2022-01-15T09:21:32.665Z",
            "y": 4833
          },
          {
            "x": "2022-01-16T09:21:32.665Z",
            "y": 4584
          },
          {
            "x": "2022-01-17T09:21:32.665Z",
            "y": 4822
          },
          {
            "x": "2022-01-18T09:21:32.665Z",
            "y": 4330
          },
          {
            "x": "2022-01-19T09:21:32.665Z",
            "y": 4582
          },
          {
            "x": "2022-01-20T09:21:32.665Z",
            "y": 4348
          },
          {
            "x": "2022-01-21T09:21:32.665Z",
            "y": 4132
          },
          {
            "x": "2022-01-22T09:21:32.665Z",
            "y": 4099
          },
          {
            "x": "2022-01-23T09:21:32.665Z",
            "y": 3849
          },
          {
            "x": "2022-01-24T09:21:32.665Z",
            "y": 4010
          },
          {
            "x": "2022-01-25T09:21:32.665Z",
            "y": 4486
          },
          {
            "x": "2022-01-26T09:21:32.665Z",
            "y": 4403
          },
          {
            "x": "2022-01-27T09:21:32.665Z",
            "y": 4141
          },
          {
            "x": "2022-01-28T09:21:32.665Z",
            "y": 3780
          },
          {
            "x": "2022-01-29T09:21:32.665Z",
            "y": 3929
          },
          {
            "x": "2022-01-30T09:21:32.665Z",
            "y": 3524
          },
          {
            "x": "2022-01-31T09:21:32.665Z",
            "y": 3212
          },
          {
            "x": "2022-02-01T09:21:32.665Z",
            "y": 3568
          },
          {
            "x": "2022-02-02T09:21:32.665Z",
            "y": 3800
          },
          {
            "x": "2022-02-03T09:21:32.665Z",
            "y": 3796
          },
          {
            "x": "2022-02-04T09:21:32.665Z",
            "y": 3870
          },
          {
            "x": "2022-02-05T09:21:32.665Z",
            "y": 3745
          },
          {
            "x": "2022-02-06T09:21:32.665Z",
            "y": 3751
          },
          {
            "x": "2022-02-07T09:21:32.665Z",
            "y": 3310
          },
          {
            "x": "2022-02-08T09:21:32.665Z",
            "y": 3509
          },
          {
            "x": "2022-02-09T09:21:32.665Z",
            "y": 3311
          },
          {
            "x": "2022-02-10T09:21:32.665Z",
            "y": 3187
          },
          {
            "x": "2022-02-11T09:21:32.665Z",
            "y": 2918
          },
          {
            "x": "2022-02-12T09:21:32.665Z",
            "y": 3191
          },
          {
            "x": "2022-02-13T09:21:32.665Z",
            "y": 3437
          },
          {
            "x": "2022-02-14T09:21:32.665Z",
            "y": 3291
          },
          {
            "x": "2022-02-15T09:21:32.665Z",
            "y": 3317
          },
          {
            "x": "2022-02-16T09:21:32.665Z",
            "y": 3716
          },
          {
            "x": "2022-02-17T09:21:32.665Z",
            "y": 3260
          },
          {
            "x": "2022-02-18T09:21:32.665Z",
            "y": 3694
          },
          {
            "x": "2022-02-19T09:21:32.665Z",
            "y": 3598
          },
          {
            "x": "2022-02-20T09:21:32.665Z",
            "y": 3812
          }
        ]
      },
      {
        "name": "Upload Bandwidth",
        "data": [
          {
            "x": "2021-12-18T09:21:32.665Z",
            "y": 1654
          },
          {
            "x": "2021-12-19T09:21:32.665Z",
            "y": 1900
          },
          {
            "x": "2021-12-20T09:21:32.665Z",
            "y": 1647
          },
          {
            "x": "2021-12-21T09:21:32.665Z",
            "y": 1315
          },
          {
            "x": "2021-12-22T09:21:32.665Z",
            "y": 1807
          },
          {
            "x": "2021-12-23T09:21:32.665Z",
            "y": 1793
          },
          {
            "x": "2021-12-24T09:21:32.665Z",
            "y": 1892
          },
          {
            "x": "2021-12-25T09:21:32.665Z",
            "y": 1846
          },
          {
            "x": "2021-12-26T09:21:32.665Z",
            "y": 1966
          },
          {
            "x": "2021-12-27T09:21:32.665Z",
            "y": 1804
          },
          {
            "x": "2021-12-28T09:21:32.665Z",
            "y": 1778
          },
          {
            "x": "2021-12-29T09:21:32.665Z",
            "y": 2015
          },
          {
            "x": "2021-12-30T09:21:32.665Z",
            "y": 1892
          },
          {
            "x": "2021-12-31T09:21:32.665Z",
            "y": 1708
          },
          {
            "x": "2022-01-01T09:21:32.665Z",
            "y": 1711
          },
          {
            "x": "2022-01-02T09:21:32.665Z",
            "y": 1570
          },
          {
            "x": "2022-01-03T09:21:32.666Z",
            "y": 1507
          },
          {
            "x": "2022-01-04T09:21:32.666Z",
            "y": 1451
          },
          {
            "x": "2022-01-05T09:21:32.666Z",
            "y": 1522
          },
          {
            "x": "2022-01-06T09:21:32.666Z",
            "y": 1801
          },
          {
            "x": "2022-01-07T09:21:32.666Z",
            "y": 1977
          },
          {
            "x": "2022-01-08T09:21:32.666Z",
            "y": 2367
          },
          {
            "x": "2022-01-09T09:21:32.666Z",
            "y": 2798
          },
          {
            "x": "2022-01-10T09:21:32.666Z",
            "y": 3080
          },
          {
            "x": "2022-01-11T09:21:32.666Z",
            "y": 2856
          },
          {
            "x": "2022-01-12T09:21:32.666Z",
            "y": 2745
          },
          {
            "x": "2022-01-13T09:21:32.666Z",
            "y": 2750
          },
          {
            "x": "2022-01-14T09:21:32.666Z",
            "y": 2728
          },
          {
            "x": "2022-01-15T09:21:32.666Z",
            "y": 2436
          },
          {
            "x": "2022-01-16T09:21:32.666Z",
            "y": 2289
          },
          {
            "x": "2022-01-17T09:21:32.666Z",
            "y": 2657
          },
          {
            "x": "2022-01-18T09:21:32.666Z",
            "y": 2804
          },
          {
            "x": "2022-01-19T09:21:32.666Z",
            "y": 2777
          },
          {
            "x": "2022-01-20T09:21:32.666Z",
            "y": 3024
          },
          {
            "x": "2022-01-21T09:21:32.666Z",
            "y": 2657
          },
          {
            "x": "2022-01-22T09:21:32.666Z",
            "y": 2218
          },
          {
            "x": "2022-01-23T09:21:32.666Z",
            "y": 1964
          },
          {
            "x": "2022-01-24T09:21:32.666Z",
            "y": 1674
          },
          {
            "x": "2022-01-25T09:21:32.666Z",
            "y": 1721
          },
          {
            "x": "2022-01-26T09:21:32.666Z",
            "y": 2005
          },
          {
            "x": "2022-01-27T09:21:32.666Z",
            "y": 1613
          },
          {
            "x": "2022-01-28T09:21:32.666Z",
            "y": 1295
          },
          {
            "x": "2022-01-29T09:21:32.666Z",
            "y": 1071
          },
          {
            "x": "2022-01-30T09:21:32.666Z",
            "y": 799
          },
          {
            "x": "2022-01-31T09:21:32.666Z",
            "y": 1133
          },
          {
            "x": "2022-02-01T09:21:32.666Z",
            "y": 1536
          },
          {
            "x": "2022-02-02T09:21:32.666Z",
            "y": 2016
          },
          {
            "x": "2022-02-03T09:21:32.666Z",
            "y": 2256
          },
          {
            "x": "2022-02-04T09:21:32.666Z",
            "y": 1934
          },
          {
            "x": "2022-02-05T09:21:32.666Z",
            "y": 1832
          },
          {
            "x": "2022-02-06T09:21:32.666Z",
            "y": 2075
          },
          {
            "x": "2022-02-07T09:21:32.666Z",
            "y": 1709
          },
          {
            "x": "2022-02-08T09:21:32.666Z",
            "y": 1932
          },
          {
            "x": "2022-02-09T09:21:32.666Z",
            "y": 1831
          },
          {
            "x": "2022-02-10T09:21:32.666Z",
            "y": 1434
          },
          {
            "x": "2022-02-11T09:21:32.666Z",
            "y": 993
          },
          {
            "x": "2022-02-12T09:21:32.666Z",
            "y": 1064
          },
          {
            "x": "2022-02-13T09:21:32.666Z",
            "y": 618
          },
          {
            "x": "2022-02-14T09:21:32.666Z",
            "y": 1032
          },
          {
            "x": "2022-02-15T09:21:32.666Z",
            "y": 1280
          },
          {
            "x": "2022-02-16T09:21:32.666Z",
            "y": 1344
          },
          {
            "x": "2022-02-17T09:21:32.666Z",
            "y": 1835
          },
          {
            "x": "2022-02-18T09:21:32.666Z",
            "y": 2287
          },
          {
            "x": "2022-02-19T09:21:32.666Z",
            "y": 2226
          },
          {
            "x": "2022-02-20T09:21:32.666Z",
            "y": 2692
          }
        ]
      }
    ]
  }
 
  const { series, averageRatio, predictedRatio, overallScore, labels } =widgets

  const chartOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [theme.palette.secondary.light, theme.palette.secondary.light],
    dataLabels: {
      enabled: false,
    },
    fill: {
      colors: [theme.palette.secondary.dark, theme.palette.secondary.light],
      opacity: 0.5,
    },
    grid: {
      show: false,
      padding: {
        bottom: -40,
        left: 0,
        right: 0,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    tooltip: {
      followCursor: true,
      theme: 'dark',
      x: {
        format: 'MMM dd, yyyy',
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: -20,
        rotate: 0,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
      tickAmount: 3,
      tooltip: {
        enabled: false,
      },
      type: 'datetime',
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.divider,
        },
      },
      max: (max) => max + 250,
      min: (min) => min - 250,
      show: false,
      tickAmount: 5,
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
          Upload Bandwidth vs. Download Bandwidth
        </Typography>
        <div className="ml-8">
          <Chip size="small" className="font-medium text-sm" label=" 30 days" />
        </div>
      </div>
      <div className="flex items-start mt-24 mx-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-42 sm:gap-48">
         
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="font-medium text-secondary leading-5">Download Bandwidth</div>
              <Tooltip title="Average Ratio is the average ratio between Page Views and Visitors">
                <FuseSvgIcon className="ml-6" size={16} color="disabled">
                  heroicons-solid:arrow-circle-up
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="flex items-start mt-8">
              <div className="text-4xl font-bold tracking-tight leading-none">{averageRatio}Mbps</div>
              <div className="flex items-center ml-8">
                <FuseSvgIcon className="text-red-500" size={20}>
                  heroicons-solid:arrow-circle-down
                </FuseSvgIcon>
                <Typography className="ml-4 text-md font-medium text-red-500">13.1%</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="font-medium text-secondary leading-5">Upload Bandwidth</div>
              <Tooltip title="Predicted Ratio is calculated by using historical ratio, current trends and your goal targets.">
                <FuseSvgIcon className="ml-6" size={16} color="disabled">
                  heroicons-solid:information-circle
                </FuseSvgIcon>
              </Tooltip>
            </div>
            <div className="flex items-start mt-8">
              <div className="text-4xl font-bold tracking-tight leading-none">
                {predictedRatio}Mbps
              </div>
              <div className="flex items-center ml-8">
                <FuseSvgIcon className="text-green-500" size={20}>
                  heroicons-solid:arrow-circle-up
                </FuseSvgIcon>
                <Typography className="ml-4 text-md font-medium text-green-500">22.2%</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto h-320 mt-12">
       {series&& <ReactApexChart
          className="flex-auto w-full h-full"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />}
      </div>
    </Paper>
  );
}

export default VisitorsVsPageViewsWidget;
