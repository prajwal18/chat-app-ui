import { Stack, TextField } from "@mui/material";
import { FC, useState } from "react";
import convertToBase64 from "../../utils/convertToBase64";

interface IUploadImgComponent {
  formik: any;
}

const UploadImgComponent: FC<IUploadImgComponent> = ({ formik }) => {
  const [base64Img, setBase64Img] = useState<any>();
  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.[0]) {
      formik.setFieldValue("profile_picture", event.target.files[0]);
      const imgValue = await convertToBase64(event.target.files[0]);
      setBase64Img(imgValue);
    }
  };
  return (
    <Stack direction="row" gap={2} alignItems={"center"} justifyContent={'space-between'}>
      <label htmlFor="uploadFile" style={{ display: "none" }}>
        Upload Image
      </label>
      <TextField
        type="file"
        id="uploadFile"
        name="profile_picture"
        fullWidth
        inputProps={{
          accept: "image/*",
        }}
        onChange={handleOnChange}
      />
      {formik.values?.profile_picture && (
        <img
          src={base64Img}
          alt="Profile"
          style={{ width: "50px", height: "50px", objectFit: "contain" }}
        />
      )}
    </Stack>
  );
};

export default UploadImgComponent;
