import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const NPSBarLineChartHorizontal = ({ fetchedData, type }) => {

    // COOKING THE DATA FOR CHART
    const options = {
        indexAxis: type ? type : 'y', 
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true,  
            },
            x: {
                stacked: true,
                min: 0, 
                max: 300,  
            },
            x1: {  
                type: 'linear',  
                position: 'top', 
                min: -100,  
                max: 100,
                ticks: {
                    stepSize: 20,  
                    callback: function (value) {
                        return value + " NPS"; 
                    },
                },
                grid: {
                    drawOnChartArea: false, 
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start', 
                labels: {
                    usePointStyle: true, 
                    pointStyle: 'circle',
                    font: {
                        size: 10 
                    }
                }
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                display: true,
                color: '#000',
                align: 'top',
                font: {
                    size: 12,
                },
            },
        },
    };

    const data = {
        labels: fetchedData?.map((data, index) => data?.city),
        datasets: [
            {
                type: 'bar',
                label: 'Detractors',
                data: fetchedData?.map((data, index) => data?.totalDetractors),
                backgroundColor: '#e13525',
                order: 2,
            },
            {
                type: 'bar',
                label: 'Passives',
                data: fetchedData?.map((data, index) => data?.totalPassives),
                backgroundColor: '#fffa65',
                order: 2,
            },
            {
                type: 'bar',
                label: 'Promoters',
                data: fetchedData?.map((data, index) => data?.totalPromoters),
                backgroundColor: '#5F9EA0',
                order: 2,
            },
            {
                type: 'line',
                label: 'NPS Score',
                data: fetchedData?.map((data, index) => data?.NPS?.toFixed(1)),
                borderColor: '#003d62',
                backgroundColor: '#003d62',
                borderWidth: 4,  
                fill: false,
                tension: 0.4,
                xAxisID: 'x1',  
                order: 1,
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '500px', paddingTop: '20px' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default NPSBarLineChartHorizontal;

