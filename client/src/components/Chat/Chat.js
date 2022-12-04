import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import OnlineUsers from '../OnlineUsers/OnlineUsers';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import logged from '../../sounds/logged.mp3';

const ENDPOINT = 'localhost:5600';

let socket;

const playSound = (url) => {
  const audio = new Audio(url);
  audio.play();
}

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [creationTime, setCreationTime] = useState('');

  

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
        window.location = '/';
      } else {
        playSound(logged);
      }
    });
  }, [ENDPOINT, window.location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
      setCreationTime(message.creationTime);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="container mx-auto grid grid-cols-2 gap-10 py-10">
      <div className="rounded-xl overflow-hidden shadow-base">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} creationTime={creationTime} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <OnlineUsers users={users} room={room}/>
    </div>
  );
}

export default Chat;
