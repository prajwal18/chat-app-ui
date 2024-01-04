import { Box, Stack, Typography } from "@mui/material";
import React, { FC, useState } from "react";





// Delete this later
function convertUTCDateToLocalDate(date: Date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

function getDateTimeString(d: string) {

    const date = new Date(d)
    const myDate = convertUTCDateToLocalDate(date)
    console.log(myDate)
    return myDate.toLocaleString
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
  message: string;
  isFromMe: boolean;
  sender: string;
  createdAt: string;
}
const Message: FC<IMessage> = ({ message, isFromMe, sender, createdAt }) => {
    const [showMetaInfo, setShowMetaInfo] = useState(false);
    const toggleShowMetaInfo = () => {
      getDateTimeString(createdAt)
    setShowMetaInfo((state) => !state);
  };
  const messageStyle = isFromMe
    ? { borderBottomRightRadius: "0px", background: "#4399FF", color: "white" }
    : { borderBottomLeftRadius: "0px", background: "#DCE8FF" };
  return (
    <Stack alignSelf={isFromMe ? "flex-end" : "flex-start"} spacing={1}>
      <MetaInfo show={showMetaInfo} isFromMe={isFromMe} text={createdAt} />

      <Box
        sx={{ p: "20px", borderRadius: "30px", ...messageStyle }}
        onClick={toggleShowMetaInfo}
      >
        <Typography>{message}</Typography>
      </Box>
      <MetaInfo show={showMetaInfo} isFromMe={isFromMe} text={sender} />
    </Stack>
  );
};

export default Message;
