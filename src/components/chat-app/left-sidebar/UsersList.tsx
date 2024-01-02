import { Avatar, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";

const UsersList = () => {
  return (
    <Stack spacing={2} sx={{ flexGrow: "1", overflowY: "auto" }}>
      {[...Array(5).keys()].map((item: number) => (
        <ListItem alignItems="center" key={item}>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://avatarfiles.alphacoders.com/224/224453.jpg"
              sx={{
                border: item % 2 ? "3px solid #89f573" : "none",
              }}
            />
          </ListItemAvatar>
          <ListItemText primary="Maximus Iridimus Decimus" />
        </ListItem>
      ))}
    </Stack>
  );
};

export default UsersList;
