import React from 'react';
import Flatpickr from 'react-flatpickr';

import '../../../../node_modules/flatpickr/dist/themes/light.css';

const EndDateField = ({
  value,
  field, // { name, value, onChange, onBlur }
  form: { setFieldValue, touched, errors, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];

  return (
    <div>
      <Flatpickr
        value={value}
        options={{ allowInput: true }}
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
        id="endDate"
        placeholder="End Date"
        onChange={date => {
          setFieldValue('endDate', date[0]);
        }}
        onOpen={() => {
          setFieldTouched('endDate', true);
        }}
        // {...field}
        {...props}
      />

      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default EndDateField;
