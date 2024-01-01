import React from "react";
import styles from "../../containers/answer/Answer.module.css";
import dayjs from "dayjs";

export default function Comment({ comment }) {
    return (
        <>
            <br />
            <p className={styles["comment"]}>
                {comment.content}
                <span>{dayjs(comment.createdAt).toString()}</span>
            </p>
            <hr />
        </>
    )
}