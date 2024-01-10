import { Fab, Stack, TextField } from "@mui/material";

// Icons
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  appendAllToConversation,
  appendToConversation,
} from "../../../redux/slice/conversationSlice";
import { sendMessage } from "../../../services/message.service";
import { sendMessageSchema } from "../../../utils/yup/messageSchema";
import UploadImageComponent from "./UploadImageComponent";
// Icons

interface ISendMessage {
  receiverId: number;
}
const SendMessage: FC<ISendMessage> = ({ receiverId }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { receiver_id: receiverId, message: "" },
    enableReinitialize: true,
    validationSchema: sendMessageSchema,
    onSubmit: (values: any) => {
      let formData = new FormData();
      formData.append("message", values.message);
      formData.append("receiver_id", values.receiver_id);
      if (values.pictures && values.pictures.length) {
        values.pictures.map((pic: any) => {
          formData.append("pictures[]", pic);
        });
      }
      sendMessage(formData)
        .then((data) => {
          formik.resetForm()
          if (data.bulk) {
            dispatch(appendAllToConversation(data.messages));
          } else {
            const message = data.message;
            dispatch(appendToConversation(message));
          }
        })
        .catch((_error: any) => {
          formik.setSubmitting(false);
          toast.error("Sorry cannot send the message");
        });
    },
  });
  return (
    <Stack
      sx={{ p: "20px", backgroundColor: "#DCE8FF" }}
      spacing={2}
      direction="row"
      alignItems="center"
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <TextField
        name="message"
        label="Message"
        type="text"
        margin="normal"
        fullWidth
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.message && Boolean(formik.errors.message)}
        disabled={formik.isSubmitting}
        InputProps={{
          style: {
            borderRadius: "30px",
          },
        }}
      />
      <UploadImageComponent formik={formik} />
      <div>
        <Fab
          color="primary"
          aria-label="add"
          disabled={formik.isSubmitting}
          type="submit"
        >
          <SendIcon />
        </Fab>
      </div>
    </Stack>
  );
};

export default SendMessage;
