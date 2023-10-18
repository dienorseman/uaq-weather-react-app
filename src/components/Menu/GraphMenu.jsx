
import Styles from './GraphMenu.module.css';

export const GraphMenu = ({ tormentas = [], tormentaActual, setTormenta }) => {

    return (
        <div className={Styles.menu__container}>
            <label htmlFor="">Selecciona una tormenta</label>
            <select
                className={Styles.menu__select}
                value={tormentaActual}
                onChange={(e) => setTormenta(e.target.value)}
            >
                {tormentas
                    ? tormentas.map((tormenta, index) => {
                          return (
                              <option
                                  key={index}
                                  value={tormenta}
                              >
                                  {tormenta}
                              </option>
                          );
                      })
                    : null}
            </select>
        </div>
    );
};
