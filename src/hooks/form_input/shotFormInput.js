import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setRadius} from "../../store/actions/actionsShots";

export function useShotFormInput() {

    const radius = useSelector(state => state.radius.value)
    const dispatch = useDispatch()

    const [valid, isValid] = useState(false)
    const [xIsValid, setXIsValid] = useState(false)
    const [yIsValid, setYIsValid] = useState(false)
    const [rIsValid, setRIsValid] = useState(false)
    const [xValue, setXValue] = useState(0)
    const [yValue, setYValue] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        validate()
    })

    function validate() {
        if (!xIsValid) {
            isValid(false)
            setError('X должен быть (-3, 3)')
        } else if (!yIsValid) {
            isValid(false)
            setError('Y должен быть (-5, 3)')
        } else if (!rIsValid) {
            isValid(false)
            setError('R должен быть (-3, 3)')
        } else {
            isValid(true)
            setError('')
        }
    }

    function isNumeric(value) {
        return !isNaN(value - parseFloat(value));
    }

    function getXValue(x) {
        if (isNumeric(x) && x > -4 && x < 4) {
            setXValue(x)
            setXIsValid(true);
        } else {
            setXIsValid(false)
        }
    }

    function getYValue(y) {
        if (isNumeric(y) && y > -6 && y < 4) {
            setYValue(y)
            setYIsValid(true)
        } else {
            setYIsValid(false)
        }
    }

    function getRValue(r) {
        if (isNumeric(r) && r > -4 && r < 4) {
            // setRValue(r)
            dispatch(setRadius(r))
            setRIsValid(true)
        } else {
            setRIsValid(false)
        }
    }

    return {coords: {xValue, yValue, radius}, valid, getXValue, getYValue, getRValue, error}
}