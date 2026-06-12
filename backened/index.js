require('dotenv').config();
const app = require("./src/app");
const http = require("http")
const Server = require("http").createServer(app);
const io = require("socket.io")(Server, {
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("send-message", (data) => {
        io.emit("recieve-message", data)
    });
});
const connectDB = require("./src/db/db");

connectDB();
app.listen(3000, () => {
    console.log("server is running on port 3000")
})