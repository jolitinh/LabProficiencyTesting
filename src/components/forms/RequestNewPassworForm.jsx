/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'redux-bundler-react';
import { PocResetPasswordSchema } from '../form-schemas/pocSchema';
import Text from '../lib/Text';
import newLogo from '../../assets/img/rotaeqa_hightres_logo.png';

const RequestNewPasswordForm = ({
  doRequestNewPassword,
  passwordResetData,
  passwordResetErrorMessage,
}) => (
  // <div className="container">
  <div className="center-login">
    <div className="row justify-content-center">
      <div className="col-12 col-md-5 col-xl-4 my-5">
        <div className="col-xl-12 mb-3 pb-2">
          <img src={newLogo} className="img-fluid" alt="RotaEQA 2019 Logo" />
        </div>
        <h1 className="display-4 text-center mb-3">Password Reset</h1>
        <p className="text-muted text-center mb-5">
          Enter your email to get a password reset link.
        </p>
        {passwordResetData && (
          <div className="alert alert-success" role="alert">
            {passwordResetData}
          </div>
        )}
        {passwordResetErrorMessage && (
          <div className="alert alert-danger" role="alert">
            {passwordResetErrorMessage}
          </div>
        )}
        <Formik
          enableReinitialize
          initialValues={{ email: '' }}
          validationSchema={PocResetPasswordSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              await doRequestNewPassword(values);
              resetForm();
            } catch (err) {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <Field
                name="email"
                type="email"
                disabled={isSubmitting}
                classNameParent="form-group"
                placeholder="Email Address"
                textPlaceHolder="user@user.com"
                component={Text}
              />

              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary mb-3"
                disabled={!dirty || isSubmitting}
              >
                Reset Password
              </button>

              <div className="text-center">
                <small className="text-muted text-center">
                  Remember your password? <a href="/login">Log in</a>.
                </small>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

export default connect(
  'selectPasswordResetLoading',
  'selectPasswordResetData',
  'selectPasswordResetErrorMessage',
  RequestNewPasswordForm,
);
