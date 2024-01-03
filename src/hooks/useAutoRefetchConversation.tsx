import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInterlocutor } from "../redux/slice/usersSlice";
import { fetchConversation, setConversation } from "../redux/slice/conversationSlice";
import { AppDispatch } from "../redux/store";

const useAutoRefetchConversation = () => {
  const interlocutor = useSelector(selectInterlocutor);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (interlocutor) {
      dispatch(fetchConversation(interlocutor.id));
    } else {
        dispatch(setConversation([]))
    }
  }, [interlocutor]);
};

export default useAutoRefetchConversation;
