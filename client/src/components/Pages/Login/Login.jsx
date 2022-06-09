import { useRef, useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth.js';
import axios from '../../api/axios.js'
import AuthContext from '../../../Context/AuthProvider'
import './Login.css'
const LOGIN_URL = 'auth/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

          const username = user;
          const password = pwd;

            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const userId = response?.data?.userId;

            window.localStorage.setItem('id', userId);
            window.localStorage.setItem('isLoggedIn', true);
            window.localStorage.setItem('token', accessToken);

            console.log(response?.data);

            
            setAuth({ username, roles, accessToken, userId });
            setUser('');
            setPwd('');
            setSuccess(true);
            navigate(from, { replace: true });

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
            errRef.current.focus();
        }
    }



    return (
        <div className='signinContainer'>
                <section>
                    <h1 id='signinHeader'>Sign In</h1>
                    <p ref={errRef} className={errMsg ? "errmsg2" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form className='signinForm' onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='signinButton'>Sign In</button>
                    </form>
                    <p className='bottomText'>
                        Don't have an Account?<br />
                        <span className="line">
                            <NavLink to='/register'>Sign up</NavLink>
                        </span>
                    </p>
                </section>
        </div>
    )
}

export default Login