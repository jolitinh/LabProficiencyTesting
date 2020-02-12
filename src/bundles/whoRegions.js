import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 1800000;
const ActionTypes = {
  FETCH_START: 'FETCH_WHO_START',
  FETCH_ERROR: 'FETCH_WHO_ERROR',
  FETCH_SUCCESS: 'FETCH_WHO_SUCCESS',
};

export default {
  name: 'whoRegions',
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
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
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
  selectWhoRegionsDataRaw: state => state.whoRegions,
  selectWhoRegionsData: state => state.whoRegions.data,
  selectWhoRegionsList: createSelector(
    'selectWhoRegionsData',
    whoData => {
      return whoData ? Object.values(whoData) : [];
    },
  ),
  selectWhoRegionsErrorMessage: createSelector(
    'selectWhoRegionsDataRaw',
    whoRegionsDataRaw =>
      whoRegionsDataRaw.error && whoRegionsDataRaw.error.message
        ? whoRegionsDataRaw.error.message
        : null,
  ),

  // Action Creators
  doFetchWhoRegionsList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: 'whoRegions',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.reduce((acc, whoRegion) => {
            acc[whoRegion.id] = whoRegion;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  // Reactors
  reactShouldFetchWhoRegionsData: createSelector(
    'selectWhoRegionsDataRaw',
    'selectAppTime',
    (whoData, appTime) => {
      if (whoData.loading) {
        return null;
      }

      let shouldFetch = false;

      if (!whoData.data && !whoData.lastError) {
        shouldFetch = true;
      } else if (whoData.lastError) {
        const timePassed = appTime - whoData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (whoData.lastFetch) {
        const timePassed = appTime - whoData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchWhoRegionsList' };
      }
    },
  ),
};
