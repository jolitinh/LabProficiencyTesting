/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useCallback, useEffect } from 'react';
import { Field, Formik, Form } from 'formik';
import { connect } from 'redux-bundler-react';
import Col from '../../lib/Col';
import Row from '../../lib/Row';
import StudiesSchema from '../../form-schemas/studiesSchema';
import TextArea from '../../lib/TextArea';

import StudyNameField from './StudyNameField';
import StudyYearField from './StudyYearField';
import StartDateField from './StartDateField';

import EndDateField from './EndDateField';
import PanelManufactureDateField from './PanelManufactureDateField';

const buildSubmitPayload = values => {
  const newValues = { ...values };

  if (!values.endDate) {
    delete newValues.endDate;
  } else {
    newValues.endDate = newValues.endDate && new Date(newValues.endDate);
  }

  if (!values.panelManufactureDate) {
    delete newValues.panelManufactureDate;
  } else {
    newValues.panelManufactureDate = new Date(newValues.panelManufactureDate);
  }

  return {
    ...newValues,
    year: parseInt(newValues.year, 10),
    startDate: new Date(newValues.startDate),
  };
};

const StudyDetailForm = ({ currentStudy, doUpdateStudyDetails, routeParams, doUpdateUrl }) => {
  const [testAvailables, setTestsAvailables] = useState([]);

  const initialValues = {
    name: currentStudy ? currentStudy.name : '',
    year: currentStudy ? currentStudy.year : '',
    startDate: currentStudy ? new Date(currentStudy.startDate) : '',
    endDate: currentStudy && currentStudy.endDate ? new Date(currentStudy.endDate) : '',
    panelManufactureDate:
      currentStudy && currentStudy.panelManufactureDate
        ? new Date(currentStudy.panelManufactureDate)
        : '',
    notes: (currentStudy && currentStudy.notes) || '',
  };

  const retrieveTests = useCallback(() => {
    if (currentStudy) {
      const { Tests } = currentStudy || [];
      setTestsAvailables(Tests);
    }
  }, [currentStudy]);

  useEffect(() => {
    retrieveTests();
  }, [retrieveTests]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={values => {
        const errors = {};

        if (values.endDate) {
          if (new Date(values.endDate) <= new Date(values.startDate)) {
            errors.endDate = 'The End Date should not be lower or equal than Start Date';
          }
        }

        return errors;
      }}
      validationSchema={StudiesSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const payload = buildSubmitPayload(values);
          await doUpdateStudyDetails(routeParams.id, payload);
          doUpdateUrl('/studies');
        } catch (err) {
          console.log('error here');
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting, dirty }) => (
        <Form>
          <div className="card">
            <div className="card-body">
              <div className="form-row mb-3">
                <Col col={12} sm={12} md={12} lg={6} xl={6}>
                  <Row>
                    <label htmlFor="name" className="col-12 col-xl-3 col-form-label">
                      Name
                    </label>
                    <Col col={12} xl={9}>
                      <Field name="name" component={StudyNameField} />
                    </Col>
                  </Row>
                </Col>
                <Col col={12} sm={12} md={12} lg={6} xl={6}>
                  <Row>
                    <label htmlFor="year" className="col-12 col-xl-3 col-form-label">
                      Year
                    </label>
                    <Col col={12} xl={9}>
                      <Field name="year" component={StudyYearField} />
                    </Col>
                  </Row>
                </Col>
              </div>

              <div className="form-row mb-3">
                <Col col={12} sm={12} md={12} lg={6} xl={6}>
                  <Row>
                    <label htmlFor="startDate" className="col-12 col-xl-3 col-form-label">
                      Start Date
                    </label>
                    <Col col={12} xl={9}>
                      <Field name="startDate" component={StartDateField} value={values.startDate} />
                    </Col>
                  </Row>
                </Col>
                <Col col={12} sm={12} md={12} lg={6} xl={6}>
                  <Row>
                    <label htmlFor="endDateInput" className="col-12 col-xl-3 col-form-label">
                      End Date
                    </label>

                    <Col col={12} xl={9}>
                      <Field name="endDate" component={EndDateField} value={values.endDate} />
                    </Col>
                  </Row>
                </Col>
              </div>
            </div>
          </div>
          <hr />
          <div className="form-row mb-3">
            <Col col={12} sm={12} md={12} lg={6} xl={6}>
              <div className="card">
                <div className="card-header">
                  <h6 className="header-pretitle">Tests</h6>
                </div>
                <div className="card-body">
                  <Row className="align-items-center">
                    {testAvailables &&
                      !!testAvailables.length &&
                      testAvailables.map(test => (
                        <Col
                          key={`Col - ${test.id}-${test.name}`}
                          col={12}
                          sm={12}
                          md={12}
                          lg={6}
                          xl={6}
                        >
                          <Row className="justify-content-center">
                            <Col col={12} sm={12} md={12} lg={6} xl={6}>
                              <p className="card-text">
                                <span className="badge badge-soft-secondary">{test.name} Test</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            </Col>

            <Col sm={12} md={12} lg={6} xl={6} col={12} className="lol">
              <div className="card">
                <div className="card-header">
                  <h6 className="header-pretitle">Panel Information</h6>
                </div>
                <div className="card-body">
                  <Row>
                    <label
                      htmlFor="panelManufactureDate"
                      className="col-12 col-xl-4 col-form-label"
                    >
                      Manufacture Date
                    </label>
                    <Col col={12} xl={8}>
                      <Field
                        name="panelManufactureDate"
                        component={PanelManufactureDateField}
                        value={values.panelManufactureDate}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </div>
          <hr />
          <div className="form-row mb-3">
            <Field name="notes" placeholder="Notes" classNameParent="col-12" component={TextArea} />
          </div>

          <Col sm={12} lg={12} xl={12} className="text-right">
            <button
              type="submit"
              disabled={isSubmitting || !dirty || Object.keys(errors).length}
              className="btn btn-primary mr-2 mt-4"
            >
              Update
            </button>
            <a href="/studies" className="btn btn-outline-danger mt-4">
              Cancel
            </a>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default connect(
  'selectCurrentStudy',
  'doUpdateStudyDetails',
  'selectRouteParams',
  'doUpdateUrl',
  StudyDetailForm,
);
