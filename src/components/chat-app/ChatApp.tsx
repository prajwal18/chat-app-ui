import { Stack, styled } from "@mui/material";
import UserListSidebar from "./left-sidebar/UserListSidebar";
import ChatBox from "./chat-box/ChatBox";
import InterlocutorProfileSidebar from "./right-sidebar/InterlocutorProfileSidebar";

// Styled Component
export const ChatAppSidebar = styled(Stack)`
  padding: 30px 20px;
  min-width: 400px;
  background-color: #fafafa;
`
// Styled Component

const ChatApp = () => {
  return (
    <Stack direction="row" className="chatApp">
      <UserListSidebar />
      <ChatBox />
      <InterlocutorProfileSidebar />
    </Stack>
  )
}

export default ChatApp;
