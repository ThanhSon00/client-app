import React, { useState } from 'react';
import styles from './ResetPassword.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logo } from "./imports";

const API_URL = process.env.REACT_APP_API_URL;

export default function ResetPassword() {
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ error, setError ] = useState();
    const [ message, setMessage ] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    const resetPassword = async (event) => {
        event.preventDefault();
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, confirmPassword, id })
        });
        if (response.ok) {
            setMessage('Reset password successfully. You will by redirected to login page in 5s');
            setTimeout(() => { navigate('/page/login') }, 5000);
        } else setError(await response.text());
    }

    return (
        <div className={styles["right-col"]}>
            <section className={styles["resetpsform-wrapper"]}>
                <div className={styles["cyclic-design2"]}>

                    <svg
                        width="75"
                        height="86"
                        viewBox="0 0 75 86"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M81 81C123.545 81 157 42.1118 157 -4.5C157 -51.1118 123.545 -90 81 -90C38.4548 -90 5 -51.1118 5 -4.5C5 42.1118 38.4548 81 81 81Z"
                            fill="white"
                            stroke="#002828"
                            stroke-width="10"
                        />
                    </svg>
                </div>

                <section className={styles["resetps"]}>
                    <div className={styles["codeaskform-logo-wrapper"]}>
                        <img
                            className={styles["codeask-form-logo"]}
                            src={logo}
                            alt="CodeAsk Logo"
                        />
                    </div>

                    <section className={styles["resetps-intro"]}>
                        <h3>Reset password</h3>
                        <p>Enter your new password</p>
                    </section>

                    <p id={styles["error-msg"]}></p>
                    <section className={styles["resetps-form"]}>
                        <form action="">
                            <label for="newpassword">New Password <span>*</span></label>
                            <div className={styles["input-wrap"]}>
                                <input
                                    className={styles["resetps-input"]}
                                    type="password"
                                    id={styles["newpassword"]}
                                    name="newpassword"
                                    placeholder="Enter new password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <i className={styles["bi"]} id={styles["togglePassword"]}></i>
                                <i id={styles["error-icon"]} className={styles["fa fa-exclamation-circle"]} style={{ display: 'none' }}></i>
                                <i id={styles["success-icon"]} className={styles["fa fa-check"]} style={{ display: 'none' }}></i>
                            </div>
                            {/* <p for="" id={styles["pwd-guide"]}>minimum 8 characters</p> */}
                            <div id={styles["newpassword-warning"]} className={styles["newpassword-warning"]}>
                                <p>Password contains at least 8 characters</p>
                                <ul>
                                    <li>One uppercase character</li>
                                    <li>One numeric character</li>
                                    <li>One special character</li>
                                </ul>
                            </div>
                            <label for="repnewpassword">Repeat Password <span>*</span></label>
                            <div className={styles["input-wrap"]}>
                                <input
                                    className={styles["resetps-input"]}
                                    id={styles["repnewpassword"]}
                                    name="repnewpassword"
                                    type="password"
                                    placeholder="Repeat password"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <i className={styles["bi"]} id={styles["toggleCPassword"]}></i>
                                <i id={styles["error-icon"]} className={styles["fa-exclamation-circle"]} style={{ display: 'none' }}></i>
                                <i id={styles["success-icon"]} className={styles["fa-check"]} style={{ display: 'none' }}></i>
                            </div>
                            {/* <p id={styles["rep-guide"]} className={styles["repnewpassword-warning"]}
                            >must match new password</p> */}
                            <p id={styles["repnewpassword-warning"]}>{error}</p>
                            <p>{message}</p>
                            <button className={styles["get"]} type="submit" onClick={resetPassword}>
                                Reset Password
                            </button>
                            <hr className={styles["hr"]} />

                            <p className={styles["resetps-brief"]}>
                                Return to <span><Link to="/page/login">Log in</Link></span>
                            </p>

                        </form>
                    </section>
                </section>
            </section>
        </div>
    )
}
