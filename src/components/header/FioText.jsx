import React from "react";
export function FioText(props) {

    return (
        <div className="fio-text">
            <span className="fio-text-before">{'Varyukhin Ivan'}</span>
            <span className="fio-text-after">{props.fio_tet_after}</span>
        </div>
    )
}