const socket = io();

let username = null;
if (username == null){
    username = prompt("Enter username");
}

socket.emit('username', username);

socket.on('role', (role) => {
    if (role == 'player'){
        console.log(username + 'is a player');
    } else if (role == 'observer'){
        console.log(username + 'is observer');
    }
});