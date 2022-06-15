import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../components/api/axios';


//authCtx to manage global data
const AuthContext = React.createContext({
  username: null,
  onLogout: () => { },
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
    setToken(token);
    setUserName(userName);
    setUserId(userId);
    setUser(user);
  };

  return <AuthContext.Provider
    value={ {
      token,
      onLogout: logoutHandler,
      onRegister: registerHandler,
      userName,
      userId,
      user,
      setUserId,
      setToken,
      setUser,
      setUserName
    } }>{ props.children }</AuthContext.Provider>;

};

export default AuthContext;