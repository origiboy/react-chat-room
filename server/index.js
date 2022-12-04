import http from 'http';
import express from 'express';
import { Server } from "socket.io";
import cors from 'cors';


import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

import { router } from './router.js' ;

const timeFotmatting = (time) => {
  return (("0" + time.getHours()).slice(-2)   + ":" + 
    ("0" + time.getMinutes()).slice(-2));
}


const app = express();
const corsOptions ={
  origin:'*',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const PORT = 5600;


app.use(router);

io.on('connect', (socket) => {

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, добро пожаловать в комнату ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} присоединился!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    console.log("Message");
    const user = getUser(socket.id);
    const date = new Date();
    io.to(user.room).emit('message', { user: user.name, text: message, creationTime: timeFotmatting(date) });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(PORT, () => console.log(`Server has started on http://localhost:${PORT}`));


