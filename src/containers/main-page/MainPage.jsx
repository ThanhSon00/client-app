import React, { useState } from "react";
import "./imports";
import { Outlet } from "react-router-dom"
import Header from "../../components/header/Header";
import LeftBar from "../left-bar/LeftBar";

export default function MainPage() {
    const [ questions, setQuestions ] = useState([]);
    const [ search, setSearch ] = useState('');

    const user = JSON.parse(localStorage.getItem('token'));
    return (
        <>
            <Header setQuestions={setQuestions} user={user} search={search} setSearch={setSearch}/>
            <LeftBar />
            <Outlet context={{ 
                search
            }}/>
        </>
    )
}