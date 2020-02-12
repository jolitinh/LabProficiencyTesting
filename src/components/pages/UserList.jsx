/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'redux-bundler-react';
import { statusActionsTypes, submitActionTypes } from '../../utils';

import useModal from '../hooks/useModal';
import useActionFieldForTable from '../hooks/useActionFieldForTable';

import Modal from '../lib/Modal';
import AccessStatus from '../lib/AccessStatus';
import FilterTable from '../lib/FilterTable';

const bulkActionConfigurations = [
  {
    name: 'Invite Users',
    filterName: 'New Users',
    headerModal: 'Are you sure you want to add these users?',
    submitActionType: submitActionTypes.INVITE_USERS,
  },
  {
    name: 'Cancel Invitations',
    filterName: 'Invitation Status',
    headerModal: 'Are you sure you want to cancel the invitation for these users?',
    submitActionType: submitActionTypes.CANCEL_INVITATION_USERS,
  },
  {
    name: 'Deactivate Users',
    filterName: 'Active Users',
    headerModal: 'Are you sure you want to deactivate these users?',
    submitActionType: submitActionTypes.DEACTIVATE_USERS,
  },
  {
    name: 'Activate Users',
    filterName: 'Inactive Users',
    headerModal: 'Are you sure you want to activate these users?',
    submitActionType: submitActionTypes.ACTIVATE_USERS,
  },
];

const filterHeaderNames = {
  ALL: 'All',
  NEW_USERS: 'New Users',
  INVITATION_STATUS: 'Invitation Status',
  ACTIVE_USERS: 'Active Users',
  INNACTIVE_USERS: 'Inactive Users',
};

const filterItems = [
  { name: filterHeaderNames.ALL, filterVal: null },
  { name: filterHeaderNames.NEW_USERS, filterVal: ['AccessStatusId', 1] },
  { name: filterHeaderNames.INVITATION_STATUS, filterVal: ['AccessStatusId', 2, 3] },
  { name: filterHeaderNames.ACTIVE_USERS, filterVal: ['AccessStatusId', 4] },
  { name: filterHeaderNames.INNACTIVE_USERS, filterVal: ['AccessStatusId', 5] },
];

const actionMapping = {
  1: [{ text: 'Invite', type: statusActionsTypes.REGISTRATION_INVITATION }],
  2: [
    { text: 'Cancel Invitation', type: statusActionsTypes.REGISTRATION_INVITATION_CANCEL },
    { text: 'Resend Invitation', type: statusActionsTypes.REGISTRATION_INVITATION },
  ],
  3: [
    { text: 'Cancel Invitation', type: statusActionsTypes.REGISTRATION_INVITATION_CANCEL },
    { text: 'Resend Invitation', type: statusActionsTypes.REGISTRATION_INVITATION },
  ],
  4: [{ text: 'Revoke Access', type: statusActionsTypes.REVOKE_ACCESS }],
  5: [{ text: 'Restore Access', type: statusActionsTypes.RESTORE_ACCESS }],
};

const PocList = ({
  labsData,
  pocsList,
  hasAllPocs,
  accessStatusData,
  pocsFetchError,
  doActionToUsersStatusAccess,
}) => {
  const { showing, toggleVisibility, setModalTitle, title } = useModal();
  const [confirmAction, updateConfirmAction] = useState(null);
  const [selectedItemIds, updateSelectedItems] = useState([]);
  const [submitActionType, updateSubmitActionType] = useState(null);
  const [submitActionPayload, updateSubmitActionPayload] = useState(null);

  const [actionsField] = useActionFieldForTable(
    'Actions',
    'Actions',
    actionMapping,
    doActionToUsersStatusAccess,
    'UserId',
    'AccessStatusId',
  );

  const setBulkActions = () => {
    return bulkActionConfigurations.map(actionConf => {
      return {
        name: actionConf.name,
        assignFilters: filterItems
          .filter(item => item.name === actionConf.filterName)
          .map(item => item.filterVal),
        action: ids => {
          updateConfirmAction(
            <>
              <h3>{actionConf.headerModal}</h3>
              <table className="table table-sm table-nowrap card-table">
                <tbody>
                  {pocsList
                    .filter(poc => ids.includes(poc.UserId))
                    .map(poc => (
                      <tr key={poc.id}>
                        <td>{poc.email}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>,
          );
          updateSubmitActionType(actionConf.submitActionType);
          updateSubmitActionPayload(ids);
          setModalTitle('Confirm Action');
          toggleVisibility();
        },
      };
    });
  };

  const submitAction = () => {
    switch (submitActionType) {
      case submitActionTypes.INVITE_USERS:
        doActionToUsersStatusAccess(
          submitActionPayload,
          statusActionsTypes.REGISTRATION_INVITATION,
        );
        break;
      case submitActionTypes.CANCEL_INVITATION_USERS:
        doActionToUsersStatusAccess(
          submitActionPayload,
          statusActionsTypes.REGISTRATION_INVITATION_CANCEL,
        );
        break;
      case submitActionTypes.DEACTIVATE_USERS:
        doActionToUsersStatusAccess(submitActionPayload, statusActionsTypes.REVOKE_ACCESS);
        break;
      case submitActionTypes.ACTIVATE_USERS:
        doActionToUsersStatusAccess(submitActionPayload, statusActionsTypes.RESTORE_ACCESS);
        break;
      default:
        break;
    }
    // Submit cleanup stuff
    toggleVisibility();
    updateSelectedItems([]);
    updateSubmitActionPayload(null);
    updateSubmitActionType(null);
  };

  const bulkActions = setBulkActions();

  const pocFields = [
    {
      name: 'Name',
      field: ['firstName', 'lastName'],
      func: item => `${item.firstName} ${item.lastName}`,
    },
    {
      name: 'Lab',
      field: 'LabParticipantId',
      func: item => labsData[item.LabParticipantId].laboratoryName,
    },
    { name: 'E-Mail', field: 'email' },
    { name: 'Title', field: 'title' },
    {
      name: 'Access Status',
      field: 'AccessStatusId',
      func: item => (
        <>
          {accessStatusData && (
            <AccessStatus
              pocStatus={item.AccessStatusId}
              status={accessStatusData[item.AccessStatusId]}
            />
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {pocsList && labsData && hasAllPocs && (
        <>
          <FilterTable
            itemList={pocsList}
            selectedItemIds={selectedItemIds}
            updateSelectedItems={updateSelectedItems}
            fieldList={pocFields}
            headerFilters={filterItems}
            actionList={bulkActions}
            useChecklist
            extraColumn={actionsField}
            useSingleActions
            useSearch
            bulkActionSelectProperty="UserId"
          />
          <Modal.Vertical showing={showing} hide={toggleVisibility} title={title}>
            {confirmAction}
            <hr />
            <div className="text-right">
              <button type="button" className="btn btn-primary mr-2" onClick={submitAction}>
                Submit
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={toggleVisibility}>
                Cancel
              </button>
            </div>
          </Modal.Vertical>
        </>
      )}
      {!pocsFetchError && (!pocsList || !labsData || !hasAllPocs) && <div>Loading...</div>}

      {pocsFetchError && <p>Error fetching POCs</p>}
    </>
  );
};

export default connect(
  'selectLabsData',
  'selectPocsList',
  'selectHasAllPocs',
  'selectAccessStatusData',
  'selectPocsFetchError',
  'doActionToUsersStatusAccess',
  PocList,
);
