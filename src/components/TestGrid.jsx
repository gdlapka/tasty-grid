import { useEffect, useState } from 'react';
import axios from 'axios';
import GridLine from './GridLine';
import Pagination from './Pagination';
import { numberFilter } from '../functions/filters';

const defaultPerPage = 10;

const getIndexRange = (data, page, perPage) => {
  const last = data.length === 0 ? 0 : data.length - 1;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return [start, end > last ? last : end];
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

  const perPageChanged = e => {
    setPerPageInput(e.target.value);
    const value = Number(e.target.value);

    if (!isNaN(value) && !!value !== false) {
      setPerPage(value);
    }
  }

  const dataRange = getIndexRange(testData, page, perPage);

  return (
    <div className="main-container">
      {dataRange[1] - dataRange[0] === 0
        ? <p>Ничего не найдено</p>
        : (
          <>
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