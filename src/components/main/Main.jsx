import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Graph} from "./Graph";
import {ShotForm} from "./ShotForm";
import {History} from "./History";
import {MyMessage} from "../util/MyMessage";
import {fetchShots} from "../../store/actions/actionsShots";
import {useFetchParams} from "../../hooks/fetchParams";


export function Main() {

    const errorMessage = useSelector(state => state.error.message)

    const {offset, pageSize, token} = useFetchParams()

    const dispatch = useDispatch()
    const isAuthorized = useSelector(state => state.auth.isAuthorized)

    useEffect(() => {

        if (isAuthorized) {
            dispatch(fetchShots(offset, pageSize, token))
        }
    }, [dispatch, isAuthorized, offset, pageSize, token])

    return (
        <div className="main">
            {errorMessage.length === 0 && isAuthorized
                ?
                <>
                    <div id='container' className="container1">
                        <Graph/>
                        <ShotForm/>
                    </div>
                    <div className="container">
                        <div className="panel-element">
                            <h2>Табличка</h2>
                        </div>
                        <History/>
                    </div>
                </>
                :
                <MyMessage message={'Ошибка сервера 500'} className={'big-warning'}/>}
        </div>
    )
}