import { useEffect, useState } from 'react';
import { ceil } from 'lodash';
import PaginationCell from './PaginationCell';

const getPages = (page, setPage, maxPage, delta) => {
  const intPage = Number(page);
  const pages = [];
  const start = intPage - delta < 1 ? 1 : intPage - delta ;
  const finish = intPage + delta > maxPage ? maxPage : intPage + delta;

  for (let i = start; i <= finish; i++) {
    pages.push(<PaginationCell
      {...({ page, setPage })}
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
  paginationDelta = 4,
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
          { getPages(page, setPage, maxPage, paginationDelta) }
        </tr>
      </tbody>
    </table>
  );
};

export default Pagination;