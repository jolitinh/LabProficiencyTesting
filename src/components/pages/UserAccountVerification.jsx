import React, { useEffect, useCallback } from 'react';
import { connect } from 'redux-bundler-react';
import newLogo from '../../assets/img/rotaeqa_hightres_logo.png';

import PocInfoVerification from './PocInfoVerification';

const UserAccountVerification = ({
  queryObject,
  authLoading,
  isValidUser,
  authenticationData,
  userVerificationError,
  doFetchUserVerification,
}) => {
  const { token } = queryObject;

  const verifyUserAccount = useCallback(async () => {
    try {
      await doFetchUserVerification(token);
    } catch (error) {
      console.log(error);
    }
  }, [doFetchUserVerification, token]);

  useEffect(() => {
    verifyUserAccount(token);
  }, [verifyUserAccount, token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center">
          <img
            src={newLogo}
            className="img-fluid mb-2 mt-4"
            style={{
              height: 'auto',
              width: '320px',
            }}
            alt="RotaEQA 2019 Logo"
          />
        </div>
        <div className="col-lg-12 m-3 text-center">
          <h1 className="display-4 text-center mb-3">Account Verification</h1>
          <p className="text-muted mb-5">
            Please verify your information in order to have access to the Proficiency Testing App.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 m-3">
          {authLoading && (
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {userVerificationError && <div>{userVerificationError}</div>}
          {isValidUser && authenticationData && token && (
            <PocInfoVerification
              pointOfContact={authenticationData.poc}
              verificationToken={token}
              laboratory={authenticationData.lab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(
  'selectQueryObject',
  'selectAuthLoading',
  'selectIsValidUser',
  'selectAuthenticationData',
  'selectUserVerificationError',
  'doFetchUserVerification',
  'doUpdateUrl',
  UserAccountVerification,
);
