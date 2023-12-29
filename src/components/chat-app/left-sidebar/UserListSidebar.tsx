import {
  Avatar,
  Button,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ChatAppSidebar } from "../ChatApp";

// MUI ICON
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { clearSession } from "../../../redux/slice/sessionSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// MUI ICON

// Styled Component
const ProfileImgContainer = styled("img")`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
export const BlueText = styled(Typography)`
  color: #3486eb;
`;
// Styled Component

const UserListSidebar = () => {
  return (
    <ChatAppSidebar spacing={4}>
      {/* Logged In User's Profile */}
      <UserProfle />

      {/* Search Bar */}
      <TextField
        placeholder="Search"
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

      {/* Users you can chat to */}
      <UserList />

      {/* Logout */}
      <Logout />
    </ChatAppSidebar>
  );
};

const UserProfle = () => {
  return (
    <Stack direction="row" sx={{ gap: "20px" }} alignItems="center">
      <ProfileImgContainer
        src="https://avatarfiles.alphacoders.com/224/224453.jpg"
        alt="Prajwal Gautam"
      />
      <Stack gap="1">
        <BlueText variant="h5">Prajwal Gautam</BlueText>
        <Typography>Senior Ruby Developer</Typography>
      </Stack>
    </Stack>
  );
};

const UserList = () => {
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

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(clearSession());
    navigate("/login");
    toast.info("You are logged out.");
  };
  return <Button onClick={handelLogout} variant="outlined">Log out</Button>;
};

export default UserListSidebar;
