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
                // console.log(role)
                this.name = role
                this.color = "white";
                document.getElementById('Black_resignButton').style.display = 'none';
                document.getElementById('Black_drawButton').style.display = 'none';

            } else if (role == 'player2') {
                document.getElementById("wait-container").style.display = 'none';
                // console.log(role)
                this.name = role
                this.color = "black";
                document.getElementById('White_resignButton').style.display = 'none';
                document.getElementById('White_drawButton').style.display = 'none';
                // console.log(role)
                this.name = role
                this.color = "white";
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

        // this.client.on('broadcast_new_client', (new_player) => {
        //      if(new_player.id < 2)
        //      {

        //      }
        //
        //     // console.log('Nowy stan:',  new_player.id);
        // });

    }
}





export class Animation {
    constructor() {
        this.startTime_up = null;
        this.startTime_down = null;
        this.startTime_ftf = null;
        this.startTime_reset = null;
        this.ready_up = false;
        this.ready_ftf = false;
        this.ready_down = false;
    }

    second_order_model(object, params, deltaTime, gameState) {
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

            if (!object.userData.active && distance < 0.04) {
                this.ready_ftf = true;
                this.startTime_ftf = null;
                return;
            }
            else
            {
                requestAnimationFrame(simulate);
            }
        };

        requestAnimationFrame(() => simulate());

    }

    Piece_up(object, gameState,other_player) {

        const animation_duration = 1.0;
        const starting_position = object.position.y;
        const target_position = 2.4;
        if(!other_player) {
            gameState.clients.client.emit('UPdate_game_state',
                {row: object.userData.row, col: object.userData.column});
            //console.log('Podniesion', object.userData.row, object.userData.column);
        }

        const animate_up = (time) => {
            if(!this.ready_up && !this.ready_ftf && !this.ready_down)
            {
                if (!this.startTime_up) {
                    this.startTime_up = time;
                }

                var elapsed = (time - this.startTime_up) / 1000;
                if(isNaN(elapsed)  || elapsed === 0)
                {
                    elapsed = 0.1;
                }

                if (elapsed >= animation_duration) {
                    object.position.y = target_position;
                    this.ready_up = true;
                    this.startTime_up = null;
                    return;
                }
                else
                {
                    requestAnimationFrame(animate_up);
                }
                const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
                object.position.y = starting_position + (target_position - starting_position) * easing_factor;
            }
            else
            {
                requestAnimationFrame(animate_up);
            }

        }
        // requestAnimationFrame(animate_up);
        requestAnimationFrame(() => animate_up());

    }


    Piece_down(object, gameState,other_player)
    {
        const animation_duration = 1.0;
        const starting_position = object.position.y;
        const target_position = 0.5;
        var is_Animating = true;


        if(!other_player)
        {
           gameState.clients.client.emit('DOWNdate_game_state',
               { row: object.userData.row, col: object.userData.column });
           //console.log('Upadł', object.userData.row , object.userData.column);
        }
        const animate_down = (time) => {
            if(this.ready_up && this.ready_ftf && !this.ready_down)
            {
                if (!this.startTime_down) {
                    this.startTime_down = time;
                }
                var elapsed = (time - this.startTime_down) / 1000;
                if(isNaN(elapsed)  || elapsed === 0)
                {
                    elapsed = 0.1;
                }
                if (elapsed >= animation_duration) {
                    object.position.y = target_position;
                    gameState.second_order_done = false;
                    is_Animating = false;
                    this.ready_down = true;
                    this.startTime_down = null;
                    // console.log(gameState.second_order_done )
                    return;
                }
                else
                {
                    requestAnimationFrame(animate_down);
                }
                const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3); // Ease-out
                object.position.y = starting_position + (target_position - starting_position) * easing_factor;

            }

            if(!this.ready_ftf && is_Animating)
            {
                requestAnimationFrame(animate_down);
            }
        }
        requestAnimationFrame(() => animate_down());
    }

    Piece_field_to_field(object, field)
    {
        const animation_duration = 3.0;
        const starting_position = object.position.clone().multiply(new THREE.Vector3(1,0,1))  ;
        const target_position = field.position.clone().multiply(new THREE.Vector3(1,0,1)) ;

        const animate_ftf = (time) => {
            if(this.ready_up && ! this.ready_ftf && !this.ready_down)
            {
                if (!this.startTime_ftf) {
                    this.startTime_ftf = time;
                }
                var elapsed = (time - this.startTime_ftf) / 1000;
                if(isNaN(elapsed) || elapsed === 0)
                {
                    elapsed = 0.1;
                }
                if (elapsed >= animation_duration) {
                    object.position.x = target_position.x;
                    object.position.z = target_position.z;
                    this.ready_ftf = true;
                    this.startTime_ftf = null;
                    return;
                }
                else
                {
                    requestAnimationFrame(animate_ftf);
                }
                const easing_factor = 1 - Math.pow(1 - elapsed / animation_duration, 3)
                object.position.x = starting_position.x + (target_position.x - starting_position.x) * easing_factor;
                object.position.z = starting_position.z + (target_position.z - starting_position.z) * easing_factor;
            }
            else
            {
                requestAnimationFrame(animate_ftf);
            }

        }
        requestAnimationFrame(() => animate_ftf());
    }


    Reset_animation(gameState)
    {
        const animate_reset = (time) => {
            if(this.ready_up && this.ready_ftf && this.ready_down){
                this.ready_up = false;
                this.ready_ftf = false;
                this.ready_down = false;
                console.log(gameState)
                gameState.is_Animating = false;
                // console.log(this.ready_up, this.ready_ftf, this.ready_down)
                return
            }
            else
            {
                console.log(this.ready_up, this.ready_ftf, this.ready_down)
                requestAnimationFrame(animate_reset);
            }
        }
        requestAnimationFrame(() => animate_reset());
    }

    Enemy_move_animation(object, field_obj, gameState,other_player)
    {
       gameState.animations.Piece_up(object, gameState,other_player);
       gameState.animations.Piece_field_to_field(object, field_obj, gameState);
       gameState.animations.Piece_down(object, gameState,other_player);
       gameState.animations.Reset_animation(gameState)
    }
}