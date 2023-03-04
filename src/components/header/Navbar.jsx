import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOutAndClearMessage} from "../../store/actions/actionsAuth";

export function Navbar() {
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const dispatch = useDispatch()

    const onClickLogOut = () => {
        dispatch(logOutAndClearMessage())
    }

    return (
        <div className="header-element">
            {isAuthorized ? <NavLink to="/" onClick={onClickLogOut}>Выйти</NavLink> : <NavLink to="/">Войти</NavLink>}
        </div>
    )
}