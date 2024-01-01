import React, { useState } from "react";
import styles from "./Register.module.css";
import { logo } from "./imports";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API_URL from "config/config";

export default function Register({ setUser }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ name, setName ] = useState();
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const [ error, setError ] = useState(null);
  const [ confirmPassword, setConfirmPassword ] = useState();

  const register = async (event) => {
    event.preventDefault();
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ name, email, password, confirmPassword })
    });

    if (response.ok) {
      const member = await response.json();
      setUser(member);
      navigate(state?.path || '/main-page/news/question');
    } else {
      if (response.status !== 500) {
        const message = await response.text();
        setError(message);
      }
    }
  }
  return (
    <section className={styles["signupform-wrapper"]}>
      <div className={styles["cyclic-design2"]}>
        <svg width="75" height="86" viewBox="0 0 75 86" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M81 81C123.545 81 157 42.1118 157 -4.5C157 -51.1118 123.545 -90 81 -90C38.4548 -90 5 -51.1118 5 -4.5C5 42.1118 38.4548 81 81 81Z" fill="white" stroke="#002828" strokeWidth="10" />
        </svg>
      </div>

      <section className={styles["signup"]}>

        <div className={styles["codeaskform-logo-wrapper"]}>
          <img
            className="codeask-form-logo"
            src={logo}
            alt="CodeAsk Logo"
          />
        </div>


        <section className={styles["signup-intro"]}>
          <h3>Create an account</h3>
          <p>Start your journey!</p>
        </section>

        <section className={styles["signup-form"]}>

          <form action="" >
            <div className={styles["form-wrapper"]}>
              <label htmlFor="name">Name <span>*</span></label>
              <input
                className={styles["signup-input"]}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                onChange={e => setName(e.target.value)}
              />
              <i className="bi"></i>
              <div className="error-message"></div >
            </div>

            <div className={styles["form-wrapper"]}>
              <label htmlFor="email">Email <span>*</span></label>
              <input
                className={styles["signup-input"]}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={e => setEmail(e.target.value)}
              />

              <i className="bi"></i>
              <div className="error-message"></div >
            </div>

            <div className={styles["form-wrapper"]}>
              <label htmlFor="password">Password <span>*</span></label>
              <input
                className={styles["signup-input"]}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                onChange={e => setPassword(e.target.value)}
              />
              <i className="bi bi-eye-slash" id={styles["togglePassword"]}></i>
              <div className="error-message"></div >
            </div>


            <div className={styles["form-wrapper"]}>
              <label htmlFor="password">Confirm Password <span>*</span></label>
              <input
                className={styles["signup-input"]}
                type="password"
                id={styles["confirm-password"]}
                name="confirm-password"
                placeholder="Password"
                title="Must must above password"
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <i className="bi bi-eye-slash" id={styles["togglePassword"]}></i>
              <div className={styles["error-message"]}>{error}</div >
            </div>

            <button className={styles["get"]} onClick={register}>Get Started</button>

                       <p className={styles["signup-brief"]}>

              Already have an account? <span><Link to="/page/login">Log in</Link></span>
            </p>

            <p className={styles["back-button"]}>← <Link to="/">Back</Link></p>

          </form>
        </section>
      </section>
    </section>
  )
}