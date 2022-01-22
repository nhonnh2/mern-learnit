//import library
import { createContext, useEffect, useReducer } from 'react';
import authApi from '../apis/authApi';
//import something..
import { authReducer } from '../reducers/authReduce';
import { ACCESS_TOKEN_NAME } from '../settings/constants';
import setAuthToken from '../utils/setAuthTokent';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //Authenticate user
  const loadUser = async () => {
    const localStorageToken = localStorage[ACCESS_TOKEN_NAME];
    if (localStorageToken) {
      setAuthToken(localStorageToken);
    }
    try {
      const { data } = await authApi.checkUser();
      if (data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  //logout
  const logoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    });
  };
  // App mounted
  useEffect(() => {
    loadUser();
  }, []);
  //submit auth
  const submitAuth = async (userForm, type) => {
    try {
      const { data } =
        type === 'login'
          ? await authApi.login(userForm)
          : type === 'register'
          ? await authApi.register(userForm)
          : null;
      if (data.success) {
        localStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
      }

      await loadUser();

      return data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //context data
  const authContextData = { submitAuth, authState, logoutUser };

  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
