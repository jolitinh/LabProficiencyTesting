import { createSelector } from 'redux-bundler';

const ActionTypes = {
  // Password - Reset
  REQUEST_PASSWORD_START: 'REQUEST_PASSWORD_START',
  REQUEST_PASSWORD_SUCCESS: 'REQUEST_PASSWORD_SUCCESS',
  REQUEST_PASSWORD_ERROR: 'REQUEST_PASSWORD_ERROR',
  // Validate - User
  VALIDATE_USER_START: 'VALIDATE_USER_START',
  VALIDATE_USER_SUCCESS: 'VALIDATE_USER_SUCCESS',
  VALIDATE_USER_ERROR: 'VALIDATE_USER_ERROR',
  // Reset - Password
  RESET_USER_PASSWORD_START: 'RESET_USER_PASSWORD_START',
  RESET_USER_PASSWORD_SUCCESS: 'RESET_USER_PASSWORD_SUCCESS',
  RESET_USER_PASSWORD_ERROR: 'RESET_USER_PASSWORD_ERROR',
};

export default {
  name: 'passwordReset',
  getReducer: () => {
    const initialState = {
      loading: false,
      error: null,
      data: null,
      isValidUser: false,
    };
    return (state = initialState, { type, payload }) => {
      switch (type) {
        //  PASSWORD REDUCERS
        case ActionTypes.REQUEST_PASSWORD_START:
        case ActionTypes.VALIDATE_USER_START:
        case ActionTypes.RESET_USER_PASSWORD_START:
          return {
            ...state,
            loading: true,
            error: null,
          };
        case ActionTypes.VALIDATE_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            isValidUser: true,
            error: null,
          };
        case ActionTypes.REQUEST_PASSWORD_SUCCESS:
        case ActionTypes.RESET_USER_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            data: payload,
            error: null,
          };
        case ActionTypes.VALIDATE_USER_ERROR:
          return {
            ...state,
            loading: false,
            error: payload,
            isValidUser: false,
          };
        case ActionTypes.REQUEST_PASSWORD_ERROR:
        case ActionTypes.RESET_USER_PASSWORD_ERROR:
          return {
            ...state,
            loading: false,
            error: payload,
          };

        default:
          return state;
      }
    };
  },

  /**
   * Selectors
   */

  selectPasswordResetLoading: state => state.passwordReset.loading,
  selectPasswordResetData: state => state.passwordReset.data,
  selectPasswordResetError: state => state.passwordReset.error,
  selectPasswordResetValidUser: state => state.passwordReset.isValidUser,
  selectPasswordResetErrorMessage: createSelector(
    'selectPasswordResetError',
    passwordResetError =>
      passwordResetError && passwordResetError.message ? passwordResetError.message : null,
  ),

  /**
   * Action Creators
   */

  /**
   * Do request a new password, so let's send the email of the user
   */
  doRequestNewPassword: ({ email }) => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.REQUEST_PASSWORD_SUCCESS });
    return apiFetch({
      method: 'POST',
      endpoint: 'auth/password/requestReset',
      data: {
        email,
      },
    })
      .then(result => {
        const { message } = result;
        dispatch({ type: ActionTypes.REQUEST_PASSWORD_SUCCESS, payload: message });
        return result;
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.REQUEST_PASSWORD_ERROR,
          payload: err,
        });
        throw err;
      });
  },
  // TODO: Action creator for checking if the user is valid
  doFetchValidUserForReset: verificationToken => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.VALIDATE_USER_START });
    return apiFetch({
      method: 'GET',
      endpoint: 'auth/password/reset',
      params: {
        token: verificationToken,
      },
    })
      .then(result => {
        const { message } = result;
        dispatch({ type: ActionTypes.VALIDATE_USER_SUCCESS, payload: message });
        return result;
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.VALIDATE_USER_ERROR,
          payload: {
            ...err,
            message:
              'The password reset link has expired. Please enter your email address to receive a new one.',
          },
        });
        throw err;
      });
  },
  doSetNewPassword: (data, emailVerificationToken) => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.RESET_USER_PASSWORD_START });
    return apiFetch({
      method: 'POST',
      endpoint: 'auth/password/reset',
      data,
      params: {
        token: emailVerificationToken,
      },
    })
      .then(result => {
        const { message } = result;
        dispatch({ type: ActionTypes.RESET_USER_PASSWORD_SUCCESS, payload: message });
        return result;
      })
      .catch(err => {
        dispatch({
          type: ActionTypes.RESET_USER_PASSWORD_ERROR,
          // payload: err TODO: Once axios return the response data
          payload: 'Error trying to set a new password',
        });
        throw err;
      });
  },
};
