import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSessionUser, getToken } from "../utils/CookieFunctions";
import { setSession } from "../redux/slice/sessionSlice";
import { resetConversationState } from "../redux/slice/conversationSlice";
import { resetUsersState } from "../redux/slice/usersSlice";

const useFetchSessionFromCookieAndUpdateStore = () => {
  const dispatch = useDispatch();

  const fetchNSetSession = () => {
    const token = getToken();
    const user = getSessionUser();

    if (token && token != "" && user?.id && user?.name && user?.email) {
      dispatch(setSession({ user, token }));
    } else {
      dispatch(resetConversationState());
      dispatch(resetUsersState());
    }
  };

  useEffect(() => {
    fetchNSetSession();
  }, [dispatch]);
};

export default useFetchSessionFromCookieAndUpdateStore;
