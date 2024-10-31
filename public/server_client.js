const client_socket = io();

let username = null;
if (username == null){
    username = prompt("Enter username");
}

//to wysyla wiadomosci na serwer hostas
//client socket - połączenie z klienta na serwer
client_socket.emit('username', username);

// socket.on('role', (role) => {
//     if (role == 'player'){
//         console.log(username + 'is a player');
//     } else if (role == 'observer'){
//         console.log(username + 'is observer');
//     }
// });