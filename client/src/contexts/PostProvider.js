//import library
import { createContext, useEffect, useReducer } from 'react';
//import something..
import { postReducer } from '../reducers/postReducer';
import postApi from '../apis/postApi';
import { POSTS_LOADED_FAILED, POSTS_LOADED_SUCCESS } from '../types/postTypes';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  //state
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });
  //get all posts
  const getPosts = async () => {
    try {
      const { data } = await postApi.getPosts();
      if (data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAILED });
    }
  };
  //context data
  const postContextData = { postState, getPosts };
  //return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
