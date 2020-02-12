import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 300000;
const ROLE_ACCESS = ['ADMIN'];

const ActionTypes = {
  FETCH_START: 'FETCH_POCS_START',
  FETCH_ERROR: 'FETCH_POCS_ERROR',
  FETCH_SUCCESS: 'FETCH_POCS_SUCCESS',
  FETCH_ALL_SUCCESS: 'FETCH_ALL_POCS_SUCCESS',
  UPDATE_SUCCESS: 'UPDATE_POCS_SUCCESS',
  CREATE_SUCCESS: 'CREATE_POCS_SUCCESS',
  FETCH_POC_SUCCESS: 'FETCH_POC_SUCCESS',
  FETCH_POC_ERROR: 'FETCH_POC_ERROR',
  CREATE_POC_ERROR: 'CREATE_POC_ERROR',
  UPDATE_POC_ERROR: 'UPDATE_POC_ERROR',
  DELETE_POC_SUCCESS: 'DELETE_POC_SUCCESS',
  DELETE_POC_ERROR: 'DELETE_POC_ERROR',
  CLEAN_POC_CREATE_ERROR: 'CLEAN_POC_CREATE_ERROR',
  CLEAN_POC_UPDATE_ERROR: 'CLEAN_POC_UPDATE_ERROR',
};

export default {
  name: 'pocs',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      errorMessage: null,
      poc: null,
      pocCreateError: null,
      pocUpdateError: null,
      pocDeleteErrorMessage: null,
      hasAll: false,
    };
    /**
      `data` structure:
      data: {
        [labId1]: {
          [pocId]: {pocObject},
        },
        [labId2]: {
          [pocId]: {pocObject},
        },
      }
    */

    // Reducer
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.FETCH_START:
          return Object.assign({}, state, {
            loading: true,
          });
        case ActionTypes.FETCH_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            errorMessage: payload,
          });
        case ActionTypes.FETCH_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            errorMessage: null,
            data: payload,
          });
        case ActionTypes.FETCH_ALL_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            errorMessage: null,
            data: payload,
            hasAll: true,
          });
        case ActionTypes.FETCH_POC_SUCCESS:
          return Object.assign({}, state, { poc: payload, lastFetch: Date.now() });
        case ActionTypes.FETCH_POC_ERROR:
          return Object.assign({}, state, {
            poc: null,
            lastError: Date.now(),
            errorMessage: payload,
          });
        case ActionTypes.CREATE_SUCCESS:
          return {
            ...state,
            pocCreateError: null,
            loading: false,
            lastError: null,
            data: payload,
          };
        case ActionTypes.UPDATE_SUCCESS:
          return {
            ...state,
            pocUpdateError: null,
            loading: false,
            lastError: null,
            data: payload,
          };
        case ActionTypes.CREATE_POC_ERROR:
          return {
            ...state,
            loading: false,
            lastError: Date.now(),
            pocCreateError: payload,
          };
        case ActionTypes.UPDATE_POC_ERROR:
          return {
            ...state,
            loading: false,
            lastError: Date.now(),
            pocUpdateError: payload,
          };
        case ActionTypes.DELETE_POC_SUCCESS:
          return {
            ...state,
            pocDeleteErrorMessage: null,
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            errorMessage: null,
            data: payload,
          };
        case ActionTypes.DELETE_POC_ERROR:
          return {
            ...state,
            lastError: Date.now(),
            loading: false,
            pocDeleteErrorMessage: payload,
          };
        case ActionTypes.CLEAN_POC_CREATE_ERROR:
          return {
            ...state,
            pocCreateError: null,
          };
        case ActionTypes.CLEAN_POC_UPDATE_ERROR:
          return {
            ...state,
            pocUpdateError: null,
          };
        default:
          return state;
      }
    };
  },

  // Selectors
  selectPocsDataRaw: state => state.pocs,
  selectPocsFetchError: state => state.pocs.errorMessage,
  selectIsLoadingPocs: state => state.pocs.loading,
  selectHasAllPocs: state => state.pocs.hasAll,
  selectPocsData: state => state.pocs.data,
  selectPocsList: createSelector(
    'selectPocsDataRaw',
    pocDataRaw => {
      if (pocDataRaw.data) {
        return Object.values(pocDataRaw.data).reduce(
          (acc, labPocs) => acc.concat(Object.values(labPocs)),
          [],
        );
      }
    },
  ),
  selectCurrentLabPocs: createSelector(
    'selectPocsDataRaw',
    'selectRouteParams',
    (pocsData, routeParams) => {
      if (!routeParams.labId || !pocsData.data || !pocsData.data[routeParams.labId]) {
        return null;
      }

      return Object.values(pocsData.data[routeParams.labId]) || [];
    },
  ),
  selectPoc: state => state.pocs.poc,

  selectPocCreateErrorRaw: state => state.pocs.pocCreateError,
  selectPocUpdateErrorRaw: state => state.pocs.pocUpdateError,
  selectPocCreateErrorMessage: createSelector(
    'selectPocCreateErrorRaw',
    pocCreateErrorRaw => {
      if (pocCreateErrorRaw && pocCreateErrorRaw.message) {
        return pocCreateErrorRaw.message;
      }
      return null;
    },
  ),
  selectPocUpdateErrorMessage: createSelector(
    'selectPocUpdateErrorRaw',
    pocUpdateErrorRaw => {
      if (pocUpdateErrorRaw && pocUpdateErrorRaw.message) {
        return pocUpdateErrorRaw.message;
      }
      return null;
    },
  ),

  // Action Creators

  doFetchPocsList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: `pocs`,
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_ALL_SUCCESS,
          payload: payload.results.reduce((acc, poc) => {
            if (!acc[poc.LabParticipantId]) {
              acc[poc.LabParticipantId] = {};
            }
            acc[poc.LabParticipantId][poc.id] = poc;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },
  doFetchPocDetails: (labId, pocId) => ({ dispatch, apiFetch }) => {
    apiFetch({ endpoint: `laboratories/${labId}/pocs/${pocId}` })
      .then(payload => {
        dispatch({ type: ActionTypes.FETCH_POC_SUCCESS, payload });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_POC_ERROR, payload: error });
      });
  },
  doFetchLabPocsList: labId => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: `laboratories/${labId}/pocs`,
    })
      .then(payload => {
        const pocsData = getState().pocs.data || {};
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: {
            ...pocsData,
            ...payload.results.reduce(
              (acc, poc) => {
                acc[labId][poc.id] = poc;
                return acc;
              },
              { [labId]: {} },
            ),
          },
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },
  doCreateLabPoc: (labId, pocObject) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    return apiFetch({
      method: 'post',
      endpoint: `laboratories/${labId}/pocs`,
      data: pocObject,
    })
      .then(payload => {
        const pocsData = getState().pocs.data;
        dispatch({
          type: ActionTypes.CREATE_SUCCESS,
          payload: {
            ...pocsData,
            [labId]: {
              ...pocsData[labId],
              [payload.id]: payload,
            },
          },
        });
        return payload;
      })
      .catch(error => {
        // console.log(error);
        dispatch({ type: ActionTypes.CREATE_POC_ERROR, payload: error });
        throw error;
      });
  },
  doUpdateLabPocDetails: (pocId, labId, pocObject) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    return apiFetch({
      method: 'patch',
      endpoint: `laboratories/${labId}/pocs/${pocId}`,
      data: pocObject,
    })
      .then(payload => {
        const pocsData = getState().pocs.data || {};
        dispatch({
          type: ActionTypes.UPDATE_SUCCESS,
          payload: {
            ...pocsData,
            [labId]: {
              ...pocsData[labId],
              [pocId]: payload,
            },
          },
        });
        dispatch({ type: ActionTypes.FETCH_POC_SUCCESS, payload });
        return payload;
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_POC_ERROR, payload: error });
        throw error;
      });
  },
  doSetLabPocPrimary: (pocId, labId) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      method: 'patch',
      endpoint: `laboratories/${labId}/pocs/${pocId}`,
      data: {
        primaryPOC: true,
      },
    })
      .then(payload => {
        const pocsData = getState().pocs.data;
        Object.keys(pocsData[labId]).map(poc => {
          pocsData[labId][poc].primaryPOC = false;
          return poc;
        });
        dispatch({
          type: ActionTypes.UPDATE_SUCCESS,
          payload: {
            ...pocsData,
            [labId]: {
              ...pocsData[labId],
              [pocId]: payload,
            },
          },
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_POC_ERROR, payload: error });
      });
  },
  doDeleteLabPoc: (pocId, labId) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      method: 'delete',
      endpoint: `laboratories/${labId}/pocs/${pocId}`,
    })
      .then(() => {
        const pocsData = getState().pocs.data;
        delete pocsData[labId][pocId];

        dispatch({
          type: ActionTypes.DELETE_POC_SUCCESS,
          payload: pocsData,
        });

        // After POC delete throw an alert
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            { msg: 'Point of Contact deleted successfully!', title: 'Point of contact deleted' },
          ],
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.DELETE_POC_ERROR, payload: error });

        // Dispatch an alert if request failed
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [{ msg: 'Point of Contact could not be deleted', title: 'Error on operation' }],
        });
      });
  },

  doCleanCreatePocError: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.CLEAN_POC_CREATE_ERROR });
  },
  doCleanUpdatePocError: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.CLEAN_POC_UPDATE_ERROR });
  },

  // Reactors
  reactShouldFetchLabPocsData: createSelector(
    'selectPocsDataRaw',
    'selectRouteParams',
    'selectAppTime',
    (pocsData, routeParams, appTime) => {
      if (pocsData.loading || !routeParams.labId) {
        return null;
      }

      let shouldFetch = false;

      if (
        (!pocsData.data && !pocsData.lastError) ||
        (pocsData.data && !pocsData.data[routeParams.labId])
      ) {
        shouldFetch = true;
      } else if (pocsData.lastError) {
        const timePassed = appTime - pocsData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (pocsData.lastFetch) {
        const timePassed = appTime - pocsData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchLabPocsList', args: [routeParams.labId] };
      }
    },
  ),

  reactShouldFetchAllPocsData: createSelector(
    'selectPocsDataRaw',
    'selectPathname',
    'selectAppTime',
    'selectUserRole',
    (pocsData, pathname, appTime, userRole) => {
      if (pocsData.loading || pathname !== '/users' || !ROLE_ACCESS.includes(userRole)) {
        return null;
      }

      let shouldFetch = false;

      if (
        (!pocsData.data && !pocsData.lastError) ||
        (pocsData.data && !pocsData.lastError && !pocsData.hasAll)
      ) {
        shouldFetch = true;
      } else if (pocsData.lastError) {
        const timePassed = appTime - pocsData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (pocsData.lastFetch) {
        const timePassed = appTime - pocsData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchPocsList', args: [] };
      }
    },
  ),

  reactShouldFetchPocDetails: createSelector(
    'selectRouteParams',
    'selectPocsDataRaw',
    (routeParams, pocsData) => {
      const { labId, pocId } = routeParams;
      let shouldFetchPocInfo = false;

      if (!labId || !pocId) {
        return null;
      }

      if (!pocsData.poc && !pocsData.lastError) {
        shouldFetchPocInfo = true;
      } else if (pocsData.poc && pocsData.poc.id && pocsData.poc.id !== parseInt(pocId, 10)) {
        shouldFetchPocInfo = true;
      }

      if (shouldFetchPocInfo) {
        return { actionCreator: 'doFetchPocDetails', args: [labId, pocId] };
      }
    },
  ),
};
