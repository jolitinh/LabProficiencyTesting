/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'redux-bundler-react';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { searchIdFromOptions } from '../../utils';
import DataList from '../lib/DataList';
import Text from '../lib/Text';

// basic information from current user has to be populated here
const UserProfileInfo = ({ data, action }) => {
  const initValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    countryCode: '',
    email: '',
    title: '',
  };
  // If no data is return, let's initiaze as empty
  const initialValues = data || initValues;

  // let's declare our hook for the enabling of the controls on screen
  const [editUserProfileInfo, setEditUserProfileInfo] = useState(true);

  const UserProfileInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string(),
    countryCode: Yup.string()
      .nullable()
      .when('phoneNumber', {
        is: val => val == null,
        then: Yup.string().matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
          message: 'Invalid country code',
        }),
        otherwise: Yup.string()
          .matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
            message: 'Invalid country code',
          })
          .required('Country code is required'),
      }),
    title: Yup.string(),
    email: Yup.string()
      .email()
      .required('Email Address is required'),
  });

  const updateUserProfile = async (values, { setSubmitting, resetForm }) => {
    try {
      await action(values.id, values);

      setSubmitting(false);
      setEditUserProfileInfo(true);
    } catch (e) {
      console.log(e);
      resetForm();
      setSubmitting(false);
    }
  };

  const cancelUpdatePassword = (setSubmitting, resetForm) => {
    setSubmitting(false);
    resetForm();
    setEditUserProfileInfo(true);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={UserProfileInfoSchema}
        onSubmit={updateUserProfile}
      >
        {({ values, errors, touched, isSubmitting, dirty, setSubmitting, resetForm }) => (
          <Form className="mb-3">
            <div className="card container mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-xl-12 col-lg-12 d-flex justify-content-between">
                    <p className="mt-3 header-pretitle">Personal Information</p>
                    <p className="mt-3 pb-4">
                      {editUserProfileInfo ? (
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setEditUserProfileInfo(false)}
                          // href="#EditUserProfile"
                        >
                          <span className="fe fe-edit lead" />
                        </button>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
                <div className="row d-flex justify-content-between">
                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      id="firstName"
                      name="firstName"
                      placeholder="Joe"
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {!editUserProfileInfo && errors.firstName && touched.firstName ? (
                      <div className="text-danger">{errors.firstName}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="text-danger">{errors.lastName}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="countryCode">Phone Country Code</label>
                    <Field
                      id="countryCode"
                      name="countryCode"
                      placeholder="0-001"
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                      value={values.countryCode || ''}
                    />
                    {!editUserProfileInfo && errors.countryCode && touched.countryCode ? (
                      <div className="text-danger">{errors.countryCode}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="phoneNumber">Phone #</label>
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="98765432"
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder={initialValues.email}
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {!editUserProfileInfo && errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="title">Title</label>
                    <Field
                      id="title"
                      name="title"
                      placeholder="Web Developer"
                      type="text"
                      className="form-control"
                      readOnly={editUserProfileInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {errors.title && touched.title ? (
                      <div className="text-danger">{errors.title}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div
                    id="EditUserProfile"
                    className={
                      editUserProfileInfo
                        ? 'col-sm-12 col-lg-12 col-xl-12  text-right collapse'
                        : 'col-sm-12 col-lg-12 col-xl-12 text-right'
                    }
                  >
                    <button
                      name="submit"
                      data-toggle="collapse"
                      // href="#EditUserProfile"
                      // onClick={() => setEditUserProfileInfo(true)}
                      type="submit"
                      disabled={isSubmitting || !dirty}
                      className="btn btn-primary mr-2 mt-4"
                    >
                      Update
                    </button>
                    <button
                      name="cancel"
                      data-toggle="collapse"
                      // href="#EditUserProfile"
                      type="button"
                      onClick={() => cancelUpdatePassword(setSubmitting, resetForm)}
                      className="btn btn-outline-danger mt-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

// Current user login information will be displayed on this component
const UserLoginInfo = ({ action }) => {
  const initValues = {
    password: '',
    confirmPassword: '',
  };
  // If no data is return, let's initiaze as empty
  // const initialValues = { ...initValues, ...userLoginInfo } || initValues;

  // let's declare our hook for the enabling of the controls on screen
  const [editUserLoginInfo, setEditUserLoginInfo] = useState(true);

  const UserLoginInfoSchema = Yup.object().shape({
    password: Yup.string()
      .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    confirmPassword: Yup.string()
      .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Password do not match'),
  });

  const updateUserPassword = async (values, { setSubmitting, resetForm }) => {
    try {
      const { password } = values;
      await action({ password });
      setSubmitting(false);
      setEditUserLoginInfo(true);
      resetForm();
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  };

  const cancelUpdatePassword = (setSubmitting, resetForm) => {
    setSubmitting(false);
    resetForm();
    setEditUserLoginInfo(true);
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initValues}
        validationSchema={UserLoginInfoSchema}
        onSubmit={updateUserPassword}
      >
        {({ errors, isSubmitting, touched, dirty, setSubmitting, resetForm }) => (
          <Form>
            <div className="card container mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-xl-12 col-lg-12 d-flex justify-content-between">
                    <p className="mt-3 header-pretitle">PASSWORD RESET</p>
                    <p className="mt-3 pb-4">
                      {editUserLoginInfo ? (
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          data-toggle="collapse"
                          onClick={() => setEditUserLoginInfo(false)}
                        >
                          <span className="fe fe-edit lead" />
                        </button>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
                <div className="row d-flex justify-content-between">
                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="password">Password</label>
                    <Field
                      id="password"
                      name="password"
                      placeholder="********"
                      type="password"
                      className="form-control"
                      disabled={editUserLoginInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {!editUserLoginInfo && errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="col-lg-6 col-xl-6 col-sm-12 mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="*********"
                      type="password"
                      className="form-control"
                      disabled={editUserLoginInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {!editUserLoginInfo && errors.confirmPassword && touched.confirmPassword ? (
                      <div className="text-danger">{errors.confirmPassword}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <div
                    id="editLoginInformation"
                    // className="collapse col-lg-12 col-xl-12 col-sm-12 text-right"
                    className={
                      editUserLoginInfo
                        ? 'col-sm-12 col-lg-12 col-xl-12  text-right collapse'
                        : 'col-sm-12 col-lg-12 col-xl-12 text-right'
                    }
                  >
                    <button
                      name="submit"
                      data-toggle="collapse"
                      // href="#editLoginInformation"
                      // onClick={() => setEditUserLoginInfo(true)}
                      disabled={isSubmitting || !dirty}
                      type="submit"
                      className="btn btn-primary mr-2"
                    >
                      Update
                    </button>
                    <button
                      name="cancel"
                      data-toggle="collapse"
                      // href="#editLoginInformation"
                      onClick={() => cancelUpdatePassword(setSubmitting, resetForm)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const initValues = {
  laboratoryName: '',
  WHORegionId: '',
  WHONetworkLabCategoryId: '',
  CountryId: '',
  address1: '',
  address2: '',
  city: '',
  StateId: '',
  state: '',
  zip: '',
};

// Current user's assigned lab information will be displayed on this component
const UserLabInfo = ({
  userLabInfo = initValues,
  whoRegionsData,
  whoNetworkLabCategoriesData,
  statesData,
  countriesData,
  unitedStatesValues,
  userId,
  fetchUserProfile,
  userHasLabPermission,
  action,
}) => {
  // If no data is return, let's initiaze as empty
  const initialValues = userLabInfo;

  // let's declare our hook for the enabling of the controls on screen
  const [editUserLabInfo, setEditUserLabInfo] = useState(true);

  const UserLabInfoSchema = Yup.object().shape({
    laboratoryName: Yup.string().required('Laboratory Name is required'),
    WHORegionId: Yup.string().required('WHO Region is required'),
    WHONetworkLabCategoryId: Yup.string().required('WHO Network is required'),
    CountryId: Yup.string().required('Country is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State/Province is required'),
    zip: Yup.string().required('Zip Code is required'),
  });

  // This function is for sending the stateId as 0 since the api requires it.
  const onInputFieldChange = ({ name, value }, setFieldValue, CountryId) => {
    if (CountryId !== unitedStatesValues.id && CountryId !== unitedStatesValues.name) {
      setFieldValue('StateId', 0);
    }
  };

  // This function render the data list or the inputfield for the state or province
  function renderStateDropDownOrInput(CountryId) {
    return CountryId &&
      (CountryId === unitedStatesValues.id || CountryId === unitedStatesValues.name) ? (
      <Field
        name="StateId"
        placeholder="State"
        component={DataList}
        options={statesData ? Object.values(statesData) : {}}
        readOnly={editUserLabInfo}
        style={{
          backgroundColor: 'white',
        }}
      />
    ) : (
      <Field
        name="state"
        placeholder="Province"
        component={Text}
        readOnly={editUserLabInfo}
        style={{
          backgroundColor: 'white',
        }}
      />
    );
  }

  const cancelUpdatePassword = (setSubmitting, resetForm) => {
    setSubmitting(false);
    resetForm();
    setEditUserLabInfo(true);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={UserLabInfoSchema}
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
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const labParticipant = {
              ...values,
              WHORegionId: searchIdFromOptions(Object.values(whoRegionsData), values.WHORegionId),
              WHONetworkLabCategoryId: searchIdFromOptions(
                Object.values(whoNetworkLabCategoriesData),
                values.WHONetworkLabCategoryId,
              ),
              StateId: searchIdFromOptions(Object.values(statesData), values.StateId),
              CountryId: searchIdFromOptions(Object.values(countriesData), values.CountryId),
            };

            delete labParticipant.id;
            await action(userLabInfo.id, labParticipant); // here the action creator for updating the lab
            setSubmitting(false);
            setEditUserLabInfo(true);
            resetForm();
            await fetchUserProfile(userId);
          } catch (err) {
            alert('An unexpected error has occurred.');
            setSubmitting(false);
            setEditUserLabInfo(true);
          }
        }}
      >
        {({
          errors,
          touched,
          values,
          isSubmitting,
          setSubmitting,
          resetForm,
          dirty,
          handleChange,
          setFieldValue,
        }) => (
          <Form
            onChange={e => {
              handleChange(e);
              onInputFieldChange(e.target, setFieldValue, values.CountryId);
            }}
            className="mb-4"
          >
            <div className="card container mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-xl-12 col-lg-12 d-flex justify-content-between">
                    <p className="mt-3 header-pretitle">Laboratory Information</p>
                    <p className="mt-3 pb-4">
                      {userHasLabPermission && editUserLabInfo ? (
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          data-toggle="collapse"
                          onClick={() => setEditUserLabInfo(false)}
                          // href="#editLab"
                        >
                          <span className="fe fe-edit lead" />
                        </button>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
                <div className="row d-flex justify-content-between mb-4">
                  <div className="col-lg-4 col-xl-4 col-sm-12 mb-3">
                    <label htmlFor="laboratoryName">Laboratory Name</label>
                    <Field
                      id="laboratoryName"
                      name="laboratoryName"
                      placeholder="Mertz - Thiel"
                      type="text"
                      className="form-control"
                      readOnly={editUserLabInfo}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                    {errors.laboratoryName && touched.laboratoryName ? (
                      <div className="text-danger">{errors.laboratoryName}</div>
                    ) : (
                      ''
                    )}
                  </div>

                  <Field
                    name="WHORegionId"
                    placeholder="WHO Region"
                    component={DataList}
                    options={whoRegionsData ? Object.values(whoRegionsData) : {}}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />

                  <Field
                    name="WHONetworkLabCategoryId"
                    placeholder="WHO Network Laboratory Level"
                    component={DataList}
                    options={
                      whoNetworkLabCategoriesData ? Object.values(whoNetworkLabCategoriesData) : {}
                    }
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />

                  <Field
                    name="address1"
                    placeholder="Address 1"
                    component={Text}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                  <Field
                    name="address2"
                    placeholder="Address 2"
                    component={Text}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                  <Field
                    name="city"
                    placeholder="City/Municipality"
                    component={Text}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />

                  <Field
                    name="CountryId"
                    placeholder="Country"
                    component={DataList}
                    options={countriesData ? Object.values(countriesData) : {}}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />

                  {renderStateDropDownOrInput(values.CountryId)}

                  <Field
                    name="zip"
                    placeholder="Zip Code"
                    component={Text}
                    readOnly={editUserLabInfo}
                    style={{
                      backgroundColor: 'white',
                    }}
                  />

                  <div
                    id="editLab"
                    className={
                      editUserLabInfo
                        ? 'col-sm-12 col-lg-12 col-xl-12  text-right collapse'
                        : 'col-sm-12 col-lg-12 col-xl-12 text-right'
                    }
                  >
                    <button
                      name="submit"
                      data-toggle="collapse"
                      // href="#editLab"
                      // onClick={() => onSubmitLab(values, setSubmitting, resetForm)}
                      type="submit"
                      disabled={isSubmitting || !dirty}
                      className="btn btn-primary mr-2 mt-4"
                    >
                      Update
                    </button>

                    <button
                      name="cancel"
                      data-toggle="collapse"
                      // href="#editLab"
                      type="button"
                      onClick={() => cancelUpdatePassword(setSubmitting, resetForm)}
                      className="btn btn-outline-danger mt-4"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

// Main component
const UserProfile = ({
  userData,
  doFetchUserProfile,
  doUpdateUserProfile,
  doUpdateLabDetails,
  doUpdateUserPassword,
  userProfileBasicInformation,
  userLoginInfo,
  userLabInfo,
  whoRegionsData,
  whoNetworkLabCategoriesData,
  statesData,
  countriesData,
  unitedStatesValues,
  userHasLabPermission,
}) => {
  const fetchUserProfile = useCallback(async () => {
    try {
      await doFetchUserProfile(userData.id);
    } catch (e) {
      console.log(e);
    }
  }, [doFetchUserProfile, userData]);

  useEffect(() => {
    fetchUserProfile(userData.id);
  }, [fetchUserProfile, userData]);

  return (
    <div className="container">
      {userProfileBasicInformation && (
        <UserProfileInfo data={userProfileBasicInformation} action={doUpdateUserProfile} />
      )}
      {userLoginInfo && (
        <UserLoginInfo userLoginInfo={userLoginInfo} action={doUpdateUserPassword} />
      )}
      {userLabInfo && (
        <UserLabInfo
          userId={userData.id}
          countriesData={countriesData}
          userLabInfo={userLabInfo}
          statesData={statesData}
          fetchUserProfile={fetchUserProfile}
          unitedStatesValues={unitedStatesValues}
          whoRegionsData={whoRegionsData}
          whoNetworkLabCategoriesData={whoNetworkLabCategoriesData}
          userHasLabPermission={userHasLabPermission}
          action={doUpdateLabDetails}
        />
      )}
    </div>
  );
};

export default connect(
  'selectUserData',
  'selectUserProfileBasicInformation',
  'selectUserLoginInfo',
  'selectUserLabInfo',
  'selectStatesData',
  'selectUnitedStatesValues',
  'selectCountriesData',
  'selectWhoRegionsData',
  'selectWhoNetworkLabCategoriesData',
  'selectUserHasLabPermission',
  'doFetchUserProfile',
  'doUpdateUserProfile',
  'doUpdateUserPassword',
  'doUpdateLabDetails',
  UserProfile,
);
