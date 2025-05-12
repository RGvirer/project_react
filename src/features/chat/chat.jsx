import { useState } from "react";
import {
  Box,
  Fab,
  Paper,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const res = await fetch("https://storeserver-uoax.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const botMessage = { role: "assistant", content: data.reply };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInput("");
  };

  return (
    <>
      {/* כפתור לפתיחת הצ'אט */}
      <Fab
        color="primary"
        onClick={() => setOpen((prev) => !prev)}
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}
      >
        <ChatIcon />
      </Fab>

      {/* חלון הצ'אט עצמו */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            p: 2,
            zIndex: 1300,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            צ'אט עם הבוט
          </Typography>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 1,
              pr: 1,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1.5,
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  bgcolor: message.role === "user" ? "#dcf8c6" : "#e5e5ea",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "80%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mb: 0.5 }}
                >
                  {message.role === "user" ? "אתה:" : "הבוט:"}
                </Typography>
                <Typography variant="body2">{message.content}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="כתוב הודעה"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
}
