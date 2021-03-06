import { useRef, useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthProvider.jsx";
import axios from "../../api/axios.js";
import './Register.css';


const USER_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%/]).{8,24}$/;


const Register = () => {

    const ctx = useContext(AuthContext);
    const navigate = useNavigate();

    const initialState = {
        username: '',
        password: '',
        matchPwd: '',
        firstname: '',
        lastname: '',
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

    const userRef = useRef();
    const errRef = useRef();
    const [data, setData] = useState(initialState)
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState('')
    const [lastnameFocus, setLastnameFocus] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
      setValidName(USER_REGEX.test(data.username));
  }, [data.username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(data.password));
        setValidMatch(data.password === data.matchPwd);
    }, [data.password, data.matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [data.username, data.password, data.matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(data.username);
        const v2 = PWD_REGEX.test(data.password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post('/auth/register',
                JSON.stringify({ username: data.username, password:data.password, firstname: data.firstname, lastname:data.lastname }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
                ctx.onRegister(response.data.newUser.username, response.data.accessToken, response.data.newUser._id)
                navigate('/')
                // console.log(response?.data);
                console.log(response?.accessToken);
                // console.log(JSON.stringify(response))
                setSuccess(true);
                // clear input field
                setData(initialState)
            }
         catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="registerContainer">
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <NavLink
                          exact='true'
                          activeclassname='active'
                          className='login-link'
                          to='/login'
                          >
                           SIGNIN
                    </NavLink>
                    </p>
                </section>
            ) : (
                <section>
                    <h1 id="signupHeader">Register</h1>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <form onSubmit={handleSubmit} className="registerForm">
                        <label htmlFor="username">
                            Email: 
                            <span className={validName ? "valid" : "hide"}><i className="nes-icon size-1x check"/></span>
                            <span className={validName || !data.username ? "hide" : "invalid"}><i className="nes-icon size-1x exclamation"/></span>
                        </label>
                        <input
                            name="username"
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && data.username && !validName ? "instructions" : "offscreen"}>
                            Please write valid email address
                        </p>
                        <label htmlFor="firstname">
                            First Name: 
                        </label>
                        <input
                            name="firstname"
                            type="text"
                            id="firstname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                            aria-describedby="uidnote"
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                        />
                        <label htmlFor="lastname">
                            Last Name: 
                        </label>
                        <input
                            name="lastname"
                            type="text"
                            id="lastname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                        />

                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}><i className="nes-icon size-1x check"/></span>
                            <span className={validPwd || !data.password ? "hide" : "invalid"}><i className="nes-icon size-1x exclamation"/></span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span><span aria-label="forward slash">/</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={validMatch && data.matchPwd ? "valid" : "hide"}><i className="nes-icon size-1x check"/></span>
                            <span className={validMatch || !data.matchPwd ? "hide" : "invalid"}><i className="nes-icon size-1x exclamation"/></span>
                        </label>
                        <input
                            name="matchPwd"
                            type="password"
                            id="matchPwd"
                            onChange={handleChange}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            Must match the first password input field.
                        </p>

                        <button className="signupBtn" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p className="bottomText">
                        Already registered?<br />
                        <span className="line">
                        <NavLink
                          exact='true'
                          activeclassname='active'
                          className='login-link'
                          to='/login'
                          >
                           Login
                        </NavLink>
                        </span>
                    </p>
                </section>
            )}
        </div>
    )
}

export default Register