import React from 'react';
import Flatpickr from 'react-flatpickr';
import '../../../../node_modules/flatpickr/dist/themes/light.css';

const StartDateField = ({
  value,
  name,
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue, touched, errors, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isNotValid = touched.startDate && errors.startDate;

  return (
    <div>
      <Flatpickr
        value={value}
        options={{
          allowInput: true,
          input: {
            autoFocus: true,
          },
        }}
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
        id="startDate"
        placeholder="Start Date"
        onChange={date => {
          setFieldValue('startDate', date[0]);
        }}
        onOpen={() => {
          setFieldTouched('startDate', true);
        }}
        // {...field}
        {...props}
      />

      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default StartDateField;
