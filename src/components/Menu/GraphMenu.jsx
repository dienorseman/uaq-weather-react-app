
import Styles from './GraphMenu.module.css';

export const GraphMenu = ({ dataSheets = [], currentData, setData }) => {

    return (
        <div className={Styles.menu__container}>
            <label htmlFor="">Selecciona un data set</label>
            <select
                className={Styles.menu__select}
                value={currentData}
                onChange={(e) => setData(e.target.value)}
            >
                {dataSheets
                    ? dataSheets.map((data, index) => {
                          return (
                              <option
                                  key={index}
                                  value={data}
                              >
                                  {data}
                              </option>
                          );
                      })
                    : null}
            </select>
        </div>
    );
};
