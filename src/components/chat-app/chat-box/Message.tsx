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

interface IRenderMessage {
  message: string;
  isFromMe: boolean;
  isPicture: boolean;
  toggleShowMetaInfo: () => void;
}
const RenderMessage: FC<IRenderMessage> = ({
  isFromMe,
  message,
  isPicture,
  toggleShowMetaInfo,
}) => {
  const messageStyle = isFromMe
    ? { borderBottomRightRadius: "0px", background: "#4399FF", color: "white" }
    : { borderBottomLeftRadius: "0px", background: "#DCE8FF" };
  return (
    <>
      {isPicture ? (
        <img
          src={message}
          alt="message"
          style={{
            maxHeight: "300px",
            maxWidth: "300px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
          onClick={toggleShowMetaInfo}
        />
      ) : (
        <Box
          sx={{ p: "20px", borderRadius: "30px", ...messageStyle }}
          onClick={toggleShowMetaInfo}
        >
          <Typography>{message}</Typography>
        </Box>
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

  return (
    <Stack alignSelf={isFromMe ? "flex-end" : "flex-start"} spacing={1}>
      <MetaInfo
        show={showMetaInfo}
        isFromMe={isFromMe}
        text={getLocalDateTimeString(message.created_at)}
      />
      <Stack
        direction={"row"}
        justifyContent={isFromMe ? "flex-end" : "flex-start"}
      >
        <RenderMessage
          isFromMe={isFromMe}
          message={message.message}
          isPicture={message.is_picture}
          toggleShowMetaInfo={toggleShowMetaInfo}
        />
      </Stack>
      <MetaInfo
        show={showMetaInfo}
        isFromMe={isFromMe}
        text={message.sender.name}
      />
    </Stack>
  );
};

export default Message;
