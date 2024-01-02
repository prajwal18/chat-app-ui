import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectSearchTerm } from "../redux/slice/usersSlice";
import { AppDispatch } from "../redux/store";
import { selectAuthUser } from "../redux/slice/sessionSlice";

const useAutoRefetchUsers = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const authUserId = useSelector(selectAuthUser).id;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllUsers({searchTerm, authUserId}));
  }, [searchTerm]);
};

export default useAutoRefetchUsers;
