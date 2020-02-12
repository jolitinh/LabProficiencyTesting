import React from 'react';
import { connect } from 'redux-bundler-react';
import ptestingLogo from '../../assets/img/rotaeqa_hightres_logo.png';

const LeftNav = ({ mainNav, doUserLogOut }) => {
  return (
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="/">
          <img src={ptestingLogo} className="navbar-brand-img mx-auto" alt="..." />
        </a>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            {mainNav.map(navItem => (
              <li key={navItem.label} className="nav-item">
                <a className="nav-link" href={navItem.url}>
                  <i className={`fe fe-${navItem.icon || 'file'}`} />
                  {navItem.label}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={() => doUserLogOut()}>
                <i className="fe fe-log-out" /> Logout
              </a>{' '}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HorizontalNav = ({ mainNav, doUserLogOut }) => {
  return (
    <nav className="navbar navbar-expand-xl navbar-light mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className="ml-3" src={ptestingLogo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {mainNav.map(navItem => (
              <li key={navItem.label} className="nav-item">
                <a className="nav-link text-uppercase" href={navItem.url}>
                  {navItem.label}
                </a>
              </li>
            ))}

            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger btn-sm text-uppercase m-2"
                onClick={() => doUserLogOut()}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Let's open the nav bar choosing its alignment based on the second parameter. By default the nav renders vertically
const Navigation = ({ mainNav, horizontalAlign, doUserLogOut }) => {
  return !horizontalAlign ? (
    <LeftNav mainNav={mainNav} doUserLogOut={doUserLogOut} />
  ) : (
    <HorizontalNav mainNav={mainNav} doUserLogOut={doUserLogOut} />
  );
};
export default connect('doUserLogOut', Navigation);
