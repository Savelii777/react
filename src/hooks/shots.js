import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useFetchParams} from "./fetchParams";


export function useShots() {


    const {token, totalRecords} = useFetchParams()
    const shots = useSelector(state => state.shot.shots)


    return {shots, totalRecords, token}
}