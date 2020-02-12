/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from 'react';
import { initialValueForOptionsDataList } from '../../utils';

const DataList = ({ field, form: { touched, errors }, options, placeholder, ...props }) => {
  const [inputDataListValue, setInputDataListValue] = useState('');
  const isNotValid = touched[field.name] && errors[field.name];

  return (
    <div className="col-md-4 mb-3">
      <label htmlFor={placeholder}>{placeholder}</label>
      {options.length && (
        <>
          <input
            id={`${placeholder}`}
            {...field}
            {...props}
            value={
              (field.value &&
                initialValueForOptionsDataList(options, field.value, inputDataListValue)) ||
              inputDataListValue
            }
            onChange={e => setInputDataListValue(e.target.value)}
            list={`${field.name}`}
            placeholder={placeholder}
            className={
              isNotValid ? 'form-control is-invalid custom-select' : 'form-control custom-select'
            }
          />
          <datalist id={`${field.name}`}>
            {options.length && options.map(({ id, name }) => <option key={id} value={name} />)}
          </datalist>
        </>
      )}
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default DataList;
