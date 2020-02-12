import React from 'react';
import { connect } from 'redux-bundler-react';
// TODO: Render the state or the province
const LabInformation = ({
  whoRegionsData,
  whoNetworkLabCategoriesData,
  countriesData,
  statesData,
  unitedStatesValues,
  laboratoryName,
  WHORegionId,
  WHONetworkLabCategoryId,
  CountryId,
  address1,
  address2,
  city,
  zip,
  StateId,
  state,
}) => {
  return (
    <div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <span>
            <strong>Laboratory Name</strong>
          </span>
          <p>{laboratoryName}</p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>WHO Region</strong>
          </span>
          <p>{whoRegionsData && whoRegionsData[WHORegionId].name}</p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>WHO Network Laboratory Level</strong>
          </span>
          <p>
            {whoNetworkLabCategoriesData &&
              whoNetworkLabCategoriesData[WHONetworkLabCategoryId].name}
          </p>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <span>
            <strong>Address 1</strong>
          </span>
          <p>{address1}</p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>Address 2</strong>
          </span>
          <p>{address2}</p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>City/Municipality</strong>
          </span>
          <p>{city}</p>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <span>
            <strong>Country</strong>
          </span>
          <p>{countriesData && countriesData[CountryId].name}</p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>
              {CountryId &&
              (CountryId === unitedStatesValues.id || CountryId === unitedStatesValues.name)
                ? 'State'
                : 'Province'}
            </strong>
          </span>
          <p>
            {CountryId &&
            (CountryId === unitedStatesValues.id || CountryId === unitedStatesValues.name)
              ? statesData && statesData[StateId].name
              : state}
          </p>
        </div>
        <div className="col-md-4 mb-3">
          <span>
            <strong>Zip Code</strong>
          </span>
          <p>{zip}</p>
        </div>
      </div>
    </div>
  );
};

export default connect(
  'selectWhoRegionsData',
  'selectWhoNetworkLabCategoriesData',
  'selectCountriesData',
  'selectStatesData',
  'selectUnitedStatesValues',
  LabInformation,
);
