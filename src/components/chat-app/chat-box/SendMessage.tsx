import { Fab, Stack, TextField } from "@mui/material";

// Icons
import SendIcon from "@mui/icons-material/Send";
// Icons

const SendMessage = () => {
  return (
    <Stack
      sx={{ p: "20px", backgroundColor: "#DCE8FF" }}
      spacing={2}
      direction="row"
      alignItems="center"
    >
      <TextField
        placeholder="Say Something..."
        fullWidth
        InputProps={{
          style: {
            borderRadius: "30px",
          },
        }}
      />
      <Fab color="primary" aria-label="add">
        <SendIcon />
      </Fab>
    </Stack>
  );
};

export default SendMessage;
