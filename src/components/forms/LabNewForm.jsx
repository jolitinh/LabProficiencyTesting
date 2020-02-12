import React from 'react';
import { connect } from 'redux-bundler-react';
import LabForm from './LabForm';

const LabNewForm = ({ doCreateLab }) => (
  <div className="card">
    <div className="card-header">
      <div className="row align-items-center">
        <div className="col">
          <h4 className="card-header-title">Enter Your Information</h4>
        </div>
      </div>
    </div>
    <div className="card-body">
      <LabForm action={doCreateLab} />
    </div>
  </div>
);

export default connect(
  'doCreateLab',
  LabNewForm,
);
