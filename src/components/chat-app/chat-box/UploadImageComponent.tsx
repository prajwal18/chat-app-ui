// ICONS
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";
// ICONS

const uploadFileClass = `MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeLarge 
MuiFab-primary MuiFab-root MuiFab-circular MuiFab-sizeLarge 
MuiFab-primary css-1fo2sjy-MuiButtonBase-root-MuiFab-root`;

interface IUploadImageComponent {
  formik: any;
}

const UploadImageComponent: FC<IUploadImageComponent> = ({ formik }) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Hello");
    if (event.target?.files?.[0]) {
      formik.setFieldValue("pictures", Array.from(event.target.files));
      formik.setFieldValue("message", "picture");
    }
  };
  return (
    <div>
      <label htmlFor="uploadFile" className={uploadFileClass}>
        <AddIcon />
      </label>
      <input
        type="file"
        id="uploadFile"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleOnChange}
        multiple
      />
    </div>
  );
};

export default UploadImageComponent;
