import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function initScene() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x2f2f2f);
    document.body.appendChild(renderer.domElement);

	var controls;
	const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.y = 5;
    camera.position.x = 7;
    camera.lookAt(0, 0, 0);
    controls = new OrbitControls(camera, renderer.domElement)

    const distanceToTarget = camera.position.length();
    const polarAngle = Math.acos(camera.position.y / distanceToTarget);

    controls.minPolarAngle = polarAngle;
    controls.maxPolarAngle = polarAngle;

    const horizontalLimit = 30;
    controls.minAzimuthAngle = -THREE.MathUtils.degToRad(horizontalLimit);
    controls.maxAzimuthAngle = THREE.MathUtils.degToRad(horizontalLimit);

    controls.target.set(0, 0, 0);
    controls.update();
    const background_geo = new THREE.BoxGeometry(9, 1, 9); 
    const background_material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
    const background_cube = new THREE.Mesh(background_geo, background_material);
    scene.add(background_cube);

    const pointLight = new THREE.PointLight(0xffffff, 300, 100);
    pointLight.position.set(0, 10, 0);

    const light = new THREE.AmbientLight( 0x404040,30 ); // soft white light

    renderer.shadowMap.enabled = true;
    pointLight.castShadow = true;

    scene.add( light );
    scene.add(pointLight);

    const square_size = 1; 
    const rows = 8;       
    const cols = 8;  
    const square_geo = new THREE.BoxGeometry(square_size, 0.1, square_size);
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const green = new THREE.MeshBasicMaterial({ color: 0x0b4f1d });
    const yellow = new THREE.MeshBasicMaterial({ color: 0xc2c28c });
    const board = new THREE.Group(); 

    const loader = new OBJLoader();
    const pawnModelPath = "pionek.obj";
    const textureLoader = new THREE.TextureLoader();





    const pawnTextureBlack = textureLoader.load('Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
    const pawnNormalMapBlack = textureLoader.load('Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const pawnMaterialBlack = new THREE.MeshStandardMaterial({
        map: pawnTextureBlack,
        normalMap: pawnNormalMapBlack,
        metalness: 0.5,
        roughness: 0.78
    });
    const pawnTextureWhite = textureLoader.load("Marble__texture.png"); // Ścieżka do tekstury czarnego pionka
    const pawnNormalMapWhite = textureLoader.load('Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const pawnMaterialWhite = new THREE.MeshStandardMaterial({
        map: pawnTextureWhite,
        normalMap: pawnNormalMapWhite,
        metalness: 0.1,
        roughness: 0.6
    });

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
                    pawn.traverse(function (child) {
                        if (child.isMesh) {
                            child.material = row === 1 ? pawnMaterialBlack : pawnMaterialWhite;
                        }
                        board.add(pawn);
                    });
                });
            }
        }
    }

    scene.add(board);

    function animate() {
		// scene.rotation.x += 0.01;
		// scene.rotation.y += 0.01;
        renderer.render(scene, camera);
    }


    renderer.setAnimationLoop(animate);
}

initScene();