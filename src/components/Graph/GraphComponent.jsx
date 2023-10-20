import { useEffect, useState } from 'react';

import {
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryScatter,
} from 'victory';

import Styles from './GraphComponent.module.css';

export const GraphComponent = ({ theme, tormenta = 'Tormenta 1' }) => {
    const dataSet1 = [2, 9, 3, 5, 2, 3, 1];
    const dataSet2 = [1, 2, 3, 4, 5, 6, 7];

    const intersections = () => {
        const intersections = [];

        for (let i = 0; i < dataSet1.length - 1; i++) {
            const slope1 = dataSet1[i + 1] - dataSet1[i];
            const b1 = dataSet1[i] - slope1 * i;

            const slope2 = dataSet2[i + 1] - dataSet2[i];
            const b2 = dataSet2[i] - slope2 * i;

            const x = (b2 - b1) / (slope1 - slope2);
            const y = slope1 * x + b1;
            // console.log(`y = ${slope1}x + ${b1}`, `y = ${slope2}x + ${b2}`);

            if (slope1 !== slope2) {
                // Asegurarse de que no son líneas paralelas
                if (x >= i && x <= i + 1) {
                    intersections.push({ x, y });
                }
            }
        }

        return intersections;
    };

    return (
        <div className={Styles.graph__container}>
            <VictoryChart theme={VictoryTheme.material}>
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

                />
            </VictoryChart>
        </div>
    );
};
