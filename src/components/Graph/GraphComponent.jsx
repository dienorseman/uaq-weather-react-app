import { useEffect, useState } from 'react';

import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryScatter,
    VictoryTooltip,
    VictoryAxis,
    VictoryZoomContainer,
    Log,
} from 'victory';

import Styles from './GraphComponent.module.css';

export const GraphComponent = ({ theme, dataSheet }) => {
    const [labels, setLabels] = useState([]);

    const [dataSet1, setDataSet1] = useState([]);

    const [dataSet2, setDataSet2] = useState([]);

    const intersections = () => {
        const intersections = [];

        for (let i = 0; i < dataSet1.length - 1; i++) {

            dataSet1[i] = parseFloat(dataSet1[i]);
            dataSet1[i + 1] = parseFloat(dataSet1[i + 1]);
            dataSet2[i] = parseFloat(dataSet2[i]);
            dataSet2[i + 1] = parseFloat(dataSet2[i + 1]);
            const slope1 = dataSet1[i + 1] - dataSet1[i];
            const b1 = dataSet1[i] - slope1 * i;

            const slope2 = dataSet2[i + 1] - dataSet2[i];
            const b2 = dataSet2[i] - slope2 * i;

            let x = (b2 - b1) / (slope1 - slope2);
            let y = slope1 * x + b1;
            // console.log(`y = ${slope1}x + ${b1}`, `y = ${slope2}x + ${b2}`);

            if (slope1 !== slope2) {
                if (x >= i && x <= i + 1) {
                    x = Math.round(x * 100) / 100;
                    y = Math.round(y * 100) / 100;
                    intersections.push({ x, y });
                }
            }
        }
        return intersections;
    };

    useEffect(() => {
        const data = async () => {
            try {
                const response = await fetch(dataSheet);

                const data = await response.text();

                // log Humidity column

                const timeLabel = data
                    .split('\n')
                    .slice(1)
                    .map((row) => row.split(',')[9]);

                const tmpDataSet1 = data
                    .split('\n')
                    .slice(1)
                    .map((row) => row.split(',')[5]);

                const tmpDataSet2 = data
                    .split('\n')
                    .slice(1)
                    .map( row => parseFloat(row.split(',')[22]));


                setLabels(timeLabel);
                setDataSet1(tmpDataSet1);
                setDataSet2(tmpDataSet2);
            } catch (error) {
                console.log(error);
            }
        };
        data();
    }, [dataSheet]);

    return (
        <div className={Styles.graph__container}>
            <VictoryChart
                theme={VictoryTheme.material}
                width={880}
                height={320}
                containerComponent={
                    <VictoryZoomContainer
                        zoomDimension={'x'}
                        zoomDomain={{
                            x: [0, 15],
                            y: [0, 100],
                        }}
                    />
                }
            >
                <VictoryAxis
                    // change name to time and put it on the bottom
                    label="Time"
                    style={{
                        axis: {
                            stroke: () => (theme === 'light' ? '#000' : '#fff'),
                        },
                        grid: {
                            stroke: () =>
                                theme === 'light' ? '#242424' : '#fff',
                        },
                        tickLabels: {
                            fill: () => (theme === 'light' ? '#000' : '#fff'),
                        },
                    }}
                    tickValues={labels.map((_) => {
                        return typeof _ === 'string' ? _.slice(0, 5) : _;
                    })}
                />

                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: {
                            stroke: () => (theme === 'light' ? '#000' : '#fff'),
                        },
                        grid: {
                            stroke: () =>
                                theme === 'light' ? '#242424' : '#fff',
                        },
                        tickLabels: {
                            fill: () => (theme === 'light' ? '#000' : '#fff'),
                        },
                    }}

                />

                <VictoryLine
                    style={{
                        data: { stroke: '#c43a31' },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={dataSet1.map((y, x) => ({ x, y }))}
                />
                <VictoryLine
                    style={{
                        data: { stroke: '#4fac3e' },
                        parent: { border: '1px solid #ccc' },
                    }}
                    data={dataSet2.map((y, x) => ({ x, y }))}
                />
                <VictoryScatter
                    style={{
                        data: {
                            fill: () => (theme === 'light' ? '#000' : '#fff'),
                        },
                        parent: { border: '1px solid #ccc' },
                    }}
                    labels={({ datum }) => `(${datum.x}, ${datum.y})`}
                    labelComponent={<VictoryTooltip />}
                    size={5}
                    data={intersections()}
                    events={[
                        // on mouse hover
                        {
                            target: 'data',
                            eventHandlers: {
                                onMouseOver: () => {
                                    return [
                                        {
                                            target: 'labels',
                                            mutation: () => ({
                                                active: true,
                                            }),
                                        },
                                    ];
                                },
                                onMouseOut: () => {
                                    return [
                                        {
                                            target: 'labels',
                                            mutation: () => ({
                                                active: false,
                                            }),
                                        },
                                    ];
                                },
                            },
                        },
                    ]}
                />
            </VictoryChart>
        </div>
    );
};
