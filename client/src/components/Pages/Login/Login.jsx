import { useRef, useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import AuthContext from '../../../Context/AuthProvider.jsx';
import './Login.css'

const Login = () => {
    const ctx = useContext(AuthContext)

   
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        ctx.setErrMsg('');
      }, [user, pwd])

      //Form submit handler displays error if invalid email/password or navigates to homepage on succeesful login
    const handleSubmit = (e) => {
        e.preventDefault();

        ctx.onLogin(user, pwd);

        }
   

    return (
        <div className='signinContainer'>
                <section>
                    <h1 id='signinHeader'>Sign In</h1>
                    <p ref={errRef} className={ctx.errMsg ? "errmsg2" : "offscreen"} aria-live="assertive">{ctx.errMsg}</p>
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