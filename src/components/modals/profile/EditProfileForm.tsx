import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import CustImage from "../../CustImage";

import uploadImg from "../../../assets/image/uploadImg.png";

interface IEditProfileForm {
  formik: any;
}
const EditProfileForm: FC<IEditProfileForm> = ({ formik }) => {
  const handlePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target?.files?.[0]) {
      formik.setFieldValue("profile_picture", event.target.files[0]);
    }
  };
  return (
    <Box
      sx={{ minWidth: "500px", py: "10px" }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={2} direction="row">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name ? formik.errors.name : ""}
              error={formik.touched.name && Boolean(formik.errors.name)}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              type="text"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email ? formik.errors.email : ""}
              error={formik.touched.email && Boolean(formik.errors.email)}
              disabled={formik.isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Profile Picture:</Typography>
            <TextField
              name="profile_picture"
              type="file"
              fullWidth
              inputProps={{
                accept: "image/*"
              }}
              onChange={handlePictureUpload}
              disabled={formik.isSubmitting}
            />
          </Grid>
        </Grid>
        <Stack justifyContent={"center"} alignItems={"center"}>
          {/* Profile Image Display */}
          <CustImage
            src={formik.values.profile_picture}
            alt={formik.values.name}
            errImg={uploadImg}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditProfileForm;
