import React from 'react';
import styles from './LeftSideLogin.module.css';
import { frame33, tabandPhoneImage } from './imports';

export const LeftSideLogin = () => {
    return (
        <section className={styles['signup-image']}>
            <div className={styles['signup-image-brief']}>
                <div className={styles["cyclic-design1"]}>    
                    <svg
                        width="81"
                        height="102"
                        viewBox="0 0 81 102"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M76 107C76 163.561 32.3488 209 -21 209C-74.3488 209 -118 163.561 -118 107C-118 50.4388 -74.3488 5 -21 5C32.3488 5 76 50.4388 76 107Z"
                            fill="#002828"
                            stroke="white"
                            strokeWidth="10"
                        />
                    </svg>
                </div>

                <a href="./index.html">
                    <img
                        src={frame33} // Frame 33.png
                        alt="CodeAsk Logo"
                    />
                </a>
                <h3>A Q&A platform for Software Developers</h3>
                <img
                    className={styles["tabletphone-image"]}
                    src={tabandPhoneImage}
                    alt="Tablet Phone SVG"
                />
            </div>
        </section>
    );
}