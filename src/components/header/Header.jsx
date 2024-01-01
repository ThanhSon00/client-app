import React from "react";
import styles from "./Header.module.css";
import { searchIcon, notification, status } from './imports';
import { Link } from "react-router-dom";

export default function Header({ setQuestions, user, setSearch, search }) {

    const keyDownHandler = async (event) => {        
        if (event.key !== 'Enter') return;
        setSearch(event.target.value);
    }
    return (
        <header className={styles["page-header"]}>
            <h1></h1>
            <div className={styles["search"]}>
                <img src={searchIcon} className={styles["search-icon"]} alt="" />
                <input type="search" placeholder="Search..." onKeyDown={keyDownHandler} />
            </div>
            <div className={styles["notification"]}>
                <img src={notification} alt="" />
                <Link to="/main-page/dash-board"><img className={styles["avatar"]} alt="" src={user?.avatar}/></Link>
                <img src={status} className={styles["status"]} alt="" />
            </div>
        </header>
    )
}