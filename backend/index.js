const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {}; // Store rooms and their states
const roomTimers = {}; // Store timers for each room

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

    if (data.type === 'create') {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      rooms[roomCode] = { votes: { Cats: 0, Dogs: 0 }, users: [] };
      ws.send(JSON.stringify({ type: 'room_created', room: roomCode, votes: rooms[roomCode].votes }));

      // Start a 15-minute timer for the room
      resetRoomTimer(roomCode);
    }
    if (data.type === 'create') {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { name, question, options } = data; // Accept custom question and options
      rooms[roomCode] = {
        votes: options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
        users: [],
        question,
        master: name, // Set the room creator as the master
      };
      ws.send(JSON.stringify({ type: 'room_created', room: roomCode, votes: rooms[roomCode].votes, question }));
      resetRoomTimer(roomCode);
    }
    if (data.type === 'join') {
      const { room, name } = data;
      if (!rooms[room]) {
        ws.send(JSON.stringify({ type: 'error', message: 'Room does not exist.' }));
        return;
      }
      rooms[room].users.push(name);

      // Notify all clients in the room that a new user has joined
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'user_joined', room, user: name, users: rooms[room].users }));
        }
      });

      ws.send(JSON.stringify({ type: 'room_joined', room, votes: rooms[room].votes }));

      // Reset the room timer when a new user joins
      resetRoomTimer(room);
    }

    if (data.type === 'leave') {
      const { room, name } = data;
      if (rooms[room]) {
        rooms[room].users = rooms[room].users.filter((user) => user !== name);

        // Notify all clients in the room that a user has left
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'user_left', room, user: name, users: rooms[room].users }));
          }
        });

        // If no users are left in the room, delete the room
        if (rooms[room].users.length === 0) {
          deleteRoom(room);
        }
      }
    }

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

    if (data.type === 'get_rooms') {
      const activeRooms = Object.keys(rooms); // Get all active room codes
      ws.send(JSON.stringify({ type: 'room_list', rooms: activeRooms })); // Send active rooms to the client
    }
  });
});