import React from 'react';
import { Formik, Form, Field } from 'formik';
import Input from './Input';
import DatePicker from './DatePicker';
import TextArea from '../../lib/TextArea';
import StudiesSchema from '../../form-schemas/studiesSchema';

const NewStudyForm = ({ action, cancelAction }) => {
  const initialValues = {
    name: '',
    year: '',
    startDate: '',
    endDate: '',
    panelManufactureDate: '',
    notes: '',
  };

  const submitForm = (values, { setSubmitting }) => {
    action(values);
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={values => {
          const errors = {};
          if (values.endDate && new Date(values.endDate) <= new Date(values.startDate)) {
            errors.endDate = 'The end date should not be lower or equal than start date';
          }

          return errors;
        }}
        validationSchema={StudiesSchema}
        onSubmit={submitForm}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              label="Name"
              upperClass="form-group"
              component={Input}
            />
            <Field
              type="text"
              name="year"
              placeholder="Year"
              label="Year"
              upperClass="form-group"
              component={Input}
            />
            <Field
              name="startDate"
              placeholder="Start Date"
              label="Start Date"
              upperClass="form-group"
              component={DatePicker}
            />
            <Field
              name="endDate"
              placeholder="End Date"
              label="End Date"
              upperClass="form-group"
              component={DatePicker}
            />
            <Field
              name="panelManufactureDate"
              placeholder="Panel Manufacture Date"
              label="Panel Manufacture Date"
              upperClass="form-group"
              component={DatePicker}
            />
            <Field
              name="notes"
              placeholder="Notes"
              classNameParent="form-group"
              component={TextArea}
            />
            <div>
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={!isValid || isSubmitting || !dirty}
              >
                {isSubmitting ? 'Submiting...' : 'Save'}
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

export default NewStudyForm;
