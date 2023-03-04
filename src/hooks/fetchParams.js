import {useSelector} from "react-redux";

export function useFetchParams() {


    const token = useSelector(state => state.auth.token)
    const totalRecords = useSelector(state => state.shot.totalRecords)

    return {token, totalRecords}

}