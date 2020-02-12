import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 1800000;

const ActionTypes = {
  FETCH_START: 'FETCH_WHO_NETWORK_START',
  FETCH_ERROR: 'FETCH_WHO_NETWORK_ERROR',
  FETCH_SUCCESS: 'FETCH_WHO_NETWORK_SUCCESS',
};

export default {
  name: 'whoNetworkLabCategories',
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
  selectWhoNetworkLabCategoriesDataRaw: state => state.whoNetworkLabCategories,
  selectWhoNetworkLabCategoriesData: state => state.whoNetworkLabCategories.data,
  selectWhoNetworkLabCategoriesList: createSelector(
    'selectWhoNetworkLabCategoriesData',
    whoNetworkData => {
      return whoNetworkData ? Object.values(whoNetworkData) : [];
    },
  ),
  selectWhoNetworkLabCategoriesErrorMessage: createSelector(
    'selectWhoNetworkLabCategoriesDataRaw',
    whoNetworkLabCategoriesDataRaw =>
      whoNetworkLabCategoriesDataRaw.error && whoNetworkLabCategoriesDataRaw.error.message
        ? whoNetworkLabCategoriesDataRaw.error.message
        : null,
  ),

  // Action Creators
  doFetchWhoNetworkLabCategoriesList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: 'whoNetworks',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.reduce((acc, whoNetworkLabCategory) => {
            acc[whoNetworkLabCategory.id] = whoNetworkLabCategory;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  // Reactors
  reactShouldFetchWhoNetworkLabCategoriesData: createSelector(
    'selectWhoNetworkLabCategoriesDataRaw',
    'selectAppTime',
    (whoNetworkData, appTime) => {
      if (whoNetworkData.loading) {
        return null;
      }

      let shouldFetch = false;

      if (!whoNetworkData.data && !whoNetworkData.lastError) {
        shouldFetch = true;
      } else if (whoNetworkData.lastError) {
        const timePassed = appTime - whoNetworkData.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (whoNetworkData.lastFetch) {
        const timePassed = appTime - whoNetworkData.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchWhoNetworkLabCategoriesList' };
      }
    },
  ),
};
