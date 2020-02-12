import React, { useState } from 'react';
import { connect } from 'redux-bundler-react';
import LabForm from '../forms/LabForm';
import LabInformation from '../views/LabInformation';
import PointsOfContactTable from '../views/PointsOfContactTable';

const LabEditPage = ({ currentLab, doUpdateLabDetails }) => {
  const [isEditMode, setEditMode] = useState(false);

  function renderContent() {
    return isEditMode ? (
      <LabForm
        action={doUpdateLabDetails}
        id={currentLab.id}
        edit
        initialValues={currentLab}
        setViewMode={setEditMode}
      />
    ) : (
      <LabInformation {...currentLab} />
    );
  }

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="card-header-title">
                {isEditMode ? 'Edit Laboratory Information' : 'Laboratory Information'}
                {currentLab && currentLab.isVerified && (
                  <span className="badge badge-soft-success ml-2">Information Verified</span>
                )}
                {currentLab && !currentLab.isVerified && (
                  <span className="badge badge-warning ml-2">Pending verification</span>
                )}
              </h4>
            </div>
            {!isEditMode && (
              <React.Fragment>
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="btn btn-xl btn-primary"
                  aria-haspopup="true"
                >
                  <span>Edit</span>
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="card-body">{currentLab && renderContent()}</div>
      </div>
      <PointsOfContactTable />
    </React.Fragment>
  );
};
export default connect('selectCurrentLab', 'doUpdateLabDetails', LabEditPage);
