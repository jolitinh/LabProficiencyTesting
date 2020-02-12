import React from 'react';
import { connect } from 'redux-bundler-react';
import { getNavHelper } from 'internal-nav-helper';
import Toasts from './views/Toasts';

const Layout = ({ alertsList, route, navLinks, layoutWrapper, userAuthorized, doUpdateUrl }) => {
  const Page = route.component;
  const Wrapper = layoutWrapper;

  return (
    <main onClick={getNavHelper(doUpdateUrl)}>
      <>
        {userAuthorized && (
          <Wrapper title={route.title} nav={navLinks}>
            <Page />
          </Wrapper>
        )}
        {!userAuthorized && (
          <Wrapper title="Not Authorized" nav={navLinks}>
            <div>You are not authorized to access this page!</div>
          </Wrapper>
        )}
        <Toasts toastList={alertsList} />
      </>
    </main>
  );
};

export default connect(
  'selectRoute',
  'selectNavLinks',
  'selectAlertsList',
  'selectLayoutWrapper',
  'selectUserRole',
  'selectUserAuthorized',
  'doUpdateUrl',
  Layout,
);
