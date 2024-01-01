import React from "react";
import styles from "./TopWeekly.module.css";
import { ellipse1, ellipse2, ellipse3, ellipse4, ellipse5 } from "./imports"

export default function TopWeekly() {
    return (
        <div className={styles["top-weekly"]} id={styles["desktop-top-weekly"]}>
            <h2>Top Weekly</h2>
            {/* <a href="#">
                <div className={styles["hot-topics"]}>
                    <img src={ellipse1} alt="avatar" />
                    <p>
                        How to install software or upgrade from an old unsupported
                        release
                    </p>
                </div>
            </a>
            <a href="#">
                <div className={styles["hot-topics"]}>
                    <img src={ellipse2} alt="avatar" />
                    <p>How to resize partitions</p>
                </div>
            </a>
            <a href="#">
                <div className={styles["hot-topics"]}>
                    <img src={ellipse3} alt="avatar" />
                    <p>
                        Does any international law support the claim that "Taiwan's
                        independence or not should be decided by Taiwanese people, not
                        by any other country"?
                    </p>
                </div>
            </a>
            <a href="#">
                <div className={styles["hot-topics"]}>
                    <img src={ellipse4} alt="avatar" />
                    <p>
                        Solution gets worse as I increase Precision and Accuracy goals
                    </p>
                </div>
            </a>
            <a href="#">
                <div className={styles["hot-topics"]}>
                    <img src={ellipse5} alt="avatar" />
                    <p>
                        Aiming to get electricity for my cabin via underground burial.
                        Few questions
                    </p>
                </div>
            </a> */}
        </div>
    )
}