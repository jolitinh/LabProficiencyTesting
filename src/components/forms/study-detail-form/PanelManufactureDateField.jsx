import React from 'react';
import Flatpickr from 'react-flatpickr';
import '../../../../node_modules/flatpickr/dist/themes/light.css';

const PanelManufactureDateField = ({
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
        id="panelManufactureDate"
        placeholder="Manufacture Date"
        onChange={date => {
          setFieldValue('panelManufactureDate', date[0]);
        }}
        onOpen={() => {
          setFieldTouched('panelManufactureDate', true);
        }}
        // {...field}
        {...props}
      />
      {isNotValid && <div className="invalid-feedback">{errors[field.name]}</div>}
    </div>
  );
};

export default PanelManufactureDateField;
