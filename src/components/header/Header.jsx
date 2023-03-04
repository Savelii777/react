import React from "react";
import {Navbar} from "./Navbar";
import "../../style/header/header.css"

export function Header() {

    return (
        <div className="header">
            <div className="fio">
                <div className="fio-text">
                    <p>Sporyshev Savelii P32302 var:8754689</p>
                </div>
            </div>
            <Navbar/>
        </div>
    )
}