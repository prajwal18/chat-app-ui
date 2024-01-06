import { Stack, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../redux/slice/sessionSlice";
import EditProfileModal from "../../modals/profile/EditProfileModal";
import { useState } from "react";

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
  const authUser = useSelector(selectAuthUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Stack direction="row" sx={{ gap: "20px" }} alignItems="center">
        <ProfileImgContainer
          src={
            authUser.profile_picture ||
            "https://avatarfiles.alphacoders.com/224/224453.jpg"
          }
          alt="Prajwal Gautam"
          onClick={handleOpen}
        />
        <Stack gap="1">
          <BlueText
            variant="h5"
            sx={{ cursor: "pointer" }}
            onClick={handleOpen}
          >
            {authUser.name}
          </BlueText>
          <Typography>Senior Ruby Developer</Typography>
        </Stack>
      </Stack>
      <EditProfileModal open={open} handleClose={handleClose} user={authUser} />
    </>
  );
};

export default UserProfile;
