import * as Yup from 'yup';

const LaboratorySchema = Yup.object().shape({
  laboratoryName: Yup.string()
    .matches(/[a-z0-9]+$/, { message: 'Laboratory Name format not valid' })
    .required('Laboratory Name is Required'),
  WHORegionId: Yup.string().required('WHO Region is Required'),
  state: Yup.string(),
  WHONetworkLabCategoryId: Yup.string().required('WHO Network is Required'),
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
    .required('Zip Code is Required'),
});

export const emptyValues = {
  laboratoryName: '',
  WHORegionId: '',
  WHONetworkLabCategoryId: '',
  CountryId: '',
  address1: '',
  address2: '',
  city: '',
  StateId: '',
  zip: '',
  state: '',
  isStateIdSet: false,
};

export default LaboratorySchema;
