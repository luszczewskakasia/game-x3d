import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const server = createServer(app);
const io = new Server(server);

let players = [];
let observer = [];

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  let username = null;

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

    if (players.length === 2) {
        socket.broadcast.emit('second_player_joined');
    }

    });

    socket.on('UPdate_game_state', (gameState) => {
    console.log('Up:', gameState.row,gameState.col );
    socket.broadcast.emit('broadcast_state_up', gameState);
    });

    socket.on('DOWNdate_game_state', (gameState) => {
    console.log('Down:', gameState.row,gameState.col );
    socket.broadcast.emit('broadcast_state_down', gameState);
    });


    socket.on('restart', () => {
      console.log('Restart triggered by:', username);
      players = [];
      io.emit('start_again');
    });


});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});