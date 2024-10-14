const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files from the 'public' folder
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log(socket.client.conn.server.clientsCount + " user connected");

  socket.on('username', (username) => {
    console.log('User joined with username: ' + username);
  });

  socket.on('message', (msg) => {
    console.log('Got message from client: ' + msg);
  });
});

server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});
