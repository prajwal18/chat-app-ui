import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { changePasswordSchema } from "../../../utils/yup/userSchemas";
import { ChangePasswordValueType } from "./EditProfileModal";
import { changePassword } from "../../../services/user.service";
import { toast } from "react-toastify";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomPasswordField from "../../form/CustomPasswordField";

// ICONS
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// ICONS

interface IChangePasswordForm {
  userId: number;
  isModalOpen: boolean;
}

const ChangePasswordForm: FC<IChangePasswordForm> = ({
  userId,
  isModalOpen,
}) => {
  const [show, setShow] = useState(false);
  const handleToggleShow = () => {
    setShow((state) => !state);
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
    },
    validationSchema: changePasswordSchema,
    enableReinitialize: true,
    onSubmit: async (values: ChangePasswordValueType) => {
      changePassword(values, userId)
        .then((_data) => {
          toast.success("Password changed successfully");
          formik.setSubmitting(false);
          formik.resetForm();
        })
        .catch((error: any) => {
          formik.setSubmitting(false);
          toast.error(error.message);
        });
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [isModalOpen]);
  return (
    <Stack spacing={2}>
      <Stack
        direction={"row"}
        sx={{ gap: "10px", justifyContent: "space-between", cursor: "pointer" }}
        onClick={handleToggleShow}
      >
        <Typography>Change Password</Typography>
        <Button>{show ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</Button>
      </Stack>
      {show && (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <CustomPasswordField
            name="old_password"
            label="Old Password"
            margin="normal"
            fullWidth
            value={formik.values.old_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.old_password ? formik.errors.old_password : ""
            }
            error={
              formik.touched.old_password && Boolean(formik.errors.old_password)
            }
            disabled={formik.isSubmitting}
          />
          <CustomPasswordField
            name="new_password"
            label="New Password"
            margin="normal"
            fullWidth
            value={formik.values.new_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.new_password ? formik.errors.new_password : ""
            }
            error={
              formik.touched.new_password && Boolean(formik.errors.new_password)
            }
            disabled={formik.isSubmitting}
          />
          <Button
            variant="outlined"
            type="submit"
            sx={{ display: "block", width: "100%", mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default ChangePasswordForm;
