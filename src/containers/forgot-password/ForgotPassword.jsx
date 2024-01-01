import React, { useState } from "react";
import "./imports";
import styles from './ForgotPassword.module.css';
import { ellipse5, logo } from "../login/imports";
import { Link } from "react-router-dom"

const API_URL = process.env.REACT_APP_API_URL;

export default function ForgotPassword() {
    const [ email, setEmail ] = useState();
    const [ error, setError ] = useState();
    const [ message, setMessage ] = useState();
    const resetPassword = async (event) => {
        event.preventDefault();
        const response = await fetch(`${API_URL}/auth/verification`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            setMessage(await response.text());
        } else setError("Unexpected error from system. Please try again later")
    }
    return (
        <div className={styles["right-col"]}>
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
            <div className={styles["wrap"]}>
                <div className={styles["login-text"]}>
                    <h1>Forgot your password?</h1>
                    <h3>We'll email you instructions on how to reset it</h3>
                </div>
                <form className={styles["forgot-password-form"]}>
                    <p id={styles["message"]}></p>
                    <label for="email">Email</label>
                    <small id={styles["small"]}></small>
                    <div className={styles["input-wrap"]}>
                        <input type="email" id={styles["email"]} name="email" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)} />
                        <i id={styles["error-icon"]} className={styles["fa fa-exclamation-circle"]}></i>
                        <i id={styles["success-icon"]} className={styles["fa fa-check"]}></i>
                    </div>
                    <br />
                    <p id={styles["error-msg"]}>{error}</p>
                    <p id={styles["msg"]}>{message}</p>
                    <button id={styles["resetPwd"]} type="submit" className={styles["cta-sign-in"]} onClick={resetPassword}>Reset Password</button>
                    <hr />
                    <p>Return to <Link to="/page/login">Log in</Link></p>
                </form>
            </div>
        </div>
    )
}