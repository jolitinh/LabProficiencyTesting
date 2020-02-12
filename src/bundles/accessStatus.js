import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 600000;
const ROLE_ACCESS = ['ADMIN'];

/**
 * Redux Action Types
 * @type {Object}
 * @property {string} FETCH_START
 * @property {string} FETCH_ERROR
 * @property {string} FETCH_SUCCESS
 */
const ActionTypes = {
  FETCH_START: 'FETCH_STATUS_START',
  FETCH_ERROR: 'FETCH_STATUS_ERROR',
  FETCH_SUCCESS: 'FETCH_STATUS_SUCCESS',
};

export default {
  name: 'accessStatus',
  getReducer: () => {
    /** The inital state of the bundle */
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      error: null,
    };

    /** The reducer */
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.FETCH_START:
          return { ...state, loading: true };

        case ActionTypes.FETCH_SUCCESS:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          };

        case ActionTypes.FETCH_ERROR:
          return {
            ...state,
            lastError: Date.now(),
            loading: false,
            error: payload,
          };

        default:
          return state;
      }
    };
  },

  /** Selectors */
  selectAccessStatusDataRaw: state => state.accessStatus,
  selectAccessStatusData: state => state.accessStatus.data,
  selectAccessStatusList: createSelector(
    'selectAccessStatusDataRaw',
    accessStatusData => {
      return accessStatusData.data && Object.values(accessStatusData.data).length !== 0
        ? Object.values(accessStatusData.data)
        : [];
    },
  ),
  selectAccessStatusErrorMessage: createSelector(
    'selectAccessStatusDataRaw',
    accessStatusDataRaw =>
      accessStatusDataRaw.error && accessStatusDataRaw.error.message
        ? accessStatusDataRaw.message
        : null,
  ),

  /** Actions Creators */
  doFetchAccessStatusList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });

    apiFetch({
      endpoint: 'accessStatus',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.reduce((statuses, status) => {
            // eslint-disable-next-line no-param-reassign
            statuses[status.id] = status;
            return statuses;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  /** Reactors */
  reactShouldFetchAccessStatusData: createSelector(
    'selectAccessStatusDataRaw',
    'selectAppTime',
    'selectUserRole',
    (accessStatusData, appTime, userRole) => {
      if (accessStatusData.loading || !ROLE_ACCESS.includes(userRole)) {
        return null;
      }

      let shouldFetch = false;

      if (!accessStatusData.data && !accessStatusData.lastError) {
        shouldFetch = true;
      } else if (accessStatusData.lastError) {
        const elapsedTime = appTime - accessStatusData.lastError;
        if (elapsedTime > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (accessStatusData.lastFetch) {
        const elapsedTime = appTime - accessStatusData.lastFetch;
        if (elapsedTime > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchAccessStatusList' };
      }
    },
  ),
};
