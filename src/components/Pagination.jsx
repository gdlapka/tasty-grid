import { useEffect, useState } from 'react';
import { floor, ceil } from 'lodash';
import PaginationCell from './PaginationCell';

const getPages = (page, setPage, maxPage, limit) => {
  const intPage = Number(page);
  const pages = [];
  const delta = floor(( limit - 1 ) / 2);
  let start = intPage - delta < 1 ? 1 : intPage - delta;
  const finish = start + limit - 1 > maxPage ? maxPage : start + limit - 1;
  start = finish - limit + 1 < 1 ? start : finish - limit + 1;

  for (let i = start; i <= finish; i++) {
    pages.push(<PaginationCell
      page={ intPage }
      {...({ setPage })}
      key={ i }
      pageId={ i }
    />);
  }

  return pages;
};

const Pagination = ({
  dataCount = 0,
  page,
  setPage,
  perPage,
  paginationLimit = 9,
}) => {
  const [maxPage, setMaxPage] = useState(1);

  // Расчет диапазона пагинации
  useEffect(() => {
    if (dataCount !== 0) {
      setMaxPage(ceil((dataCount - 1) / perPage));
    }
  }, [dataCount, page, perPage]);

  return (
    <table>
      <tbody>
        <tr>
          { getPages(page, setPage, maxPage, paginationLimit) }
        </tr>
      </tbody>
    </table>
  );
};

export default Pagination;