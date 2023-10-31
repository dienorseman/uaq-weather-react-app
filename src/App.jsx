import { useEffect, useState } from 'react';

import { GraphMenu } from './components/Menu/GraphMenu';
import { GraphComponent } from './components/Graph/GraphComponent';

// import data from './data/Candiles-24_25-junio-2013.csv';

import Styles from './App.module.css';

export const App = () => {
    const [theme, setTheme] = useState('light');

    const [dataSheets, setDataSheets] = useState([]);

    const [currentDataSheet, setCurrentDataSheet] = useState(dataSheets[0]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--primary',
            theme === 'dark' ? '#242424' : '#f5f5f5'
        );
        document.documentElement.style.setProperty(
            '--secondary',
            theme === 'dark' ? '#f5f5f5' : '#242424'
        );
    }, [theme]);



    return (
        <div className={Styles.app__container}>
            <GraphMenu
                currentData={currentDataSheet}
                setData={setCurrentDataSheet}
                dataSheets={dataSheets}
            />
            <GraphComponent theme={theme} dataSheet={'./data/Candiles-24_25-junio-2013.csv'} />
            <div
                className={
                    theme === 'light'
                        ? Styles.theme__button__container
                        : Styles.theme__button__container__dark
                }
            >
                <button
                    className={
                        theme === 'light'
                            ? Styles.theme__button
                            : Styles.theme__button__dark
                    }
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                ></button>
            </div>
        </div>
    );
};
