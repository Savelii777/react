import {
    CLEAR,
    LOAD_SHOTS, LOGIN, LOGOUT,
    REMOVE_ERROR_MESSAGE, SET_AUTH_ERROR,
    SET_ERROR_MESSAGE,
    SET_OFFSET,
    SET_RADIUS, SET_TOTAL_RECORDS
} from "../../utils/const/actionTypes";

const initShotsState = {
    shots: []
}

export function shotsReducer(state = initShotsState, action) {
    switch (action.type) {
        default:
            return state
        case LOAD_SHOTS:
            return {...state, shots: action.payload}
        case CLEAR:
            return {...state, shots: []}
        case SET_OFFSET:
            return {...state, offset: action.payload}
        case SET_TOTAL_RECORDS:
            return {...state, totalRecords: action.payload}
    }
}

const initRadiusState = {
    value: 1
}

export function radiusReducer(state = initRadiusState, action) {
    switch (action.type) {
        default:
            return state
        case SET_RADIUS:
            return {...state, value: action.payload}
    }
}

const initialErrorState = {
    message: ''
}

export function errorReducer(state = initialErrorState, action) {
    switch (action.type) {
        default:
            return state
        case SET_ERROR_MESSAGE:
            return {...state, message: action.payload}
        case REMOVE_ERROR_MESSAGE:
            return {...state, message: ''}
    }
}

const initialAuthState = {
    isAuthorized: false,
    token: '',
    username: '',
    error: ''
}

export function authReducer(state = initialAuthState, action) {
    switch (action.type) {
        default:
            return state;
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                isAuthorized: true
            }
        case SET_AUTH_ERROR:
            return {...state, error: action.payload}
        case LOGOUT:
            return {...state, isAuthorized: false}
    }
}