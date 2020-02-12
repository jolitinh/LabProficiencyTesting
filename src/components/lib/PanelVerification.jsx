/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { connect } from 'redux-bundler-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { panelShippingStatus } from '../../utils';
import DatePicker from '../forms/study-create-form/DatePicker';

// Shipping status message component
const KitStatusMessage = ({ kitStatus }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 justify-content-center">
            <div className="alert alert-light" role="alert">
              You have been sent a kit. Its current shipping status is:{' '}
              {kitStatus !== panelShippingStatus.RECEIVED ? (
                <b className="text-warning">{kitStatus}</b>
              ) : (
                <b className="text-info">{kitStatus}</b>
              )}
            </div>
            <small>
              <a href="/labs-studies" className="header-pretitle text-primary">
                Return to Labs & Studies Dashboard
              </a>
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

// Kit Verification Form component
const KitVerificactionForm = ({ action, currentStudyId, LabParticipantId, panelSentDate }) => {
  const initialValues = {
    LabParticipantId: '',
    shipmentStatus: '',
    panelReceivedDate: '',
    kitSerialNumber: '',
  };

  const kitSentDate = new Date(panelSentDate).toISOString();
  const ShippingStatusSchema = Yup.object().shape({
    kitSerialNumber: Yup.string(),
    panelReceivedDate: Yup.date()
      .required('This Field is required')
      .min(kitSentDate, 'Selected date must be greater than the Kit Sent Date.'),
  });

  const handleSubmit = async values => {
    const panelReceivedDate = new Date(values.panelReceivedDate).toISOString();
    const kitVerificationData = {
      LabParticipantId,
      shipmentStatus: panelShippingStatus.RECEIVED,
      panelReceivedDate,
    };

    try {
      await action(currentStudyId, kitVerificationData);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ShippingStatusSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title header-pretitle">Kit Verification</h5>
                <p className="card-text text-secondary">
                  In case you may have received it early, please verify the kit using the form
                  below.
                </p>

                <div className="form-group">
                  <label className="text-secondary" htmlFor="kitSerialNumber">
                    Serial Number
                  </label>
                  <Field
                    id="kitSerialNumber"
                    name="shipmentStatus"
                    placeholder="FEC-5678458855"
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: 'white',
                    }}
                  />
                  {errors.shipmentStatus && touched.shipmentStatus && (
                    <p>{errors.shipmentStatus}</p>
                  )}
                </div>
                <div className="form-group">
                  <Field
                    name="panelReceivedDate"
                    placeholder="Date of reception"
                    label="Date of reception"
                    upperClass="form-group"
                    component={DatePicker}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Verify
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const PanelVerification = ({ currentEnrollStudy, enrollmentList, doUpdateShippingStatus }) => {
  // Dimension the containers for current enrolled study and shipping status
  let currentEnrolledStudy = [];
  let currentShippingStatus = '';

  // if the object is loaded, let's get the year property and compare it with current year
  if (enrollmentList) {
    currentEnrolledStudy = enrollmentList.filter(item => item.year === new Date().getFullYear());
  }
  // let's verify if this object has a value already to retrieve the shipping status
  if (currentEnrolledStudy.length > 0) {
    currentShippingStatus = currentEnrollStudy.Enrollment.shipmentStatus;
  }
  return (
    <>
      {currentEnrollStudy && (
        <div className="container">
          <div className="row">
            {currentEnrollStudy.Enrollment.shipmentStatus === panelShippingStatus.SHIPPED ? (
              <KitVerificactionForm
                panelSentDate={currentEnrollStudy.Enrollment.panelSentDate}
                LabParticipantId={currentEnrollStudy.Enrollment.LabParticipantId}
                currentStudyId={currentEnrollStudy.id}
                currentShippingStatus={currentShippingStatus}
                action={doUpdateShippingStatus}
              />
            ) : (
              <KitStatusMessage kitStatus={currentEnrollStudy.Enrollment.shipmentStatus} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default connect(
  'selectCurrentEnrollStudy',
  'selectEnrollmentList',
  'doUpdateShippingStatus',
  PanelVerification,
);
