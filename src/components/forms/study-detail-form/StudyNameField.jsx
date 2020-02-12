import React from 'react';

const StudyNameField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];

  return (
    <div>
      <input
        type="text"
        className={isNotValid ? 'form-control is-invalid' : 'form-control'}
        id="name"
        placeholder="Name"
        {...field}
        {...props}
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default StudyNameField;
