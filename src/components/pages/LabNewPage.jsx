import React from 'react';
import { connect } from 'redux-bundler-react';
import LabNewForm from '../forms/LabNewForm';

const LabNewPage = () => (
  <div>
    <LabNewForm />
  </div>
);

export default connect('doCreateLab', LabNewPage);
