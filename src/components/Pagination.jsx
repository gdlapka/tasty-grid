import { useEffect, useState } from 'react';
import { ceil } from 'lodash';

const getPages = (currentPage, maxPage, turnPage) => {
  const pages = [];

  for (let i = 1; i <= maxPage; i++) {
    pages.push(<td
      className={ i === Number(currentPage) ? 'page-button current-page' : 'page-button'}
      {...( i === currentPage  ? {} : { onClick: turnPage })}
      key={ i }
    >{ i }</td>);
  }

  return pages;
};

const Pagination = ({
  dataCount = 0,
  page,
  setPage,
  perPage,
}) => {
  const [maxPage, setMaxPage] = useState(1);

  // Расчет диапазона пагинации
  useEffect(() => {
    if (dataCount !== 0) {
      setMaxPage(ceil(dataCount / perPage));
    }
  }, [dataCount, page, perPage]);

  const turnPage = e => {
    setPage(e.target.textContent);
  };

  return (
    <table>
      <tbody>
        <tr>
          { getPages(page, maxPage, turnPage) }
        </tr>
      </tbody>
    </table>
  );
};

export default Pagination;