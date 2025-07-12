// Connect to the server using socket.io
const socket = io("http://localhost:3000");

// Get references to DOM elements
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const messageContainer = document.querySelector(".container");
const defaultMessage = document.querySelector(".message-default");

// Load the notification sound
var audio = new Audio("ting.wav");

// Hide the default 'Let's chat' message
const hideDefaultMessage = () => {
  if (defaultMessage) defaultMessage.style.display = "none";
};

// Append a new message to the chat container
const appendMessage = (message, position, colorClass) => {
  hideDefaultMessage(); // Hide default message on first real message
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  if (colorClass) messageElement.classList.add(colorClass);
  messageContainer.append(messageElement);
  if (position === "message-left") {
    audio.play(); // Play sound for incoming messages
  }
  // Auto-scroll to bottom
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

// Disable send button if input is empty
const toggleSendButton = () => {
  sendButton.disabled = messageInput.value.trim() === "";
};
messageInput.addEventListener("input", toggleSendButton);
window.addEventListener("DOMContentLoaded", toggleSendButton);

// Handle form submission for sending messages
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message === "") return; // Prevent sending empty message
  appendMessage(`You: ${message}`, "message-right");
  socket.emit("send-chat-message", message); // Send message to server
  messageInput.value = "";
  toggleSendButton();
  hideDefaultMessage();
});

// Prompt user for their name, ensuring it's not empty
let name = "";
while (!name || !name.trim()) {
  name = prompt("Chit Chat\n\nEnter your name to join the chat");
  if (name === null) name = ""; // Prevent null (cancel) as valid
}
socket.emit("new-user", name); // Notify server of new user

// Listen for events from the server
socket.on("user-connected", (name) => {
  appendMessage(`${name} joined the chat`, undefined, "message-green");
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} left the chat`, undefined, "message-red");
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`, "message-left");
  hideDefaultMessage();
});
