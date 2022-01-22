import callApi from '../utils/callApi';

const authApi = {
  login(data) {
    return callApi('auth/login', 'POST', data);
  },
  register(data) {
    return callApi('auth/register', 'POST', data);
  },
  checkUser() {
    return callApi('auth');
  },
};
export default authApi;
