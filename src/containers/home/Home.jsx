import React from 'react';
import "./Home.module.css";
import { findSolution, footerLogo, githubLogo, group5, group5p1, group6, group6p1, group7, headerLogo, postQuestion, quoraLogo, quotes1, quotes2, rectangle21, rectangle23, rectangle24, rectangle25, rectangle26, stackoverflowLogo } from './imports';
// import { Link } from 'react-router-dom';

import styles from "./Home.module.css";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header>
        <nav>
          <div>
            <a href="./index.html"><img className="footer-image" src={headerLogo} alt="Header Logo" /></a>
          </div>
          <div className="nav-text">
            <ul>
              <li><a href="./ourteam.html">About Us</a></li>
              <li><a href="./question.html">Questions</a></li>
            </ul>
          </div>
          <div className="header-button">
            <Link className="login" to="/page/login"> Log in</Link>
            <Link className="create" to="/page/register">Create an account</Link>
          </div>

          <div className="mobile-nav">
            <div className="start" ></div>
            <div className="mid" ></div>
            <div className="end" ></div>

          </div>

        </nav>

        <div className="mobile-nav-menu">
          <ul className="menu">

            <li ><a href="./question.html" >Questions</a></li>
            <li><a href="./ourteam.html">Team</a></li>

            <a href="./signin.html" className="login-mobile">Log in</a>
            <a href="./signup.html" className="create-mobile">Create an account</a>

          </ul>
        </div>


      </header>

      <main>
        <section className={styles["hero"]}>
          <div className={styles["hero-wrapper"]}>
            <h3>Spend less time finding solutions to your technical Questions,
              help others answer theirs</h3>
            <p>Make solution finding easy and fast. Focus on building your apps</p>
            <div className={styles["hero-button"]}>
              <Link to="/page/register"><a href className={styles["get-started"]}>Get started now</a></Link>
              <Link to="/main-page/news/question"><a href className={styles["search"]}>Search content</a></Link>
            </div>
          </div>
        </section>

        <section className={styles["features"]}>

          <img className={styles["features-rect1"]} src={rectangle23} alt="rectangle Design1" />
          <img className={styles["features-rect2"]} src={rectangle24} alt="rectangle Design2" />
          <img className={styles["features-rect3"]} src={rectangle24} alt="rectangle Design3" />
          <img className={styles["features-rect4"]} src={rectangle25} alt="rectangle Design4" />
          <img className={styles["features-rect5"]} src={rectangle26} alt="rectangle Design5" />

          <section className={styles["find-solutions"]}>
            <div className={styles["brief"]}>
              <h4>Find solutions</h4>
              <div>
                <img src={group5} alt="" />
                <p>Find the best answer to your <span className={styles["feature-bd"]}> technical questions</span></p>
              </div>

              <div>
                <img src={group6} alt="" />
                <p>Search through <span className={styles["feature-bd"]}>verified</span> solutions</p>
              </div>

              <div>
                <img src={group7} alt="" />
                <p>Get access to questions and solutions from  <span className={styles["feature-bd"]}>various platforms</span></p>
              </div>

            </div>
            <div className={styles["image"]}>
              <img src={findSolution} alt="" />
            </div>
          </section>

          <section className={styles["post-questions"]}>
            <div className={styles["image"]}>
              <img src={postQuestion} alt="" />
            </div>
            <div className={styles["brief"]}>
              <h4 >Post questions</h4>

              <div>
                <img src={group5p1} alt="" />
                <p>Post Programming questions irrespective of  <span className={styles["feature-bd"]}>level of complexity</span></p>
              </div>

              <div>
                <img src={group6p1} alt="" />
                <p>Add  <span className={styles["feature-bd"]}>code snippets</span> to better clarify questions and get tailored answers</p>
              </div>

            </div>
          </section>

        </section>

        <section className={styles["integrations"]}>
          <h3>Integrated with</h3>
          <div>
            <img src={githubLogo} alt="Github Logo" />
            <img src={quoraLogo} alt="Quora Logo" />
            <img src={stackoverflowLogo} alt="Stackoverflow Logo" />
          </div>
        </section>

        <section className={styles["feedback"]}>



          <img className={styles["feedback-rect1"]} src={rectangle21} alt="rectangle Design1" />
          <img className={styles["feedback-rect2"]} src={rectangle23} alt="rectangle Design2" />
          <img className={styles["feedback-rect3"]} src={rectangle24} alt="rectangle Design3" />




          <h4>Help us improve our productivity</h4>


          <div className="quotes-container">
            <div className={styles["quotes"]}>
              <img src={quotes1} alt="Quotation mark left" />
              <img src={quotes2} alt="Quotation mark right" />
            </div>
          </div>

          <div className={styles["slideshow-container"]}>
            <div className={styles["fade"]}>
              <p>
                CodeAsk is very helpful for anyone looking for answers to their coding problems.
                I have received help so many times that I want to share this resource with others
              </p>
            </div>

            <div className={styles["fade"]}>
              <p>
                Great source for programming answer on just about any language. if you are just starting to learn programming, you will find a lot of people willing to help with your questions on this platform.
              </p>
            </div>

            <div className={styles["fade"]}>
              <p>
                The community is so welcoming, lots of people are few that are willing to help, i feel like I'm in the midst of developer family.
              </p>
            </div>

            <div className={styles["fade"]}>
              <p>
                I think this is the best place to learn anything about web development. It is fast becoming a go to site  for developers alike. Kudos!
              </p>
            </div>

            <div className={styles["fade"]}>
              <p>
                If you want answers to any coding questions, CodeAsk is the best site for you . Go on and browse the user friendly site until your heart is content.
              </p>
            </div>



            <div style={{ textAlign: "center" }}>
              <span className={styles["dot"]}></span>
              <span className={styles["dot"]}></span>
              <span className={styles["dot"]}></span>
              <span className={styles["dot"]}></span>
              <span className={styles["dot"]}></span>
            </div>
          </div>

        </section>


      </main>

      <footer>
        <section className="footer-wrapper">
          <div className="item1">
            <img src={footerLogo} alt="Footer Logo" />
          </div>
          <div className="item2">
            <ul>
              <p className="footer-head">Quick links</p>

              <li><a href="./question.html">Questions</a></li>

              <li><a href="./FAQ.html">FAQ</a></li>
            </ul>
          </div>
          <div className="item3">
            <ul>
              <p className="footer-head">Company</p>

              <li><a href="./ourteam.html">About</a></li>

              <li><a href="http://">Contact Us</a></li>
            </ul>
          </div>
          <div className="item4">
            <ul>
              <p className="footer-head">Legal</p>
              <li><a href="http://">Privacy Policy</a></li>
              <li><a href="http://">Terms</a></li>
            </ul>
          </div>
          <div className="item5">
            <ul>
              <p className="footer-head">Socials</p>
              <li><a href="http://" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="http://" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="http://" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </section>

        <div className="hr"></div>

        <div className="newsletter">

          <div className="newsletter-brief">
            <h4>Subscribe to our newsletter</h4>
            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
          </div>

          <div className="subscribe-email">
            <input type="email" name="email" id="email" placeholder="Enter your email..." />
            <label htmlFor="email">Subscribe</label>
          </div>

        </div>

        <div className="hr"></div>
        <p className="right-reserved">© Copyright 2022 CodeAsk. All Rights Reserved.</p>
      </footer>
    </div>
  )
}