import { actionTypes } from '../redux/actions/errorActions';
import authService from './authService'

export default function setupAxios(axios, store) {

  // Add a request interceptor
  axios.interceptors.request.use(
    config => {
      const token = authService.getToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      config.baseURL = process.env.REACT_APP_BASE_URL;
      config.headers['Content-Type'] = 'application/json';
      return config
    },
    validateStatus => (status) => {
      return status >= 200 && status < 500
    },
    error => {
      let errMsg = '';
      if(typeof error.response.data.error !== 'object') {
        errMsg = error.response.data.error
      } else {
        const errorKey = Object.keys(error.response.data.error)[0]
        errMsg = error.response.data.error[errorKey];
        }
        store.dispatch({type: actionTypes.Message, payload: errMsg})

      return Promise.reject(error.response.data);
    }
  )

  axios.interceptors.response.use(
      function (response) {
        return response.data;
      },
      function (error) {
        let errMsg = '';
        if(typeof error.response.data.error !== 'object') {
          errMsg = error.response.data.error
        } else {
          const errorKey = Object.keys(error.response.data.error)[0]
          errMsg = error.response.data.error[errorKey];
          }
          store.dispatch({type: actionTypes.Message, payload: errMsg})

        return Promise.reject(error.response.data);
      }
  );
}