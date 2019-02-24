const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const { Users } = require('./utils/users');

const { generateMessage, generateLocationMessage, validateMessage } = require('./utils/message');

const clientPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;


var app = express();
app.use(express.static(clientPath));

var server = http.createServer(app);
var users = new Users();
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log("New Client Connected")



  socket.on('join', (roomData, callback) => {
    if (validateMessage(roomData)) {
      callback('Room Data should not contain empty values or Special Characters');
    }
    else {
      socket.join(roomData.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, roomData.name, roomData.room);
      io.to(roomData.room).emit('updateUserList', users.getUserList(roomData.room));
      socket.emit('newMessage', generateMessage('ChatOn', 'Welcome to ChatOn. Go ahead start chit-chat'));
      socket.broadcast.to(roomData.room).emit('newMessage', generateMessage('ChatOn', `${roomData.name} has joined`));
      callback();
    }
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && message.text !== '') {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });


  socket.on('createLocation', function (location, callback) {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, location));
    }
    callback();
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('ChatOn', `${user.name} has left`));
    }
  });
});
server.listen(port, () => {
  console.log(`Server is up at ${port}`);
})