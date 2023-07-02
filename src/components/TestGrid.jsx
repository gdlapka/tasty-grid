import { useEffect, useState } from 'react';
import axios from 'axios';
import GridLine from './GridLine';
import Pagination from './Pagination';
import { numberFilter } from '../functions/filters';

const defaultPerPage = 10;

const getPageStart = (page, perPage) => {
  return (page - 1) * perPage;
};

const getIndexRange = (data, page, setPage, perPage) => {
  const last = data.length;
  let start = getPageStart(page, perPage);

  if (start > last) {
    start = 0;
    setPage(1);
  }

  return [start, start + perPage];
};

const TestGrid = () => {
  const [testData, setTestData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [perPageInput, setPerPageInput] = useState(defaultPerPage);

  useEffect(() => {
    (async () => {
      const { data } = await axios('https://jsonplaceholder.typicode.com/comments');
      setTestData(data);
    })();
  }, []);

  useEffect(() => {
    const lastItem = testData.length;
    const pageStart = getPageStart(page, perPage);

    if (pageStart > lastItem) {
      setPage(1);
    }
  }, [testData]);

  const perPageChanged = e => {
    setPerPageInput(e.target.value);
    const value = Number(e.target.value);

    if (!isNaN(value) && !!value !== false) {
      setPerPage(value);
    }
  }

  const dataRange = getIndexRange(testData, page, setPage, perPage);

  return (
    <div className="main-container">
      {dataRange[1] - dataRange[0] === 0
        ? <p>Ничего не найдено</p>
        : (
          <>
            <div className="tasty-grid-results-control-panel">
              <div>
              <span>
                Результатов на странице:
                <input
                  className="grid-per-page"
                  type="text"
                  size="1"
                  maxLength="3"
                  value={ perPageInput }
                  onBeforeInput={ numberFilter }
                  onChange={ perPageChanged }
                />
              </span>
              </div>
              <div className="tasty-grid-output-results-info">
                <i>
                  Вывод
                  <b>{ ` ${dataRange[0] + 1}-${dataRange[1]} ` }</b>
                  из
                  <b>{ ` ${testData.length}` }</b>
                </i>
              </div>
            </div>
            <table className="grid">
              <tbody>
              { testData.slice(...dataRange).map((line) => {
                return (
                  <GridLine key={ line.id } lineData={ line }/>
                );
              }) }
              </tbody>
            </table>
            <Pagination
              dataCount={ testData.length }
              {...({ page, setPage, perPage })}
            />
          </>
        )
      }
    </div>
  );
};

export default TestGrid;