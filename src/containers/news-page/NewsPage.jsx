import React from 'react';
import "./NewsPage.module.css";
import { Outlet, useOutletContext } from "react-router-dom"
import TopWeekly from "../top-weekly/TopWeekly";
import TrendingTags from "../trending-tags/TrendingTags";
import LoginForm from "../../components/login-form/login-form";
import styles from "./NewsPage.module.css";
import { Link } from "react-router-dom";

export default function NewsPage() {
    const { search } = useOutletContext();

    return (
        <>
            <Outlet context={{ search }}/>
            <div className={styles["right-side"]}>
                <Link to="/main-page/ask-question" className={styles["btn"]}>Ask Questions</Link>

                <br />
                <br />
                <TopWeekly />
                <TrendingTags />
                <LoginForm />
            </div>
        </>
    )
}