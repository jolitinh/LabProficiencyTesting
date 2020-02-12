import * as Yup from 'yup';

const StudiesSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  year: Yup.string()
    .matches(/^[0-9]{4}$/, {
      message: 'Year not valid',
    })
    .required('Year is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().nullable(true),
  panelManufactureDate: Yup.date().nullable(true),
  notes: Yup.string(),
});

export default StudiesSchema;
