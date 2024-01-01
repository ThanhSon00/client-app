import React from "react";
import "./imports"
import styles from './LeftBar.module.css';
import { outerLogo, innerLogo, home, hamburger, bubble, logout } from './imports';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function LeftBar() {
    const navigate = useNavigate();
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <aside className={styles["left-col"]} id="sideBar">
            <div className={styles["upper-icons"]} id="upperIcons">
                <div className={styles["codeAsk-logo"]}>
                    <Link to="/home">
                        <img
                            className={styles["outer-logo"]}
                            src={outerLogo}
                            alt="logo"
                        />
                        <img
                            className={styles["inner-logo"]}
                            src={innerLogo}
                            alt="logo"
                        />
                    </Link>

                    <h4>CodeAsk</h4>
                </div>
                <Link to="/main-page/dash-board"><div className={styles["icon"]}>
                        <img src={home} alt="" />
                        <span className={styles['hidden']}>Dashboard</span>
                    </div></Link>
                <Link to="/main-page/news/question"><div className={styles["icon"]}>
                        <img src={hamburger} alt="" />
                        <span className={styles['hidden']}>Questions</span>
                    </div></Link>
                <Link to="/main-page/ask-question">
                <div className={styles["icon"]}>
                        <img src={bubble} alt="" />
                        <span className={styles['hidden']}>Ask</span>
                    </div>
                </Link>

            </div>
            <div className={styles["lower-icon"]} onClick={handleLogout}>
                <a href="/">
                    <img src={logout} alt="" />
                    <span className={styles['hidden']}>Log out</span>
                </a>
            </div>
        </aside>
    )
}