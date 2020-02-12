import React, { useCallback, useEffect } from 'react';
import { connect } from 'redux-bundler-react';
import NewPasswordForm from '../forms/NewPasswordForm';

const NewPassword = ({
  queryObject,
  doFetchValidUserForReset,
  passwordResetErrorMessage,
  passwordResetValidUser,
  doSetNewPassword,
  doUpdateUrl,
}) => {
  const { token } = queryObject;
  const verifyUserAccount = useCallback(async () => {
    try {
      await doFetchValidUserForReset(token);
    } catch (error) {
      // IF error on user reset link (invalid user/invalid token, invalid link)
      // Send the user to the request reset password view again
      doUpdateUrl('/users/new-password-request');
    }
  }, [doFetchValidUserForReset, token, doUpdateUrl]);

  useEffect(() => {
    verifyUserAccount(token);
  }, [verifyUserAccount, token]);
  return (
    <>
      {passwordResetValidUser && token && (
        <NewPasswordForm verificationToken={token} setNewPassword={doSetNewPassword} />
      )}
    </>
  );
};

export default connect(
  'selectQueryObject',
  'doFetchValidUserForReset',
  'selectPasswordResetErrorMessage',
  'selectPasswordResetValidUser',
  'doSetNewPassword',
  'doUpdateUrl',
  NewPassword,
);
