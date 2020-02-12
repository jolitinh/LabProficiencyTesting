import React from 'react';
import { connect } from 'redux-bundler-react';
import { formatDistanceToNow } from 'date-fns';
import ConfirmActionButton from '../lib/ConfirmActionButton';
import FilterTable from '../lib/FilterTable';

const LabParticipantsTable = ({
  labsList,
  whoRegionsData,
  doDeleteLab,
  whoNetworkLabCategoriesData,
}) => {
  const labFields = [
    {
      name: 'Lab',
      field: 'laboratoryName',
    },
    {
      name: 'Location',
      field: 'address',
      func: item => item.address1 || item.address,
    },
    {
      name: 'WHO Region',
      field: 'WHORegionId',
      func: item => whoRegionsData && whoRegionsData[item.WHORegionId].name,
    },
    {
      name: 'WHO Network',
      field: 'WHONetworkLabCategoryId',
      func: item =>
        whoNetworkLabCategoriesData &&
        whoNetworkLabCategoriesData[item.WHONetworkLabCategoryId].name,
    },
    {
      name: 'Last Updated',
      field: 'updatedAt',
      func: item => formatDistanceToNow(new Date(item.updatedAt)),
    },
    // {
    //   name: 'Kit Status',
    //   field: null,
    // },
    // {
    //   name: 'Test Result',
    //   field: null,
    // },
    {
      name: 'Action',
      field: null,
      func: item => (
        <div className="edit/delete">
          <a title="Edit Lab" href={`/labs/edit/${item.id}`} className="btn btn-link p-0 mr-3">
            <span className="edit fe fe-edit text-primary mr-0" />
          </a>
          <ConfirmActionButton
            action={() => doDeleteLab(item.id)}
            className="btn btn-link p-0"
            confirmText="Delete"
            confirmButtonClass="btn btn-danger"
            modalTitle="Confirm delete"
            bodyText={`Are you sure you want to delete ${item.laboratoryName}?`}
            icon="trash"
          />
        </div>
      ),
    },
  ];

  return (
    <FilterTable
      itemList={labsList}
      fieldList={labFields}
      useSearch
      actionList={
        <a href="/labs/new" className="btn btn-md btn-primary">
          Create New Lab
        </a>
      }
    />
  );
};

export default connect(
  'selectLabsList',
  'selectWhoRegionsData',
  'doDeleteLab',
  'selectWhoNetworkLabCategoriesData',
  LabParticipantsTable,
);
