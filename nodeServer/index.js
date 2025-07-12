// Node server which handles socket connections
const io = require("socket.io")(3000, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});

const user = {}; // Store users by their socket id

io.on("connection", (socket) => {
  // When a new user connects, add them to the user object
  // and broadcast to all other users that a new user has connected
  socket.on("new-user", (name) => {
    user[socket.id] = name; // Save user's name by socket id
    socket.broadcast.emit("user-connected", name); // Notify others
  });

  // When a user sends a chat message, broadcast it to all other users
  // along with the name of the user who sent it
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message, // The message text
      name: user[socket.id], // The sender's name
    });
  });

  // When a user disconnects, broadcast to all other users
  // that the user has disconnected and remove from user object
  socket.on("disconnect", () => {
    if (user[socket.id]) {
      socket.broadcast.emit("user-disconnected", user[socket.id]); // Notify others
      delete user[socket.id]; // Remove user
    }
  });
});
