import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface IMessage {
  message: string;
  isFromMe: boolean;
}
const Message: FC<IMessage> = ({ message, isFromMe }) => {
  const messageStyle = isFromMe
    ? { borderBottomRightRadius: "0px", background: "#4399FF", color: "white" }
    : { borderBottomLeftRadius: "0px", background: "#DCE8FF" };
  return (
    <Stack alignSelf={isFromMe ? "flex-end" : "flex-start"} spacing={1}>
      <Box sx={{ p: "20px", borderRadius: "8px", ...messageStyle }}>
        <Typography>{message}</Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "10px",
          opacity: "0.7",
          textAlign: isFromMe ? "end" : "start",
        }}
      >
        {isFromMe ? "Prajwal" : "Maximus"}
      </Typography>
    </Stack>
  );
};

const ConversationRecord = () => {
  return (
    <Stack sx={{ flexGrow: 1, p: "20px", overflowY: "auto" }} spacing={1}>
      <Message isFromMe={false} message="Hello" />
      <Message isFromMe={true} message="What up" />
      <Message isFromMe={false} message="All Good" />
      <Message isFromMe={true} message="How are you liking Rails lately?" />
      <Message isFromMe={false} message="It's awesome." />
      <Message isFromMe={true} message="Ok Bye" />
      <Message isFromMe={false} message="Bye" />
      <Message isFromMe={true} message="What up" />
      <Message isFromMe={false} message="All Good" />
      <Message isFromMe={true} message="How are you liking Rails lately?" />
      <Message isFromMe={false} message="It's awesome." />
      <Message isFromMe={true} message="Ok Bye" />
      <Message isFromMe={false} message="Bye" />
    </Stack>
  );
};

export default ConversationRecord;
