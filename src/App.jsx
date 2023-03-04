import React from 'react';
import "./style/main/panel.css"
import {Main} from "./components/main/Main";
import {Route, Routes} from "react-router-dom";
import {ErrorPage} from "./components/util/error/ErrorPage";
import {Login} from "./components/login/Login";
import {Layout} from "./components/util/Layout";

export function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login/>}/>
                    <Route path="/main" element={<Main/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}
