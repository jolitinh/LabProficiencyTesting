import { AlertLevels } from './alerts';
import { actionAlertMessagesAndTitle } from '../utils';

const ActionTypes = {
  REQUEST_STARTED: 'ACTIONS_REQUEST_STARTED',
  REQUEST_FINISHED: 'ACTIONS_REQUEST_FINISHED',
  REQUEST_FAILED: 'ACTIONS_REQUEST_FAILED',
};

export default {
  name: 'actions',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      errorMessage: null,
    };

    return (state = initialState, { type, payload }) => {
      switch (type) {
        case ActionTypes.REQUEST_STARTED:
          return { ...state, loading: true };

        case ActionTypes.REQUEST_FINISHED:
          return {
            ...state,
            lastFetch: Date.now(),
            loading: false,
            errorMessage: null,
            data: payload,
          };

        case ActionTypes.REQUEST_FAILED:
          return { ...state, lastError: Date.now(), loading: false, errorMessage: payload };

        default:
          return state;
      }
    };
  },

  // creating the selectors
  selectActionsDataRaw: state => state.actions,
  selectActionsData: state => state.actions.data,

  // creating the actions creators
  doActionToUsersStatusAccess: (ids, type) => ({ dispatch, apiFetch }) => {
    dispatch({ type: ActionTypes.REQUEST_STARTED });
    apiFetch({
      method: 'post',
      endpoint: 'users/accessActions',
      data: {
        type,
        payload: {
          userIds: ids,
        },
      },
    })
      .then(payload => {
        dispatch({
          type: ActionTypes.REQUEST_FINISHED,
          payload,
        });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: actionAlertMessagesAndTitle[type].msg,
              title: actionAlertMessagesAndTitle[type].title,
            },
          ],
        });
        dispatch({ actionCreator: 'doFetchPocsList' });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.REQUEST_FAILED, payload: error });
        dispatch({
          actionCreator: 'doCreateAlert',
          args: [
            {
              msg: actionAlertMessagesAndTitle[type].errMsg,
              level: AlertLevels.ERROR,
              title: actionAlertMessagesAndTitle[type].errTitle,
            },
          ],
        });
        setTimeout(() => dispatch({ actionCreator: 'doFetchPocsList' }), 1500);
      });
  },

  // reactors should be here
};
