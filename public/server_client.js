const socket = io();

let username = null;
if (username == null){
    username = prompt("Enter username");
}

socket.emit('username', username);