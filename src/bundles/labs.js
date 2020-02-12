import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 300000;
const ActionTypes = {
  FETCH_START: 'FETCH_LABS_START',
  FETCH_ERROR: 'FETCH_LABS_ERROR',
  FETCH_SUCCESS: 'FETCH_LABS_SUCCESS',
  UPDATE_SUCCESS: 'UPDATE_LABS_SUCCESS',
  CREATE_SUCCESS: 'CREATE_LABS_SUCCESS',
  CREATE_ERROR: 'CREATE_LABS_ERROR',
  UPDATE_ERROR: 'UPDATE_LABS_ERROR',
};
const ROLE_ACCESS = ['ADMIN'];

export default {
  name: 'labs',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      error: null,
    };

    // Reducer
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.FETCH_START:
          return Object.assign({}, state, {
            loading: true,
          });
        case ActionTypes.FETCH_ERROR:
        case ActionTypes.CREATE_ERROR:
        case ActionTypes.UPDATE_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.CREATE_SUCCESS:
        case ActionTypes.UPDATE_SUCCESS:
        case ActionTypes.FETCH_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });
        default:
          return state;
      }
    };
  },

  // Selectors
  selectLabsDataRaw: state => state.labs,
  selectLabsData: state => state.labs.data,
  selectLabsList: createSelector('selectLabsDataRaw', labsData =>
    labsData.data ? Object.values(labsData.data) : [],
  ),
  selectCurrentLab: createSelector(
    'selectLabsData',
    'selectRouteParams',
    (labsData, routeParams) => {
      if (!labsData || !routeParams) {
        return null;
      }
      if (
        Object.prototype.hasOwnProperty.call(routeParams, 'labId') &&
        Object.prototype.hasOwnProperty.call(labsData, routeParams.labId)
      ) {
        return labsData[routeParams.labId];
      }
    },
  ),
  selectLabsErrorMessage: createSelector('selectLabsDataRaw', labsDataRaw =>
    labsDataRaw.error && labsDataRaw.error.message ? labsDataRaw.error.message : null,
  ),

  // Action Creators
  doFetchLabsList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: 'laboratories',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.results.reduce((acc, lab) => {
            acc[lab.id] = lab;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },
  doFetchLabDetails: labId => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: `laboratories/${labId}`,
      redirectOnNotFound: true,
    })
      .then(payload => {
        const labsData = getState().labs.data;
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: {
            ...labsData,
            [labId]: payload.labParticipant,
          },
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },
  doUpdateLabDetails: (labId, labObject) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    return apiFetch({
      method: 'patch',
      endpoint: `laboratories/${labId}`,
      data: labObject,
      alertOnFail: true,
    })
      .then(payload => {
        const labsData = getState().labs.data;
        dispatch({
          type: ActionTypes.UPDATE_SUCCESS,
          payload: {
            ...labsData,
            [labId]: payload,
          },
        });

        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: `Lab: ${labObject.laboratoryName} has been successfully updated`,
              title: 'LABORATORY INFORMATION',
            },
          ],
        });

        return payload;
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_ERROR, payload: error });
        throw error;
      });
  },
  doCreateLab: labObject => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    return apiFetch({
      method: 'post',
      endpoint: 'laboratories',
      data: labObject,
      alertOnFail: true,
    })
      .then(payload => {
        const labsData = getState().labs.data;
        dispatch({
          type: ActionTypes.CREATE_SUCCESS,
          payload: {
            ...labsData,
            [payload.id]: payload,
          },
        });
        // Move to edit page once it's created.
        dispatch({
          actionCreator: 'doUpdateUrl',
          args: [`/labs/edit/${payload.id}`],
        });

        return payload;
      })
      .catch(error => {
        dispatch({ type: ActionTypes.CREATE_ERROR, payload: 'Error trying to save a laboratory' });
        throw error;
      });
  },
  doDeleteLab: labId => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      method: 'delete',
      endpoint: `laboratories/${labId}`,
    })
      .then(() => {
        const labsData = getState().labs.data;
        delete labsData[labId];

        dispatch({
          type: ActionTypes.CREATE_SUCCESS,
          payload: labsData,
        });

        // Update store bundles that depends on lab ID
        // to avoid looping through unexisting lab or get unexisting lab's properties
        dispatch({ actionCreator: 'doFetchLabsList' });
        dispatch({ actionCreator: 'doFetchPocsList' });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  // Reactors
  reactShouldFetchLabsData: createSelector(
    'selectLabsDataRaw',
    'selectAppTime',
    'selectUserRole',
    (labsData, appTime, userRole) => {
      if (labsData.loading || !ROLE_ACCESS.includes(userRole)) {
        return null;
      }

      let shouldFetch = false;

      if (!labsData.data && !labsData.lastError) {
        shouldFetch = true;
      } else if (labsData.lastError) {
        const timePassed = appTime - labsData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (labsData.lastFetch) {
        const timePassed = appTime - labsData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchLabsList' };
      }
    },
  ),
  reactShouldFetchLabDetailsData: createSelector(
    'selectLabsDataRaw',
    'selectRouteParams',
    'selectAppTime',
    (labsData, routeParams, appTime) => {
      if (labsData.loading || !routeParams.labId) {
        return null;
      }

      let shouldFetch = false;

      if (
        (!labsData.data && !labsData.lastError) ||
        (labsData.data && !labsData.data[routeParams.labId] && !labsData.lastError) ||
        (labsData.data &&
          labsData.data[routeParams.labId] &&
          !labsData.data[routeParams.labId].address1)
      ) {
        shouldFetch = true;
      } else if (labsData.lastError) {
        const timePassed = appTime - labsData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (labsData.lastFetch) {
        const timePassed = appTime - labsData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchLabDetails', args: [routeParams.labId] };
      }
    },
  ),
};
