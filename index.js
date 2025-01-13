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

// słucha sobie połączeń między klientami na serwer
io.on('connection', (socket) => {
  let username = null;
  // czeka na dostanie imienia które jest emitowane od tego klienta (socket)
  // połączenie  do konkretnego klienta z serwera hosta
  // instancja do konkretnego klienta
  socket.on('username', (name) => {
    username = name;
    if (players.length >= 2){
        observer.push(username);
        socket.emit('role', 'observer');
        console.log('Obserwator ', username, ' dołączył do gry');
    } else if (players.length === 1) {
        players.push(username);
        socket.emit('role', 'player2');
        console.log('Gracz ', username, ' dołączył do gry')
    } else {
        players.push(username);
        socket.emit('role', 'player1');
        console.log('Gracz ', username, ' dołączył do gry')
    }

    io.emit('updatePlayers', players);

    // socket.on('move', (moveData) => {
    //   // Emitowanie ruchu do wszystkich innych klientów
    //   socket.broadcast.emit('move', moveData);
    // });
    socket.on('move', (moveData) => {
      // Broadcast the move to all other clients
      socket.broadcast.emit('move', moveData);
    });

  });
})

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});