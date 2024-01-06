import { Fab, Stack, TextField } from "@mui/material";

// Icons
import SendIcon from "@mui/icons-material/Send";
import { FC } from "react";
import { useFormik } from "formik";
import {
  CreateMessageType,
  sendMessage,
} from "../../../services/message.service";
import { sendMessageSchema } from "../../../utils/yup/messageSchema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { appendToConversation } from "../../../redux/slice/conversationSlice";
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
    onSubmit: (values: CreateMessageType) => {
      console.log(values);
      sendMessage(values)
        .then((data) => {
          formik.setSubmitting(false);
          formik.setFieldValue("message", "");
          formik.setFieldTouched("message", false);
          const message = data.message;
          dispatch(appendToConversation(message));
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
        helperText={formik.touched.message ? formik.errors.message : ""}
        error={formik.touched.message && Boolean(formik.errors.message)}
        disabled={formik.isSubmitting}
        InputProps={{
          style: {
            borderRadius: "30px",
          },
        }}
      />
      <UploadImageComponent />
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
