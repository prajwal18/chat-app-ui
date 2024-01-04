import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from "@mui/material";
import { FC } from "react";
import { AuthUserType } from "../../../redux/slice/sessionSlice";
import ChangePasswordForm from "./ChangePasswordForm";

// Icons

// Icons

export type ChangePasswordValueType = {
  old_password: string;
  new_password: string;
};

interface IEditProfileModal {
  open: boolean;
  handleClose: (value: any) => void;
  user: AuthUserType;
}

const EditProfileModal: FC<IEditProfileModal> = ({
  open,
  handleClose,
  user,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile - {user.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <EditProfileForm />
          <ChangePasswordForm userId={user.id} isModalOpen={open} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="warning" variant="outlined">
          Close
        </Button>
        <Button onClick={handleClose} variant="outlined" color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditProfileForm = () => {
  return <Box sx={{ minWidth: "500px" }}></Box>;
};



export default EditProfileModal;
