const PaginationCell = ({ page, setPage, pageId = 1 } = {}) => {
  const turnPage = e => {
    setPage(e.target.textContent);
  };

  return (
    <td
      className={ pageId === Number(page) ? 'page-button current-page' : 'page-button' }
      {...( pageId === page  ? {} : { onClick: turnPage })}
      key={ pageId }
    >{ pageId }</td>
  );
};

export default PaginationCell;