import * as Yup from 'yup';

const EnrollmentSchema = Yup.object().shape({
  state: Yup.string(),
  CountryId: Yup.string().required('Country is Required'),
  address1: Yup.string()
    .matches(/[a-zA-Z0-9]+.*$/, { message: 'Address not valid' })
    .required('Address 1 is Required'),
  address2: Yup.string().matches(/[a-zA-Z0-9]+.*$/, { message: 'Address 2 not valid' }),
  city: Yup.string()
    .matches(/[a-z0-9]+$/, { message: 'City not valid' })
    .required('City is Required'),
  StateId: Yup.string(),
  zip: Yup.string()
    .matches(/[a-z0-9]+$/, { message: 'Invalid zip code' })
    .required('Postal Code is Required'),
  tests: Yup.array(),
});

export const emptyValues = {
  CountryId: '',
  address1: '',
  address2: '',
  city: '',
  StateId: '',
  zip: '',
  state: '',
  tests: [],
};

export default EnrollmentSchema;
