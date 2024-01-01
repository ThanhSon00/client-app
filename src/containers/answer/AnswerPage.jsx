import React, { useState, useEffect } from "react";
import '@mdxeditor/editor/style.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { CodeToggle } from '@mdxeditor/editor/plugins/toolbar/components/CodeToggle'
import { ListsToggle } from '@mdxeditor/editor/plugins/toolbar/components/ListsToggle'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'
import { CreateLink } from '@mdxeditor/editor/plugins/toolbar/components/CreateLink'
import { InsertImage } from '@mdxeditor/editor/plugins/toolbar/components/InsertImage'

import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { quotePlugin } from '@mdxeditor/editor/plugins/quote'
import { thematicBreakPlugin } from '@mdxeditor/editor/plugins/thematic-break'

import styles from "./Answer.module.css"
import { answerIcon, shareIcon } from "./imports"
import { useParams } from "react-router-dom";
import API_URL from "config/config";
import dayjs from "dayjs";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Paginate from "components/paginate/Paginate";

export default function AnswerPage() {
    const ref = React.useRef(null)
    const { id } = useParams();
    const [question, setQuestion] = useState();
    const [comments, setComments] = useState([]);
    const [categories, setCategories] = useState([]);
    const memberId = JSON.parse(localStorage.getItem('token')).id;

    useEffect(() => {
        const getQuestionComments = async () => {
            if (id) {
                const response0 = await fetch(`${API_URL}/questions/${id}/comments`);
                const question = await response0.json();
                setComments(question.Comments);
                setQuestion(question);

                const response1 = await fetch(`${API_URL}/questions/${id}/categories`);
                const categories = await response1.json();
                setCategories(categories);
            }
        }
        try {
            getQuestionComments();
        } catch (error) {
            console.log(error);
        }
    }, [id])

    const createAnswer = async (event) => {
        event.preventDefault();
        const answer = ref.current?.getMarkdown()

        const response = await fetch(`${API_URL}/members/${memberId}/comments`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: answer, questionId: id })
        });
        if (response.ok) {
            const answer = await response.json();
            ref.current?.setMarkdown('');
            setComments([...comments, answer]);
        }
    }

    return (
        <>
            <div className={styles["answer-page"]} id="mainPage">
                <div className={styles["find-ask-question"]}>
                    <a href="./question.html" className={styles["btn"]}>Ask Questions</a>
                </div>
                <div className={styles["left-side"]}>
                    <h1>
                        {question?.title}
                    </h1>
                    <div className={styles["tags"]}>
                        <ul className={styles["category-list"]}>
                            {categories.map(category => <li>{category.name}</li>)}
                        </ul>
                        <p>asked in {dayjs(question?.createdAt).toString()} by <span>@{question?.Member.name}</span></p>
                    </div>
                    <Markdown rehypePlugins={[rehypeRaw]}>{question?.content}</Markdown>
                    <br />
                    <br />
                    <hr />
                    <div className={styles["answer"]}>
                        <div className={styles["ans"]}>
                            <img src={answerIcon} alt="" />
                            <h3>Answer</h3>
                        </div>
                        <h1>|</h1>
                        <div className={styles["share"]}>
                            <img src={shareIcon} alt="" />
                            <h3>Share</h3>
                        </div>
                    </div>

                    <hr />
                    <h1 className={styles["suggestion"]}>Answers</h1>
                    <Paginate type="comments" conditions={{ size: 3, questionId: id }} />

                    <p className={styles["other-suggestions"]}>
                        Know someone who can answer? Share a link to this question via
                        <a href="#">email</a>, <a href="#">Twitter</a>, or
                        <a href="#">Facebook.</a>
                    </p>
                    <br />
                    <br />

                </div>
                <br />
            </div>
            <div className={styles["answer-section"]} id="mainPage">
                <h2 className="your-answer">Your answer</h2>
                <br />

                <MDXEditor
                    ref={ref}
                    markdown=""
                    placeholder='Please type the answer here'
                    plugins={[toolbarPlugin({
                        toolbarContents: () => (<> <UndoRedo /><BoldItalicUnderlineToggles /><CodeToggle /><ListsToggle /> <BlockTypeSelect /><CreateLink /><InsertImage /></>)
                    }), headingsPlugin(), listsPlugin(), thematicBreakPlugin(), quotePlugin()]}
                />
                <br />
                <br />
                <div className={styles["text"]}>
                    <a href="/" className={styles["btn"]} onClick={createAnswer}>POST</a>
                </div>
            </div>
        </>
    )
}