import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './AskQuestion.module.css';

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

const API_URL = process.env.REACT_APP_API_URL;;

export default function AskQuestion() {
    const ref = useRef(null)
    const memberId = JSON.parse(localStorage.getItem('token')).id;
    const [ title, setTitle ] = useState('');
    const [ categories, setCategories ] = useState('');
    const navigate = useNavigate();
    const createQuestion = async (event) => {
        event.preventDefault();
        const content = ref.current?.getMarkdown();

        const response0 = await fetch(`${API_URL}/members/${memberId}/questions`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content, title })
        });    

        if (!response0.ok) return;

        const question = await response0.json();
        // const response1 = await createQuestionCategories(question.id);

        // if (response1.ok) {
            navigate(`/main-page/news/question/${question.id}`);
        // }
    }

    const createQuestionCategories = (questionId) => {
        const categoryNames = categories.trim().split(' ').map(name => ({ name }));
        return fetch(`${API_URL}/questions/${questionId}/categories`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryNames)
        });

    }

    return (
        <>
            <main>
                <section className={styles["askquestion-wrapper"]}>
                    <h4 className={styles["askquestion-title"]}>Ask a question</h4>

                    <section className={styles["askquestion-main"]}>
                        <div className={styles["title"]}>
                            <h5>Title</h5>
                            <p>Ask your question as directly as possible</p>
                            <input type="text" placeholder="e.g Is there a way to get version from package.json in nodejs code?" onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div className={styles["body"]}>
                            <h5>Body</h5>
                            <p>
                                Include more details about your question to provide more context
                                (can include code snippets)
                            </p>
                            <MDXEditor
                                ref={ref}
                                markdown=""
                                placeholder='Enter text here ...'
                                plugins={[toolbarPlugin({
                                    toolbarContents: () => (<> <UndoRedo /><BoldItalicUnderlineToggles /><CodeToggle /><ListsToggle /> <BlockTypeSelect /><CreateLink /><InsertImage /></>)
                                }), headingsPlugin(), listsPlugin(), thematicBreakPlugin(), quotePlugin()]}
                            />
                        </div>
                        <div className={styles["tags"]}>
                            <h5>Categories</h5>
                            <p>Add up to 5 category tags to describe what your question is about</p>
                            <input type="text" placeholder="e.g javascript web html " onChange={e => setCategories(e.target.value)} />
                        </div>
                    </section>
                    <a href="/" className={styles["askquestion-button"]} onClick={createQuestion}>POST QUESTION</a>
                </section>
            </main >
        </>
    )
}