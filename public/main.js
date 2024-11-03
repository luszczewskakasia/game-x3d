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
        this.draggable = false;

        this.init_scene();
        // this.init_event_listeners(); 
        this.initEventListeners();  
        // this.move();
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
                board.add(square_mesh);
                if (row === 1 || row === 6) {
                    loader.load(pawnModelPath, function (pawn) {
                        pawn.scale.set(0.5, 0.5, 0.5);
                        pawn.position.set(translation_x, 0.5, translation_z);
                        pawn.castShadow = true;
                        pawn.receiveShadow = true;
                        pawn.userData.draggable = true;
                        pawn.userData.name = 'pawn';
                        pawn.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = row === 1 ? pawnMaterialBlack : pawnMaterialWhite;
                            }
                        });
                        board.add(pawn);
                    });
                    
                }
                if (row === 0 && (col === 2|| col === 5))
                {
                    loader.load(bishopModelPath, function (bishop) {
                        bishop.scale.set(0.5, 0.5, 0.5);
                        bishop.position.set(translation_x, 0.5, translation_z);
                        bishop.castShadow = true;
                        bishop.receiveShadow = true;
                        bishop.userData.draggable = true;
                        bishop.userData.name = 'bishop';
                        console.log('bishop');
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
                    loader.load(bishopModelPath, function (bishop) {
                        bishop.scale.set(0.5, 0.5, 0.5);
                        bishop.position.set(translation_x, 0.5, translation_z);
                        bishop.castShadow = true;
                        bishop.receiveShadow = true;
                        bishop.traverse(function (child) {
                            if (child.isMesh) {
                                child.material = bishopMaterialWhite;
                            }
                            
                        });
                        board.add(bishop);
                    });
                }
            }
        }
    
        this.scene.add(board);
        return board;

    }

    init_event_listeners() {
        // window.addEventListener('click', event => this.)
    }

    animate() {

        // scene.rotation.x += 0.01;
        // scene.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
    
    // const raycaster = new THREE.Raycaster();
    // const click_mouse = new THREE.Vector2();
    // const move_mouse = new THREE.Vector2();
    // 

    // move() {
    //     // var draggable = new THREE.Object3D;
    //     window.addEventListener('click', event => {
    //         this.click_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //         this.click_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
    //         this.raycaster.setFromCamera( this.click_mouse, this.camera );
    //         const intersects = this.raycaster.intersectObjects(this.scene.children );
    //         if (intersects.length > 0 && intersects[0].object.userData.draggable) {
    //             this.draggable = intersects[0].object;
    //             console.log(`found draggabe ${this.draggable.userData.name}`)
    //         }
        
    //     });

        // window.addEventListener('mousemove', event => {
        //     if (this.draggable) {
        //         this.move_mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        //         this.move_mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        
        //         this.raycaster.setFromCamera(this.move_mouse, this.camera);
        //         const newPosition = raycaster.ray.origin.clone();
        //         draggable.position.copy(newPosition); 
        //     }
        // });
        

        
        // window.addEventListener('mouseup', () => {
        //     draggable = null; 
        // });
        
    // }
    initEventListeners() {
        window.addEventListener('click', event => this.handleMouseClick(event));
        window.addEventListener('mousemove', event => this.handleMouseMove(event));
        window.addEventListener('mouseup', () => this.handleMouseRelease());
    }

    handleMouseClick(event) {
        this.click_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.click_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        this.updateMousePosition(event, this.click_mouse);
        this.raycaster.setFromCamera(this.click_mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        console.log(`${intersects.length}`);

        if (intersects.length > 0) {
            this.draggable = intersects[0].object;
            console.log(`Found draggable: ${this.draggable.userData.name}`);
        } else {
            console.log('nothing found');
        }
    }

    handleMouseMove(event) {
        if (this.draggable) {
            this.updateMousePosition(event, this.move_mouse);
            this.raycaster.setFromCamera(this.move_mouse, this.camera);
            this.draggable.position.copy(this.raycaster.ray.origin);
        }
    }

    handleMouseRelease() {
        this.draggable = null;
    }

    updateMousePosition(event, vector) {
        vector.x = (event.clientX / window.innerWidth) * 2 - 1;
        vector.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
    

}

const chess_scene = new ChessScene();

// initScene();