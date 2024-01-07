import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  InterlocutorType,
  selectInterlocutor,
  selectUsers,
  setInterlocutor,
} from "../../../redux/slice/usersSlice";

const getBgColor = (id: number, interlocutor: null | InterlocutorType) => {
  return interlocutor?.id == id ? "#C8C8C8" : "inherit";
};

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const interlocutor = useSelector(selectInterlocutor);
  const handleOnClick = (user: InterlocutorType) => {
    dispatch(setInterlocutor(user));
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: "1", overflowY: "auto" }}>
      {users.map((user: InterlocutorType, index: number) => (
        <ListItem
          alignItems="center"
          key={user.id}
          onClick={() => handleOnClick(user)}
          sx={{
            background: getBgColor(user.id, interlocutor),
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={user.profile_picture || "https://avatarfiles.alphacoders.com/224/224453.jpg"}
              sx={{
                border: index % 2 ? "3px solid #89f573" : "none",
              }}
            />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </Stack>
  );
};

export default UsersList;
