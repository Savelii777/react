import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import '../../style/main/table.css'
import {useDispatch} from "react-redux";
import {MyMessage} from "../util/MyMessage";
import {clear, fetchShots, setOffset} from "../../store/actions/actionsShots";
import {useShots} from "../../hooks/shots";


export function History() {

    const {shots, token} = useShots()

    const [empty, setEmpty] = useState(true)
    const dispatch = useDispatch()






    useEffect(() => {
        if (shots.length !== 0) setEmpty(false)
        else setEmpty(true)
    }, [shots.length]);

    function submitHandler(event) {
        event.preventDefault()
        dispatch(clear(token))
    }


    return (
        <>
            <div className="panel-element">
                {empty && <MyMessage message={'Данных пока нет'} className={'message'}/>}
                {!empty && <DataTable value={shots} responsiveLayout="scroll">
                    <Column field="x" header="X"></Column>
                    <Column field="y" header="Y"></Column>
                    <Column field="r" header="R"></Column>
                    <Column field="inside" header="Попадание"></Column>
                </DataTable>}
            </div>
            <div className="panel-element">
                <form onSubmit={submitHandler}>
                    <button type="submit">Очистить историю</button>
                </form>
            </div>
        </>
    )
}
