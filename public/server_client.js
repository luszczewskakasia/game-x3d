const client_socket = io();

let username = null;
if (username == null){
    username = prompt("Wpisz nazwę użytkownika");
}

//to wysyla wiadomosci na serwer hostas
//client socket - połączenie z klienta na serwer
client_socket.emit('username', username);

<<<<<<< HEAD
client_socket.on('moveUp', Animation.Piece_up);
client_socket.on('moveDown', Animation.Piece_down);

// socket.on('role', (role) => {
//     if (role == 'player'){
//         console.log(username + 'is a player');
//     } else if (role == 'observer'){
//         console.log(username + 'is observer');
//     }
// });
=======
client_socket.on('role', (role) => {
    if (role == 'player1') {
        document.querySelector('.overlay-column.left .Profile_name').textContent = username;
    } else if (role == 'player2') {
        document.querySelector('.overlay-column.right .Profile_name').textContent = username;
    } else {
        console.log('Obserwator');
    }
});

client_socket.on('updatePlayers', (players) => {
    // Aktualizacja nazw graczy w UI
    if (players[0]) {
      document.querySelector('.overlay-column.left .Profile_name').textContent = players[0];
    }
    if (players[1]) {
      document.querySelector('.overlay-column.right .Profile_name').textContent = players[1];
    }
});
>>>>>>> 11c4d3b (players name displays)
