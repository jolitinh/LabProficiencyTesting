/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 300000;
const ROLE_ACCESS = ['ADMIN'];
const ActionTypes = {
  FETCH_STUDIES_START: 'FETCH_STUDIES_START',
  FETCH_STUDIES_ERROR: 'FETCH_STUDIES_ERROR',
  FETCH_STUDIES_SUCCESS: 'FETCH_STUDIES_SUCCESS',
  CREATE_STUDIES_SUCCESS: 'CREATE_STUDIES_SUCCESS',
  UPDATE_STUDIES_SUCCESS: 'UPDATE_STUDIES_SUCCESS',
  CREATE_STUDIES_ERROR: 'CREATE_STUDIES_ERROR',
  UPDATE_STUDIES_ERROR: 'UPDATE_STUDIES_ERROR',
  CLEAN_STUDIES_ERROR: 'CLEAN_STUDIES_ERROR',
};

export default {
  name: 'studies',
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
        case ActionTypes.FETCH_STUDIES_START:
          return Object.assign({}, state, {
            loading: true,
          });
        case ActionTypes.FETCH_STUDIES_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.FETCH_STUDIES_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });
        case ActionTypes.CREATE_STUDIES_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.CREATE_STUDIES_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });
        case ActionTypes.CLEAN_STUDIES_ERROR:
          return Object.assign({}, state, {
            error: null,
          });

        default:
          return state;
      }
    };
  },

  // Selectors
  selectStudiesDataRaw: state => state.studies,
  selectStudiesData: state => state.studies.data,
  selectStudiesList: createSelector('selectStudiesData', studies => {
    return studies ? Object.values(studies) : [];
  }),
  selectCurrentStudy: createSelector(
    'selectStudiesData',
    'selectRouteParams',
    (studies, routeParams) => {
      if (!studies || !routeParams) {
        return null;
      }
      if (
        Object.prototype.hasOwnProperty.call(routeParams, 'id') &&
        Object.prototype.hasOwnProperty.call(studies, routeParams.id)
      ) {
        return studies[routeParams.id];
      }
    },
  ),

  selectStudiesErrorMessage: createSelector('selectStudiesDataRaw', studiesError => {
    return studiesError.error && studiesError.error.message ? studiesError.error.message : null;
  }),

  // Action Creators
  doCreateStudy: studiesObject => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_STUDIES_START });
    return apiFetch({
      endpoint: 'studies',
      method: 'POST',
      data: studiesObject,
    })
      .then(payload => {
        const studiesData = getState().studies.data;
        dispatch({
          type: ActionTypes.CREATE_STUDIES_SUCCESS,
          payload: { ...studiesData, [payload.id]: payload },
        });
        dispatch({
          actionCreator: 'doUpdateUrl',
          args: ['/studies'],
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: `The Study has been successfully created`,
              title: 'Study Information',
            },
          ],
        });
        return payload;
      })
      .catch(error => {
        dispatch({ type: ActionTypes.CREATE_STUDIES_ERROR, payload: error });
        throw error;
      });
  },

  doFetchStudiesList: () => ({ dispatch, apiFetch, store }) => {
    dispatch({ type: ActionTypes.FETCH_STUDIES_START });
    const selectCurrentStudy = store.selectCurrentStudy();
    apiFetch({
      endpoint: 'studies',
      method: 'GET',
    })
      .then(payload => {
        const { Tests, enrollLabs } = selectCurrentStudy || {};

        /**
         *  The conditions bellow, were set since the reactor calls
         * doFetchStudiesList so the Test and enrollLabs were
         * from the selectCurrentStory were deleted.
         */
        const data = payload.results.reduce((res, study) => {
          res[study.id] =
            selectCurrentStudy && selectCurrentStudy.id === study.id
              ? { ...study, Tests, enrollLabs }
              : (res[study.id] = study);
          return res;
        }, {});
        dispatch({
          type: ActionTypes.FETCH_STUDIES_SUCCESS,
          payload: data,
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_STUDIES_ERROR,
          payload: error,
        });
      });
  },

  doUpdateStudyDetails: (id, study) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_STUDIES_START });
    return apiFetch({
      method: 'patch',
      endpoint: `studies/${id}`,
      data: study,
      alertOnFail: true,
    })
      .then(payload => {
        const studies = getState().studies.data;
        dispatch({
          type: ActionTypes.UPDATE_STUDIES_SUCCESS,
          payload: {
            ...studies,
            [id]: payload,
          },
        });
        dispatch({ actionCreator: 'doFetchStudyDetails', args: [id] });
        dispatch({ actionCreator: 'doFetchStudiesList', args: [] });

        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: `The Study has been successfully updated`,
              title: 'Study Information',
            },
          ],
        });

        return payload;
      })
      .catch(error => {
        dispatch({ type: ActionTypes.UPDATE_STUDIES_ERROR, payload: error });
        throw error;
      });
  },

  doFetchStudyDetails: id => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_STUDIES_START });
    const studyDetails = apiFetch({
      endpoint: `studies/${id}`,
      redirectOnNotFound: true,
    });

    const studyEnrollments = apiFetch({
      endpoint: `studies/${id}/enrollments`,
      redirectOnNotFound: true,
    });

    Promise.all([studyDetails, studyEnrollments])
      .then(values => {
        const [studyDetailsData, studyEnrollmentsData] = [...values];
        const studiesData = getState().studies.data;

        const payload = {
          ...studiesData,
          [id]: { ...studyDetailsData, enrollLabs: studyEnrollmentsData.results },
        };

        dispatch({
          type: ActionTypes.FETCH_STUDIES_SUCCESS,
          payload,
        });
      })

      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_STUDIES_ERROR, payload: error });
      });
  },

  doCleanStudiesError: () => ({ dispatch }) => {
    dispatch({ type: ActionTypes.CLEAN_STUDIES_ERROR });
  },

  // // Reactors
  reactShouldFetchStudiesData: createSelector(
    'selectStudiesDataRaw',
    'selectAppTime',
    'selectUserRole',
    (studies, appTime, userRole) => {
      if (studies.loading || !ROLE_ACCESS.includes(userRole)) {
        return null;
      }

      let shouldFetch = false;

      if (!studies.data && !studies.lastError) {
        shouldFetch = true;
      } else if (studies.lastError) {
        const timePassed = appTime - studies.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (studies.lastFetch) {
        const timePassed = appTime - studies.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchStudiesList' };
      }
    },
  ),
};
