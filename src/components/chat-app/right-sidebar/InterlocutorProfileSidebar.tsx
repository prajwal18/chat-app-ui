import { Box, Fab, Stack, Typography, styled } from "@mui/material";
import { ChatAppSidebar } from "../ChatApp";
import { BlueText } from "../left-sidebar/UserListSidebar";

// MUI Icons
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import VideocamIcon from "@mui/icons-material/Videocam";
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
  return (
    <ChatAppSidebar
      sx={{ paddingTop: "100px", alignItems: "center" }}
      spacing={4}
    >
      <ProfileImg
        src="https://avatarfiles.alphacoders.com/224/224453.jpg"
        alt="Maximus Iridimus Decimus"
      />
      <Stack spacing={1}>
        <BlueText variant="h5"> 
          Maximus Iridimus Decimus
        </BlueText>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Junior developer
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="center"
        spacing={3}
      >
        <Stack alignItems="center" spacing={1}>
          <Fab color="primary" aria-label="add">
            <ChatBubbleIcon />
          </Fab>
          <Typography sx={{color:"#8c8c8c"}}>Chat</Typography>
        </Stack>
        <VerticalDivider />
        <Stack alignItems="center" spacing={1}>
          <Fab color="primary" aria-label="add">
            <VideocamIcon />
          </Fab>
          <Typography sx={{color:"#8c8c8c"}}>Video call</Typography>
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
