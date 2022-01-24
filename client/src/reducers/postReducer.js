import {
  ARRANGE_POST,
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADING,
} from '../types/postTypes';

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return { ...state, posts: payload, postsLoading: false };
    case POSTS_LOADED_FAILED:
      return { ...state, posts: [], postsLoading: false };
    case POSTS_LOADING:
      return { ...state, postsLoading: true };
    case ARRANGE_POST:
      return { ...state, posts: payload };

    default:
      return state;
  }
};
