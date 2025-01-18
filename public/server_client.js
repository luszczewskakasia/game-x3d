import { Animation } from './animation.js';

const client = io();

let username = null;
if (username == null){
    username = prompt("Wpisz nazwę użytkownika");
}

let anim = new Animation();

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

gameState = {
    is_Animating: false
}

setInterval(() => {
    if (anim.Pie) {
        client.emit('update_game_state', gameState);
        console.log('Wysłano stan gry:', gameState);
    }
    else {
        client.emit('update_game_state', gameState);
        console.log('Nie wysłano stanu gry:', gameState);
    }
}, 100);

client.on('broadcast_game_state', (updatedGameState) => {
    console.log('Otrzymano stan gry od serwera:', updatedGameState);
});



// client.on('moveUp', (data) => {
//     Animation.Piece_up(object, false);
// });

// client.on('moveDown', (data) => {
//     Animation.Piece_down(object, false);
// });