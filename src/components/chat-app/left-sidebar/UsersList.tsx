import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../redux/slice/usersSlice";

const UsersList = () => {
  const users = useSelector(selectUsers);
  return (
    <Stack spacing={2} sx={{ flexGrow: "1", overflowY: "auto" }}>
      {users.map((user:any, index: number) => (
        <ListItem alignItems="center" key={user.id}>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://avatarfiles.alphacoders.com/224/224453.jpg"
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
