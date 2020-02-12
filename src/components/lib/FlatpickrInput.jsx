import React from 'react';

import Flatpickr from 'react-flatpickr';
import '../../../node_modules/flatpickr/dist/themes/light.css';

const FlatpickrInput = ({ name, id, placeholder }) => (
  <Flatpickr
    name={name}
    options={{ allowInput: true }}
    className="form-control "
    id={id}
    placeholder={placeholder}
  />
);

export default FlatpickrInput;
