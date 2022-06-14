import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../components/api/axios';



//authCtx to manage global data
const AuthContext = React.createContext({
  username: null,
  onLogout: () => { },
  onLogin: (username, password) => { }
});


export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const initialToken = localStorage.getItem('token');
  const initialName = localStorage.getItem('name');
  const initialId = localStorage.getItem('userId');
  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialName);
  const [userId, setUserId] = useState(initialId);
  const [user, setUser] = useState("");
  const [errMsg, setErrMsg] = useState('');



  const loginHandler = async ( username, password ) => {
    const result = await axios.post('/auth/login', JSON.stringify({ username, password }),  {
      headers: { 'Content-Type': 'application/json' }
  })
    try{
        if (result.data) {
          console.log(result.data.user._id);
          window.localStorage.setItem('token', result.data.accessToken);
          window.localStorage.setItem('name', result.data.user.username);
          window.localStorage.setItem('userId', result.data.user._id);
          window.localStorage.setItem('user', result.data.user);
       
          setToken(result.data.accessToken);
          setUserName(result.data.user.username);
          setUserId(result.data.user._id);
          setUser(result.data.user)
          navigate('/');
        }
      } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
      }
  };

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
    setUserName(null);
    setUserId(null);
    setUser(null);
  };

  const registerHandler = (userName, token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', userName);
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', user);
    setToken(token);
    setUserName(userName);
    setUserId(userId);
    setUser(user);
  };

  return <AuthContext.Provider
    value={ {
      token,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      onRegister: registerHandler,
      userName,
      userId,
      errMsg, 
      user,
      setErrMsg
    } }>{ props.children }</AuthContext.Provider>;

};

export default AuthContext;