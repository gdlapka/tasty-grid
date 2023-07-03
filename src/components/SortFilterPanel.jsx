import { isEmpty } from 'lodash';
import DeleteItemButton from './buttons/DeleteItemButton';

const ITEM_SORT = null;

const eraseClick = (item, sortFilterParams, setSortFilterParams) => {
  const { sortConfig, filters } = sortFilterParams;
  if (item === ITEM_SORT) {
    setSortFilterParams({
      sortConfig: {
        field: undefined,
        isAscending: true,
      },
      filters: [...filters],
    });
  }
};

const SortFilterPanel = ({ sortFilterParams, setSortFilterParams, headersConfig }) => {
  const { sortConfig, filters } = sortFilterParams;

  return (
    <>
      { (!!sortConfig.field || !isEmpty(filters)) && (
        <div className="tasty-grid-sort-filter-panel">
          { !!sortConfig.field && (
            <div>
              { 'Сортировка: ' }
              <i>{ `${headersConfig[sortConfig.field]} ` }</i>
              <DeleteItemButton onClick={ () => (eraseClick(ITEM_SORT, sortFilterParams, setSortFilterParams)) }/>
            </div>
          ) }
          { filters.map((item, key) => (<div key={ key }>
            { 'Фильтр ' }
          </div>)) }
        </div>
      ) }
    </>
  );
};

export default SortFilterPanel;