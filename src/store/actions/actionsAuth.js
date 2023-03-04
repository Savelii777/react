import axios from "axios";
import {setErrorMessage} from "./actionsShots";
import { LOGIN, LOGOUT, SET_AUTH_ERROR} from "../../utils/const/actionTypes";

export function fetchRegister(username, password) {
    return function (dispatch) {
        let data = {
            login: username,
            pass: password
        }
        axios.post('http://localhost:8080/lab4-1/api/auth/register', data)
            .then(res => res.data)
            .then((res) => {
                if (res.message === 'success')
                    console.log(res.message)
                console.log(username)
                    dispatch(login(username, res.token))
                dispatch(setAuthErrorMessage(res.message))
            })
            .catch(() => {
                dispatch(setErrorMessage('Сервер недоступен 500'))
            })
    }
}

export function fetchLogin(username, password) {
    return function (dispatch) {
        let data = {
            login: username,
            pass: password
        }
        axios.post('http://localhost:8080/lab4-1/api/auth/login', data)
            .then(res => res.data)
            .then((res) => {
                if (res.message === 'success') {
                    console.log(res.token)
                    dispatch(login(username, res.token))
                }
                dispatch(setAuthErrorMessage(res.message))
            })
            .catch(() => {
                dispatch(setErrorMessage('Сервер недоступен 500'))
            })
    }
}

export function logOutAndClearMessage() {
    return function (dispatch) {
        dispatch(setAuthErrorMessage(''))
        dispatch(logOut())
    }
}

function login(username, token) {
    token = token
    return {
        type: LOGIN,
        payload: {
            username: username,
            token: token
        }
    }
}

export function logOut() {
    return {
        type: LOGOUT
    }
}

export function setAuthErrorMessage(message) {
    return {
        type: SET_AUTH_ERROR,
        payload: message
    }
}