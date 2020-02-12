import React from 'react';
import { connect } from 'redux-bundler-react';
import RequestNewPasswordForm from '../forms/RequestNewPassworForm';

const PasswordReset = ({ doRequestNewPassword }) => {
  return <RequestNewPasswordForm doRequestNewPassword={doRequestNewPassword} />;
};

export default connect('doRequestNewPassword', PasswordReset);

// export default PasswordReset;
