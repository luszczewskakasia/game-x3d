
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server)

let players = [];
let observer = [];

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/public/index.html'));
});

io.on('connection', (socket) => {
  let username = null;
  socket.on('username', (name) => {
    username = name;
    if (players.length >= 2){
      observer.push(username);
      socket.emit('role', 'observer');
      console.log('Observer ', username, ' joined the game');
    } else {
      players.push(username);
      socket.emit('role','player');
      console.log('Player ', username, ' joined the game')
    }
  
    });
  })


server.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});