const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {}; // Store room data
const roomTimers = {}; // Store timers for room expiry

const deleteRoom = (roomCode) => {
  if (rooms[roomCode]) {
    delete rooms[roomCode];
    delete roomTimers[roomCode];
    console.log(`Room ${roomCode} has been deleted.`);
  }
};

const resetRoomTimer = (roomCode) => {
  if (roomTimers[roomCode]) {
    clearTimeout(roomTimers[roomCode]); // Clear the existing timer
  }
  roomTimers[roomCode] = setTimeout(() => deleteRoom(roomCode), 15 * 60 * 1000); // Set a new 15-minute timer
};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Handle room creation
    if (data.type === 'create') {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { name, question, options } = data; // Accept custom question and options
      console.log('Options received:', options);
      rooms[roomCode] = {
        votes: options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
        users: [],
        question,
        master: name, // Set the room creator as the master
      };
      console.log('Room created:', rooms[roomCode]);
      ws.send(JSON.stringify({ type: 'room_created', room: roomCode, votes: rooms[roomCode].votes, question }));
      resetRoomTimer(roomCode); // Start a 15-minute timer for the room
    }

    // Handle joining a room
    if (data.type === 'join') {
      const { room, name } = data;
      if (!rooms[room]) {
        ws.send(JSON.stringify({ type: 'error', message: 'Room does not exist.' }));
        return;
      }
      rooms[room].users.push(name);
      console.log('Room joined:', {
        room,
        votes: rooms[room].votes,
        question: rooms[room].question, // Log the question
        master: rooms[room].master,
      });
      // Notify all clients in the room that a new user has joined
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'user_joined', room, user: name, users: rooms[room].users }));
        }
      });

      ws.send(JSON.stringify({
        type: 'room_joined',
        room,
        votes: rooms[room].votes,
        question: rooms[room].question, 
        master:rooms[room].master// Send the custom question
      }));

      resetRoomTimer(room); // Reset the room timer when a new user joins
    }

    // Handle voting
    if (data.type === 'vote') {
      const { room, option } = data;
      if (rooms[room]) {
        rooms[room].votes[option]++;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'new_vote', votes: rooms[room].votes }));
          }
        });
      }
    }

    // Handle ending the poll
    if (data.type === 'end_poll') {
      const { room, name } = data;
      if (rooms[room] && rooms[room].master === name) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'poll_ended', room, votes: rooms[room].votes }));
          }
        });
        deleteRoom(room); // Delete the room after ending the poll
      } else {
        ws.send(JSON.stringify({ type: 'error', message: 'Only the master can end the poll.' }));
      }
    }
    if (data.type === 'leave') {
      const { room, name } = data;
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((user) => user !== name); // Remove the user
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'user_left', room, user: name, users: rooms[room].users }));
          }
        });
      }
    }
    // Handle fetching active rooms
    if (data.type === 'get_rooms') {
      const activeRooms = Object.keys(rooms); // Get all active room codes
      ws.send(JSON.stringify({ type: 'room_list', rooms: activeRooms })); // Send active rooms to the client
    }
  });
});