import React from "react";
import {FormElementInput} from "../util/FormElementInput.jsx";
import {useShotFormInput} from "../../hooks/form_input/shotFormInput.js";
import {useDispatch} from "react-redux";
import {addShot} from "../../store/actions/actionsShots";
import {MyMessage} from "../util/MyMessage";
import {useShots} from "../../hooks/shots";
import "../../style/main/panel.css"

export function ShotForm() {

    const {coords, valid, getRValue, getYValue, getXValue, error} = useShotFormInput()
    const {pageSizeIsExhausted, lastPageOffset, pageSize, offset, token} = useShots()
    const dispatch = useDispatch()

    const submitHandler = (event) => {
        event.preventDefault()
        let data = {
            x: coords.xValue,
            y: coords.yValue,
            r: coords.radius
        }
        dispatch(addShot(data, pageSizeIsExhausted, lastPageOffset, pageSize, offset, token))
    }

    return (
        <div className="login">
            <form id="shot" onSubmit={submitHandler}>
                <MyMessage message={error} className={'warning'}/>
                <FormElementInput title={'X'} valueGetter={getXValue} inputType={'text'} maxLength={6}/>
                <FormElementInput title={'Y'} valueGetter={getYValue} inputType={'text'} maxLength={6}/>
                <FormElementInput title={'R'} valueGetter={getRValue} inputType={'text'} maxLength={6}/>
                <div className="panel-element-inner">
                    <button className="submit" type="submit" id="fire" disabled={!valid}>Отправить</button>
                </div>
            </form>
        </div>
    )
}