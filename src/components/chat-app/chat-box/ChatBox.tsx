import { Box, Fab, Stack, TextField, Typography, styled } from "@mui/material";
import { BlueText } from "../left-sidebar/UserListSidebar";

// Icons
import SendIcon from "@mui/icons-material/Send";
import { FC } from "react";
// Icons

// Styled Componenet
const InterlocutorPic = styled("img")`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
`;
// Styled Componenet

const ChatBox = () => {
  return (
    <Stack sx={{ minWidth: "500px", flexGrow: 1 }}>
      {/* Interlocutor Info */}
      <InterlocutorProfile />

      {/* Conversation */}
      <ConversationRecord />

      {/* Send Message */}
      <SendMessage />
    </Stack>
  );
};

const InterlocutorProfile = () => {
  return (
    <Stack
      sx={{ p: "30px 30px 20px 30px", borderBottom: "1px solid #bbbdbb" }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <InterlocutorPic
        src="https://avatarfiles.alphacoders.com/224/224453.jpg"
        alt="Maximus Iridimus Decimus"
      />
      <BlueText variant="h5">Maximus Iridimus Decimus</BlueText>
      <Box
        sx={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#89f573",
        }}
      />
    </Stack>
  );
};

const ConversationRecord = () => {
  return (
    <Stack sx={{ flexGrow: 1, p:"20px", overflowY: "auto" }} spacing={1}>
      <Message isFromMe={false} message="Hello"/>
      <Message isFromMe={true} message="What up"/>
      <Message isFromMe={false} message="All Good"/>
      <Message isFromMe={true} message="How are you liking Rails lately?"/>
      <Message isFromMe={false} message="It's awesome."/>
      <Message isFromMe={true} message="Ok Bye"/>
      <Message isFromMe={false} message="Bye"/>
      <Message isFromMe={true} message="What up"/>
      <Message isFromMe={false} message="All Good"/>
      <Message isFromMe={true} message="How are you liking Rails lately?"/>
      <Message isFromMe={false} message="It's awesome."/>
      <Message isFromMe={true} message="Ok Bye"/>
      <Message isFromMe={false} message="Bye"/>
    </Stack>
  );
};

interface IMessage {
  message: string;
  isFromMe: boolean;
}
const Message: FC<IMessage> = ({ message, isFromMe }) => {
  const messageStyle = isFromMe ? { borderBottomRightRadius: "0px", background:"#4399FF", color: "white"}:{borderBottomLeftRadius: "0px", background:"#DCE8FF"}
  return (
    <Stack alignSelf={isFromMe? "flex-end": "flex-start"} spacing={1}>
      <Box sx={{p: "20px", borderRadius:"8px", ...messageStyle}}>
        <Typography>{message}</Typography>
      </Box>
      <Typography sx={{fontSize:"10px", opacity:"0.7", textAlign:isFromMe?"end":"start"}}>
        {isFromMe? "Prajwal": "Maximus"}
      </Typography>
    </Stack>
  );
};

const SendMessage = () => {
  return (
    <Stack
      sx={{ p: "20px", backgroundColor: "#DCE8FF" }}
      spacing={2}
      direction="row"
      alignItems="center"
    >
      <TextField
        placeholder="Say Something..."
        fullWidth
        InputProps={{
          style: {
            borderRadius: "30px",
          },
        }}
      />
      <Fab color="primary" aria-label="add">
        <SendIcon />
      </Fab>
    </Stack>
  );
};

export default ChatBox;
