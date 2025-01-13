// import { Animation } from './animation.js';

const client = io();

const chessScene = new ChessScene(client);

let username = null;
if (username == null){
    username = prompt("Wpisz nazwę użytkownika");
}

//to wysyla wiadomosci na serwer hostas
//client socket - połączenie z klienta na serwer
client.emit('username', username);

client.on('role', (role) => {
    if (role == 'player1') {
        document.querySelector('.overlay-column.left .Profile_name').textContent = username;
    } else if (role == 'player2') {
        document.querySelector('.overlay-column.right .Profile_name').textContent = username;
    } else {
        console.log('Obserwator');
    }
});

//client.on('moveDown', Animation.Piece_down(object, false, client));

client.on('updatePlayers', (players) => {
    // Aktualizacja nazw graczy w UI
    if (players[0]) {
      document.querySelector('.overlay-column.left .Profile_name').textContent = players[0];
    }
    if (players[1]) {
      document.querySelector('.overlay-column.right .Profile_name').textContent = players[1];
    }
});


client.on('moveUp', (data) => {
    console.log('Opponent moved piece up:', data);
    Animation.Piece_up(object, false);
});

client.on('moveDown', (data) => {
    console.log('Opponent moved piece down:', data);
    Animation.Piece_down(object, false);
});