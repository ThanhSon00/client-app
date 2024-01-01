import React from "react";
import { Outlet } from "react-router-dom"
import {} from "./imports";
import styles from "./Page.module.css"
import { LeftSideLogin } from '../../components/leftSideLogin/LeftSideLogin';

export default function Page() {
    return (
        <div className={styles["login-body"]}>
            <LeftSideLogin />
            <Outlet />
            <script src="https://apis.google.com/js/platform.js" async defer></script>
        </div>
    )
}