/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'redux-bundler-react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { searchIdFromOptions } from '../../utils';
import EnrollmentSchema from '../form-schemas/enrollmentSchema';
import useModal from '../hooks/useModal';
import Modal from '../lib/Modal';
import Input from '../test-results/Input';
import DataList from '../lib/DataList';
import StudyTests from '../forms/study-detail-form/StudyTests';

const PocShippingAddress = ({
  userData,
  doFetchUserProfile,
  userLabInfo,
  statesData,
  unitedStatesValues,
  countriesData,
  enrollableStudies,
  doCreateEnrollment,
  doUpdateUrl,
}) => {
  const { showing, toggleVisibility, setModalTitle, title } = useModal();
  const [checked, setChecked] = useState(true);
  const [testAvailables, setTestsAvailables] = useState([]);
  const [fullShipmentAddress, setFullShipmentAddress] = useState('');
  const [study] = enrollableStudies;

  const initialValues = { ...userLabInfo, tests: [] };

  const callModal = () => {
    setModalTitle('Thank You');
    toggleVisibility();
  };

  const onCloseModal = () => {
    toggleVisibility();
  };

  const afterEnrolledSuccess = () => {
    onCloseModal();
    doUpdateUrl(`/enrolled-studies/${study.id}`);
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      await doFetchUserProfile(userData.id);
    } catch (e) {
      console.log(e);
    }
  }, [doFetchUserProfile, userData]);

  const retrieveTests = useCallback(() => {
    if (enrollableStudies.length > 0) {
      const [studyToEnrroll] = enrollableStudies;
      const { Tests } = studyToEnrroll || [];
      setTestsAvailables(Tests);
    }
  }, [enrollableStudies]);

  useEffect(() => {
    fetchUserProfile(userData.id);
    retrieveTests();
  }, [fetchUserProfile, userData, enrollableStudies, retrieveTests]);

  const onInputFieldChange = (setFieldValue, CountryId) => {
    if (CountryId !== unitedStatesValues.id && CountryId !== unitedStatesValues.name) {
      setFieldValue('StateId', 0);
    }
  };

  function renderStateDropDownOrInput(CountryId, disabled) {
    return CountryId &&
      (CountryId === unitedStatesValues.id || CountryId === unitedStatesValues.name) ? (
      <Field
        name="StateId"
        placeholder="State"
        component={DataList}
        options={statesData ? Object.values(statesData) : {}}
        disabled={disabled}
      />
    ) : (
      <Field
        type="text"
        name="state"
        placeholder="Province"
        label="Province"
        col="4"
        component={Input}
        disabled={disabled}
      />
    );
  }

  const handleCheckedValues = (resetForm, values, setFieldValue) => {
    const { tests } = values;
    resetForm();
    setFieldValue('tests', tests);
    setChecked(!checked);
  };

  const handleSubmit = async values => {
    const enrollment = {
      LabParticipantId: values.id,
      shipmentAddress1: values.address1,
      shipmentAddress2: values.address2,
      shipmentCity: values.city,
      shipmentState: values.state,
      shipmentStateId: searchIdFromOptions(Object.values(statesData), values.StateId),
      postalCode: values.zip,
      shipmentCountryId: searchIdFromOptions(Object.values(countriesData), values.CountryId),
    };
    setFullShipmentAddress(`${values.address1}, ${values.city} ${values.zip}`);
    try {
      const testsIds = values.tests.map(testString =>
        searchIdFromOptions(testAvailables, testString),
      );

      const showModalAddrInfo = await doCreateEnrollment(study.id, {
        ...enrollment,
        Tests: testsIds,
      });
      if (showModalAddrInfo) {
        callModal();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return enrollableStudies && enrollableStudies.length ? (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          if (
            values.CountryId === unitedStatesValues.id ||
            values.CountryId === unitedStatesValues.name
          ) {
            if (!values.StateId) {
              delete errors.state;
              errors.StateId = 'State is required here';
            }
          }
          if (
            values.CountryId !== unitedStatesValues.id &&
            values.CountryId !== unitedStatesValues.name
          ) {
            if (!values.state) {
              delete errors.StateId;
              errors.state = 'Province is required here';
            }
          }

          if (!values.tests.length) {
            // This is a custom error to force the user to select at least one test
            errors.testsMinimumLength = 'Select at least 1 test for this Study';
          } else {
            delete errors.testsMinimumLength;
          }

          return errors;
        }}
        validationSchema={EnrollmentSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, isSubmitting, handleChange, setFieldValue, resetForm }) => (
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-10 offset-lg-1">
                <Form
                  onChange={evt => {
                    handleChange(evt);
                    onInputFieldChange(setFieldValue, values.CountryId);
                  }}
                >
                  <div className="card">
                    <div className="card-header">
                      <h4 className="header-pretitle text-muted mb-0">
                        Verify Shipping address for Rota Virus kit
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <Field
                          type="text"
                          name="address1"
                          placeholder="Address 1"
                          label="Address 1"
                          col="4"
                          component={Input}
                          disabled={checked}
                        />
                        <Field
                          type="text"
                          name="address2"
                          placeholder="Address 2"
                          label="Address 2"
                          col="4"
                          component={Input}
                          disabled={checked}
                        />
                        <Field
                          type="text"
                          name="city"
                          placeholder="City/Municipality"
                          label="City/Municipality"
                          col="4"
                          component={Input}
                          disabled={checked}
                        />
                      </div>
                      <div className="row">
                        <Field
                          name="CountryId"
                          placeholder="Country"
                          component={DataList}
                          options={countriesData ? Object.values(countriesData) : {}}
                          disabled={checked}
                        />
                        {renderStateDropDownOrInput(values.CountryId, checked)}
                        <Field
                          type="text"
                          name="zip"
                          placeholder="Postal Code"
                          label="Postal Code"
                          col="4"
                          component={Input}
                          disabled={checked}
                        />
                      </div>

                      <div className="row align-items-center">
                        <div className="col-auto">
                          {/* <h5 className="header-pretitle text-muted">Default Address</h5> */}
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="defaultAddress"
                              checked={checked}
                              onChange={() => handleCheckedValues(resetForm, values, setFieldValue)}
                            />
                            <label htmlFor="defaultAddress" className="form-check-label">
                              Use default laboratory address
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row  mt-4">
                        <div className="col-auto">
                          <h5 className="header-pretitle text-muted">Tests Available</h5>
                          <FieldArray
                            name="tests"
                            render={arrayHelpers => {
                              return (
                                testAvailables &&
                                !!testAvailables.length && (
                                  <>
                                    {testAvailables.map((test, index) => (
                                      <div
                                        key={`${test.id}-test-${test.name}`}
                                        className="form-check"
                                      >
                                        <Field
                                          id={`${test.id}-${test.name}`}
                                          type="checkbox"
                                          value={test.name}
                                          index={index}
                                          arrayHelpers={arrayHelpers}
                                          component={StudyTests}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor={`${test.id}-${test.name}`}
                                        >
                                          {test.name} Test
                                        </label>
                                      </div>
                                    ))}
                                  </>
                                )
                              );
                            }}
                          />
                          {errors.testsMinimumLength && (
                            <div className="invalid-feedback" style={{ display: 'inline-block' }}>
                              {errors.testsMinimumLength}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-primary mr-2 float-right"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submiting...' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>

      <Modal.Centered showing={showing} hide={onCloseModal} title={title}>
        <p>
          The kit will be sent to <span className="font-weight-bold">{fullShipmentAddress}</span>.
          It should arrive within ten business days. After reception, you have 3 days to submit your
          answers. You can view the status of the kit by accessing the Studies page and clicking on
          the Rota Virus tab.
        </p>
        <button
          type="button"
          onClick={afterEnrolledSuccess}
          className="btn btn-primary float-right"
          data-dismiss="modal"
        >
          Accept
        </button>
      </Modal.Centered>
    </React.Fragment>
  ) : null;
};

export default connect(
  'selectUserData',
  'doFetchUserProfile',
  'selectUserLabInfo',
  'selectEnrollableStudies',
  'selectStatesData',
  'selectUnitedStatesValues',
  'selectCountriesData',
  'selectEnrollableStudies',
  'doCreateEnrollment',
  'doUpdateUrl',
  PocShippingAddress,
);
