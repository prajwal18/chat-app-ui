import { Box, Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  MessageType,
  selectConversation,
  selectIsLoadingConversation,
} from "../../../redux/slice/conversationSlice";

interface IMessage {
  message: string;
  isFromMe: boolean;
  sender: string;
}
const Message: FC<IMessage> = ({ message, isFromMe, sender }) => {
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
        {sender}
      </Typography>
    </Stack>
  );
};

interface IConversationRecord {
  interlocutorId: number;
}

const ConversationRecord: FC<IConversationRecord> = ({ interlocutorId }) => {
  const conversation = useSelector(selectConversation);
  const isLoadingConversation = useSelector(selectIsLoadingConversation);
  const conversatinRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (conversatinRef.current) {
      conversatinRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <Stack sx={{ flexGrow: 1, p: "20px", overflowY: "auto" }} spacing={1}>
      {isLoadingConversation ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {conversation.map((message: MessageType) => {
            const isFromMe = message.sender.id !== interlocutorId;
            return (
              <React.Fragment key={message.id}>
                <Message
                  isFromMe={isFromMe}
                  message={message.message}
                  sender={message.sender.name}
                />
              </React.Fragment>
            );
          })}
          <div ref={conversatinRef} />
        </>
      )}
    </Stack>
  );
};

export default ConversationRecord;
