import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../redux/slice/sessionSlice";
import { fetchAllUsers, selectSearchTerm } from "../redux/slice/usersSlice";
import { AppDispatch } from "../redux/store";

const useAutoRefetchUsers = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (authUser) {
      const authUserId = authUser.id;
      dispatch(fetchAllUsers({ searchTerm, authUserId }));
    }
  }, [searchTerm, authUser]);
};

export default useAutoRefetchUsers;
