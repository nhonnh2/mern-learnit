//import library
import { createContext, useReducer } from 'react';
import postApi from '../apis/postApi';
//import something..
import { postReducer } from '../reducers/postReducer';
import {
  POSTS_LOADED_FAILED,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADING,
} from '../types/postTypes';

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
      dispatch({ type: POSTS_LOADING });
      const { data } = await postApi.getPosts();
      if (data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAILED });
    }
  };
  // add post
  const addPost = async (dataForm) => {
    try {
      const { data } = await postApi.create(dataForm);
      if (data.success) {
        await getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //edit post
  const editPost = async (dataForm, id) => {
    try {
      const { data } = await postApi.update(dataForm, id);
      if (data.success) {
        await getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete post
  const deletePost = async (id) => {
    try {
      const { data } = await postApi.delete(id);
      if (data.success) {
        await getPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //context data
  const postContextData = {
    postState,
    getPosts,
    addPost,
    editPost,
    deletePost,
    dispatch,
  };
  //return provider
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
