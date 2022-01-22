import callApi from '../utils/callApi';

const postApi = {
  getPosts() {
    return callApi('posts', 'GET');
  },
  create(data) {
    return callApi('creposts/create', 'POST', data);
  },
  update(data) {
    return callApi(`posts/${data._id}/update`, 'POST', data);
  },
  delete(id) {
    return callApi(`posts/${id}/delete`);
  },
};

export default postApi;
