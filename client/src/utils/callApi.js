import axios from 'axios';
import { BASE_URL_API } from '../settings/apiConfig';

const callApi = (endpoint, method = 'GET', data = null) => {
  return axios({
    url: `${BASE_URL_API}/${endpoint}`,
    method,
    data,
  });
};

export default callApi;
