<<<<<<< HEAD
![Archietecture](image.png)
# Real-Time Poll App

A real-time polling application where users can create custom polls, join rooms, vote, and view results in real-time. The app supports WebSocket communication for instant updates and includes features like room management, custom questions, and master controls.

---

## Features

- **Create Polls**: Users can create polls with custom questions and options.
- **Join Rooms**: Users can join existing rooms using a room code.
- **Real-Time Voting**: Votes are updated in real-time for all participants.
- **Master Controls**: The poll creator (master) can end the poll early.
- **Room Expiry**: Rooms are automatically deleted after 15 minutes of inactivity.
- **Custom Questions**: Poll creators can set custom questions and options.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **WebSocket**: For real-time communication with the backend.

### Backend
- **Node.js**: For handling WebSocket connections.
- **ws**: A WebSocket library for Node.js.

### Deployment
- **Docker**: For containerizing the frontend and backend.
- **Nginx**: For serving the frontend.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Docker (optional, for containerized deployment)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-time-poll-app.git
   cd real-time-poll-app

   cd backend
npm install

cd ../frontend
npm install

cd ../backend
npm start

cd ../frontend
npm start

http://localhost:3000

Usage
Create a Poll
Enter your name.
Set a custom question and options.
Click "Create Poll" to generate a room.
Join a Room
Enter your name.
Use the room code to join an existing poll.
Voting
Select an option and cast your vote.
Votes are updated in real-time for all participants.
End Poll (Master Only)
The poll creator can end the poll early by clicking the "End Poll" button.

Docker Deployment
Build and run the containers:

docker-compose up --build
http://localhost:3000

real-time-poll-app/
├── backend/
│   ├── [index.js](http://_vscodecontentref_/1)          # Backend WebSocket server
│   ├── [package.json](http://_vscodecontentref_/2)      # Backend dependencies
│   └── Dockerfile        # Backend Docker configuration
├── frontend/
│   ├── src/
│   │   ├── [App.js](http://_vscodecontentref_/3)        # Main React component
│   │   ├── [App.css](http://_vscodecontentref_/4)       # Styling for the app
│   │   └── [index.js](http://_vscodecontentref_/5)      # React entry point
│   ├── public/
│   │   └── [index.html](http://_vscodecontentref_/6)    # HTML template
│   ├── [package.json](http://_vscodecontentref_/7)      # Frontend dependencies
│   └── Dockerfile        # Frontend Docker configuration
├── [Docker-compose.yml](http://_vscodecontentref_/8)    # Docker Compose configuration
└── [README.md](http://_vscodecontentref_/9)             # Project documentation

Environment Variables
Frontend:

No additional configuration required.
Backend:

The WebSocket server runs on port 8080 by default.Here's a clean and professional `README.md` file for your **Real-Time Poll App**, formatted for GitHub:

---

````markdown
# Real-Time Poll App

A real-time polling application where users can create custom polls, join rooms, vote, and view results instantly. Built with React and WebSocket for seamless live interaction.

---

## 🚀 Features

- ✅ **Create Polls**: Set custom questions and options.
- 🔗 **Join Rooms**: Join existing polls using a room code.
- ⚡ **Real-Time Voting**: See votes update live across all participants.
- 🎛️ **Master Controls**: End the poll early as the poll creator.
- 🕒 **Room Expiry**: Inactive rooms auto-delete after 15 minutes.
- ✍️ **Custom Questions**: Full flexibility to define your poll content.

---

## 🧱 Tech Stack

### Frontend
- **React** – For building dynamic UIs
- **WebSocket** – Real-time updates via WS connections

### Backend
- **Node.js** – Lightweight server runtime
- **ws** – WebSocket library for the backend

### Deployment
- **Docker** – Containerized deployment
- **Nginx** – Serves the frontend

---

## 🔧 Installation

### Prerequisites

- Node.js (v16 or higher)
- Docker (optional, for containerized setup)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/real-time-poll-app.git
   cd real-time-poll-app
````

2. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Start the servers**

   ```bash
   # Backend
   cd ../backend
   npm start

   # Frontend
   cd ../frontend
   npm start
   ```

4. **Access the app**
   Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Usage

### ➕ Create a Poll

* Enter your name
* Add a custom question and options
* Click **Create Poll** to get a room code

### 🔑 Join a Room

* Enter your name
* Enter the room code shared by the creator

### 🗳️ Vote

* Choose an option
* Watch votes update in real-time

### 🔐 End Poll (Creator Only)

* The poll creator can end the session at any time

---

## 🐳 Docker Deployment

Build and run everything using Docker Compose:

```bash
docker-compose up --build
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
real-time-poll-app/
├── backend/
│   ├── index.js           # WebSocket server logic
│   ├── package.json       # Backend dependencies
│   └── Dockerfile         # Backend container config
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   ├── public/
│   │   └── index.html     # Base HTML template
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container config
├── docker-compose.yml     # Orchestration config
└── README.md              # Project docs
```

---

## 🌐 Environment Variables

### Frontend

* No additional configuration required

### Backend

* WebSocket server runs on port **8080** by default

---

## 📜 License

MIT License © 2025 \[Your Name]

```

Would you like a `README.md` file generated and saved, or added to your project?
```
=======
![Archietecture](image.png)

# Real-Time Poll App

A real-time polling application where users can create custom polls, join rooms, vote, and view results instantly. Built with React and WebSocket for seamless live interaction.

---

## 🚀 Features

- ✅ **Create Polls**: Set custom questions and options.
- 🔗 **Join Rooms**: Join existing polls using a room code.
- ⚡ **Real-Time Voting**: See votes update live across all participants.
- 🎛️ **Master Controls**: End the poll early as the poll creator.
- 🕒 **Room Expiry**: Inactive rooms auto-delete after 15 minutes.
- ✍️ **Custom Questions**: Full flexibility to define your poll content.

---

## 🧱 Tech Stack

### Frontend
- **React** – For building dynamic UIs
- **WebSocket** – Real-time updates via WS connections

### Backend
- **Node.js** – Lightweight server runtime
- **ws** – WebSocket library for the backend

### Deployment
- **Docker** – Containerized deployment
- **Nginx** – Serves the frontend

---

## 🔧 Installation

### Prerequisites

- Node.js (v16 or higher)
- Docker (optional, for containerized setup)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/real-time-poll-app.git
   cd real-time-poll-app
   ````

2. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Start the servers**

   ```bash
   # Backend
   cd ../backend
   npm start

   # Frontend
   cd ../frontend
   npm start
   ```

4. **Access the app**
   Open your browser at: [http://localhost:3000](http://localhost:3000)

5. **DEPLOYED LINK**
     Live Demo Check out the deployed version:real-time-polling-app-deployed.netlify.app

---

## 🧪 Usage

### ➕ Create a Poll

* Enter your name
* Add a custom question and options
* Click **Create Poll** to get a room code

### 🔑 Join a Room

* Enter your name
* Enter the room code shared by the creator

### 🗳️ Vote

* Choose an option
* Watch votes update in real-time

### 🔐 End Poll (Creator Only)

* The poll creator can end the session at any time

---

## 🐳 Docker Deployment

Build and run everything using Docker Compose:

```bash
docker-compose up --build
```

App will be live at: [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
real-time-poll-app/
├── backend/
│   ├── index.js           # WebSocket server logic
│   ├── package.json       # Backend dependencies
│   └── Dockerfile         # Backend container config
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   ├── public/
│   │   └── index.html     # Base HTML template
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Frontend container config
├── docker-compose.yml     # Orchestration config
└── README.md              # Project docs
```

---

## 🌐 Environment Variables

### Frontend

* No additional configuration required

### Backend

* WebSocket server runs on port **8080** by default

---


>>>>>>> 08399ea6deaf37b934305020b8ac4c3559057d60
