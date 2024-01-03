import { Box, Stack, styled } from "@mui/material";
import { BlueText } from "../left-sidebar/UserProfile";
import { InterlocutorType } from "../../../redux/slice/usersSlice";
import { FC } from "react";

// Styled Componenet
const InterlocutorPic = styled("img")`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
`;
// Styled Componenet

interface IInterlocutorProfile {
  interlocutor: InterlocutorType
}

const InterlocutorProfile: FC<IInterlocutorProfile> = ({interlocutor}) => {
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
      <BlueText variant="h5">{interlocutor.name}</BlueText>
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

export default InterlocutorProfile;
