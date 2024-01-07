import { Box, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { MessageType } from "../../../redux/slice/conversationSlice";

// Delete this later
function getLocalDateTimeString(dateString: string) {
  const date = new Date(dateString); // Convert to local Date time
  return date.toString().split(" ").slice(0, 5).join(" ");
}
// Delete this later

interface IMetaInfo {
  show: boolean;
  text: string;
  isFromMe: boolean;
}
const MetaInfo: FC<IMetaInfo> = ({ show, text, isFromMe }) => {
  return (
    <>
      {show && (
        <Typography
          sx={{
            fontSize: "10px",
            opacity: "0.7",
            textAlign: isFromMe ? "end" : "start",
          }}
        >
          {text}
        </Typography>
      )}
    </>
  );
};

interface IMessage {
  message: MessageType;
  isFromMe: boolean;
}
const Message: FC<IMessage> = ({ message, isFromMe }) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const toggleShowMetaInfo = () => {
    setShowMetaInfo((state) => !state);
  };
  const messageStyle = isFromMe
    ? { borderBottomRightRadius: "0px", background: "#4399FF", color: "white" }
    : { borderBottomLeftRadius: "0px", background: "#DCE8FF" };
  return (
    <Stack alignSelf={isFromMe ? "flex-end" : "flex-start"} spacing={1}>
      <MetaInfo
        show={showMetaInfo}
        isFromMe={isFromMe}
        text={getLocalDateTimeString(message.created_at)}
      />
      <Stack direction={"row"} justifyContent={"flex-start"}>
        <Box
          sx={{ p: "20px", borderRadius: "30px", ...messageStyle }}
          onClick={toggleShowMetaInfo}
        >
          <Typography>{message.message}</Typography>
        </Box>
      </Stack>
      <MetaInfo show={showMetaInfo} isFromMe={isFromMe} text={message.sender.name} />
    </Stack>
  );
};

export default Message;
