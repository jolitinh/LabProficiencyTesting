import React from 'react';

const Select = ({ field, form: { touched, errors }, options, placeholder, ...props }) => {
  const isNotValid = touched[field.name] && errors[field.name];
  return (
    <div className="col-md-4 mb-3">
      <label htmlFor={placeholder}>{placeholder}</label>
      {options.length && (
        <select
          id={`${placeholder}`}
          {...field}
          {...props}
          placeholder={placeholder}
          className={
            isNotValid ? 'form-control is-invalid custom-select' : 'form-control custom-select'
          }
        >
          <option value="">{placeholder}</option>
          {options.length &&
            options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      )}
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default Select;
