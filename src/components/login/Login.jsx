import React, {useEffect, useState} from "react";
import {UserForm} from "./UserForm";
import "../../style/login/login.css"
import {fetchLogin, fetchRegister, setAuthErrorMessage} from "../../store/actions/actionsAuth";
import {useDispatch, useSelector} from "react-redux";
import {MyMessage} from "../util/MyMessage";
import {useNavigate} from "react-router-dom";

export function Login() {

    const errorMessage = useSelector(state => state.error.message)
    const [reg, setReg] = useState(false)
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onClickReg = () => {
        setReg(false)
        dispatch(setAuthErrorMessage(''))
    }

    const onClickLogIn = () => {
        setReg(true)
        dispatch(setAuthErrorMessage(''))
    }

    useEffect(() => {
        if (isAuthorized)
            navigate('/main')
    }, [navigate, isAuthorized, errorMessage.length])

    return (
        <div className="main-login">
            {errorMessage.length === 0 && reg &&
                <UserForm fetch={fetchRegister} button={'Регистрация'}
                          onClick={onClickReg}/>
            }
            {errorMessage.length === 0 && !reg &&
                <UserForm fetch={fetchLogin} button={'Вход'}
                          onClick={onClickLogIn}/>
            }
            {errorMessage.length !== 0 &&
                <MyMessage message={'Ошибка сервера 500'} className={'big-warning'}/>
            }
        </div>
    )
}