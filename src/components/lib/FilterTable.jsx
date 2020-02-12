/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';

import SearchInput from './SearchInput';

/**
 * Reusable component to
 * If checklist/search are disabled, then those elements won't be displayed
 *
 * @param {Array}   itemList - Array of objects to be used
 * @param {Array}   fieldSetup - Fields to display in the table as object: {name, field, [func]}
 * @param {Array}   [headerFilters] - Optional header-level filter buttons as object: {name, filterVal}
 * @param {Array}   [actionList] - Bulk Actions to be performed on selected IDs as object: {name, action(ids)}
 * @param {boolean} [useChecklist] - enable/disable checklist/action functionality
 * @param {boolean} [useSearch] - enable/disable searchbar
 * @param {string}  bulkActionSelectProperty - the property name to grab from the filtered list. This will be added to the selected item array
 */

const FilterTable = ({
  extraColumn,
  itemList,
  selectedItemIds,
  updateSelectedItems,
  fieldList,
  headerFilters,
  actionList,
  useChecklist,
  useSingleActions,
  useSearch,
  bulkActionSelectProperty = 'id',
}) => {
  const [searchKey, updateSearchKey] = useState('');
  const [headerFilter, changeHeaderFilter] = useState(null);
  const [[sortBy, sortDir], changeSortBy] = useState([null, -1]);
  const currentActions = Array.isArray(actionList)
    ? actionList.filter(
        ({ assignFilters }) => assignFilters === undefined || assignFilters.includes(headerFilter),
      )
    : actionList;

  const currentList = itemList
    .filter(item => {
      const itemVals = Object.values(item);
      const keyLower = searchKey.toLowerCase();

      const areHeaderEquals = headerFilter && headerFilter.every(h => h !== item[headerFilter[0]]);

      if (areHeaderEquals) {
        return false;
      }

      for (let i = 0; i < itemVals.length; i += 1) {
        if (`${itemVals[i]}`.toLowerCase().includes(keyLower)) return true;
      }
      return false;
    })
    .sort((a, b) => {
      if (!sortBy) return null;
      const aValue =
        (a[sortBy] && `${a[sortBy]}`.toLowerCase()) ||
        (Array.isArray(sortBy) && `${sortBy.map(ref => a[ref])}`.toLowerCase()) ||
        '';
      const bValue =
        (b[sortBy] && `${b[sortBy]}`.toLowerCase()) ||
        (Array.isArray(sortBy) && `${sortBy.map(ref => b[ref])}`.toLowerCase()) ||
        '';
      if (aValue < bValue) return -1 * sortDir;
      if (aValue > bValue) return 1 * sortDir;
      return null;
    });

  return (
    <>
      {headerFilters && (
        <div className="header mt-0">
          <div className="header-body mt-0 pt-0">
            <div className="row align-items-center">
              <div className="col">
                <ul className="nav nav-tabs nav-overflow header-tabs">
                  {headerFilters.map(({ name, filterVal }) => (
                    <li className="nav-item" key={`filters-${name}`}>
                      <button
                        type="button"
                        onClick={() => {
                          changeHeaderFilter(filterVal);
                        }}
                        className={`nav-link bg-transparent ${
                          headerFilter === filterVal ? 'active' : ''
                        }`}
                      >
                        {name}
                        {/* <span className="badge badge-pill badge-soft-secondary">?</span> */}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card">
        {useSearch && (
          <div className="card-header">
            <div className="row align-items-center">
              <SearchInput type="search" handleChange={updateSearchKey} placeholder="Search" />
              <div className="col-auto">
                {Array.isArray(currentActions) && currentActions.length > 1 && (
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-white"
                      type="button"
                      id="bulkActionDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Bulk actions
                      <span className="fe fe-list-order text-muted mr-0 ml-2">&nbsp;</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="bulkActionDropdown"
                    >
                      {currentActions.map(({ name, action }) => (
                        <div
                          role="button"
                          tabIndex="0"
                          key={`${name}-action`}
                          className="dropdown-item"
                          onClick={() => {
                            action(selectedItemIds);
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              action(selectedItemIds);
                            }
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </button>
                  </div>
                )}
                {Array.isArray(currentActions) && currentActions.length === 1 && (
                  <button
                    type="button"
                    tabIndex="0"
                    key={`${currentActions[0].name}-action`}
                    className="btn btn-md btn-primary"
                    onClick={() => currentActions[0].action(selectedItemIds)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        currentActions[0].action(selectedItemIds);
                      }
                    }}
                    disabled={selectedItemIds.length === 0}
                  >
                    {currentActions[0].name}
                  </button>
                )}
                {currentActions && !Array.isArray(currentActions) && <div>{currentActions}</div>}
              </div>
            </div>
          </div>
        )}
        <div className="table-responsive mb-0">
          <table className="table table-sm table-nowrap card-table">
            <thead>
              <tr>
                {useChecklist && headerFilter && (
                  <th>
                    <div className="custom-control custom-checkbox table-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        name="itemsSelect"
                        id="itemsSelectAll"
                        checked={
                          currentList.length &&
                          currentList
                            .map(item => item[bulkActionSelectProperty])
                            .every(id => selectedItemIds.includes(id))
                        }
                        onChange={e => {
                          const currentIds = currentList.map(
                            item => item[bulkActionSelectProperty],
                          );
                          const newList = e.target.checked
                            ? [
                                ...new Set(
                                  selectedItemIds.concat(
                                    currentList.map(item => item[bulkActionSelectProperty]),
                                  ),
                                ),
                              ]
                            : selectedItemIds.filter(id => !currentIds.includes(id));
                          updateSelectedItems(newList);
                        }}
                      />
                      <label className="custom-control-label" htmlFor="itemsSelectAll">
                        &nbsp;
                      </label>
                    </div>
                  </th>
                )}
                {fieldList.map(({ name, field }) => (
                  <th key={`item-${field || name}-heading`}>
                    {field && (
                      <button
                        type="button"
                        onClick={() => changeSortBy([field, -1 * sortDir])}
                        className={`btn btn-sm text-muted sort ${sortDir === 1 ? 'asc' : 'desc'}`}
                        data-sort=""
                      >
                        {name}
                      </button>
                    )}
                    {!field && (
                      <button type="button" disabled className="btn btn-sm text-muted">
                        {name}
                      </button>
                    )}
                  </th>
                ))}
                {useSingleActions && !headerFilter && (
                  <th>
                    <button
                      type="button"
                      onClick={() => changeSortBy(['actions', -1 * sortDir])}
                      className={`btn btn-sm text-muted sort ${sortDir === 1 ? 'asc' : 'desc'}`}
                      data-sort=""
                    >
                      Actions
                    </button>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="list">
              {currentList &&
                currentList.map(item => (
                  <tr key={`item-${item.id}-check`}>
                    {useChecklist && headerFilter && (
                      <td>
                        <div className="custom-control custom-checkbox table-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedItemIds.includes(item[bulkActionSelectProperty])}
                            className="custom-control-input"
                            name="itemsSelect"
                            id={`itemsSelect-${item.id}`}
                            onChange={e => {
                              const newList = e.target.checked
                                ? selectedItemIds.concat(item[bulkActionSelectProperty])
                                : selectedItemIds.filter(
                                    id => id !== item[bulkActionSelectProperty],
                                  );
                              updateSelectedItems(newList);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`itemsSelect-${item.id}`}
                          >
                            &nbsp;
                          </label>
                        </div>
                      </td>
                    )}
                    {fieldList.map(({ field, func }, id) => {
                      if (func) {
                        return (
                          <td key={`item-${item.id}-${field || id}`} className="">
                            {func(item)}
                          </td>
                        );
                      }
                      return (
                        <td key={`item-${item.id}-${field || id}`} className="">
                          {item[field]}
                        </td>
                      );
                    })}
                    {useSingleActions && !headerFilter && (
                      <td key="custon column" className="text-center">
                        {extraColumn.func(item)}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FilterTable;
