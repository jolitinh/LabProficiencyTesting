/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

const Input = ({
  field,
  form: { touched, errors },
  placeholder,
  label,
  type,
  upperClass,
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];
  return (
    <div className={`${upperClass}`}>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={`${field.name}`}
        type={`${type}`}
        {...field}
        value={field.value || ''}
        {...props}
        placeholder={placeholder}
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default Input;
