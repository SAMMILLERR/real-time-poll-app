import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]);
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [status, setStatus] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [votingEnded, setVotingEnded] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['Option 1', 'Option 2']);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8080');
    socketRef.current.onopen = () => console.log('WebSocket connected');
    socketRef.current.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.type === 'room_created' || msg.type === 'room_joined') {
        console.log('Room joined message:', msg); // Debugging log
        setRoom(msg.room);
        setVotes(msg.votes);
        setQuestion(msg.question);
        setStatus('joined');
      } else if (msg.type === 'new_vote') {
        setVotes(msg.votes);
      } else if (msg.type === 'room_list') {
        setRooms(msg.rooms);
      } else if (msg.type === 'user_joined') {
        alert(`${msg.user} has joined the room.`);
      } else if (msg.type === 'user_left') {
        alert(`${msg.user} has left the room.`);
      } else if (msg.type === 'error') {
        alert(msg.message);
      }
    };
    socketRef.current.onclose = () => console.log('WebSocket disconnected');
    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    if (status === 'joined' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            setVotingEnded(true);
            clearInterval(timer);
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, timeLeft]);

  const fetchRooms = () => {
    socketRef.current.send(JSON.stringify({ type: 'get_rooms' }));
  };

  const createRoom = () => {
    if (!name) return alert('Enter your name.');
    if (!question || options.length < 2) return alert('Enter a question and at least two options.');
    socketRef.current.send(JSON.stringify({ type: 'create', name, question, options }));
    console.log('Create Room Data:', { name, question, options }); 
    localStorage.setItem('pollUserName', name);
  };

  const joinRoom = (roomCode) => {
    if (!name) return alert('Enter your name.');
    if (!roomCode) return alert('Enter a valid room code.');
    setRoom(roomCode);
    socketRef.current.send(JSON.stringify({ type: 'join', room: roomCode, name }));
    localStorage.setItem('pollUserName', name);
  };

  const castVote = (option) => {
    if (hasVoted || votingEnded) return;
    socketRef.current.send(JSON.stringify({ type: 'vote', room, option }));
    localStorage.setItem(`voted_${room}`, option);
    setHasVoted(true);
  };

  const endPoll = () => {
    if (room) {
      socketRef.current.send(JSON.stringify({ type: 'end_poll', room, name }));
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(room).then(() => {
      alert('Room code copied to clipboard!');
    });
  };

  const leaveRoom = () => {
    setRoom('');
    setQuestion('');
    setVotes({});
    setStatus('');
    setHasVoted(false);
    setTimeLeft(60);
    setVotingEnded(false);
    socketRef.current.send(JSON.stringify({ type: 'leave', room }));
  };

  if (status !== 'joined') {
    return (
      <div className="container">
        <div className="card">
          <h2>Welcome to the Poll App</h2>
          <p>Enter your name and create or join a poll room.</p>
          <input
            type="text"
            className="input"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="custom-poll-form">
            <input
              type="text"
              className="input"
              placeholder="Enter your poll question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                className="input"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />
            ))}
            <button
              className="button"
              onClick={() => setOptions([...options, `Option ${options.length + 1}`])}
            >
              Add Option
            </button>
          </div>
          <button className="button" onClick={createRoom}>Create Poll</button>
          <button className="button" onClick={fetchRooms}>View Active Rooms</button>
          <ul className="room-list">
            {rooms.map((roomCode) => (
              <li key={roomCode}>
                <button className="button" onClick={() => joinRoom(roomCode)}>
                  Join Room: {roomCode}
                </button>
              </li>
            ))}
          </ul>
          <div className="join-room-box">
            <input
              type="text"
              className="input"
              placeholder="Enter Room Code"
              value={joinRoomCode}
              onChange={(e) => setJoinRoomCode(e.target.value)}
            />
            <button className="button" onClick={() => joinRoom(joinRoomCode)}>Join Room</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Poll Room: {room}</h2>
        <button className="button back-button" onClick={leaveRoom}>Back</button>
        {name === rooms[room]?.master && (
          <button className="button" onClick={endPoll}>End Poll</button>
        )}
        <p>{question}</p>
        <div className="vote-buttons">
          {Object.keys(votes).map((option) => (
            <button
              key={option}
              className="button vote-button"
              onClick={() => castVote(option)}
              disabled={hasVoted || votingEnded}
            >
              {option} ({votes[option]})
            </button>
          ))}
        </div>
        {votingEnded ? (
          <p className="results">
            Voting has ended! Final Results: {Object.entries(votes).map(([option, count]) => `${option} (${count})`).join(' - ')}
          </p>
        ) : (
          <p className="timer">Time left: {timeLeft}s</p>
        )}
        <button className="button" onClick={copyRoomCode}>Copy Room Code</button>
      </div>
    </div>
  );
}

export default App;