import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSessionUser, getToken } from "../utils/CookieFunctions";
import { setSession } from "../redux/slice/sessionSlice";

const useFetchSessionFromCookieAndUpdateStore = () => {
    const dispatch = useDispatch();

    const fetchNSetSession = () => {
        const token = getToken();
        const user = getSessionUser();

        if (token && token != "" && user?.id && user?.name && user?.email ){
            dispatch(setSession({user, token}))
        }
    }

    useEffect(() => {
        fetchNSetSession();
    }, [dispatch]);
}

export default useFetchSessionFromCookieAndUpdateStore;