import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
        this.initEventListeners();  
    }
    init_scene() {
        // this.addBackground();
        this.create_lightning();
        this.board = this.create_chessboard();
        // this.loadPieces();
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

        const loader = new OBJLoader();
        const pawnModelPath = "pionek.obj";
        const bishopModelPath = "skoczek.obj";
        const textureLoader = new THREE.TextureLoader();

        /// Wczytanie tekstur pionka
        const pawnTextureBlack = textureLoader.load('Textures_pawn/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
        const pawnNormalMapBlack = textureLoader.load('Textures_pawn/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
        const pawnDisplacementMapBlack = textureLoader.load('Textures_pawn/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
        const pawnMaterialBlack = new THREE.MeshStandardMaterial({
            map: pawnTextureBlack,
            normalMap: pawnNormalMapBlack,
            displacementMap: pawnDisplacementMapBlack,
            metalness: 0.5,
            roughness: 0.78
        });
        const pawnTextureWhite = textureLoader.load("Textures_pawn/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
        const pawnNormalMapWhite = textureLoader.load('Textures_pawn/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
        const pawnMaterialWhite = new THREE.MeshStandardMaterial({
            map: pawnTextureWhite,
            normalMap: pawnNormalMapWhite,
            metalness: 0.1,
            roughness: 0.6
        });
    
    
        /// Wczytanie tekstur skoczka
        const bishopTextureBlack = textureLoader.load('Textures_bishop/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
        const bishopNormalMapBlack = textureLoader.load('Textures_bishop/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
        const bishopDisplacementMapBlack = textureLoader.load('Textures_bishop/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
        const bishopMaterialBlack = new THREE.MeshStandardMaterial({
            map: bishopTextureBlack,
            normalMap: bishopNormalMapBlack,
            displacementMap: bishopDisplacementMapBlack,
            metalness: 0.5,
            roughness: 0.78
        });
        const bishopTextureWhite = textureLoader.load("Textures_bishop/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
        const bishopNormalMapWhite = textureLoader.load('Textures_bishop/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
        const bishopMaterialWhite = new THREE.MeshStandardMaterial({
            map: bishopTextureWhite,
            normalMap: bishopNormalMapWhite,
            metalness: 0.1,
            roughness: 0.6
        });

        const background_geo = new THREE.BoxGeometry(9, 1, 9); 
        const background_material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
        const background_cube = new THREE.Mesh(background_geo, background_material);
        this.scene.add(background_cube);

        const square_size = 1; 
        const rows = 8;       
        const cols = 8;  
        const square_geo = new THREE.BoxGeometry(square_size, 0.1, square_size);
        const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const green = new THREE.MeshBasicMaterial({ color: 0x0b4f1d });
        const yellow = new THREE.MeshBasicMaterial({ color: 0xc2c28c });
        const board = new THREE.Group(); 

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const color = (row + col) % 2 === 0 ? green : yellow;
                const square_mesh = new THREE.Mesh(square_geo, color);
                const translation_x = (col - (cols - 1)/ 2) * square_size; 
                const translation_z = (row - (rows - 1)/ 2) * square_size; 
                square_mesh.position.set(translation_x, 0.5, translation_z); 
                square_mesh.userData.ground = true;
                board.add(square_mesh);
                if (row === 1 || row === 6) {
                    loader.loadAsync(pawnModelPath).then((group) => {
                        const pawn = group.children[0];
                        pawn.scale.set(0.5, 0.5, 0.5);
                        pawn.position.set(translation_x, 0.5, translation_z);
                        pawn.castShadow = true;
                        pawn.receiveShadow = true;

                        pawn.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = row === 1 ? pawnMaterialBlack : pawnMaterialWhite;
                            }
                        });
                        pawn.userData.draggable = true;
                        pawn.userData.name = 'pawn';
                        board.add(pawn);
                    });
                    
                }
                if (row === 0 && (col === 2|| col === 5))
                {
                    loader.loadAsync(bishopModelPath).then((group) => {
                        const bishop = group.children[0];
                        bishop.scale.set(0.5, 0.5, 0.5);
                        bishop.position.set(translation_x, 0.5, translation_z);
                        bishop.castShadow = true;
                        bishop.receiveShadow = true;
                        bishop.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = bishopMaterialBlack;
                            }
                        });

                        board.add(bishop);
                    });
                }
                if (row === 7 && (col === 2 || col === 5))
                {
                    loader.loadAsync(bishopModelPath).then((group) => {
                        const bishop = group.children[0];
                        bishop.scale.set(0.5, 0.5, 0.5);
                        bishop.position.set(translation_x, 0.5, translation_z);
                        bishop.castShadow = true;
                        bishop.receiveShadow = true;
                        bishop.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = bishopMaterialWhite;
                            }
                            
                        });
                        bishop.userData.draggable = true;
                        bishop.userData.name = 'bishop';
                        console.log(`${bishop.userData.name}`);
                        console.log(`${bishop.userData.draggable}`);
                        board.add(bishop);
                    });
                }
            }
        }
    
        this.scene.add(board);
        return board;

    }

    animate() {
        this.drag_object();
        
        this.renderer.render(this.scene, this.camera);
    }

        

    initEventListeners() {
        window.addEventListener('click', event => this.handleMouseClick(event));
        window.addEventListener('mousemove', event => this.handleMouseMove(event));
    }
    
    handleMouseClick(event) {
        if (this.draggable) {

            console.log(`Drop draggable: ${this.draggable.userData.name}`);

            // const grid = 0.5;
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

    handleMouseMove(event) {
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