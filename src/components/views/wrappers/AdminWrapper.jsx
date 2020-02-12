import React from 'react';

import Header from '../Header';
import Navigation from '../Navigation';

const AdminWrapper = ({ title, nav, children }) => (
  <>
    <Navigation mainNav={nav} />
    <div className="main-content">
      <Header title={title} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-12">{children}</div>
        </div>
      </div>
    </div>
  </>
);

export default AdminWrapper;
