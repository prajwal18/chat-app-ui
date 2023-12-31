import { Box, Fab, Stack, Typography, styled } from "@mui/material";
import { ChatAppSidebar } from "../ChatApp";

// MUI Icons
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VideocamIcon from "@mui/icons-material/Videocam";
import { BlueText } from "../left-sidebar/UserProfile";
import { useSelector } from "react-redux";
import { selectInterlocutor } from "../../../redux/slice/usersSlice";
// MUI Icons

// Styled Component
const ProfileImg = styled("img")`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
`;
// Styled Component

const InterlocutorProfileSidebar = () => {
  const interlocutor = useSelector(selectInterlocutor);
  return (
    <ChatAppSidebar
      sx={{ paddingTop: "100px", alignItems: "center" }}
      spacing={4}
    >
      <ProfileImg
        src="https://avatarfiles.alphacoders.com/224/224453.jpg"
        alt="Maximus Iridimus Decimus"
      />
      <Stack spacing={1} sx={{textAlign:"center"}}>
        {interlocutor ? (
          <>
            <BlueText variant="h5">{interlocutor.name}</BlueText>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {interlocutor.email}
            </Typography>
          </>
        ) : (
          <Typography sx={{ color: "grey" }}>User not selected</Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="center"
        spacing={3}
      >
        <Stack alignItems="center" spacing={1}>
          <Fab color="primary" aria-label="add" disabled={!interlocutor}>
            <ChatBubbleIcon />
          </Fab>
          <Typography sx={{ color: "#8c8c8c" }}>Chat</Typography>
        </Stack>
        <VerticalDivider />
        <Stack alignItems="center" spacing={1}>
          <Fab color="primary" aria-label="add" disabled={!interlocutor}>
            <VideocamIcon />
          </Fab>
          <Typography sx={{ color: "#8c8c8c" }}>Video call</Typography>
        </Stack>
      </Stack>
    </ChatAppSidebar>
  );
};

const VerticalDivider = () => {
  return (
    <Box sx={{ height: "100%", width: "2px", background: "#e3e6e4" }}></Box>
  );
};

export default InterlocutorProfileSidebar;
