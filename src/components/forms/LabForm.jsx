import React from 'react';
import { connect } from 'redux-bundler-react';
import { Field, Formik, Form } from 'formik';
import LaboratorySchema, { emptyValues } from '../form-schemas/laboratorySchema';
import { searchIdFromOptions } from '../../utils';
import Text from '../lib/Text';
import DataList from '../lib/DataList';

const LabForm = ({
  edit = false,
  id = null,
  action,
  whoRegionsData,
  statesData,
  countriesData,
  unitedStatesValues,
  whoNetworkLabCategoriesData,
  initialValues = emptyValues,
  setViewMode,
  isVerificationView,
  onFieldUpdate,
}) => {
  const renderCancelButton = isEditing => {
    return isEditing ? (
      <button className="btn btn-outline-danger" type="button" onClick={() => setViewMode(false)}>
        Cancel
      </button>
    ) : null;
  };

  const onInputFieldChange = ({ name, value }, setFieldValue, CountryId) => {
    if (CountryId !== unitedStatesValues.id && CountryId !== unitedStatesValues.name) {
      setFieldValue('StateId', 0);
    }

    if (onFieldUpdate) {
      onFieldUpdate({ field: name, value });
    }
  };

  function renderStateDropDownOrInput(CountryId) {
    return CountryId &&
      (CountryId === unitedStatesValues.id || CountryId === unitedStatesValues.name) ? (
      <Field
        name="StateId"
        placeholder="State"
        component={DataList}
        options={statesData ? Object.values(statesData) : {}}
      />
    ) : (
      <Field name="state" placeholder="Province" component={Text} />
    );
  }

  return (
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

        return errors;
      }}
      validationSchema={LaboratorySchema}
      onSubmit={async (values, { setSubmitting }) => {
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

          if (!edit) {
            setSubmitting(false);

            await action(labParticipant);
          } else {
            delete labParticipant.id;
            await action(id, labParticipant);
            setViewMode(false);
          }
        } catch (err) {
          console.log('error here');
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, dirty, handleChange, setFieldValue }) => (
        <Form
          onChange={e => {
            handleChange(e);
            onInputFieldChange(e.target, setFieldValue, values.CountryId);
          }}
        >
          <div className="form-row">
            <Field name="laboratoryName" placeholder="Laboratory Name" component={Text} />
            <Field
              name="WHORegionId"
              placeholder="WHO Region"
              component={DataList}
              options={whoRegionsData ? Object.values(whoRegionsData) : {}}
            />
            <Field
              name="WHONetworkLabCategoryId"
              placeholder="WHO Network Laboratory Level"
              component={DataList}
              options={
                whoNetworkLabCategoriesData ? Object.values(whoNetworkLabCategoriesData) : {}
              }
            />
          </div>
          <div className="form-row">
            <Field name="address1" placeholder="Address 1" component={Text} />
            <Field name="address2" placeholder="Address 2" component={Text} />
            <Field name="city" placeholder="City/Municipality" component={Text} />
          </div>
          <div className="form-row">
            <Field
              name="CountryId"
              placeholder="Country"
              component={DataList}
              options={countriesData ? Object.values(countriesData) : {}}
            />
            {renderStateDropDownOrInput(values.CountryId)}
            <Field name="zip" placeholder="Zip Code" component={Text} />
          </div>

          {!isVerificationView && (
            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-primary" type="submit" disabled={!dirty || isSubmitting}>
                Submit
              </button>
              {renderCancelButton(edit)}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default connect(
  'selectWhoRegionsData',
  'selectWhoNetworkLabCategoriesData',
  'selectStatesData',
  'selectCountriesData',
  'selectUnitedStatesValues',
  LabForm,
);
