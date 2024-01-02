import React, { useState } from 'react';
import { logo, ellipse5 } from './imports';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

async function loginUser(credentials) {
    return fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
}

const Login = ({ setUser }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const handleGoogleLogin = async ({ credential }) => {
        const response = await fetch(`${API_URL}/google/register`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ credential })
        });
        if (response.ok) {
            const member = await response.json();
            setUser(member);
            navigate(state?.path || '/main-page/news/question');
        }
    }
    

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
          email,
          password
        });
        if (!response.ok) {
            setError('Email or password are not correct');
        } else {
            const members = await response.json();
            setUser(members[0]);
            navigate(state?.path || '/main-page/news/question');    
        }
    }

    return (
        <div className={styles["right-col"]} onSubmit={handleSubmit}>
            <img
                className={styles["right-logo"]}
                src={logo}
                alt="codeAsk logo"
            />
            <img
                className={styles["right-appendage"]}
                src={ellipse5}
                alt=""
            />
            <div className={styles["login-text"]}>
                <h1>Log in to your account</h1>
                <h3>Welcome back! Please enter your details</h3>
            </div>

            <form className={styles['login-form']}>
                <div className={styles["form-wrapper"]}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                    <i className="bi"></i>
                    <div className={styles["error-message"]}></div>
                </div>

                <div className={styles["form-wrapper"]}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={styles["password"]}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                    <i className="bi bi-eye-slash" id={styles["togglePassword"]}></i>
                    <i className="bi"></i>
                    <div className={styles["error-message"]}>{error}</div>
                </div>

                <div className={styles["login-options"]}>
                    <div className="remember">
                        <input
                            type="checkbox"
                            value="lsRememberMe"
                            id="rememberMe"
                            className={styles["checkbox"]}
                        />
                        <label className={styles["remember-me"]} htmlFor="rememberMe">Remember me</label>
                    </div>
                    <span><Link to="/page/forgot-password">Forgot Password?</Link></span>
                </div>
                <button className={styles["cta-sign-in"]}>
                    Sign in
                </button>
                <hr className={styles["hr"]} />
                <GoogleOAuthProvider clientId='269471794836-8uiobovesdd3bomho2jrv99oaf16uadj.apps.googleusercontent.com'>
                    <button className={styles["cta"]}>
                        <GoogleLogin onSuccess={handleGoogleLogin}>Sign in with Google</GoogleLogin>
                    </button>
                </GoogleOAuthProvider>
                <br />
                <p>Don't have an account? <Link to="/page/register">Sign up</Link></p>

                <p className={styles["back-button"]}>← <Link to="/home">Back</Link></p>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;