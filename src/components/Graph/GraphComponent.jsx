import { useEffect, useState } from 'react';

import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryScatter,
} from 'victory';

import Styles from './GraphComponent.module.css';

export const GraphComponent = ({ theme, tormenta = 'Tormenta 1' }) => {

    // const labels = []

    // append 1000 labels rand between 0 and 100
    // for (let i = 0; i < 20  ; i++) {
    //     labels.push(Math.floor(Math.random() * 100) + 1);
    // }
    
    // const dataSet1 = labels.map( () => Math.floor(Math.random() * 10) + 1);
    // const dataSet2 = labels.map( () => Math.floor(Math.random() * 10) + 1);

    // use above as useStates

    const [labels, setLabels] = useState([]);

    const [dataSet1, setDataSet1] = useState([]);

    const [dataSet2, setDataSet2] = useState([]);


    const intersections = () => {
        const intersections = [];

        for (let i = 0; i < dataSet1.length - 1; i++) {
            const slope1 = dataSet1[i + 1] - dataSet1[i];
            const b1 = dataSet1[i] - slope1 * i;

            const slope2 = dataSet2[i + 1] - dataSet2[i];
            const b2 = dataSet2[i] - slope2 * i;

            let x = (b2 - b1) / (slope1 - slope2);
            let y = slope1 * x + b1;
            // console.log(`y = ${slope1}x + ${b1}`, `y = ${slope2}x + ${b2}`);

            if (slope1 !== slope2) {
                // Asegurarse de que no son líneas paralelas
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
        const tmpLabels = [];
        for (let i = 0; i < 20; i++) {
            tmpLabels.push(Math.floor(Math.random() * 100) + 1);
        }
        setLabels(tmpLabels);
        const tmpDataSet1 = tmpLabels.map(
            () => Math.floor(Math.random() * 10) + 1
        );
        setDataSet1(tmpDataSet1);
        const tmpDataSet2 = tmpLabels.map(
            () => Math.floor(Math.random() * 10) + 1
        );
        setDataSet2(tmpDataSet2);
    }, [tormenta]);

    return (
        <div className={Styles.graph__container}>
            <VictoryChart theme={VictoryTheme.material} width={1600} height={600}>
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
