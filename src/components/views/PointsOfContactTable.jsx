/* eslint-disable no-console */
import React from 'react';
import { connect } from 'redux-bundler-react';

import useModal from '../hooks/useModal';
import Modal from '../lib/Modal';
import PointOfContactForm from '../forms/PointOfContactForm';
import ConfirmActionButton from '../lib/ConfirmActionButton';
import AccessStatus from '../lib/AccessStatus';

/**
 * @type {React.Component}
 * @param {Object} routeParams             Param in url (redux selector)
 * @param {Object} currentLabPocs          List of POC for a Lab (redux selector)
 * @param {string} error                   Error message from fetch (redux selector)
 * @param {boolean} loading                Loading flag (redux selector)
 * @param {Array} accessStatusData         List of status (redux selector)
 * @param {string} pocCreateError          Error on POC create (redux selector)
 * @param {string} pocUpdateError          Error on POC update (redux selector)
 * @param {Function} doSetLabPocPrimary    Action Creator to set a POC as primary
 * @param {Function} doFetchPocDetails     Action creator to fetch data for a given POC
 * @param {Function} doDeleteLabPoc        Action Creator to delete a POC
 * @param {Function} doCreateLabPoc        Action Creator to create a new POC
 * @param {Function} doUpdateLabPocDetails Action Creator to update POC information
 * @param {Function} doCleanCreatePocError Action Creator that cleans error Message on POC create
 * @param {Function} doCleanUpdatePocError Action Creator to clean any error Message on POC update
 */
const PointsOfContactTable = ({
  routeParams,
  currentLabPocs,
  error,
  loading,
  accessStatusData,
  pocCreateErrorMessage,
  pocUpdateErrorMessage,
  doSetLabPocPrimary,
  doFetchPocDetails,
  doDeleteLabPoc,
  doCreateLabPoc,
  doUpdateLabPocDetails,
  doCleanCreatePocError,
  doCleanUpdatePocError,
}) => {
  let pocId;
  const { showing, toggleVisibility, edit, setModalMode, setModalTitle, title } = useModal();
  const EDIT_MODE = true;
  const createErrorMessage = pocCreateErrorMessage || null;
  const updateErrorMessage = pocUpdateErrorMessage || null;
  const modalErrorMessage = createErrorMessage || updateErrorMessage;

  /**
   * We need to set the method and call the modal
   * @param {boolean} mode The title of the modal
   * @param {string|number} pocID The id of the poc on edit mode only
   */
  const callModal = (mode, pocID) => {
    doCleanCreatePocError();
    doCleanUpdatePocError();
    if (mode) {
      doFetchPocDetails(routeParams.labId, pocID);
      setModalTitle('Edit a point of contact');
      pocId = pocID;
    } else {
      setModalTitle('Create a new point of Contact');
    }
    setModalMode(mode);
    toggleVisibility();
  };

  const onHideModal = () => {
    toggleVisibility();
  };

  /**
   * Method on submit the POC form
   * @param {boolean} editMode
   * @param {number|string} pocID
   * @param {Object} pocValues
   */
  const pocModalSubmitAction = async (pocValues, pocID, editMode) => {
    const { labId } = routeParams;
    const createValues = { ...pocValues };
    delete createValues.countryCode;

    try {
      if (!editMode) {
        await doCreateLabPoc(labId, createValues);
      } else {
        await doUpdateLabPocDetails(pocID, labId, pocValues);
      }

      onHideModal();
    } catch (err) {
      console.log('error on actions', err);
    }
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="card-header-title">Points of contact</h4>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={() => {
                  callModal();
                }}
                data-toggle="modal"
                data-target="modalElement"
              >
                Add POC
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive mb-0">
          <table className="table table-sm table-nowrap card-table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <div className="text-muted">Primary Contact?</div>
                </th>
                <th>
                  <div className="text-muted">First Name</div>
                </th>
                <th>
                  <div className="text-muted">Last Name</div>
                </th>
                <th>
                  <div className="text-muted">Title</div>
                </th>
                <th>
                  <div className="text-muted">Access Status</div>
                </th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="list">
              {/* Render the error */}
              {error && (
                <tr>
                  <td className="text-danger">{error}</td>
                </tr>
              )}
              {/* Render the list of pocs */}
              {currentLabPocs &&
                currentLabPocs.map((poc, index) => (
                  <tr key={`poc-${poc.firstName}-${poc.id}`}>
                    <td>{index + 1}</td>
                    <td>
                      {poc.primaryPOC ? (
                        <button type="button" className="btn btn-xs btn-link p-0">
                          <span
                            className="h2 mb-0 fe fe-star text-warning"
                            style={{ lineHeight: 1.1 }}
                          />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-xs btn-link p-0"
                          onClick={() => {
                            doSetLabPocPrimary(poc.id, routeParams.labId);
                          }}
                        >
                          <span
                            className="h2 mb-0 fe fe-star text-primary"
                            style={{ lineHeight: 1.1 }}
                          />
                        </button>
                      )}
                    </td>
                    <td>{poc.firstName}</td>
                    <td>{poc.lastName}</td>
                    <td>{poc.title}</td>
                    <td>
                      {accessStatusData && poc.AccessStatusId && (
                        <AccessStatus
                          pocStatus={poc.AccessStatusId}
                          status={accessStatusData[poc.AccessStatusId]}
                        />
                      )}
                    </td>
                    <td className="text-center">
                      <div className="edit/delete">
                        <button
                          type="button"
                          className="btn btn-link p-0 mr-3"
                          onClick={() => {
                            callModal(EDIT_MODE, poc.id);
                          }}
                        >
                          <span className="edit fe fe-edit text-primary" />
                        </button>
                        {poc.primaryPOC && (
                          <ConfirmActionButton
                            className="btn btn-link p-0"
                            confirmText="Ok"
                            confirmButtonClass="btn btn-secondary"
                            modalTitle="Primary POC cannot be deleted"
                            disabled={false}
                            bodyText={`Before you delete ${poc.firstName} ${poc.lastName}, make sure to designate another primary point of contact.`}
                            icon="trash"
                          />
                        )}
                        {!poc.primaryPOC && (
                          <ConfirmActionButton
                            action={() => doDeleteLabPoc(poc.id, routeParams.labId)}
                            className="btn btn-link p-0"
                            confirmText="Delete"
                            confirmButtonClass="btn btn-danger"
                            modalTitle="Confirm delete"
                            bodyText={`Are you sure you want to delete ${poc.firstName} ${poc.lastName}? Access will be revoked for this point of contact.`}
                            icon="trash"
                            disabled={poc.primaryPOC}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              {/* Render the loading status */}
              {loading && (
                <tr>
                  <td className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal.Centered
        showing={showing}
        hide={toggleVisibility}
        title={title}
        error={modalErrorMessage}
      >
        <PointOfContactForm
          edit={edit}
          pocId={pocId}
          action={pocModalSubmitAction}
          cancelAction={onHideModal}
        />
      </Modal.Centered>
    </React.Fragment>
  );
};

export default connect(
  'selectRouteParams',
  'selectCurrentLabPocs',
  'selectPocsFetchError',
  'selectIsLoadingPocs',
  'selectAccessStatusData',
  'selectPocCreateErrorMessage',
  'selectPocUpdateErrorMessage',
  'doSetLabPocPrimary',
  'doFetchPocDetails',
  'doDeleteLabPoc',
  'doCreateLabPoc',
  'doUpdateLabPocDetails',
  'doCleanCreatePocError',
  'doCleanUpdatePocError',
  PointsOfContactTable,
);
