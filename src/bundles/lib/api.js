import axios from 'axios';
import { getApiError } from '../../utils';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.protocol}//${window.location.hostname}:4000` // TODO: Update when we know where API is hosted.
    : 'http://localhost:4000';

export default {
  name: 'apiv1',
  // note that the store gets passed in here:
  getExtraArgs: store => ({
    /**
     * Call to Axios instance
     * @param   {Object} config  Config object for the axios intance
     *          {string}  method
     *          {string}  url
     *          {Object}  param              Query params
     *          {Boolean} redirectOnNotFound Redirect to not found component
     *          {Boolean} alertOnFail        Throw general alert on BAD REQUEST
     * @return  {Promise}  Axios Intance
     */
    apiFetch: config =>
      axios({
        ...config,
        method: config.method || 'get',
        url: `${API_URL}/api/v1/${config.endpoint}`,
        params: config.params || {},
        timeout: config.timeout || '5000',
        headers: {
          Authorization: localStorage.getItem('token') || null,
        },
      })
        .then(res => res.data)
        .catch(err => {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (err.response) {
            const apiHandledResponse = getApiError(err.response);

            // TO DO:
            // Create a route for handling 404 errors
            if (err.response.status === 404 && config.redirectOnNotFound) {
              store.doUpdateUrl('/not-found');
            }

            if (err.response.status === 400 && config.alertOnFail) {
              const { message } = apiHandledResponse;
              store.dispatch({
                actionCreator: 'doCreateAlert',
                args: [
                  {
                    msg: message,
                    title: 'Error',
                  },
                ],
              });
            }

            throw apiHandledResponse;
          }

          // Otherwise return the error message from axios instance
          // Here we need the error message only but lets keep the error object format { message: err.message}
          const errorInstance = { message: err.message };
          throw errorInstance;
        }),
  }),
};
