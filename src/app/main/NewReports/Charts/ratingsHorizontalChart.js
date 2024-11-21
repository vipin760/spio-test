import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const RatingsHorizontalBarChart = ({ fetchedData, type }) => {
    // CHART OPTIONS
    const options = {
        indexAxis: type ? type : 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { size: 10 }
                }
            },
            tooltip: { enabled: true },
            datalabels: { display: true, color: '#000' },
        },
        scales: {
            x: { stacked: true },
            y: {
                stacked: true,
                barThickness: 10,
            }
        }
    };

    // FUNCTION FOR REMOVING 0 VALUES FROM API
    const cleanResponseData = (responseData, type) => {
        return responseData
            ?.filter(employee => employee.review_count !== 0)
            ?.map(employee => ({
                employee: employee.employee,
                review_count: employee.review_count,
                rating: employee.rating.map(ratingObj =>
                    Object.fromEntries(Object.entries(ratingObj).filter(([key, value]) => value !== 0))
                )
            }))
            ?.filter(employee => employee.review_count > 0 || Object.keys(employee.rating[0] || {}).length > 0);
    };


    const bgColors = ["grey", "#fffa65", "lightgreen", "orange", "#F2D2BD"];
    const starRatings = ['star_1', 'star_2', 'star_3', 'star_4', 'star_5'];

    // REMOVING 0 VALUES FROM API
    const cleanedResponseData = useMemo(() => cleanResponseData(fetchedData?.responseData), [fetchedData]);

    // COOKING DATA FOR CHART START
    const datasets = useMemo(() => starRatings.map((star, index) => ({
        label: `${index + 1} Star`,
        data: cleanedResponseData?.map(employee => employee.rating[0][star]),  // Use 0 if no data
        backgroundColor: bgColors[index]
    })), [cleanedResponseData, starRatings, bgColors]);

    const labels = useMemo(() => cleanedResponseData?.map(employee => employee.employee), [cleanedResponseData]);

    const data = useMemo(() => ({
        labels,
        datasets
    }), [labels, datasets]);
    // COOKING DATA FOR CHART END

    return (
        <div style={{ width: '100%', height: '500px', paddingTop: '20px' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default RatingsHorizontalBarChart;
