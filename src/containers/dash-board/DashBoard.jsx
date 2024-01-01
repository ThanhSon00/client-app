import React, { useState, useEffect } from "react";
import styles from "./DashBoard.module.css";
import Paginate from "components/paginate/Paginate";

const API_URL = process.env.REACT_APP_API_URL;

export default function DashBoard({ setUser }) {
  const [ questionCount, setQuestionCount ] = useState(0);
  const [ answerCount, setAnswerCount ] = useState(0);
  const [ type, setType ] = useState('questions');
  const memberId = JSON.parse(localStorage.getItem('token')).id;
  const user = JSON.parse(localStorage.getItem('token'));

  const getAndSetQuestionCount = async () => {
    const response = await fetch(`${API_URL}/members/${user.id}/questions/count`);
    if (response.ok) {
      const questionCount = await response.json();
      setQuestionCount(questionCount);
      return questionCount;
    }
  }
  
  const getAndSetAnswerCount = async (callback) => {
    const response = await fetch(`${API_URL}/members/${user.id}/comments/count`);
    if (response.ok) {
      const answerCount = await response.json();
      setAnswerCount(answerCount);
      return answerCount;  
    }
  }

  const onChangeHandler = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_image', file);

    const response0 = await fetch(`${API_URL}/cloud`, {
      method: "POST",
      body: formData,
      header: {
        "Content-Type": "application/jpeg"
      },
      mode: "cors"
    });

    if (response0.ok) {
      const imageUrl = await response0.json();
      const response1 = await fetch(`${API_URL}/members/${memberId}`, {
        method: 'PATCH',
        body: JSON.stringify({ avatar: imageUrl.image })
      })

      if (response1.ok) {
        const { avatar, ...restOfUser } = user;

        setUser({ avatar: imageUrl.image, ...restOfUser });
      }
    }
  }
  useEffect(() => {
    getAndSetQuestionCount();
    getAndSetAnswerCount();  
  }, [1])
  
  return (
    <div className={styles["dash-body"]} id="dashboard-mainpage">
      <div className={styles["user-details"]}>
        <div className={styles["user"]}>
          <img alt="" className={styles["profileImage"]} src={user?.avatar} />
          <div className={styles["details"]}>
            <h1 id="signed_name"></h1>
            <h3>{user?.name}</h3>
            <div className={styles["icons"]}>
              <a href="#"><i className={styles["fab fa-twitter"]}></i></a>
              <a href="#"><i className={styles["fab fa-github"]}></i></a>
              <a href="#"><i className={styles["fa fa-clock-o"]}></i></a>
              <a href="#"><i className={styles["fa fa-map-marker"]}></i></a>
            </div>
          </div>
        </div>
        <input id="image-file-input" type="file" className={styles["visually-hidden"]} name="avatar" onChange={e => onChangeHandler(e.target.files[0])} />
        <label htmlFor="image-file-input" className={styles["profile-photo-edit"]}>
          <span className="avatar-title rounded-circle bg-light text-body">
            <i className={styles["fa-pencil"]}><i className={styles["edit-btn"]}>Change Avatar</i></i>
          </span>
        </label>
      </div>
      <div className={styles["dashboard-mainpage"]}>
        <div className={styles["stats-col"]}>
          <h1>Stats</h1>
          <div className={styles["stat-numbers"]}>
            <div className={styles["answer"]}>
              <h3 style={{ textAlignLast: "center" }}>{answerCount}</h3>
              <p>Answers</p>
            </div>
            <div className={styles["question"]}>
              <h3 style={{ textAlignLast: "center" }}>{questionCount}</h3>
              <p>Questions</p>
            </div>
          </div>
        </div>
        <div className={styles["about-col"]}>

          <div className={styles["top-post"]}>
            <div className={styles["pre-list"]}>
              <h1 style={{fontWeight: 900}}>Top posts</h1>
              <div className={styles["pre-list-links"]}>
                <a href="/" onClick={(e) => { e.preventDefault(); setType("questions") }}>Questions</a>
                <a href="/" onClick={(e) => { e.preventDefault(); setType("comments") }}>Answers</a>
              </div>
            </div>
            {/* <Paginate type={type} conditions={{ size: 3, memberId }} page={"DashBoard"} /> */}
          </div>
          <div className={styles["top-post"]}>
            <div className={styles["pre-list"]}>
              <h1>Top tags</h1>
            </div>
            {/* <div className={styles["question-lists"]}>
              <div className={styles["question-list-a"]}>
                <a className={styles["tags"]} href="">web</a>
                <a href="">1 Post</a>
              </div>
              <div className={styles["question-list-b"]}>
                <a className={styles["tags"]} href="">vscode</a>
                <a href="">1 Post</a>
              </div>
              <div className={styles["question-list-c"]}>
                <a className={styles["tags"]} href="">javascript</a>
                <a href="">1 Post</a>
              </div>
              <div className={styles["question-list-c"]}>
                <a className={styles["tags"]} href="">pandas</a>
                <a href="">1 Post</a>
              </div>
              <div className={styles["question-list-c"]}>
                <a className={styles["tags"]} href="">html</a>
                <a href="">1 Post</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}