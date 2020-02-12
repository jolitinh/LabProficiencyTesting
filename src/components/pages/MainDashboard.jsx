import React from 'react';

import Card from '../lib/Card';
import LabParticipantsTable from '../views/LabParticipantsTable';

const MainDashboard = () => (
  <>
    <div className="row">
      <Card title="Total Users" amount="24" iconClass="fe-user" />
      <Card title="Tests Passed" amount="23" iconClass="fe-check" />
      <Card title="Tests Pending" amount="55" iconClass="fe-clock" />
      <Card title="Tests Failed" amount="34" iconClass="fe-alert-circle" />
    </div>
    <LabParticipantsTable />
  </>
);

export default MainDashboard;
