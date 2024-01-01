import React from "react";
import styles from "./LoginForm.module.css";
import { bxLogIn, vector } from './imports';

export default function LoginForm() {
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-pop"]}>
                <span id="closeButton" onclick="this.parentNode.parentNode.remove(); return false;">x</span>

                <h1>Sign in to see solutions</h1>
                <div className={styles["modal-content"]}>
                    <div className={styles["sign-in"]}>
                        <div>
                            <img src={bxLogIn} alt="" />
                            <div className={styles["modal-text-1"]}>
                                <a href="/signin.html">Sign In</a>
                                <p>View all solutions</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["sign-up"]}>
                        <div>
                            <img src={vector} alt="" />
                            <div className={styles["modal-text-2"]}>
                                <a href="/signup.html">Sign Up</a>
                                <p>Create an account</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
