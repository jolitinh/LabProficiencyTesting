import jwtDecode from 'jwt-decode';
import { roleHomeRedirect } from '../nav';

const ActionTypes = {
  // Verification  Types
  AUTH_VERIFICATION_START: 'AUTH_VERIFICATION_START',
  AUTH_VERIFICATION_AVAILABLE: 'AUTH_VERIFICATION_AVAILABLE',
  AUTH_VERIFICATION_SUCCESS: 'AUTH_VERIFICATION_SUCCESS',
  AUTH_VERIFICATION_ERROR: 'AUTH_VERFICATION_ERROR',
  AUTH_CLEAN_VERIFICATION_ERROR: 'AUTH_CLEAN_VERIFICATION_ERROR',
  // Login Action Types
  AUTH_LOGIN_START: 'AUTH_LOGIN_START',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_ERROR: 'AUTH_LOGIN_ERROR',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_LOGOUT_ERROR: 'AUTH_LOGOUT_ERROR',
  AUTH_CLEAN_LOGIN_ERROR: 'AUTH_CLEAN_LOGIN_ERROR',

  AUTH_CLEAN_ERROR_MESSAGES: 'AUTH_CLEAN_ERROR_MESSAGES',
  // Password - Reset
  AUTH_REQUEST_PASSWORD_START: 'AUTH_REQUEST_PASSWORD_START',
  AUTH_REQUEST_PASSWORD_SUCCESS: 'AUTH_REQUEST_PASSWORD_SUCCESS',
  AUTH_REQUEST_PASSWORD_ERROR: 'AUTH_REQUEST_PASSWORD_ERROR',
};

export default {
  name: 'auth',
  getReducer: () => {
    const initialState = {
      loading: false,
      isValidUser: false,
      loginToken: localStorage.getItem('token') || null,
      loggedInSince: null,
      verificationErrorMessage: null,
      loginErrorMessage: null,
      authData: null,
    };
    return (state = initialState, { type, payload }) => {
      switch (type) {
        // AUTH VERIFICATION REDUCERS
        case ActionTypes.AUTH_VERIFICATION_START:
          return {
            ...state,
            loading: true,
            isValidUser: null,
            loginToken: null,
            verificationErrorMessage: null,
            loginErrorMessage: null,
            loggedInSince: null,
          };
        case ActionTypes.AUTH_VERIFICATION_AVAILABLE:
          return {
            ...state,
            loading: false,
            isValidUser: true,
            verificationErrorMessage: null,
            authData: payload,
          };
        case ActionTypes.AUTH_VERIFICATION_SUCCESS:
          return {
            ...state,
            loading: false,
            isValidUser: true,
            verificationErrorMessage: null,
            loginToken: payload,
          };
        case ActionTypes.AUTH_VERIFICATION_ERROR:
          return {
            ...state,
            loading: false,
            verificationErrorMessage: payload,
            authData: null,
          };
        // LOGIN REDUCERS
        case ActionTypes.AUTH_LOGIN_START:
          return {
            ...state,
            loading: true,
            loginToken: null,
            loginErrorMessage: null,
            loggedInSince: null,
          };
        case ActionTypes.AUTH_LOGIN_SUCCESS:
          return {
            ...state,
            loading: false,
            loginToken: payload,
            loginErrorMessage: null,
            loggedInSince: new Date(),
          };
        case ActionTypes.AUTH_LOGIN_ERROR:
          return {
            ...state,
            loading: false,
            loggedInSince: null,
            loginToken: null,
            loginErrorMessage: payload,
          };
        case ActionTypes.AUTH_LOGOUT_SUCCESS:
          return {
            ...state,
            loading: false,
            loggedInSince: null,
            loginToken: null,
            loginErrorMessage: null,
          };
        case ActionTypes.AUTH_LOGOUT_ERROR:
          return {
            ...state,
            loading: false,
            loggedInSince: null,
            loginToken: null,
            loginErrorMessage: payload,
          };
        //  PASSWORD REDUCERS
        case ActionTypes.AUTH_REQUEST_PASSWORD_START:
          return {
            ...state,
            loading: true,
          };
        case ActionTypes.AUTH_REQUEST_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
          };
        case ActionTypes.AUTH_REQUEST_PASSWORD_ERROR:
          return {
            ...state,
            loading: false,
            loginErrorMessage: payload,
          };
        case ActionTypes.AUTH_CLEAN_VERIFICATION_ERROR:
          return { ...state, verificationErrorMessage: null };
        case ActionTypes.AUTH_CLEAN_LOGIN_ERROR:
          return { ...state, loginErrorMessage: null };
        case ActionTypes.AUTH_CLEAN_ERROR_MESSAGES:
          return { ...state, loginErrorMessage: null, verificationErrorMessage: null };

        default:
          return state;
      }
    };
  },

  /**
   * Selectors
   */

  selectAuthLoading: state => state.auth.loading,
  selectIsValidUser: state => state.auth.isValidUser,
  selectAuthenticationData: state => state.auth.authData,
  selectUserVerificationError: state => state.auth.verificationErrorMessage,
  selectUserLoginError: state => state.auth.loginErrorMessage,
  selectUserLogin: state => state.auth.loginToken,

  /**
   * Action Creators
   */

  /**
   * API call to commit user verification
   * we return the api call since we need the promise result in the component
   * @param {string}    emailVerificationToken The verification token from email
   * @return  {Promise}
   */
  doFetchUserVerification: emailVerificationToken => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.AUTH_VERIFICATION_START });
    return apiFetch({
      method: 'GET',
      endpoint: 'auth/validateUser',
      params: {
        token: emailVerificationToken,
      },
    })
      .then(result => {
        const { isValid, payload } = result;

        if (isValid) {
          dispatch({ type: ActionTypes.AUTH_VERIFICATION_AVAILABLE, payload });
        } else {
          dispatch({
            type: ActionTypes.AUTH_VERIFICATION_ERROR,
            payload: 'User or link not valid',
          });
          dispatch({ actionCreator: 'doUpdateUrl', args: ['/login'] });
        }

        return result;
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.AUTH_VERIFICATION_ERROR,
          payload: 'Error in account confirmation: User or link not valid',
        });
        dispatch({ actionCreator: 'doUpdateUrl', args: ['/login'] });
        throw err;
      });
  },

  /**
   * Set password for user account
   * verification token is needed
   *
   * @param   {Object}  data                    Data to setPassword just the password property
   * @param   {string}  emailVerificationToken  token for acount verification
   *
   * @return  {Promise}                          Return the promise where it is called
   */
  doSetPasswordOnVerification: (data, emailVerificationToken) => ({ dispatch, apiFetch }) => {
    return apiFetch({
      method: 'POST',
      endpoint: 'auth/confirmAccount',
      data,
      params: {
        token: emailVerificationToken,
      },
    })
      .then(result => {
        const { message, token } = result;
        if (token && message) {
          localStorage.setItem('token', `Bearer ${token}`);
          const { user } = jwtDecode(token);
          dispatch({ actionCreator: 'doSetUserData', args: [user] });
          dispatch({ actionCreator: 'doUpdateUrl', args: [roleHomeRedirect(user.role)] });
          dispatch({ type: ActionTypes.AUTH_VERIFICATION_SUCCESS, payload: token });
        }
        return result;
      })
      .catch(err => {
        dispatch({ type: ActionTypes.AUTH_VERIFICATION_ERROR, payload: err });
        throw err;
      });
  },

  /**
   * Log the user in the backend API
   * Expect to return the log in token
   * @param   {string}  email     [email description]
   * @param   {string}  password  [password description]
   *
   * @return  {Promise}            Return the promise if needed
   */
  doUserLogin: ({ email, password }) => ({ dispatch, apiFetch }) => {
    return apiFetch({
      method: 'POST',
      endpoint: 'auth/signIn',
      data: {
        email,
        password,
      },
    })
      .then(result => {
        const { token, message } = result;
        if (token && message) {
          localStorage.setItem('token', `Bearer ${token}`);
          const { user } = jwtDecode(token);
          dispatch({ actionCreator: 'doSetUserData', args: [user] });
          dispatch({ actionCreator: 'doUpdateUrl', args: [roleHomeRedirect(user.role)] });
          dispatch({ type: ActionTypes.AUTH_VERIFICATION_SUCCESS, payload: token });
        }

        return result;
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.AUTH_LOGIN_ERROR,
          payload: 'Email address or password is incorrect. Please try again.',
        });
        throw err;
      });
  },

  /**
   * Log the user out
   * by removing login token
   * and removing token stored in session Storage
   */
  doUserLogOut: () => ({ dispatch }) => {
    dispatch({ actionCreator: 'doUpdateUrl', args: ['/login'] });
    dispatch({ type: ActionTypes.AUTH_LOGOUT_SUCCESS });
    localStorage.removeItem('token');
    dispatch({ actionCreator: 'doClearUserData', args: [] });
  },

  doCleanAuthErrors: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.AUTH_CLEAN_ERROR_MESSAGES });
  },
  doCleanLoginError: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.AUTH_CLEAN_LOGIN_ERROR });
  },
  doCleanVerifyError: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.AUTH_CLEAN_VERIFICATION_ERROR });
  },
};
