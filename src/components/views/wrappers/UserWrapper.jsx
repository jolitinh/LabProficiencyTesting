import React from 'react';
import Header from '../Header';
import Navigation from '../Navigation';

const UserWrapper = ({ title, nav, children }) => (
  <>
    <Navigation mainNav={nav} horizontalAlign />
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

export default UserWrapper;
