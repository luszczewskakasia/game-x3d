import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as tex from './textures.js';
import * as pieces from './pieces.js';

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
        this.draggable = null;
        this.is_draggable = false;


        this.init_scene();

        this.init_event_listeners();  
    }
    init_scene() {
        this.create_lightning();
        this.board = this.create_chessboard();
        this.renderer.setAnimationLoop(() => this.animate());
    }


        create_camera()
        {
            const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
            camera.position.y = 5;
            camera.position.x = 7;
            camera.lookAt(0, 0, 0);
            return camera;
        }

    create_controls()
    {
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

    create_chessboard()
    {
        const board = new THREE.Group();
        const loader = new OBJLoader();
        const pawnModelPath = "pionek.obj";
        const bishopModelPath = "skoczek.obj";
        const towerModelPath = "wieza.obj";
        const kingModelPath = "krol.obj";
        const queenModelPath = "krolowka.obj";
        const horseModelPath = "konik.obj";

        const textureLoader = new THREE.TextureLoader();
        const square_mesh = new THREE.BoxGeometry(2, 1, 1);
        const Black_roughness = 0.5
        const Black_metalness = 0.0
        const White_roughness = 0.8
        const White_metalness = 0.1

        const rows = 8;
        const cols = 8;
        const square_size = 1.0
        const square_geo = new THREE.BoxGeometry(2, 1, 1);
        const green = new THREE.Color(0x00ff00);
        const yellow = new THREE.Color(0xffff00);
        const color = new THREE.Color(0xffff00);

        for (let row = 0; row < rows; row++)
        {
            for (let col = 0; col < cols; col++)
            {
                const color = (row + col) % 2 === 0 ? green : yellow;
                const square_mesh = new THREE.Mesh(square_geo, color);
                const translation_x = (col - (cols - 1)/ 2) * square_size; 
                const translation_z = (row - (rows - 1)/ 2) * square_size; 
                square_mesh.position.set(translation_x, 0.5, translation_z); 
                square_mesh.userData.ground = true;
                board.add(square_mesh);
                if (row === 1 || row === 6) {
                    // loader.loadAsync(pawnModelPath).then((group) => {
                    //     const pawn = group.children[0];
                    //     pawn.scale.set(0.5, 0.5, 0.5);
                    //     pawn.position.set(translation_x, 0.5, translation_z);
                    //     pawn.castShadow = true;
                    //     pawn.receiveShadow = true;
                    //
                    //     pawn.traverse(function (child) {
                    //         if (child.isMesh) {
                    //             child.material = row === 1 ? tex.pawnMaterialBlack : tex.pawnMaterialWhite;
                    //         }
                    //     });
                    //     pawn.userData.draggable = true;
                    //     pawn.userData.name = 'pawn';
                    //     board.add(pawn);
                    // });
                    pieces.PawnCreator.createPiece("Black", row, col, translation_x, translation_z, board)
                    .then(pawn => {
                        console.log(pawn);  // Twój pionek został stworzony i dodany do sceny
                    });

                }
                if ((row === 0 || row === 7 )&& (col === 2 || col === 5)) {
                    loader.loadAsync(bishopModelPath).then((group) => {
                        const bishop = group.children[0];
                        bishop.scale.set(0.5, 0.5, 0.5);
                        bishop.position.set(translation_x, 0.5, translation_z);
                        bishop.castShadow = true;
                        bishop.receiveShadow = true;
                        bishop.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = row === 0 ? tex.bishopMaterialBlack : tex.bishopMaterialWhite;
                            }
                        });
                        bishop.userData.draggable = true;
                        bishop.userData.name = 'bishop';
                        console.log(`${bishop.userData.name}`);
                        console.log(`${bishop.userData.draggable}`);
                        board.add(bishop);
                    });
                }

                if ((row === 0 || row === 7 )&& (col === 7 || col === 0)) {
                    loader.loadAsync(towerModelPath).then((group) => {
                        const tower = group.children[0];
                        tower.scale.set(0.5, 0.5, 0.5);
                        tower.position.set(translation_x, 0.5, translation_z);
                        tower.castShadow = true;
                        tower.receiveShadow = true;
                        tower.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = row === 0 ? tex.towerMaterialBlack : tex.towerMaterialWhite;
                            }
                        });
                        board.add(tower);
                    });
                }

                if (col === 4 && (row === 7 || row === 0)){
                    loader.loadAsync(kingModelPath).then((group) =>  {
                        const king = group.children[0];
                        king.scale.set(0.5, 0.5, 0.5);
                        king.position.set(translation_x, 0.5, translation_z);
                        king.castShadow = true;
                        king.receiveShadow = true;
                        king.traverse(function (child) {
                            if (child.isMesh) {
                                child.material[1] = tex.king_satin;
                                child.material[2] = tex.king_gold;
                                child.material[0] = row === 0 ? tex.king_obsidian : tex.king_marble;
                            }
                        });
                        board.add(king);
                    });
                }

                if (col === 3 && (row === 7 || row === 0)){
                    loader.loadAsync(queenModelPath).then((group) =>  {
                        const queen = group.children[0];
                        queen.scale.set(0.5, 0.5, 0.5);
                        queen.position.set(translation_x, 0.5, translation_z);
                        queen.castShadow = true;
                        queen.receiveShadow = true;
                        queen.traverse(function (child) {
                            if (child.isMesh) {
                                child.material[2] = tex.queen_satin;
                                child.material[0] = tex.queen_gold;
                                child.material[1] = row === 0 ? tex.queen_obsidian : tex.queen_marble;
                            }
                        });
                        board.add(queen);
                    });
                }

                if ((row === 0 || row === 7) && (col === 6 || col === 1)){
                    loader.loadAsync(horseModelPath).then((group) =>  {
                        const horse = group.children[0];
                        horse.scale.set(0.5, 0.5, 0.5);
                        horse.position.set(translation_x, 0.5, translation_z);
                        horse.castShadow = true;
                        horse.receiveShadow = true;
                        horse.traverse(function (child) {
                            if (child.isMesh) {
                                child.material[0] = row ===0 ? tex.horse_obsidian : tex.horse_marble;
                                child.material[1] = tex.horse_gold;
                                child.material[2] = row === 0 ? tex.horse_obsidian_m : tex.horse_marble_o;
                            }
                        });
                        board.add(horse);
                    });
                }


                this.scene.add(board);
            }
        }
        return board;
    }


    animate() {
        this.drag_object(); 
        this.renderer.render(this.scene, this.camera);
    }


    init_event_listeners() {
        window.addEventListener('click', event => this.handle_mouse_click(event));
        window.addEventListener('mousemove', event => this.handle_mouse_move(event));
    }
    
    handle_mouse_click(event) {
        if (this.draggable) {

            console.log(`Drop draggable: ${this.draggable.userData.name}`);

            const target_pos_x = Math.floor(this.draggable.position.x) + 0.5;
            const target_pos_z = Math.floor(this.draggable.position.z) + 0.5;

            this.draggable.position.set(target_pos_x, 0.5, target_pos_z);

            this.draggable = null; 
            this.is_draggable = false;
            console.log(`Dropped at: ${target_pos_x}, ${target_pos_z}`);
            return;
        }

        this.click_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.click_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.click_mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            if (intersectedObject.userData && intersectedObject.userData.draggable) {
                this.draggable = intersectedObject;
                console.log(`Found draggable: ${this.draggable.userData.name}`);
                this.is_draggable = true;
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
        if (this.is_draggable && this.draggable) {
            this.raycaster.setFromCamera(this.move_mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.board.children);
            
            if (intersects.length > 0) {
                for (let obj of intersects) {
                    if (!obj.object.userData.ground) continue;

                    this.draggable.position.x = obj.point.x
                    this.draggable.position.z = obj.point.z

                }
            }
        }
    }

}

const chess_scene = new ChessScene();

// initScene();