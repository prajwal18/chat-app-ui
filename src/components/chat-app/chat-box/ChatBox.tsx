import { Stack, Typography } from "@mui/material";
import ConversationRecord from "./ConversationRecord";
import InterlocutorProfile from "./InterlocutorProfile";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";
import { selectInterlocutor } from "../../../redux/slice/usersSlice";

const ChatBox = () => {
  const interlocutor = useSelector(selectInterlocutor);
  return (
    <Stack sx={{ minWidth: "500px", flexGrow: 1 }}>
      {interlocutor ? (
        <>
          {/* Interlocutor Info */}
          <InterlocutorProfile interlocutor={interlocutor} />

          {/* Conversation */}
          <ConversationRecord />

          {/* Send Message */}
          <SendMessage />
        </>
      ) : (
        <Stack
          sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Typography sx={{ color: "#a9a9a9" }}>Select a user</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ChatBox;
