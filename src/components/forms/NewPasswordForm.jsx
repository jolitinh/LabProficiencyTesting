import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'redux-bundler-react';
import { PocNewPasswordSchema } from '../form-schemas/pocSchema';
import Text from '../lib/Text';
import newLogo from '../../assets/img/rotaeqa_hightres_logo.png';

const NewPasswordForm = ({
  verificationToken,
  setNewPassword,
  passwordResetData,
  passwordResetError,
}) => {
  return (
    <div className="center-login">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 col-xl-4 my-5">
          <div className="col-xl-12 mb-3 pb-2">
            <img src={newLogo} className="img-fluid" alt="RotaEQA 2019 Logo" />
          </div>
          <h1 className="display-4 text-center mb-3">Password Reset</h1>
          <p className="text-muted text-center mb-5">Enter your new password</p>
          {passwordResetData && (
            <div className="alert alert-success" role="alert">
              {passwordResetData}, click{' '}
              <a href="/login" className="alert-link">
                {' '}
                here{' '}
              </a>{' '}
              to login.
            </div>
          )}
          {passwordResetError && (
            <div className="alert alert-success" role="alert">
              {passwordResetError}, click{' '}
              <a href="/users/new-password-request" className="alert-link">
                {' '}
                here{' '}
              </a>{' '}
              to request a new password chance.
            </div>
          )}
          <Formik
            enableReinitialize
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={PocNewPasswordSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                const { password } = values;
                await setNewPassword({ password }, verificationToken);
                resetForm();
              } catch (err) {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, dirty }) => {
              return !passwordResetData ? (
                <Form>
                  <Field
                    name="password"
                    type="password"
                    disabled={isSubmitting}
                    classNameParent="form-group"
                    placeholder="Write your password"
                    component={Text}
                  />
                  <Field
                    name="confirmPassword"
                    type="password"
                    disabled={isSubmitting}
                    classNameParent="form-group"
                    placeholder="Please write again your password"
                    component={Text}
                  />

                  <button
                    type="submit"
                    className="btn btn-lg btn-block btn-primary mb-3"
                    disabled={!dirty || isSubmitting}
                  >
                    Reset Password
                  </button>
                </Form>
              ) : null;
            }}
          </Formik>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default connect(
  'selectPasswordResetData',
  'selectPasswordResetError',
  NewPasswordForm,
);
