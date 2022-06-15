import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import AuthContext from '../../../Context/AuthProvider.jsx';
import axios from '../../api/axios.js';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const ctx = useContext(AuthContext)
    const location = useLocation();
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
      }, [user, pwd])

      //Form submit handler displays error if invalid email/password or navigates to homepage on succeesful login
    const handleSubmit = async(e) => {
        e.preventDefault();
    
          try{
            const result = await axios.post('/auth/login', JSON.stringify({ username: user, password: pwd }),  {
                headers: { 'Content-Type': 'application/json' }
            })
                window.localStorage.setItem('token', result.data.accessToken);
                window.localStorage.setItem('name', result.data.user.username);
                window.localStorage.setItem('userId', result.data.user._id);
             
                ctx.setToken(result.data.accessToken);
                ctx.setUserName(result.data.user.username);
                ctx.setUserId(result.data.user._id);
                ctx.setUser(result.data.user)
                navigate('/');
              
            } catch (err) {
              if (!err?.response) {
                  setErrMsg('No Server Response');
              } else if (err.response?.status === 400) {
                  setErrMsg('Invalid Password or Username');
              } else if (err.response?.status === 401) {
                  setErrMsg('Unauthorized');
              } else {
                  setErrMsg('User not found');
              }
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