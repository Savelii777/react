import React from "react";
import {MyMessage} from "../util/MyMessage";
import {FormElementInput} from "../util/FormElementInput";
import {useUserFormInput} from "../../hooks/form_input/userFormInput";
import {useDispatch, useSelector} from "react-redux";



export function UserForm({fetch, button, onClick}) {

    const {username, password, getUsername, getPassword, validate, error} = useUserFormInput()
    const externalError = useSelector(state => state.auth.error)

    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault();

        if (validate())
            dispatch(fetch(username, password))
    }

    const exactError = () => {
        return error.length === 0 ? externalError : error
    }

    return (
        <>
            <div className="login1">
                <form id="shot" onSubmit={submitHandler}>
                    <MyMessage message={exactError()} className={'warning'}/>
                    <FormElementInput title={'Имя пользователя'} valueGetter={getUsername} inputType={'text'} maxLength={12}/>
                    <FormElementInput title={'Пароль'} valueGetter={getPassword} inputType={'password'}
                                      maxLength={12}/>
                    <div className="panel-element-inner">
                        <button className="submit" type="submit" id="login">{button}</button>
                    </div>
                </form>
            </div>
            <div className="panel-element">
                {button === 'LogIn' ?
                    <div className="register">Not registered? <span id="register" onClick={onClick}>Register. </span>
                    </div> :
                    <button id="back" onClick={onClick}>Вход/Регистрация</button>
                }
            </div>
        </>
    )
}