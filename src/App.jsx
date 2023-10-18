import { useEffect, useState } from 'react';
import Styles from './App.module.css';
import { GraphMenu } from './components/Menu/GraphMenu';
import { GraphComponent } from './components/Graph/GraphComponent';

export const App = () => {
    const [theme, setTheme] = useState('light');

    const tormentas = ['Tormenta 1', 'Tormenta 2', 'Tormenta 3'];

    const [tormenta, setTormenta] = useState(tormentas[0]);

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
            <GraphMenu tormentas={tormentas} setTormenta={setTormenta} tormentaActual={tormenta}  />
            <GraphComponent theme={theme} tormenta={tormenta} />
            <div
                className={ theme === 'light' ? Styles.theme__button__container : Styles.theme__button__container__dark}
            >
                <button
                    // switch to index.css root variable
                    className={ theme === 'light' ? Styles.theme__button : Styles.theme__button__dark }
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                </button>
            </div>
        </div>
    );
};
