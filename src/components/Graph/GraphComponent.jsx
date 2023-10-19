import { useEffect, useState } from 'react';

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import Styles from './GraphComponent.module.css';

export const GraphComponent = ({ theme, tormenta = 'Tormenta 1' }) => {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() =>
                    // faker.datatype.number({ min: -1000, max: 1000 })
                    Math.floor(Math.random() * 1000)
                ),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() =>
                    // faker.datatype.number({ min: -1000, max: 1000 })
                    Math.floor(Math.random() * 1000)
                ),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y',
            },
        ],
    });

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: true,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: `Precipitacion de ${tormenta}`,
                font: {
                    size: 20,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: () => {
                        if (theme === 'light') {
                            return 'rgba(0, 0, 0, 0.1)';
                        } else {
                            return 'rgba(255, 255, 255, 0.1)';
                        }
                    },
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    color: () => {
                        if (theme === 'light') {
                            return 'rgba(0, 0, 0, 0.1)';
                        } else {
                            return 'rgba(255, 255, 255, 0.1)';
                        }
                    },
                },
            },

        },
    };



    useEffect(() => {
        setData({
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map(() =>
                        // faker.datatype.number({ min: -1000, max: 1000 })
                        Math.floor(Math.random() * 1000)
                    ),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    yAxisID: 'y',
                },
                {
                    label: 'Dataset 2',
                    data: labels.map(() =>
                        // faker.datatype.number({ min: -1000, max: 1000 })
                        Math.floor(Math.random() * 1000)
                    ),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    yAxisID: 'y',
                },
            ],
        });

    }, [tormenta]);


return (
    <div className={Styles.graph__container}>
        <Line data={data} options={options} />
    </div>
);
};
