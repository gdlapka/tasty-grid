const headerClick = (key, sortFilterParams, setSortFilterParams) => {
  const { sortConfig, filters } = sortFilterParams;
  const { field, isAscending } = sortConfig;

  if (!field || field !== key) {
    setSortFilterParams({
      sortConfig: {
        field: key,
        isAscending: true,
      },
      filters: [...filters],
    });
  } else {
    setSortFilterParams({
      sortConfig: {
        field,
        isAscending: !isAscending,
      },
      filters: [...filters],
    });
  }
};

const getHeaderWithSort = (header, sortConfig) => {
  const { field, isAscending } = sortConfig;

  if (header !== field) {
    return '';
  }

  return isAscending ? ' ▲' : ' ▼'
};

const GridHeader = ({ headers, sortFilterParams, setSortFilterParams }) => {
  const { sortConfig } = sortFilterParams;

  return (
    <tr>
      { Object.keys(headers).map(header => (
        <th
          key={ header }
          onClick={ () => headerClick(header, sortFilterParams, setSortFilterParams) }
        >{ headers[header] + getHeaderWithSort(header, sortConfig) }</th>
      )) }
    </tr>
  );
};

export default GridHeader;