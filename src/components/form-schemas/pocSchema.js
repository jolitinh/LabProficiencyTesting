import * as Yup from 'yup';

const PocSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email()
    .required('Email is required'),
  phoneNumber: Yup.string(),
  countryCode: Yup.string()
    .nullable()
    .when('phoneNumber', {
      is: val => val == null,
      then: Yup.string().matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
        message: 'Country code not valid',
      }),
      otherwise: Yup.string()
        .matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
          message: 'Country code not valid',
        })
        .required('Country code should be required'),
    }),
  title: Yup.string(),
});

export const PocResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const PocNewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: Yup.string()
    .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Password do not match'),
});

export const PocConfirmationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email()
    .required('Email is required'),
  phoneNumber: Yup.string(),
  countryCode: Yup.string()
    .nullable()
    .when('phoneNumber', {
      is: val => val == null,
      then: Yup.string().matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
        message: 'Country code not valid',
      }),
      otherwise: Yup.string()
        .matches(/^(?:[+][0-9]{1,2}[-][\d]{3,4})$|(?:[+][0-9]{1,3})$/, {
          message: 'Country code not valid',
        })
        .required('Country code should be required'),
    }),
  title: Yup.string(),
  password: Yup.string()
    .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: Yup.string()
    .matches(/.*[0-9]+.*$/, { message: 'The Password should have at least a number' })
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Password do not match'),
});

export default PocSchema;
