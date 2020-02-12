import React from 'react';

const StudyTest = ({
  field, // { name, value, onChange, onBlur }
  arrayHelpers,
  index,
  id,
  value,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const isNotValid = touched[field.name] && errors[field.name];

  return (
    <>
      <input
        id={id}
        type="checkbox"
        className={isNotValid ? 'form-check-input is-invalid' : 'form-check-input'}
        {...field}
        {...props}
        onChange={e =>
          e.target.checked
            ? arrayHelpers.insert(index, field.value)
            : arrayHelpers.remove(field.value)
        }
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </>
  );
};

export default StudyTest;
