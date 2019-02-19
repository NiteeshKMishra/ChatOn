const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const { generateMessage } = require('./utils/message');

const clientPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;


var app = express();
app.use(express.static(clientPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log("New Client Connected")

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));


  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log("client is disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server is up at ${port}`);
})