import { Stack, Typography, styled } from "@mui/material";

// Styled Component
const ProfileImgContainer = styled("img")`
  height: 100px;
  width: 100px;
  object-fit: cover;
  border-radius: 50%;
`;
export const BlueText = styled(Typography)`
  color: #3486eb;
`;
// Styled Component

const UserProfile = () => {
  return (
    <Stack direction="row" sx={{ gap: "20px" }} alignItems="center">
      <ProfileImgContainer
        src="https://avatarfiles.alphacoders.com/224/224453.jpg"
        alt="Prajwal Gautam"
      />
      <Stack gap="1">
        <BlueText variant="h5">Prajwal Gautam</BlueText>
        <Typography>Senior Ruby Developer</Typography>
      </Stack>
    </Stack>
  );
};

export default UserProfile;
