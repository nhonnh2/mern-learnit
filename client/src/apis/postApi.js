import callApi from '../utils/callApi';

const postApi = {
  getPosts() {
    return callApi('posts', 'GET');
  },
  create(data) {
    return callApi('posts/create', 'POST', data);
  },
  update(data, id) {
    return callApi(`posts/${id}/update`, 'PUT', data);
  },
  delete(id) {
    return callApi(`posts/${id}/delete`);
  },
};

export default postApi;
