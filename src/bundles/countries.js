import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 1800000;
const UNITED_STATES = 'United States';
const ActionTypes = {
  FETCH_START: 'FETCH_COUNTRIES_START',
  FETCH_ERROR: 'FETCH_COUNTRIES_ERROR',
  FETCH_SUCCESS: 'FETCH_COUNTRIES_SUCCESS',
};

export default {
  name: 'countries',
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
  selectCountriesDataRaw: state => state.countries,
  selectCountriesData: state => state.countries.data,
  selectCountriesList: createSelector(
    'selectCountriesData',
    countries => {
      return countries ? Object.values(countries) : [];
    },
  ),
  selectCountriesErrorMessage: createSelector(
    'selectCountriesDataRaw',
    countriesDataRaw =>
      countriesDataRaw.error && countriesDataRaw.error.message
        ? countriesDataRaw.error.message
        : null,
  ),
  selectUnitedStatesValues: createSelector(
    'selectCountriesData',
    countriesData => {
      if (countriesData) {
        const [usValues] = countriesData
          ? Object.values(countriesData).filter(country => country.name === UNITED_STATES)
          : {};
        return usValues;
      }
      return {};
    },
  ),
  // Action Creators
  doFetchCountriesList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_START });
    apiFetch({
      endpoint: 'countries',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_SUCCESS,
          payload: payload.reduce((acc, countries) => {
            acc[countries.id] = countries;
            return acc;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: error });
      });
  },

  // Reactors
  reactShouldFetchCountriesData: createSelector(
    'selectCountriesDataRaw',
    'selectAppTime',
    (countries, appTime) => {
      if (countries.loading) {
        return null;
      }

      let shouldFetch = false;

      if (!countries.data && !countries.lastError) {
        shouldFetch = true;
      } else if (countries.lastError) {
        const timePassed = appTime - countries.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (countries.lastFetch) {
        const timePassed = appTime - countries.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchCountriesList' };
      }
    },
  ),
};
