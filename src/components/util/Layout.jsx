import {Outlet} from "react-router-dom";
import {Header} from "../header/Header";
import React from "react";


export function Layout() {

    return (
        <>
            <Header/>
            <Outlet />
        </>
    )
}