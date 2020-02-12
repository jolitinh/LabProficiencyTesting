/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import { createSelector } from 'redux-bundler';

const ERROR_TIME = 15000;
const REFRESH_TIME = 300000;
const ActionTypes = {
  FETCH_ENROLLMENTS_START: 'FETCH_ENROLLMENTS_START',
  FETCH_ENROLLMENTS_ERROR: 'FETCH_ENROLLMENTS_ERROR',
  FETCH_ENROLLMENTS_SUCCESS: 'FETCH_ENROLLMENTS_SUCCESS',
  FETCH_ENROLLABLE_SUCCESS: 'FETCH_ENROLLABLE_SUCCESS',
  UPDATE_SHIPPING_STATUS: 'UPDATE_SHIPPING_STATUS',
  UPDATE_SHIPPING_STATUS_ERROR: 'UPDATE_SHIPPING_STATUS_ERROR',
  CREATE_ENROLLMENTS_SUCCESS: 'CREATE_ENROLLMENTS_SUCCESS',
  UPDATE_ENROLLMENTS_SUCCESS: 'UPDATE_ENROLLMENTS_SUCCESS',
  CREATE_ENROLLMENTS_ERROR: 'CREATE_ENROLLMENTS_ERROR',
  UPDATE_ENROLLMENTS_ERROR: 'UPDATE_ENROLLMENTS_ERROR',
};

export default {
  name: 'enrollment',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      enrollable: null,
      error: null,
    };

    // Reducer
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.FETCH_ENROLLMENTS_START:
          return Object.assign({}, state, {
            loading: true,
          });
        case ActionTypes.FETCH_ENROLLMENTS_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.FETCH_ENROLLMENTS_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });
        case ActionTypes.FETCH_ENROLLABLE_SUCCESS:
          return Object.assign({}, state, {
            lastFetch: Date.now(),
            loading: false,
            lastError: null,
            error: null,
            enrollable: payload,
          });
        case ActionTypes.CREATE_ENROLLMENTS_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.UPDATE_ENROLLMENTS_ERROR:
          return Object.assign({}, state, {
            lastError: Date.now(),
            loading: false,
            error: payload,
          });
        case ActionTypes.CREATE_ENROLLMENTS_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });
        case ActionTypes.UPDATE_ENROLLMENTS_SUCCESS:
          return Object.assign({}, state, {
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });

        case ActionTypes.UPDATE_SHIPPING_STATUS:
          return Object.assign({}, state, {
            loading: false,
            lastError: null,
            error: null,
            data: payload,
          });

        case ActionTypes.UPDATE_SHIPPING_STATUS_ERROR:
          return Object.assign({}, state, {
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
  selectEnrollmentDataRaw: state => state.enrollment,
  selectLoadingEnrollment: state => state.enrollment.loading,
  selectEnrollmentData: state => state.enrollment.data,
  selectEnrollableData: state => state.enrollment.enrollable,
  selectEnrollableStudies: createSelector('selectEnrollableData', enrollment => {
    if (enrollment) {
      return Object.values(enrollment);
    }
    return [];
  }),
  selectEnrollmentList: createSelector('selectEnrollmentData', enrollment => {
    return enrollment ? Object.values(enrollment) : [];
  }),

  selectTestsForEnrollment: createSelector(
    'selectEnrollmentList',
    'selectRouteParams',
    (enrollmentList, routeParams) => {
      const tests = [];

      enrollmentList.forEach(enrollment => {
        const enrollItem = enrollment.Enrollment || {};
        if (!enrollment) return [];
        if (enrollItem.StudyId === +routeParams.id) {
          tests.push({ tests: enrollItem.Tests, shipmentStatus: enrollItem.shipmentStatus });
        }
      });
      return tests[0];
    },
  ),

  selectActiveEnrollStudies: createSelector('selectEnrollmentList', enrollmentList => {
    return enrollmentList.filter(study => !study.endDate || new Date(study.endDate) >= new Date());
  }),

  selectCurrentEnrollStudy: createSelector(
    'selectEnrollmentList',
    'selectRouteParams',
    (enrollmentList, routeParams) => {
      if (!routeParams.id) return null;
      if (enrollmentList.length === 0) return null;
      return enrollmentList.find(study => study.id === parseInt(routeParams.id, 10));
    },
  ),

  // Action Creators
  doFetchEnrollableStudiesList: () => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_ENROLLMENTS_START });
    apiFetch({
      endpoint: 'studies/enroll',
      method: 'GET',
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_ENROLLABLE_SUCCESS,
          payload: payload.results.reduce((res, study) => {
            res[study.id] = {
              ...study,
              enrollable: true,
            };

            return res;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.FETCH_ENROLLMENTS_ERROR, payload: error });
      });
  },
  doFetchEnrollList: labId => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.FETCH_ENROLLMENTS_START });
    apiFetch({
      endpoint: `laboratories/${labId}/enrollments`,
      method: 'GET',
      redirectOnNotFound: true,
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.FETCH_ENROLLMENTS_SUCCESS,
          payload: payload.results.reduce((res, enrollment) => {
            res[enrollment.id] = enrollment;
            return res;
          }, {}),
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_ENROLLMENTS_ERROR,
          payload: error,
        });
      });
  },
  doCreateEnrollment: (studyId, enrollmentObject) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_ENROLLMENTS_START });
    return apiFetch({
      endpoint: `studies/${studyId}/enroll`,
      method: 'POST',
      data: enrollmentObject,
    })
      .then(payload => {
        const enrollmentData = getState().enrollment.data;
        dispatch({
          type: ActionTypes.CREATE_ENROLLMENTS_SUCCESS,
          payload: { ...enrollmentData, [studyId]: payload },
        });
        dispatch({
          actionCreator: 'doFetchEnrollList',
          args: [payload.LabParticipantId],
        });
        return payload;
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.CREATE_ENROLLMENTS_ERROR,
          payload: error,
        });
        throw error;
      });
  },

  doUpdateEnrollment: data => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.FETCH_ENROLLMENTS_START });
    return apiFetch({
      endpoint: `studies/${data.StudyId}/enroll`,
      method: 'PATCH',
      data,
    })
      .then(payload => {
        const enrollmentData = getState().enrollment.data || {};
        const studyEnrolled = enrollmentData[data.StudyId] ? enrollmentData[data.StudyId] : {};
        const studyEnrolledData = studyEnrolled.Enrollment ? studyEnrolled.Enrollment : {};
        dispatch({
          type: ActionTypes.UPDATE_ENROLLMENTS_SUCCESS,
          payload: {
            ...enrollmentData,
            [data.StudyId]: { ...studyEnrolled, Enrollment: { ...studyEnrolledData, ...payload } },
          },
        });
        dispatch({
          actionCreator: 'doFetchStudyDetails',
          args: [data.StudyId],
        });

        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: `The shipment has been updated sucessfully`,
              title: 'Shipment Status',
            },
          ],
        });
        return payload;
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.UPDATE_ENROLLMENTS_ERROR,
          payload: error,
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: error.message,
              title: 'Error updating kit status information.',
            },
          ],
        });
        throw error;
      });
  },

  // add the shipping status and kit serial number to DB
  // PATCH a /study/{id}/enroll
  doUpdateShippingStatus: (studyId, kitVerificationData) => ({ dispatch, apiFetch, getState }) => {
    dispatch({ type: ActionTypes.UPDATE_SHIPPING_STATUS });
    return apiFetch({
      endpoint: `studies/${studyId}/enroll`,
      method: 'PATCH',
      data: kitVerificationData,
    })
      .then(payload => {
        const kitShippingStatusData = getState().enrollment.data || {};

        const currentStudy = kitShippingStatusData[studyId] ? kitShippingStatusData[studyId] : {};
        const currentStudyEnrollment = currentStudy.Enrollment ? currentStudy.Enrollment : {};
        const updatedPayloadData = {
          ...kitShippingStatusData,
          [studyId]: {
            ...currentStudy,
            Enrollment: {
              ...currentStudyEnrollment,
              ...payload,
            },
          },
        };

        dispatch({
          type: ActionTypes.UPDATE_ENROLLMENTS_SUCCESS,
          payload: updatedPayloadData,
        });
        return payload;
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.UPDATE_SHIPPING_STATUS_ERROR,
          payload: error,
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: error.message,
              title: 'Error updating the kit shipping status information.',
            },
          ],
        });
        throw error;
      });
  },

  // Reactors
  reactShouldFetchCurrentEnrollableStudies: createSelector(
    'selectUserRole',
    'selectEnrollmentDataRaw',
    'selectEnrollableData',
    'selectAppTime',

    (userRole, enrollment, enrollableData, appTime) => {
      if (!userRole || userRole !== 'POC') return null; // Avoid calling this if not a POC
      if (enrollment.loading) {
        return null;
      }

      let shouldFetch = false;

      if (!enrollableData && !enrollment.lastError) {
        shouldFetch = true;
      } else if (enrollment.lastError) {
        const timePassed = appTime - enrollment.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (enrollment.lastFetch) {
        const timePassed = appTime - enrollment.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchEnrollableStudiesList' };
      }
    },
  ),
  reactShouldFetchEnrollmentData: createSelector(
    'selectUserRole',
    'selectEnrollmentDataRaw',
    'selectAppTime',
    'selectUserLabInfo',
    (userRole, enrollment, appTime, userLabInfo) => {
      if (enrollment.loading || !userRole || userRole !== 'POC' || !userLabInfo) {
        return null;
      }

      let shouldFetch = false;

      if (!enrollment.data && !enrollment.lastError) {
        shouldFetch = true;
      } else if (enrollment.lastError) {
        const timePassed = appTime - enrollment.lastError;
        if (timePassed > ERROR_TIME) {
          shouldFetch = true;
        }
      } else if (enrollment.lastFetch) {
        const timePassed = appTime - enrollment.lastFetch;
        if (timePassed > REFRESH_TIME) {
          shouldFetch = true;
        }
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchEnrollList', args: [userLabInfo.id] };
      }
    },
  ),

  reactShouldFetchActiveEnrollStudy: createSelector(
    'selectUserRole',
    'selectEnrollmentDataRaw',
    'selectEnrollmentList',
    'selectRouteParams',
    'selectAppTime',
    'selectUserLabInfo',
    'selectCurrentEnrollStudy',
    (userRole, enrollment, routeParams, userLabInfo, currentEnrollStudy) => {
      if (
        enrollment.loading ||
        !userRole ||
        userRole !== 'POC' ||
        !routeParams.id ||
        !userLabInfo
      ) {
        return null;
      }

      let shouldFetch = false;

      if (!currentEnrollStudy && routeParams.id && !enrollment.lastError) {
        shouldFetch = true;
      }

      if (shouldFetch) {
        return { actionCreator: 'doFetchEnrollList', args: [userLabInfo.id] };
      }
    },
  ),
};
