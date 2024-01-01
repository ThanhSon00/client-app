import React from 'react'
import './App.css'

// CONTAINER
import Register from './containers/register/Register';
import Home from './containers/home/Home';
import QuestionPage from './containers/question/QuestionPage';
import AnswerPage from './containers/answer/AnswerPage'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './containers/main-page/MainPage';
import Page from './containers/page/Page';
import Login from './containers/login/Login';
import ForgotPassword from './containers/forgot-password/ForgotPassword';
import ResetPassword from './containers/reset-password/ResetPassword';
import AskQuestion from './containers/ask-question/AskQuestion';
import NewsPage from './containers/news-page/NewsPage';
import ProtectedRoute from 'utils/ProtectedRoute';
import useUser from 'hooks/useToken'
import LoginRoute from 'utils/LoginRoute';
import DashBoard from 'containers/dash-board/DashBoard';

const App = () => {
  const { user, setUser } = useUser({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/" element={<LoginRoute><Page /></LoginRoute>}>
          <Route path="/page/register" element={<Register setUser={setUser}/>} />
          <Route path="/page/login" element={<Login setUser={setUser}/>} />
          <Route path="/page/forgot-password" element={<ForgotPassword />} />
          <Route path="/page/reset-password/:id" element={<ResetPassword />} />
        </Route>

        <Route path="/main-page/" element={<ProtectedRoute><MainPage /></ProtectedRoute>}>
          <Route path="/main-page/dash-board" element={<DashBoard setUser={setUser}/>} />
          <Route path="/main-page/ask-question" element={<AskQuestion />} />
          <Route path="/main-page/news/" element={<NewsPage />}>
            <Route path="/main-page/news/question/:id" element={<AnswerPage />} />
            <Route path="/main-page/news/question" element={<QuestionPage />} />  
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App