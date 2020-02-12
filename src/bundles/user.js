import jwtDecode from 'jwt-decode';
import { createSelector } from 'redux-bundler';

const ActionTypes = {
  FETCH_USER_START: 'FETCH_USER_START',
  FETCH_USER_ERROR: 'FETCH_USER_ERROR',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_PROFILE_SUCCESS: 'FETCH_USER_PROFILE_SUCCESS',
  FETCH_USER_PROFILE_ERROR: 'FETCH_USER_PROFILE_ERROR',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  UPDATE_USER_PROFILE_ERROR: 'UPDATE_USER_PROFILE_ERROR',
  UPDATE_USER_CREDENTIALS: 'UPDATE_USER_CREDENTIALS',
  UPDATE_USER_CREDENTIALS_ERROR: 'UPDATE_USER_CREDENTIALS_ERROR',
  CLEAR: 'CLEAR_USER',
};

const { user } = localStorage.getItem('token')
  ? jwtDecode(localStorage.getItem('token'))
  : { user: null };

export default {
  name: 'user',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: user,
      profile: null,
      error: null,
    };

    // Reducer
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.FETCH_USER_START:
          return {
            ...state,
            loading: true,
          };
        case ActionTypes.FETCH_USER_ERROR:
          return {
            ...state,
            lastError: Date.now(),
            loading: false,
            error: payload,
          };
        case ActionTypes.FETCH_USER_SUCCESS:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          };

        case ActionTypes.FETCH_USER_PROFILE_SUCCESS:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            profile: payload,
          };

        case ActionTypes.FETCH_USER_PROFILE_ERROR:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: Date.now(),
            error: payload,
          };

        case ActionTypes.UPDATE_USER_PROFILE:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            profile: payload,
          };

        case ActionTypes.UPDATE_USER_PROFILE_ERROR:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: Date.now(),
            error: payload,
          };

        case ActionTypes.UPDATE_USER_CREDENTIALS:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            profile: payload,
          };

        case ActionTypes.UPDATE_USER_CREDENTIALS_ERROR:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: Date.now(),
            error: payload,
          };

        case ActionTypes.CLEAR:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: null,
          };
        default:
          return state;
      }
    };
  },

  // Selectors
  selectUserDataRaw: state => state.user,
  selectUserData: state => state.user.data,
  selectUserError: state => state.user.error,
  selectUserRole: createSelector('selectUserData', userData => (userData ? userData.role : null)),
  selectUserProfile: state => state.user.profile,
  selectUserErrorMessage: createSelector('selectUserError', userError =>
    userError && userError.message ? userError.message : null,
  ),

  // First Profile Form selector
  selectUserProfileBasicInformation: createSelector('selectUserProfile', userProfile => {
    if (userProfile) {
      return {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phoneNumber: userProfile.phoneNumber,
        countryCode: userProfile.countryCode,
        email: userProfile.email,
        title: userProfile.title,
      };
    }
    return null;
  }),

  // Second Profile Form selector
  selectUserLoginInfo: createSelector('selectUserProfile', userLoginInfo => {
    if (userLoginInfo) {
      return {
        email: userLoginInfo.email,
      };
    }
    return null;
  }),

  // Third Profile Form selector
  selectUserLabInfo: createSelector('selectUserProfile', userLabInfo => {
    if (userLabInfo && userLabInfo.role && userLabInfo.role.LabParticipant) {
      return {
        ...userLabInfo.role.LabParticipant,
      };
    }
    return null;
  }),

  selectUserHasLabPermission: createSelector(
    'selectUserRole',
    'selectUserProfile',
    (userRole, userProfile) => {
      if (userRole === 'ADMIN') return true;
      if (userRole === 'POC' && userProfile && userProfile.role) {
        return !!userProfile.role.primaryPOC;
      }
      return false;
    },
  ),

  // Action Creators
  doSetUserData: payload => ({ dispatch }) => {
    dispatch({ type: ActionTypes.FETCH_USER_SUCCESS, payload });
  },
  doClearUserData: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.CLEAR });
  },

  //  this section is for the profile page
  doFetchUserProfile: id => ({ dispatch, apiFetch }) => {
    return apiFetch({
      endpoint: `users/${id}`,
      method: 'GET',
    })
      .then(res => {
        dispatch({
          type: ActionTypes.FETCH_USER_PROFILE_SUCCESS,
          payload: res,
        });
        return res;
      })
      .catch(e => {
        dispatch({
          type: ActionTypes.FETCH_USER_PROFILE_ERROR,
          payload: e,
        });
        throw e;
      });
  },

  doUpdateUserProfile: (id, data) => ({ dispatch, apiFetch, getState }) => {
    return apiFetch({
      endpoint: `users/${id}`,
      method: 'PATCH',
      data,
    })
      .then(res => {
        const { profile } = getState().user;
        dispatch({
          type: ActionTypes.UPDATE_USER_PROFILE,
          payload: { ...profile, ...res },
        });

        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: 'The information has been successfully updated.',
              title: 'PERSONAL INFORMATION',
            },
          ],
        });

        return res;
      })
      .catch(e => {
        const { message } = e;
        dispatch({
          type: ActionTypes.UPDATE_USER_PROFILE_ERROR,
          payload: e,
          // payload: 'An unexpected error has occurred while updating this profile.',
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: message,
              title: 'Error updating profile information.',
            },
          ],
        });
        throw e;
      });
  },

  doUpdateUserPassword: data => ({ dispatch, apiFetch, getState }) => {
    return apiFetch({
      endpoint: `users/credentials`,
      method: 'PATCH',
      data,
    })
      .then(res => {
        const { profile } = getState().user;
        dispatch({
          type: ActionTypes.UPDATE_USER_CREDENTIALS,
          payload: { ...profile, ...res },
        });

        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: 'Password has been successfully updated.',
              title: 'PASSWORD RESET',
            },
          ],
        });
        return res;
      })
      .catch(e => {
        dispatch({
          type: ActionTypes.UPDATE_USER_CREDENTIALS_ERROR,
          payload: e,
          // payload: 'An unexpected error has occurred while updating the credentials.',
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: 'An unexpected error has occurred while updating this password.',
              title: 'PASSWORD RESET',
            },
          ],
        });
        throw e;
      });
  },

  // Reactors
  reactShouldFetchUserLabInfo: createSelector(
    'selectUserData',
    'selectUserRole',
    'selectUserLabInfo',
    (userData, userRole, userLabInfo) => {
      if (!userData || !userRole || userRole !== 'POC') return null;
      let shouldFetch = false;

      if (userData && !userLabInfo) {
        shouldFetch = true;
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchUserProfile', args: [userData.id] };
      }
    },
  ),
};
