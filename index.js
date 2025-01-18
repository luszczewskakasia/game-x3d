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
let currentPlayerIndex = 0;

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
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
    });

    if (players.length === 2) {
        socket.broadcast.emit('second_player_joined');
        console.log('Dowiezion');
    }

    socket.on('UPdate_game_state', (gameState) => {
    console.log('Podniesion:', gameState.row,gameState.col );
    // Rozsyłanie zaktualizowanego stanu do innych klientów
    socket.broadcast.emit('broadcast_state_up', gameState);
    });

    socket.on('DOWNdate_game_state', (gameState) => {
    console.log('Upadł:', gameState.row,gameState.col );
    // Rozsyłanie zaktualizowanego stanu do innych klientów';
    socket.broadcast.emit('broadcast_state_down', gameState);
    });

//   socket.on('moveUp', (data) => {
//     if (players[currentPlayerIndex] === username) {
//         console.log(`${username} moved piece up`);
//         socket.broadcast.emit('moveUp', data);

//         currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
//     }
// });

// socket.on('moveDown', (data) => {
//     if (players[currentPlayerIndex] === username) {
//         console.log(`${username} moved piece down`);
//         socket.broadcast.emit('moveDown', data);

//         currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
//     }
// });

});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});