import * as THREE from 'three';


export class Clients {
    constructor(board) {

        this.client = io();

        this.board_state = board;
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
               // console.log('Obserwator');
            }
        });

        this.client.on('second_player_joined', () => {
            // console.log("Mamy to");
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
            // console.log('Nowy stan:', gameState.row , gameState.col);
        });

        this.client.on('broadcast_state_down', (gameState) => {
            this.new_field = gameState
            this.board_state.Enemy_turn_update(this.last_choosen, this.new_field)
            // console.log('Nowy stan:', gameState.row , gameState.col);
        });

        this.client.on('broadcast_new_client', (new_player) => {
            this.name = new_player.name
            this.color = new_player.id === 1 ? "white":"black";

            // console.log('Nowy stan:',  new_player.id);
        });

    }
}





export class Animation {
    constructor() {
        this.startTime = 10000;
    }

    static second_order_model(object, params, deltaTime, gameState) {
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

            // deltaTime = deltaTime || 0.016;
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

            // console.log("during_anim:", object.position.clone().sub(setpoint.clone()).length());

            const height_mask = new THREE.Vector3(1,0,1)

            const distance = object.position.clone().multiply(height_mask).sub(setpoint.clone().multiply(height_mask)).length()

            if ( distance < 0.04 && !gameState.second_order_done) {
                gameState.second_order_done = true
                console.log("Animation done inside simulate:", gameState.second_order_done);
                return;
            }
            else
            {
                requestAnimationFrame(simulate);
            }
        };

        requestAnimationFrame(() => simulate());

    }

    static Piece_up(object, gameState,other_player) {

        gameState.second_order_done = false;
        const animation_duration = 1.0;
        const starting_position = 0.5;
        const target_position = 2.4;
        if(!other_player) {
            gameState.clients.client.emit('UPdate_game_state',
                {row: object.userData.row, col: object.userData.column});
            //console.log('Podniesion', object.userData.row, object.userData.column);
        }
        const animate_up = (time) => {
            if (!this.startTime) {
                this.startTime = time;
            }
            const elapsed = (time - this.startTime) / 1000;

            if (elapsed >= animation_duration) {
                object.position.y = target_position;
                return;
            }
            else
            {
                requestAnimationFrame(animate_up);
            }
            const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
            object.position.y = starting_position + (target_position - starting_position) * easing_factor;
        }


        requestAnimationFrame(animate_up);
    }


    static Piece_down(object, gameState,other_player)
    {
        const animation_duration = 1.0;
        const starting_position = 2.4;
        const target_position = 0.5;
        var is_Animating = true;


        if(!other_player)
        {
           gameState.clients.client.emit('DOWNdate_game_state',
               { row: object.userData.row, col: object.userData.column });
           //console.log('Upadł', object.userData.row , object.userData.column);
        }
        const animate_down = (time) => {
            console.log(!gameState.second_order_done && is_Animating)
            if(gameState.second_order_done && is_Animating)
            {
                if (!this.startTime) {
                    this.startTime = time;
                }
                const elapsed = (time - this.startTime) / 1000;

                if (elapsed >= animation_duration) {
                    object.position.y = target_position;
                    gameState.second_order_done = false;
                    is_Animating = false;
                    return;
                }
                else
                {
                    requestAnimationFrame(animate_down);
                }
                const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
                object.position.y = starting_position + (target_position - starting_position) * easing_factor;

            }

            if(!gameState.second_order_done && is_Animating)
            {
                requestAnimationFrame(animate_down);
            }
        }
        requestAnimationFrame(animate_down);
    }

    static Piece_field_to_field(object, field, gameState)
    {
        const animation_duration = 4.0;
        const starting_position = object.position.clone().multiply(new THREE.Vector3(1,0,1))  ;
        const target_position = field.position.clone().multiply(new THREE.Vector3(1,0,1)) ;

        const animate_ftf = (time) => {
            console.log(object.position.y)
            if(object.position.y === 2.4 )
            {

                if (!this.startTime) {
                    this.startTime = time;
                }
                const elapsed = (time - this.startTime) / 1000;

                if (elapsed >= animation_duration) {
                    object.position.x = target_position.x;
                    object.position.z = target_position.z;
                    gameState.second_order_done = true;
                    return;
                }
                else
                {
                    requestAnimationFrame(animate_ftf);
                }
                const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
                object.position.x = starting_position.x + (target_position.x - starting_position.x) * easing_factor;
                object.position.z = starting_position.z + (target_position.z - starting_position.z) * easing_factor;
            }
            else
            {
                requestAnimationFrame(animate_ftf);
            }

        }
        requestAnimationFrame(animate_ftf);
    }



    static Enemy_move_animation(object, field_obj, gameState,other_player)
    {
        this.Piece_up(object, gameState,other_player);
        this.Piece_field_to_field(object, field_obj, gameState,false);
        this.Piece_down(object, gameState,other_player);
    }
}