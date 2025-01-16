import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// import { Animation } from './public/animation.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

let players = [];
let observer = [];

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'));
});


// słucha sobie połączeń między klientami na serwer
io.on('connection', (socket) => {
  let username = null;

  // Handle the username registration
  socket.on('username', (name) => {
<<<<<<< HEAD
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
    
    socket.on('moveUp', () => {
      console.log('moveUp');
      socket.broadcast.emit('moveUp');
    }); 

    socket.on('moveDown', () => {
      console.log('moveDown');
      socket.broadcast.emit('moveDown');
    });

  })
=======
      username = name;
      if (players.length >= 2) {
          observer.push(username);
          socket.emit('role', 'observer');
          console.log('Obserwator ', username, ' dołączył do gry');
      } else if (players.length === 1) {
          players.push(username);
          socket.emit('role', 'player2');
          console.log('Gracz ', username, ' dołączył do gry');
      } else {
          players.push(username);
          socket.emit('role', 'player1');
          console.log('Gracz ', username, ' dołączył do gry');
      }

      io.emit('updatePlayers', players);
  });
});

>>>>>>> 11c4d3b (players name displays)


server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});