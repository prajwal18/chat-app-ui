// ICONS
import AddIcon from "@mui/icons-material/Add";
// ICONS

const uploadFileClass = `MuiButtonBase-root MuiFab-root MuiFab-circular MuiFab-sizeLarge 
MuiFab-primary MuiFab-root MuiFab-circular MuiFab-sizeLarge 
MuiFab-primary css-1fo2sjy-MuiButtonBase-root-MuiFab-root`;

const UploadImageComponent = () => {
  return (
    <div>
      <label htmlFor="uploadFile" className={uploadFileClass}>
        <AddIcon />
      </label>
      <input
        type="file"
        id="uploadFile"
        style={{ display: "none" }}
        onChange={() => {}}
      />
    </div>
  );
};

export default UploadImageComponent;
