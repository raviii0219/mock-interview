const express = require("express");
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const interviewRoutes = require("./routes/interviewroutes")
const chatRoutes = require("./routes/chat.routes")
const cors = require("cors")

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);


app.use(
    "/api/chatbot",
    chatRoutes
);
const faceRoutes =
    require("./routes/faceroute");

app.use(
    "/api/face",
    faceRoutes
);

module.exports = app;