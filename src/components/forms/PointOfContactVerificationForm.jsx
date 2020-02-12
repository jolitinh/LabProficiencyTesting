/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { PocConfirmationSchema } from '../form-schemas/pocSchema';

const PocConfirmationForm = ({ poc, action }) => {
  const passwordFields = { password: '', confirmPassword: '' };
  const initialPocValues = { ...poc, ...passwordFields };

  const submitForm = (values, { setSubmitting }) => {
    const PocFormValues = { ...values };
    if (PocFormValues.confirmPassword) {
      delete PocFormValues.confirmPassword;
    }
    action(PocFormValues);
    setSubmitting(false);
  };

  return (
    poc && (
      <React.Fragment>
        <Formik
          enableReinitialize
          initialValues={initialPocValues}
          validationSchema={PocConfirmationSchema}
          onSubmit={submitForm}
        >
          {({ values, errors, isSubmitting, touched, handleReset, isValid }) => (
            <Form>
              <div className="form-row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocFirstName">First Name</label>
                  <Field
                    id="pocFirstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={
                      errors.firstName && touched.firstName
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocLastName">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="pocLastName"
                    placeholder="Last Name"
                    className={
                      errors.lastName && touched.lastName
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocEmail">Email</label>
                  <Field
                    type="text"
                    name="email"
                    id="pocEmail"
                    placeholder="Email"
                    className={
                      errors.email && touched.email ? 'form-control is-invalid' : 'form-control'
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocPhoneCountryCode">Phone Country Code</label>
                  <Field
                    type="text"
                    value={values.countryCode || ''}
                    name="countryCode"
                    id="pocPhoneCountryCode"
                    placeholder="Country Code"
                    className={errors.countryCode ? 'form-control is-invalid' : 'form-control'}
                  />
                  {errors.countryCode && (
                    <div className="invalid-feedback">{errors.countryCode}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocPhone">Phone #</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="pocPhone"
                    placeholder="Phone #"
                    className={
                      errors.phoneNumber && touched.phoneNumber
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="col-sm-12 col-lg-6 mb-3">
                  <label htmlFor="pocTitle">Title</label>
                  <Field
                    type="text"
                    name="title"
                    id="pocTitle"
                    placeholder="Title"
                    className={
                      errors.title && touched.title ? 'form-control is-invalid' : 'form-control'
                    }
                  />
                  {errors.title && touched.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="col-sm-12 col-lg-6 mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="pocPassword">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      id="pocPassword"
                      placeholder="Set password account"
                      className={
                        errors.password && touched.password
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <label htmlFor="pocConfirmPassword">Confirm Password:</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="pocConfirmPassword"
                    placeholder="Confirm the password"
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary mr-2"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? 'Submiting...' : 'Update & verify'}
                </button>
                <button
                  type="button"
                  className="btn btn-link text-danger"
                  onClick={() => {
                    handleReset();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    )
  );
};

export default PocConfirmationForm;
