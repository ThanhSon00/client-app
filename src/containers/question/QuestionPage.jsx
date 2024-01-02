import React, { useState } from "react";
import styles from "./QuestionPage.module.css";
import { useOutletContext } from "react-router-dom";
import Paginate from "components/paginate/Paginate";

export default function QuestionPage() {
    const { search } = useOutletContext();
    const [ type, setType ] = useState('all');

    const changeTag = (event, type) => {
        event.preventDefault();
        setType(type);
    }
    return (
        <div>
            <div className={styles["question-header"]} id="questionHeader">
                <div className={styles["question-link"]}>
                    <a href="./question.html">Find questions</a>
                </div>
            </div>
            <div className={styles["question-page"]} id="questionPage">

                <div className={styles["question-top-navbar"]}>
                    <ul>
                        <li><a href="/" className={styles[(type === 'all') ? 'active' : '' ]} onClick={(e) => { changeTag(e, 'all') }}>All</a></li>
                        <li><a href="/" className={styles[(type === 'unanswered') ? 'active' : '']} onClick={(e) => { changeTag(e, 'unanswered') }}>Unanswered</a></li>
                        <li><a href="/" className={styles[(type === 'answered') ? 'active' : '']} onClick={(e) => { changeTag(e, 'answered') }}>Answered</a></li>
                    </ul>
                </div>
                <div className={styles["questions-wrapper"]}>
                    <Paginate          
                        conditions={{ size: 4, search, filter: type }}             
                        type="questions" />
                </div>

            </div>
        </div>
    )
}