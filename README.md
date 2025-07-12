# Chat App Project

This is a Node.js project for a real-time chat application. Below is a brief overview of the project structure and how to get started.

## Project Structure

- `public/`: Contains static files like HTML, CSS, and JavaScript for the client-side.
- `src/`: Contains server-side code.
- `node_modules/`: Contains installed Node.js modules.
- `package.json`: Defines project metadata and dependencies.
- `package-lock.json`: Records the exact versions of dependencies.
- `README.md`: This file, providing an overview of the project.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run the Application:**
    ```bash
    npm start
    ```

## Real-time Chat Features

This application leverages Socket.IO to provide real-time, bidirectional communication between clients and the server. Key features include:

- **Instant Messaging:** Send and receive messages instantly without page reloads.
- **User Connection/Disconnection Notifications:** Get notified when users join or leave the chat.
- **Broadcasting:** Messages are broadcast to all connected users in real-time.

## Technologies Used

- Node.js
- Express.js (for the server)
- Socket.IO (for real-time communication)

Feel free to explore the files and contribute!
