import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Login.module.css'

const Login = () => {

  const handleChange = () => {

  }
  const error = "Error Here"

  const bgColor ={
  backgroundColor: "var(--pink)"
  }

  return (

      <div className={ classes.main_body } style={bgColor}>
        <h1 className={ classes.welcome_container }>Welcome <br /> Back!</h1>
        <div className={ classes.container } >
          <form className={ classes.form_container }>
            <h3 className={ classes.login }>Login</h3>
            <label htmlFor='email'></label>
            <input className={ classes.inputField } type='email' name='email' onChange={ handleChange } placeholder="email address"></input>
            <label htmlFor='password'></label>
            <input className={ classes.inputField } type='password' placeholder='password' name='password' onChange={ handleChange }></input>
            { error && <p>{ error }</p> }
            <button type='submit' className={ classes.btn }>Login</button>
            <div className={ classes.newUser }>
              <p><NavLink to='/signup'>New user?</NavLink></p>
              <p>Forgot Your Password?</p>
            </div>
          </form>
        </div>
      </div>

  );
};

export default Login;