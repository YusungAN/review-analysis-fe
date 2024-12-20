import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            // min: 0,
            // max: 1
        },
    },
};

const WordTopicChart = ({frequency, x, label}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData({
            labels: x,
            datasets: [
                {
                    label: label,
                    data: frequency,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                },
            ],
        });
    }, [frequency, x]);

    return <>{!data ? <div>Loading...</div> : <Line options={options} data={data} />}</>;
};

export default WordTopicChart;
