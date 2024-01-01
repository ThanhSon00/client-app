import React, { useEffect, useState } from "react";
import styles from "../../containers/answer/Answer.module.css";
import { arrowUp, arrowDown, ajiboye } from "../../containers/answer/imports";
import Comment from "components/comment/Comment";
import dayjs from "dayjs";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const API_URL = process.env.REACT_APP_API_URL;

export default function Answer({ comment }) {
    const user = JSON.parse(localStorage.getItem('token'));
    const memberId = user.id;
    const votes = comment.Votes;
    const vote = votes?.find(vote => { return vote.memberId === memberId })
    const [voteCount, setVoteCount] = useState(0);
    const [isDisabledUp, setDisabledUp] = useState(false);
    const [isDisabledDown, setDisabledDown] = useState(false);
    const [idVote, setId] = useState(0);

    useEffect(() => {
        setVoteCount(comment.voteCount);
        setDisabledDown(vote?.voteType === "DOWN");
        setDisabledUp(vote?.voteType === "UP");
        setId(vote?.id);
    }, [comment])
    
    const voteButtonClickHandler = (buttonIsDisabled, voteType) => {
        if (buttonIsDisabled) {
            removeVote(voteType)
        } else createVote(voteType);
    }

    async function createVote(voteType) {
        const response = await fetch(`${API_URL}/comments/${comment.id}/votes`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ voteType, memberId })
        });

        if (!response.ok) return;

        const vote = await response.json();
        setId(vote.id);

        let changedNumber = 1;

        if (voteType === "UP") {
            if (isDisabledDown) changedNumber = 2
            setVoteCount(voteCount + changedNumber);
            setDisabledUp(true);
            setDisabledDown(false);
        }
        if (voteType === "DOWN") {
            if (isDisabledUp) changedNumber = 2
            setVoteCount(voteCount - changedNumber);
            setDisabledDown(true);
            setDisabledUp(false);
        }

    }

    async function removeVote(voteType) {
        const response = await fetch(`${API_URL}/comments/${comment.id}/votes/${idVote}`, {
            method: 'DELETE',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }        });

        if (!response.ok) return;

        setId();

        if (voteType === "UP") {
            setVoteCount(voteCount - 1);
            setDisabledUp(false);
            setDisabledDown(false);
        }
        if (voteType === "DOWN") {
            setVoteCount(voteCount + 1);
            setDisabledDown(false);
            setDisabledUp(false);
        }
    }

    return (
        <>
            <p className={styles["more-comments"]}>
                <Markdown rehypePlugins={[rehypeRaw]}>{comment.content}</Markdown>
            </p>
            <div className={styles["comment-section"]}>
                <h3></h3>
                <div className={styles["comment-details"]}>

                    {/* <img src={star} alt="" /> */}
                    <div className={styles["rating"]}>
                        <button className={isDisabledUp ? styles['up-disabled'] : ''} onClick={() => { voteButtonClickHandler(isDisabledUp, "UP") }}><img src={arrowUp} alt="" /></button>
                        <h2 className={styles["vote-count"]}>{voteCount}</h2>
                        <button className={isDisabledDown ? styles['down-disabled'] : ''} onClick={() => { voteButtonClickHandler(isDisabledDown, "DOWN") }}><img src={arrowDown} alt="" /></button>
                    </div>
                    <div className={styles['commentator']}>
                        <p>answered at {dayjs(comment.createdAt).toString()}</p>
                        <div className={styles["flex-row"]}>
                            <img
                                src={comment.Member?.avatar}
                                alt="commentator"
                            />
                            <span>@{comment.Member?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className={styles["post-comment"]} />
            {comment.Comments?.map(comment => <Comment comment={comment} />)}
        </>
    )
}