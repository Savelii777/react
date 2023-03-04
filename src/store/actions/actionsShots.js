import {
    CLEAR, LOAD_SHOTS,
    REMOVE_ERROR_MESSAGE, SET_ERROR_MESSAGE,
    SET_OFFSET, SET_RADIUS,
    SET_TOTAL_RECORDS
} from "../../utils/const/actionTypes.js";
import axios from "axios";

const config = (token) => {
    return {
        headers: {
            'Authorization': token
        }
    }
}

export function addShot(shot, pageSizeIsExhausted, lastPageOffset, pageSize, offset, token) {
    return function (dispatch) {
            axios.post('http://localhost:8080/lab4-1/api/graph/submit', {shot: shot, key: token}, config(token)).then(() => {
                dispatch(fetchShots(lastPageOffset, pageSize, token))
            }).catch(() => {
                dispatch(setErrorMessage('Сервер недоступен 500'))
            })

    }
}

export function fetchShots(offset, pageSize, token) {
    return function (dispatch) {
        axios.get(`http://localhost:8080/lab4-1/api/graph/points/get?key=`+token)
            .then((res) => {
                console.log(res.data)
                let page = res.data
                dispatch(loadShots(page))
                dispatch(setTotalRecords(page))
            }).then(() => {
            dispatch(removeErrorMessage())
        }).catch(() => {
            dispatch(setErrorMessage('Сервер недоступен 500'))
        })
    }
}

export function clear(token) {
    return function (dispatch) {
        axios.post('http://localhost:8080/lab4-1/api/graph/clear', token)
            .then(() => {
                dispatch(deleteShots())
                dispatch(setOffset(0))
                dispatch(setTotalRecords(0))
                dispatch(removeErrorMessage())
            }).catch(() => {
            dispatch(setErrorMessage('Сервер недоступен 500'))
        })
    }
}

function loadShots(shots) {
    shots.forEach((shot) => {
        shot.x = Math.round(shot.x * 1000) / 1000
        shot.y = Math.round(shot.y * 1000) / 1000
    })
    return {
        type: LOAD_SHOTS,
        payload: shots
    }
}

function deleteShots() {
    return {
        type: CLEAR
    }
}

export function setRadius(radius) {
    return {
        type: SET_RADIUS,
        payload: radius
    }
}

export function setErrorMessage(errorMessage) {
    return {
        type: SET_ERROR_MESSAGE,
        payload: errorMessage
    }
}

export function removeErrorMessage() {
    return {
        type: REMOVE_ERROR_MESSAGE
    }
}

export function setOffset(value) {
    return {
        type: SET_OFFSET,
        payload: value
    }
}

export function setTotalRecords(value) {
    return {
        type: SET_TOTAL_RECORDS,
        payload: value
    }
}