import styles from "./Question.module.css";
import { Link } from "react-router-dom";
export default function Question({ question, member, categories }) {
    return (
        <Link className={styles["questions"]} to={`/main-page/news/question/${question.id}`}>
            <div className={styles["question-box"]}>
                <img src={member?.avatar} alt="" />
                <div className={styles["question-content"]}>
                    <div className={styles["question-statement"]}>
                        <p>
                            {question.title}
                        </p>
                    </div>
                    <br />
                    <br />
                    <div className={styles["question-box-tags"]}>
                        <ul>
                            {categories?.map((category) => <li><p>{category?.name}</p></li>)}
                        </ul>
                        <p>asked 9 hours ago by <span>{member?.name}</span></p>
                    </div>

                </div>
            </div>
        </Link>
    )
}