/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

const Text = ({
  field,
  form: { touched, errors },
  placeholder,
  textPlaceHolder,
  classNameParent,
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];

  return (
    <div className={`${classNameParent || 'col-md-4 mb-3'}`}>
      <label htmlFor={placeholder}>{placeholder}</label>
      <input
        id={`${placeholder}`}
        type="text"
        {...field}
        value={field.value || ''}
        {...props}
        placeholder={textPlaceHolder || placeholder}
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};
export default Text;
