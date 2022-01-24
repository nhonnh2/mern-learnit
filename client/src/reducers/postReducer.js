import {
  ARRANGE_POST,
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
} from '../types/postTypes';

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return { ...state, posts: payload, postsLoading: false };
    case POSTS_LOADED_FAILED:
      return { ...state, posts: [], postsLoading: false };

    case ARRANGE_POST:
      return { ...state, posts: payload };

    default:
      return state;
  }
};
