/* eslint-disable no-unused-vars */
import { useReducer } from 'react';
import axios from 'axios';
import routes from '../routes';
import user from './reducer';
import { ContextUser } from './index';
import routers from '../routes';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user, {});

  const userSignIn = async ({ email, password }) => {
    const url = routes.login();
    try {
      const {
        data: { user, token },
      } = await axios.post(url, { email, password });
      console.log(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  const userSignUp = async ({ email, password }) => {
    const url = routers.register();
    try {
      const { user, token } = await axios.post(url, { email, password });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const userInit = async () => {
    console.log('userinit');
    const url = routers.user();
    const token = localStorage.getItem('token') || '';
    try {
      const {
        data: { user, message },
      } = await axios(url, { headers: { Authorization: token } });
      dispatch({ type: 'USER__INIT', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    console.log('logout');
    const url = routers.logout();
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    try {
      const {
        data: { user, message },
      } = await axios.post(url);
      dispatch({ type: 'USER__SIGNIN', payload: { user } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContextUser.Provider
      value={{
        state,
        dispatch,
        userSignIn,
        userSignUp,
        userInit,
        userLogout,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
};

export default UserProvider;
