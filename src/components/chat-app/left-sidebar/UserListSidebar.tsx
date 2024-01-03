import { Button, InputAdornment, TextField } from "@mui/material";
import { ChatAppSidebar } from "../ChatApp";

// MUI ICON
import SearchIcon from "@mui/icons-material/Search";
import { Dispatch } from "@reduxjs/toolkit";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearSession } from "../../../redux/slice/sessionSlice";
import {
  selectSearchTerm,
  setSearchTerm
} from "../../../redux/slice/usersSlice";
import UserProfile from "./UserProfile";
import UsersList from "./UsersList";
// MUI ICON

const UserListSidebar = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();


  return (
    <ChatAppSidebar spacing={4}>
      {/* Logged In User's Profile */}
      <UserProfile />

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} dispatch={dispatch} />

      {/* Users you can chat to */}
      <UsersList />

      {/* Logout */}
      <Logout dispatch={dispatch} />
    </ChatAppSidebar>
  );
};

interface ISearchBar {
  searchTerm: string;
  dispatch: Dispatch;
}
const SearchBar: FC<ISearchBar> = ({ searchTerm, dispatch }) => {
  const handleOnChange = (e: any) => {
    const text = e.target.value;
    dispatch(setSearchTerm(text));
  };
  return (
    <TextField
      placeholder="Search"
      value={searchTerm}
      onChange={handleOnChange}
      InputProps={{
        style: {
          borderRadius: "50px",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

const Logout = ({ dispatch }: { dispatch: Dispatch }) => {
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(clearSession());
    navigate("/login");
    toast.info("You are logged out.");
  };
  return (
    <Button onClick={handelLogout} variant="outlined">
      Log out
    </Button>
  );
};

export default UserListSidebar;
