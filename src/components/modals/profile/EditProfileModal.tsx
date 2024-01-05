import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FC, useEffect } from "react";
import {
  AuthUserType,
  SessionInfoType,
  setSession,
} from "../../../redux/slice/sessionSlice";
import ChangePasswordForm from "./ChangePasswordForm";
import EditProfileForm from "./EditProfileForm";
import { useFormik } from "formik";
import { EditUserType, editUserSchema } from "../../../utils/yup/userSchemas";
import { editUser } from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Icons

// Icons

export type ChangePasswordValueType = {
  old_password: string;
  new_password: string;
};

interface IEditProfileModal {
  open: boolean;
  handleClose: () => void;
  user: AuthUserType;
}

const EditProfileModal: FC<IEditProfileModal> = ({
  open,
  handleClose,
  user,
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { name: "", email: "", profile_picture: "a" },
    validationSchema: editUserSchema,
    enableReinitialize: true,
    onSubmit: async (values: EditUserType) => {
      editUser(values, user.id)
        .then((data: SessionInfoType) => {
          dispatch(setSession(data));
          formik.resetForm();
          handleClose();
        })
        .catch((error: any) => {
          toast.error(error.message);
        });
    },
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("email", user.email);
      formik.setFieldValue("profile_picture", user.profile_picture);
    }
  }, [user]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile - {user.name}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <EditProfileForm formik={formik} />
          <ChangePasswordForm userId={user.id} isModalOpen={open} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="warning" variant="outlined">
          Close
        </Button>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="outlined"
          color="success"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
