import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 1800000;
const ActionTypes = {
  FETCH_START: 'FETCH_STATES_START',
  FETCH_ERROR: 'FETCH_STATES_ERROR',
  FETCH_SUCCESS: 'FETCH_STATES_SUCCESS',
};

export default {
  name: 'states',
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
  selectStatesDataRaw: state => state.states,
  selectStatesData: state => state.states.data,
  selectStatesList: createSelector(
    'selectStatesData',
    statesData => {
      return statesData ? Object.values(statesData) : [];
    },
  ),
  selectStatesErrorMessage: createSelector(
    'selectStatesDataRaw',
    statesDataRaw =>
      statesDataRaw.error && statesDataRaw.error.message ? statesDataRaw.error.message : null,
  ),

  // Action Creators
  doFetchStatesList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: 'states',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.reduce((acc, states) => {
            acc[states.id] = states;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  // Reactors
  reactShouldFetchStatesData: createSelector(
    'selectStatesDataRaw',
    'selectAppTime',
    (states, appTime) => {
      if (states.loading) {
        return null;
      }

      let shouldFetch = false;

      if (!states.data && !states.lastError) {
        shouldFetch = true;
      } else if (states.lastError) {
        const timePassed = appTime - states.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (states.lastFetch) {
        const timePassed = appTime - states.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchStatesList' };
      }
    },
  ),
};
