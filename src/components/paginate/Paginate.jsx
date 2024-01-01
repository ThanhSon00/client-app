import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import React, {
  useEffect,
  useState
} from 'react';
import dayjs from "dayjs";
import styles from "./Paginate.module.css";
import "./Paginate.css";
import { Link } from "react-router-dom";
import Question from "components/question/Question";
import Answer from "components/answer/Answer";
import API_URL from "config/config";
import queryString from "query-string";

function Repositories({ repositories, type, page }) {
  if (repositories.length === 0) {
    return (
      <div className="alert alert-warning" role="alert">
        No results.
      </div>
    );
  }

  if (page === "DashBoard") {
    return (
      <div>
        {repositories?.map((repository) => (
          <div className={styles["question-list-a"]}>
            <Link to={`/main-page/news/question/${repository.questionId || repository.id}`} className={styles["exceeded-text-hidden"]} href="/">
              {repository?.title || repository?.content}
            </Link>
            <Link to={`/main-page/news/question/${repository.questionId || repository.id}`}>
              {dayjs(repository?.createdAt).format('hh:mm on DD/MM/YYYY')}
            </Link>
          </div>
        ))}
      </div>
    );
  }

  switch (type) {
    case "questions":
      return (
        <div>
          {repositories?.map((repository) => <Question question={repository} member={repository?.Member} />)}
        </div>
      )

    case "comments":
      return (
        <div>
          {repositories?.map((repository) => <Answer comment={repository} />)}
        </div>
      )
    default:
      return;
  }
  // if (questionCount && answerCount) {
  // }
  
  // TODO Format with https://getbootstrap.com/docs/5.1/components/card/
  //   https://getbootstrap.com/docs/5.1/components/list-group/

}
// type (Questions, Answers), conditions (size, search)
export default function Paginate({ type, conditions, page }) {
  const { size, search, sort, ...restOfConditions } = conditions;
  const [repositories, setRepositories] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const queryStr = queryString.stringify({
    page: pageOffset + 1,
    ...conditions
  })
  const queryStr1 = queryString.stringify({...restOfConditions, search });

  const getData = async () => {
    const response = await fetch(`${API_URL}/${type}?${queryStr}`)
    const data = await response.json();
    if (!response.ok) {
      setRepositories([]);
      setPageCount(0);
      return;
    }
    
    const response1 = await fetch(`${API_URL}/${type}/count?${queryStr1}`)
    const dataAmount = await response1.json();
    const maxPage = Math.floor(dataAmount/ size) + 1;
    setPageCount(maxPage);
    setRepositories(data);
  }

  useEffect(() => {
    getData();
  }, [pageOffset, type, conditions]);

  const handlePageChange = (event) => {
    setPageOffset(event.selected);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Repositories className="listing" repositories={repositories} type={type} page={page}/>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="paginationBttns"
        activeClassName="paginationActive"
        forcePage={pageOffset}
      />
    </div>
  );
}
