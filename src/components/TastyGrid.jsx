import { useEffect, useState } from 'react';
import GridLine from './GridLine';
import Pagination from './Pagination';
import { numberFilter } from '../functions/filters';
import { isEmpty } from 'lodash';
import GridHeader from './GridHeader';
import SortFilterPanel from './SortFilterPanel';

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

  return [start, start + perPage > last ? last : start + perPage];
};

const getHeaders = data => {
  if (isEmpty(data)) {
    return {};
  }

  const headers = Object.keys(data[0]);
  const result = { ...data[0] };

  headers.forEach(header => {
    result[header] = header;
  });

  return result;
};

const sortFilterConfig = {
  sortConfig: {
    field: undefined,
    isAscending: true,
  },
  filters: [],
};

const TastyGrid = ({ data = [], keyField = 'id', headersConfig = {}} = {}) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [perPageInput, setPerPageInput] = useState(defaultPerPage);
  const [headers, setHeaders] = useState(headersConfig);
  const [sortFilterParams, setSortFilterParams] = useState(sortFilterConfig);

  useEffect(() => {
    if (isEmpty(headers)) {
      setHeaders(getHeaders(data));
    }

    const lastItem = data.length;
    const pageStart = getPageStart(page, perPage);

    if (pageStart > lastItem) {
      setPage(1);
    }
  }, [data]);

  const perPageChanged = e => {
    setPerPageInput(e.target.value);
    const value = Number(e.target.value);

    if (!isNaN(value) && !!value !== false) {
      setPerPage(value);
    }
  }

  const dataRange = getIndexRange(data, page, setPage, perPage);

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
                  className="tasty-grid-per-page"
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
                  <b>{ ` ${data.length}` }</b>
                </i>
              </div>
            </div>
            <SortFilterPanel { ...{ sortFilterParams, setSortFilterParams, headersConfig }} />
            <table className="tasty-grid">
              <tbody>
                <GridHeader {...{ headers, sortFilterParams, setSortFilterParams }}/>
                { data.slice(...dataRange).map(
                  line => (<GridLine key={ line[keyField] } lineData={ line } { ...{ headers } } />)
                ) }
              </tbody>
            </table>
            <Pagination
              dataCount={ data.length }
              {...{ page, setPage, perPage }}
            />
          </>
        )
      }
    </div>
  );
};

export default TastyGrid;