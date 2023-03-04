import {useState} from "react";

export function useUserFormInput() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameIsValid, setUsernameIsValid] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [error, setError] = useState('')

    function validate() {
        if (!usernameIsValid) {
            setError("Некорректное имя пользователя")
            return false
        } else if (!passwordIsValid) {
            setError("Некорректный пароль")
            return false
        } else {
            setError("")
            return true
        }
    }

    function getPassword(password) {
        if (password.length < 4) {
            setPasswordIsValid(false)
        } else {
            setPassword(password)
            setPasswordIsValid(true)
        }
    }

    function getUsername(username) {
        if (username.length < 4) {
            setUsernameIsValid(false)
        } else {
            setUsername(username)
            setUsernameIsValid(true)
        }
    }

    return {username, password, getUsername, getPassword, validate, error}
}