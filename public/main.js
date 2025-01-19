import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as tex from './textures.js';
import * as pieces from './pieces.js';
import {Animation, Clients} from './animation.js';
import  * as hud from './HUD.js'

// import scene from "three/examples/jsm/offscreen/scene";

let board;

class ChessScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = this.create_camera();
        this.renderer = this.create_renderer();
        this.controls = this.create_controls();
        this.raycaster = new THREE.Raycaster();
        this.click_mouse = new THREE.Vector2();
        this.move_mouse = new THREE.Vector2();
        this.draggable_obj = null;
        // this.whiteKing = {row: 0, column: 3};
        // this.blackKing = {row: 7, column: 3};
        this.is_draggable = false;
        this.board = null;
        this.loaded_scene = false;
        this.is_Animating = false;
        this.fieldArray = [];
        this.params = {
            damping: 2.0,
            frequency: 0.4,
            response_factor: 0
        };
        this.clients = new Clients(this)

        this.turn = true;
        this.pointsBlack = 0;
        this.pointsWhite = 0;
        this.animations = new Animation();
        this.init_scene();

        this.init_event_listeners();  
    }

    init_scene()
    {
        this.create_lightning();
        this.create_chessboard();
        this.renderer.setAnimationLoop(() => this.animate());
    }

    create_camera() {
        const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.y = 5;
        camera.position.x = 7;
        camera.lookAt(0, 0, 0);
        return camera;
    }

    create_controls() {
        var controls;

        controls = new OrbitControls(this.camera, this.renderer.domElement)
    
        const distanceToTarget = this.camera.position.length();
        const polarAngle = Math.acos(this.camera.position.y / distanceToTarget);
    
        controls.minPolarAngle = polarAngle;
        controls.maxPolarAngle = polarAngle;
    
        const horizontalLimit = 30;
        controls.minAzimuthAngle = -THREE.MathUtils.degToRad(horizontalLimit);
        controls.maxAzimuthAngle = THREE.MathUtils.degToRad(horizontalLimit);
    
        controls.target.set(0, 0, 0);
        controls.update();
        return controls;

    }

    create_renderer() {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2f2f2f);
        renderer.shadowMap.enabled = true;

        const mainColumn = document.querySelector('.main-column');
        mainColumn.appendChild(renderer.domElement);
        // document.body.appendChild(renderer.domElement);
        return renderer;
    }

    create_lightning() {
        const light = new THREE.AmbientLight( 0x404040,30 );
        const pointLight = new THREE.PointLight(0xffffff, 300, 100);
        pointLight.position.set(0, 10, 0);
        pointLight.castShadow = true;
        this.scene.add(light, pointLight);
    }

    create_chessboard() {
    //     const background_geo = new THREE.BoxGeometry(9, 1, 9);
    //     const background_material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
    //     const background_cube = new THREE.Mesh(background_geo, background_material);
    //     this.scene.add(background_cube);
        tex.create_chessboard_mesh().then((chessboard) => {
            // console.log(chessboard)
            this.scene.add(chessboard);
        })
        this.scene.add(tex.create_chessboard_mesh())
        const square_size = 1;
        const rows = 8;
        const cols = 8;
        const square_geo = new THREE.BoxGeometry(square_size-0.04, 0.1, square_size-0.04);
        this.board = new THREE.Group();


        for (let row = 0; row < rows; row++) {
            this.fieldArray[row] = [];
            for (let col = 0; col < cols; col++) {

                const color = (row + col) % 2 === 0 ? tex.green() : tex.yellow();
                const square_mesh = new THREE.Mesh(square_geo, color);
                const translation_x = (col - (cols - 1)/ 2) * square_size;
                const translation_z = (row - (rows - 1)/ 2) * square_size;
                square_mesh.position.set(translation_x, 0.5, translation_z);
                square_mesh.material.emissive = new THREE.Color(0x000000);
                square_mesh.userData = new pieces.Field(row,col,square_mesh.material,square_mesh)
                square_mesh.type = "Field";
                this.fieldArray[row][col] = square_mesh.userData;
                this.board.add(square_mesh);


                if (row === 1 || row === 6) {
                    const pawn = pieces.Piece.createPiece("pawn", row === 1 ? "white" : "black", row, col, translation_x, translation_z, this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = pawn;
                    this.fieldArray[row][col].piece.color = (row === 1 ? "white" : "black");
                }
                if ((row === 0 || row === 7 )&& (col === 2 || col === 5)) {
                    const bishop = pieces.Piece.createPiece("bishop",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = bishop;
                    this.fieldArray[row][col].piece.color = (row === 0 ? "white" : "black");
                }

                if ((row === 0 || row === 7 )&& (col === 7 || col === 0)) {
                    const rook =  pieces.Piece.createPiece("rook",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = rook;
                    this.fieldArray[row][col].piece.color = (row === 0 ? "white" : "black");
                }
                if (col === 4 && (row === 7 || row === 0)){
                    const queen = pieces.Piece.createPiece("queen",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = queen;
                    this.fieldArray[row][col].piece.color = (row === 0 ? "white" : "black");
                }
                if (col === 3 && (row === 7 || row === 0)){
                    const king =  pieces.Piece.createPiece("king",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = king;
                    this.fieldArray[row][col].piece.color = (row === 0 ? "white" : "black");
                }
                if ((row === 0 || row === 7) && (col === 6 || col === 1)){
                    const knight =  pieces.Piece.createPiece("knight",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board, this.fieldArray)
                    this.fieldArray[row][col].piece_on = true;
                    this.fieldArray[row][col].piece = knight;
                    this.fieldArray[row][col].piece.color = (row === 0 ? "white" : "black");
                }
                this.scene.add(this.board);
            }
        }
        this.loaded_scene = true;
        // console.log(this.board);

        

    }

    animate() {
        this.drag_object(); 
        if (this.loaded_scene) {
            // setTimeout(() => {
            //     Animation.bounce(this.scene, 3, 1, 0.5, 0);
            // }, 5000);

            // setTimeout(() => {
            //     Animation.second_order_model(this.scene, 0, params, 0.5);
            // }, 5000);
            
        }
        this.renderer.render(this.scene, this.camera);
    }

    init_event_listeners() {
        window.addEventListener('click', event => this.handle_mouse_click(event));
        window.addEventListener('mousemove', event => this.handle_mouse_move(event));
        document.getElementById('Black_resignButton').addEventListener('click', () => {
            hud.endGame('white');
        });
        document.getElementById('White_resignButton').addEventListener('click', () => {
            hud.endGame('black');
        });
        document.getElementById("startGameButton").addEventListener('click', () => {
            document.getElementById("startScreen").style.display = 'none';
            hud.ClockAnimation(600,600,this);
        });

    }

    handle_mouse_click(event) {

        if (this.draggable_obj && this.is_draggable) {

            // console.log(`Drop draggable: ${this.draggable.userData.name}`);
            // console.log(this.board);

            const target_pos_x = Math.floor(this.draggable_obj.userData.setPosition.x) + 0.5;
            const target_pos_z = Math.floor(this.draggable_obj.userData.setPosition.z) + 0.5;

            let new_setPoint = new THREE.Vector3(target_pos_x, 0.5, target_pos_z)

            this.draggable_obj.userData.setPositionPrime =  new_setPoint.clone().sub(this.draggable_obj.userData.setPosition.clone())
            this.draggable_obj.userData.setPosition = new_setPoint.clone()

            // Animation.second_order_model(this.draggable_obj , this.params, 0.05);

            const col = this.position_to_row(target_pos_x)
            const row  = this.position_to_row(target_pos_z)


            if(this.fieldArray[row][col].legal && (this.fieldArray[row][col].piece == null ||
                this.fieldArray[row][col].piece.color !== this.draggable_obj.userData.color))
            {
                if(this.draggable_obj.userData.row !== row || this.draggable_obj.userData.column !== col)
                {
                    this.turn = !this.turn;
                    this.draggable_obj.userData.row = row
                    this.draggable_obj.userData.column = col
                }

                if(this.fieldArray[row][col].piece != null && this.fieldArray[row][col].piece.color !== this.draggable_obj.userData.color)
                {
                var piece = this.fieldArray[row][col].piece;

                    if (piece instanceof Promise) {
                        piece.then(piece => {
                            if (!piece) {
                                return;
                            }
                            const Mesh = piece.mesh;
                            if (!Mesh) {
                                return;
                            }
                            hud.addCapturedPiece(piece.color, piece.type,this)
                            this.board.remove(Mesh);
                        })
                    } else {
                        const Mesh = piece.mesh;
                        if (Mesh) {
                            hud.addCapturedPiece(piece.color, piece.type,this)
                            this.board.remove(Mesh);
                        }
                    }
                    // if (piece.piece == "king"){
                    //     switch (piece.color) {
                    //         case "white":
                    //             this.whiteKing = {row, col}
                    //             break;
                    //         case "black":
                    //             this.blackKing = {row, col}
                    //             break;
                    //     }
                    // }
                }
                this.fieldArray[row][col].piece_on = true;
                this.fieldArray[row][col].piece = this.draggable_obj.userData
                this.draggable_obj.userData.active = false;

                this.is_draggable = false;
                // console.log(`Dropped at: ${target_pos_x}, ${target_pos_z}`);

                this.clear_board();
                this.change_emission(this.draggable_obj);
                //console.log("koniec")
                this.animations.Piece_down(this.draggable_obj,this,false)
                this.draggable_obj = null;
                return;
            }
        }

        this.click_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.click_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.click_mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if ( this.draggable_obj == null && intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            // intersectedObject.userData.draggable = !intersectedObject.userData.draggable;


            console.log(this.turn , this.clients.color)


            if (!intersectedObject.userData.active && intersectedObject.userData.draggable) {
                if(
                    (this.turn && this.clients.color == "white" &&
                        intersectedObject.userData.color === "white") ||
                    (!this.turn && this.clients.color == "black" &&
                        intersectedObject.userData.color === "black"))
                {
                    this.draggable_obj = intersectedObject;
                    this.is_Animating = true;
                    this.animations.Piece_up(this.draggable_obj, this,false);
                    this.animations.Reset_animation(this)
                    this.fieldArray[this.draggable_obj.userData.row][this.draggable_obj.userData.column].piece_on = false;
                    this.fieldArray[this.draggable_obj.userData.row][this.draggable_obj.userData.column].piece = null;
                    intersectedObject.userData.move_rules(this.board,this.fieldArray)
                    this.is_draggable = true;
                    intersectedObject.userData.active = true;
                    this.change_emission(intersectedObject);

                }
            }
        } else {
            // console.log('Nothing found');
        }
    }

    handle_mouse_move(event) {
        this.move_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.move_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    drag_object() {
        if (this.is_draggable && this.draggable_obj) {
            this.raycaster.setFromCamera(this.move_mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.board.children);
            if (intersects.length > 0) {
                for (let obj of intersects) {
                    if (obj.object.userData.type != 'ground') continue;
                    if (this.draggable_obj.userData.active)
                    {
                        this.draggable_obj.userData.setPositionPrime = obj.point.clone().sub( this.draggable_obj.userData.setPosition.clone());
                        this.draggable_obj.userData.setPosition = obj.point.clone()
                    }
                    // var setPointPrime =obj.point.clone().sub( this.draggable_obj.position.clone());
                    this.animations.second_order_model(this.draggable_obj , this.params, 0.15,this);
                    // this.draggable_obj.position.x = obj.point.x
                    // this.draggable_obj.position.z = obj.point.z

                }
            }
        }
    }

    change_emission(object) {
        const emission_color = object.userData.active ? 0xff0000 : 0x00000

        if (Array.isArray(object.material)) {
            object.material[0].emissive.set(emission_color);
            object.material[1].emissive.set(emission_color);
            object.material[2].emissive.set(emission_color);
        } else {
            object.material.emissive.set(emission_color);
        }
    }

    clear_board() {
        for (let i = 0; i < this.fieldArray.length; i++) {
             for (let j = 0; j < this.fieldArray[i].length; j++)
             {
                 const field =  this.fieldArray[i][j]
                 field.material.emissive.set(0x000000);
                 field.legal = false;
             }
        }
    }

    position_to_row(value) {
        const min_old = -3.5;
        const max_old = 3.5;
        const min_new = 0;
        const max_new = 7;
        const new_value = ((value - min_old) / (max_old - min_old)) * (max_new - min_new) + min_new;
        return Math.round(new_value);
    }

    async Enemy_turn_update(last_position, new_position)
    {
        console.log(last_position, new_position)
        if(last_position.row !== new_position.row || last_position.col !== new_position.col )
        {
            this.is_Animating = true;
            const Start_Field = this.fieldArray[last_position.row][last_position.col]
            const Final_Field = this.fieldArray[new_position.row][new_position.col]
            //console.log(Start_Field)

            var object = Start_Field.piece;
            if (object instanceof Promise) {
                object = await object;
            }

            console.log(object)

            this.draggable_obj = object.mesh
            const obj = Final_Field.mesh
            this.animations.Enemy_move_animation(this.draggable_obj, obj,this, true)
            this.draggable_obj = Start_Field.piece

            Start_Field.piece = null
            Start_Field.piece_on = false;
            if(Final_Field.piece)
            {
                var rem_piece = Final_Field.piece;
                if (rem_piece instanceof Promise) {
                    rem_piece = await rem_piece;
                }

                hud.addCapturedPiece(rem_piece.color, rem_piece.type,this)
                this.board.remove(rem_piece.mesh);

            }
        this.turn = !this.turn;
        Final_Field.piece = object
        Final_Field.piece_on = true
        this.draggable_obj = null
        }
    // console.log(Final_Field)
    }


}

const chess_scene = new ChessScene();

// initScene();