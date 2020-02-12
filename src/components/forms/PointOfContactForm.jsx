/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'redux-bundler-react';
import { Field, Form, Formik } from 'formik';
import PocSchema from '../form-schemas/pocSchema';

/**
 * @type {React.Component}
 * @param {Function} action Action to call on submit
 * @param {actionText} actionText
 * @param {Function} cancelAction Action to cancel
 * @param {boolean}  edit Let us know the mode of the form
 * @param {boolean}  isVerify
 * @param {object}   poc The poc information to edit // needed to show prepulated values
 * @param {number}   pocId  The id of the POC to edit //unused
 *
 */
const PointOfContactForm = ({ action, actionText, cancelAction, edit, isVerify, poc }) => {
  let formValues = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    title: '',
  };

  if (poc && edit) {
    formValues = poc;
  }

  const submitForm = (values, { setSubmitting }) => {
    const pocID = poc && poc.id ? poc.id : null;
    action(values, pocID, edit);
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={PocSchema}
        onSubmit={submitForm}
      >
        {({ values, errors, isSubmitting, touched, dirty }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="pocFirstName">First Name</label>
              <Field
                id="pocFirstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                className={
                  errors.firstName && touched.firstName ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.firstName && touched.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="pocLastName">Last Name</label>
              <Field
                type="text"
                name="lastName"
                id="pocLastName"
                placeholder="Last Name"
                className={
                  errors.lastName && touched.lastName ? 'form-control is-invalid' : 'form-control'
                }
              />
              {errors.lastName && touched.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            {edit && (
              <div className="form-group">
                <label htmlFor="pocPhoneCountryCode">Phone Country Code</label>
                <Field
                  type="text"
                  name="countryCode"
                  id="pocPhoneCountryCode"
                  placeholder="Country Code"
                  value={values.countryCode || ''}
                  className={errors.countryCode ? 'form-control is-invalid' : 'form-control'}
                />
                {errors.countryCode && <div className="invalid-feedback">{errors.countryCode}</div>}
              </div>
            )}

            {edit && (
              <div className="form-group">
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
            )}
            <div className="form-group">
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

            {edit && (
              <div className="form-group">
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
            )}

            <div>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={isVerify ? isSubmitting : isSubmitting || !dirty}
              >
                {isSubmitting ? 'Submiting...' : actionText || 'Save'}
              </button>
              <button type="button" className="btn btn-link text-danger" onClick={cancelAction}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default connect(
  'selectPoc',
  PointOfContactForm,
);
