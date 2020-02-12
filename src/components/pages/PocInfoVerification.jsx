/* eslint-disable no-console */
import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'redux-bundler-react';

import LabForm from '../forms/LabForm';
import LabInformation from '../views/LabInformation';
import PocVerificationForm from '../forms/PointOfContactVerificationForm';
import { searchIdFromOptions } from '../../utils';

/**
 * @type {React.Component}
 * @param {Object} routeParams Params in URL (redux selector)
 * @param {Object} poc         Current POC fetched (Redux Selector)
 * @param {Object} currentLab  Laboratory Information (Redux selector)
 * @param {Function} doUpdateLabDetails Action Creator to update laboratory information
 * @param {Function} doUpdateUserProfile Action creator to update point of contact information
 * @param {Function} doCr
 */
const PocInformationVerification = ({
  verificationToken,
  doSetPasswordOnVerification,
  pointOfContact,
  laboratory,
  doUpdateLabDetails,
  doUpdateUserProfile,
  doFetchLabPocsList,
  whoRegionsData,
  whoNetworkLabCategoriesData,
  statesData,
  countriesData,
}) => {
  const [pocVerifiedInfo, setVerified] = useState(false);
  const [labVerifiedData, setVerificationLabData] = useState({ ...laboratory });
  // TODO: Update with the new way for Datalist

  // Gets the updates from lab form onChange event
  const getLabFormUpdates = async ({ field, value }) => {
    const labData = labVerifiedData;
    setVerificationLabData({
      ...labData,
      [field]: value,
    });
  };

  /**
   * Method on submit the POC form
   * @param {boolean} editMode
   * @param {number|string} pocID
   * @param {Object} pocValues
   */
  const submitPocForm = async values => {
    const pocData = { ...values, isVerified: true };

    // Clean phoneNumber and countryCode if empty values are submitted
    if (pocData.phoneNumber === '' && (!pocData.countryCode || pocData.countryCode === '')) {
      delete pocData.phoneNumber;
      delete pocData.countryCode;
    }

    try {
      const { token } = await doSetPasswordOnVerification(
        { password: pocData.password },
        verificationToken,
      );

      // If token was received we coould update user profile data
      if (token) {
        delete pocData.password;
        await doUpdateUserProfile(pointOfContact.UserId, pocData);

        // Check if user is primary POC
        if (pointOfContact.primaryPOC) {
          const labWasEdited = !isEqual(laboratory, labVerifiedData);

          if (labWasEdited) {
            const labFormData = { ...labVerifiedData };
            delete labFormData.id;
            const labObjectData = {
              ...labFormData,
              WHORegionId: searchIdFromOptions(
                Object.values(whoRegionsData),
                labVerifiedData.WHORegionId,
              ),
              WHONetworkLabCategoryId: searchIdFromOptions(
                Object.values(whoNetworkLabCategoriesData),
                labVerifiedData.WHONetworkLabCategoryId,
              ),
              StateId: searchIdFromOptions(Object.values(statesData), labVerifiedData.StateId),
              CountryId: searchIdFromOptions(
                Object.values(countriesData),
                labVerifiedData.CountryId,
              ),
            };
            await doUpdateLabDetails(laboratory.id, labObjectData);
          }
        }
        setVerified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Render methods */

  const renderLab = () => {
    return pointOfContact.primaryPOC ? (
      <LabForm
        edit
        initialValues={laboratory}
        setViewMode
        isVerificationView
        onFieldUpdate={getLabFormUpdates}
      />
    ) : (
      <LabInformation {...laboratory} />
    );
  };

  const renderVerification = () => {
    const { isVerified } = pointOfContact;
    return !isVerified ? (
      <React.Fragment>
        {/* The laboratory information card */}
        <div className="card">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="card-header-title">
                  {pointOfContact.primaryPOC
                    ? 'Edit Laboratory Information'
                    : 'Laboratory Information'}
                </h4>
              </div>
            </div>
          </div>
          <div className="card-body">{laboratory && renderLab()}</div>
        </div>

        <div className="row">
          {/* The POC info card */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">My profile</h4>
              </div>
              <div className="card-body">
                <PocVerificationForm edit action={submitPocForm} poc={pointOfContact} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className="alert alert-light" role="alert">
        This Point of contact has already verified his/her information.
      </div>
    );
  };

  return (
    <React.Fragment>
      {pocVerifiedInfo && (
        <div className="alert alert-success fade show" role="alert">
          <h4 className="alert-heading">Contact information verified!</h4>
          <p>You have successfull verified your contact information.</p>
          <hr />
          <p className="mb-0">
            <a title="Go to lab page" href="/" className="alert-link">
              Go to my homepage
            </a>
          </p>
        </div>
      )}

      {!pointOfContact && (
        <div className="alert alert-danger" role="alert">
          Points of contact not found for this Lab Participant.
        </div>
      )}

      {pointOfContact && !pocVerifiedInfo && renderVerification()}
    </React.Fragment>
  );
};

export default connect(
  'doSetPasswordOnVerification',
  'doUpdateLabDetails',
  'doUpdateUserProfile',
  'doFetchLabPocsList',
  'selectWhoRegionsData',
  'selectWhoNetworkLabCategoriesData',
  'selectStatesData',
  'selectCountriesData',
  PocInformationVerification,
);
