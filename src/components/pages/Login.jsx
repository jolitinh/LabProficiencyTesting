/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'redux-bundler-react';
import { Formik, Form, Field } from 'formik';
import Text from '../lib/Text';
import { LoginSchema } from '../form-schemas/pocSchema';
import newLogo from '../../assets/img/rotaeqa_hightres_logo.png';

const Login = ({
  userVerificationError,
  userLoginError,
  doCleanLoginError,
  doCleanVerifyError,
  doUserLogin,
  doUpdateUrl,
}) => {
  return (
    <div className="center-login">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-4">
          <div className="col-xl-12 mb-3 pb-2">
            <img src={newLogo} className="img-fluid" alt="RotaEQA 2019 Logo" />
          </div>
          <h1 className="display-4 text-center mb-3">Log In</h1>
          <p className="text-muted text-center mb-5">Access to Proficiency Testing App</p>

          {userLoginError && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {userLoginError}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => doCleanLoginError()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
          {userVerificationError && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {userVerificationError}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => doCleanVerifyError()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
          <Formik
            enableReinitialize
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await doUserLogin(values);
                doUpdateUrl('/');
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

                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="userPassword">Password</label>
                    </div>
                    <div className="col-auto">
                      <a
                        href="/users/new-password-request"
                        className="form-text small text-muted"
                        tabIndex="-1"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div className="input-group input-group-merge">
                    <Field
                      name="password"
                      type="password"
                      disabled={isSubmitting}
                      classNameParent="input-group input-group-merge"
                      textPlaceHolder="write your password"
                      component={Text}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-block btn-primary mb-3"
                  disabled={!dirty || isSubmitting}
                >
                  Sign in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default connect(
  'selectUserVerificationError',
  'selectUserLoginError',
  'doCleanLoginError',
  'doCleanVerifyError',
  'doUserLogin',
  'doUpdateUrl',
  Login,
);
