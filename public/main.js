import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as tex from './textures.js';
import * as pieces from './pieces.js';
import { Animation } from './animation.js';

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
        this.is_draggable = false;
        this.board = null;
        this.loaded_scene = false;


        this.init_scene();

        this.init_event_listeners();  
    }

    init_scene() {
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
        document.body.appendChild(renderer.domElement);
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
        const background_geo = new THREE.BoxGeometry(9, 1, 9);
        const background_material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
        const background_cube = new THREE.Mesh(background_geo, background_material);
        this.scene.add(background_cube);
        // pieces.PiecesGeneration(this.board)



        const square_size = 1;
        const rows = 8;
        const cols = 8;
        const square_geo = new THREE.BoxGeometry(square_size, 0.1, square_size);
        this.board = new THREE.Group();


        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {

                const color = (row + col) % 2 === 0 ? tex.green() : tex.yellow();
                const square_mesh = new THREE.Mesh(square_geo, color);
                const translation_x = (col - (cols - 1)/ 2) * square_size;
                const translation_z = (row - (rows - 1)/ 2) * square_size;
                square_mesh.position.set(translation_x, 0.5, translation_z);
                square_mesh.userData = new pieces.Field(row,col)
                square_mesh.type = "Field";
                square_mesh.material.emissive = new THREE.Color(0x000000);
                this.board.add(square_mesh);


                if (row === 1 || row === 6) {
                    pieces.Piece.createPiece("pawn", row === 1 ? "white" : "black", row, col, translation_x, translation_z, this.board)
                }
                if ((row === 0 || row === 7 )&& (col === 2 || col === 5)) {
                    pieces.Piece.createPiece("bishop",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board)
                }

                if ((row === 0 || row === 7 )&& (col === 7 || col === 0)) {
                    pieces.Piece.createPiece("rook",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board)

                }
                if (col === 4 && (row === 7 || row === 0)){
                    pieces.Piece.createPiece("queen",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board)
                }
                if (col === 3 && (row === 7 || row === 0)){
                    pieces.Piece.createPiece("king",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board)
                }
                if ((row === 0 || row === 7) && (col === 6 || col === 1)){
                    pieces.Piece.createPiece("knight",row === 0 ? "white" :"black",row,col,translation_x,translation_z,this.board)
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
            setTimeout(() => {
                Animation.bounce(this.scene, 3, 1, 0.5, 0);
            }, 5000);
            
        }
        this.renderer.render(this.scene, this.camera);
    }

    init_event_listeners() {
        window.addEventListener('click', event => this.handle_mouse_click(event));
        window.addEventListener('mousemove', event => this.handle_mouse_move(event));
    }

    handle_mouse_click(event) {

        if (this.draggable_obj) {

            // console.log(`Drop draggable: ${this.draggable.userData.name}`);
            // console.log(this.board);

            const target_pos_x = Math.floor(this.draggable_obj.position.x) + 0.5;
            const target_pos_z = Math.floor(this.draggable_obj.position.z) + 0.5;
            this.draggable_obj.position.set(target_pos_x, 0.5, target_pos_z);
            this.draggable_obj.userData.row = this.position_to_row(target_pos_z)
            this.draggable_obj.userData.column = this.position_to_row(target_pos_x)
            this.is_draggable = false;
            console.log(`Dropped at: ${target_pos_x}, ${target_pos_z}`);
            // console.log();
            this.draggable_obj.userData.active = false;
            this.clear_board();
            this.change_emission(this.draggable_obj);
            this.draggable_obj = null;
            return;
        }

        this.click_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.click_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.click_mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;


            // intersectedObject.userData.draggable = !intersectedObject.userData.draggable;


            if (intersectedObject.userData && intersectedObject.userData.draggable) {
                this.draggable_obj = intersectedObject;
                //console.log(intersectedObject);
                intersectedObject.userData.move_rules(this.board)
                this.is_draggable = true;
                console.log(intersectedObject.userData.active)
                intersectedObject.userData.active = true;
                this.change_emission(intersectedObject);
            }
        } else {
            console.log('Nothing found');
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

                    this.draggable_obj.position.x = obj.point.x
                    this.draggable_obj.position.z = obj.point.z

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

    clear_board()
    {
        for (let i = 0; i < this.board.children.length; i++) {
            if (this.board.children[i].type === "Field") {
                this.board.children[i].material.emissive.set(0x000000);
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


}

const chess_scene = new ChessScene();

// initScene();