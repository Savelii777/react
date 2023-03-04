import React from "react";

export function FormElementInput({title, valueGetter, inputType, maxLength}) {

    function changeHandler(event) {
        const raw = event.currentTarget.value.trim()
        valueGetter(raw)
    }

    return (
        <div className="form">
            <h4>{title}</h4>
            <input className="input"
                type={inputType}
                maxLength={maxLength}
                placeholder="введите данные)"
                onInput={changeHandler}
            />
        </div>
    )
}