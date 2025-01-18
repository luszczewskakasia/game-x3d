import * as THREE from 'three';


export class Clients {
    constructor() {

        this.client = io();

        this.last_choosen = {row : null , col : null};
        this.new_field = {row : null , col : null};
        this.name = ""
        this.color = null;
        let username = null;
        if (username == null){
            username = prompt("Wpisz nazwę użytkownika");
        }
        this.client.emit('username', username);

        this.client.on('role', (role) => {
            if (role == 'player1') {
                // document.getElementById('game-message').innerText = data.message;
                document.querySelector('.overlay-column.left .Profile_name').textContent = username;

            } else if (role == 'player2') {
                document.getElementById("wait-container").style.display = 'none';
            } else {
                console.log('Obserwator');
            }
        });

        this.client.on('second_player_joined', () => {
            console.log("Mamy to");
            document.getElementById("wait-container").style.display = 'none';});

        this.client.on('updatePlayers', (players) => {
            if (players[0]) {
              document.querySelector('.overlay-column.left .Profile_name').textContent = players[0];
            }
            if (players[1]) {
              document.querySelector('.overlay-column.right .Profile_name').textContent = players[1];
            }
        });

        this.client.on('broadcast_state_up', (gameState) => {
            this.last_choosen = gameState
            console.log('Nowy stan:', gameState.row , gameState.col);
        });

        this.client.on('broadcast_state_down', (gameState) => {
            this.new_field = gameState
            console.log('Nowy stan:', gameState.row , gameState.col);
        });

        this.client.on('broadcast_new_client', (new_player) => {
            this.name = new_player.name
            this.color = new_player.id === 1 ? "white":"black";

            console.log('Nowy stan:',  new_player.id);
        });

    }
}





export class Animation {
    constructor() {
        this.startTime = 10000;
        this.gameState = null;
    }

    static second_order_model(object, params, deltaTime, is_Animating) {
        is_Animating = true;
        const { damping, frequency, response_factor } = params;
        let setpoint = object.userData.setPosition.clone();
        let setpointPrime = object.userData.setPositionPrime.clone();
        const omega = 2 * Math.PI * frequency;
        const damping_term = damping / (Math.PI * frequency);
        const stiffness_term = 1 / (omega ** 2);

        let Pos = object.position.clone();
        let PosPrime = new THREE.Vector3(0, 0, 0);
        let PosDoublePrime = new THREE.Vector3(0, 0, 0);
        const simulate = (time) => {
            requestAnimationFrame(simulate);

            deltaTime = deltaTime || 0.016;
            setpoint = object.userData.setPosition.clone();
            setpointPrime = object.userData.setPositionPrime.clone();

            Pos.x = object.position.x;
            Pos.z = object.position.z;

            const rhs = setpoint.clone().add(
                setpointPrime
                    .clone()
                    .multiplyScalar(response_factor * damping / (2 * Math.PI * frequency))
            );

            PosDoublePrime = rhs
                .clone()
                .sub(Pos)
                .sub(PosPrime.clone().multiplyScalar(damping_term))
                .multiplyScalar(1 / stiffness_term);

            PosPrime.x += PosDoublePrime.x * deltaTime;
            PosPrime.z += PosDoublePrime.z * deltaTime;
            Pos.x += PosPrime.x * deltaTime;
            Pos.z += PosPrime.z * deltaTime;
            object.position.set(Pos.x, object.position.y, Pos.z);

            if (!object.userData.active && object.position.clone().sub(setpoint.clone()).length() < 0.01) {
                return;
            }
        };

        if (object.userData.active || object.position.clone().sub(setpoint.clone()).length() >= 0.001) {
            requestAnimationFrame(() => simulate());
        } else {
            is_Animating = false;
        }
    }

    static Piece_up(object, is_Animating, gameState) {
        if (this.gameState = null) {
            console.log(this.gameState);
        }

        this.gameState = gameState;
        const animation_duration = 1.0;
        const starting_position = 0.5;
        const target_position = 2.4;
        gameState.clients.client.emit('UPdate_game_state',{ row: object.userData.row, col: object.userData.column });
        console.log('Podniesion', object.userData.row , object.userData.column);

        const animate_up = (time) => {
            is_Animating = true;
            requestAnimationFrame(animate_up);
            if (!this.startTime) {
                this.startTime = time;
            }
            const elapsed = (time - this.startTime) / 1000;

            if (elapsed >= animation_duration) {
                object.position.y = target_position;
                is_Animating = false;
                return;
            }
            const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
            object.position.y = starting_position + (target_position - starting_position) * easing_factor;
 


            console.log(this.gameState.fieldArray);

            requestAnimationFrame(() => animate_up);
        }


        requestAnimationFrame(animate_up);
    }


    static Piece_down(object, is_Animating, gameState)
    {
        const animation_duration = 1.0;
        const starting_position = 3.0;
        const target_position = 0.5;
        gameState.clients.client.emit('DOWNdate_game_state', { row: object.userData.row, col: object.userData.column });
        console.log('Upadł', object.userData.row , object.userData.column);

        const animate_down = (time) => {
            is_Animating = true;
            requestAnimationFrame(animate_down);
            // console.log(object)
            if (!this.startTime) {
                this.startTime = time;
            }
            const elapsed = (time - this.startTime) / 1000;

            if (elapsed >= animation_duration) {
                object.position.y = target_position;
                is_Animating = false;
                // console.log(object)
                return;
            }
            const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
            object.position.y = starting_position + (target_position - starting_position) * easing_factor;

            requestAnimationFrame(() => animate_down);
        }
        requestAnimationFrame(animate_down);
    }

}