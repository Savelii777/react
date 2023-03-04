import React, {useEffect, useState} from "react";
import {RedirectPage} from "./RedirectPage";

export function ErrorPage() {
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setFlag(true)
        }, 1000)
    })

    return (
        <div className="main">
            {flag && <RedirectPage/>}
            <div className="big-warning">
                <h2>угу</h2>
            </div>
        </div>
    )
}