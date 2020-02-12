import React from 'react';

const Header = ({ title }) => (
  <div className="header">
    <div className="container-fluid">
      <div className="header-body">
        <div className="row align-items-end">
          <div className="col">
            <h5 className="header-pretitle">Rotavirus 2019</h5>
            <h1 className="header-title">{title}</h1>
          </div>
          <div className="col-auto" />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
