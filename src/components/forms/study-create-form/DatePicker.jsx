/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import Flatpickr from 'react-flatpickr';
import '../../../../node_modules/flatpickr/dist/themes/light.css';

const EndDateField = ({
  field,
  form: { setFieldValue, touched, errors, setFieldTouched },
  upperClass,
  placeholder,
  label,
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];
  return (
    <div className={`${upperClass}`}>
      <label htmlFor={field.name}>{label}</label>
      <Flatpickr
        value={field.value}
        options={{ allowInput: true }}
        autoComplete="off"
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
        id={`${field.name}`}
        placeholder={`${placeholder}`}
        onChange={date => {
          setFieldValue(`${field.name}`, date[0]);
        }}
        onOpen={() => {
          setFieldTouched(`${field.name}`, true);
        }}
        {...props}
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default EndDateField;
