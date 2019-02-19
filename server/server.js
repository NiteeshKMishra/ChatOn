const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const clientPath = path.join(__dirname, '../client');
const port = process.env.PORT || 3000;


var app = express();
app.use(express.static(clientPath));

var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log("New Client Connected")

  socket.on('disconnect', () => {
    console.log("client is disconnected");
  });
});
server.listen(port, () => {
  console.log(`Server is up at ${port}`);
})