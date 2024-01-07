import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageType,
  appendToConversation,
  selectConversation,
  selectIsLoadingConversation,
} from "../../../redux/slice/conversationSlice";
import Message from "./Message";



interface IConversationRecord {
  interlocutorId: number;
  myId: number;
  cable: any;
}

const ConversationRecord: FC<IConversationRecord> = ({
  interlocutorId,
  cable,
  myId,
}) => {
  const conversation = useSelector(selectConversation);
  const isLoadingConversation = useSelector(selectIsLoadingConversation);
  const dispatch = useDispatch();
  const conversatinRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (conversatinRef.current) {
      conversatinRef.current.scrollTo(0, conversatinRef.current.scrollHeight);
    }
  }, [conversation]);

  cable.subscriptions.create(
    {
      channel: "ChatsChannel",
      receiver_id: myId,
    },
    {
      received: (data: any) => {
        console.log(data);
        dispatch(appendToConversation(data.message));
      },
    }
  );

  return (
    <Stack
      sx={{ flexGrow: 1, p: "20px", overflowY: "auto" }}
      spacing={2}
      ref={conversatinRef}
    >
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
                  message={message}
                />
              </React.Fragment>
            );
          })}
        </>
      )}
    </Stack>
  );
};

export default ConversationRecord;
