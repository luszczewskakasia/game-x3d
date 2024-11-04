import * as THREE from 'three';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function initScene() {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    //renderer.outputEncoding = THREE.sRGBEncoding;
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

    const pointLight = new THREE.PointLight(0xffffff, 200, 200);
    pointLight.position.set(0, 20, 0);

    const light = new THREE.AmbientLight( 0xffffff,2 ); // soft white light

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
    const bishopModelPath = "skoczek.obj";
    const towerModelPath = "wieza.obj";
    const kingModelPath = "krol.obj";
    const textureLoader = new THREE.TextureLoader();

    const Black_roughness = 0.5
    const Black_metalness = 0.0
    const White_roughness = 0.8
    const White_metalness = 0.1

    /// Wczytanie tekstur pionka
    const pawnTextureBlack = textureLoader.load('Textures_pawn/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
    const pawnNormalMapBlack = textureLoader.load('Textures_pawn/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const pawnDisplacementMapBlack = textureLoader.load('Textures_pawn/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
    const pawnMaterialBlack = new THREE.MeshStandardMaterial({
        map: pawnTextureBlack,
        normalMap: pawnNormalMapBlack,
        displacementMap: pawnDisplacementMapBlack,
        metalness: Black_metalness,
        roughness: Black_roughness
    });
    const pawnTextureWhite = textureLoader.load("Textures_pawn/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
    const pawnNormalMapWhite = textureLoader.load('Textures_pawn/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const pawnMaterialWhite = new THREE.MeshStandardMaterial({
        map: pawnTextureWhite,
        normalMap: pawnNormalMapWhite,
        metalness: White_metalness,
        roughness: White_roughness
    });


    /// Wczytanie tekstur skoczka
    const bishopTextureBlack = textureLoader.load('Textures_bishop/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
    const bishopNormalMapBlack = textureLoader.load('Textures_bishop/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const bishopDisplacementMapBlack = textureLoader.load('Textures_bishop/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
    const bishopMaterialBlack = new THREE.MeshStandardMaterial({
        map: bishopTextureBlack,
        normalMap: bishopNormalMapBlack,
        displacementMap: bishopDisplacementMapBlack,
        metalness: Black_metalness,
        roughness: Black_roughness
    });
    const bishopTextureWhite = textureLoader.load("Textures_bishop/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
    const bishopNormalMapWhite = textureLoader.load('Textures_bishop/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const bishopMaterialWhite = new THREE.MeshStandardMaterial({
        map: bishopTextureWhite,
        normalMap: bishopNormalMapWhite,
        metalness: White_metalness,
        roughness: White_roughness
    });


    /// Wczytanie tekstur wiezy
    const towerTextureBlack = textureLoader.load('Textures_tower/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
    const towerNormalMapBlack = textureLoader.load('Textures_tower/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const towerDisplacementMapBlack = textureLoader.load('Textures_tower/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
    const towerMaterialBlack = new THREE.MeshStandardMaterial({
        map: towerTextureBlack,
        normalMap: towerNormalMapBlack,
        displacementMap: towerDisplacementMapBlack,
        metalness: Black_metalness,
        roughness: Black_roughness
    });
    const towerTextureWhite = textureLoader.load("Textures_tower/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
    const towerNormalMapWhite = textureLoader.load('Textures_tower/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
    const towerMaterialWhite = new THREE.MeshStandardMaterial({
        map: towerTextureWhite,
        normalMap: towerNormalMapWhite,
        metalness: White_metalness,
        roughness: White_roughness
    });

    const diffuse_marble_king = textureLoader.load('Textures_king/King_marble_diffuse.jpg');
    const normal_marble_king = textureLoader.load('Textures_king/King_marble_normal.jpg');
    const displace_marble_king = textureLoader.load('Textures_king/King_marble_displacment.png')*0.5;

    const diffuse_satin_king = textureLoader.load('Textures_king/King_satin_diffuse.jpg');
    const normal_satin_king = textureLoader.load('Textures_king/King_satin_normal.jpg');
    const displace_satin_king = textureLoader.load('Textures_king/King_satin_displacment.jpg')*0.5;

    const diffuse_gold_king = textureLoader.load('Textures_king/King_gold_diffuse.jpg');
    const normal_gold_king = textureLoader.load('Textures_king/King_gold_normal.jpg');
    const displace_gold_king = textureLoader.load('Textures_king/King_gold_displacment.jpg')*0.5;



    const king_marble= new THREE.MeshStandardMaterial({
        map: diffuse_marble_king,
        normalMap:normal_marble_king,
        displacementMap: displace_marble_king,
        metalness: White_metalness,
        roughness: White_roughness

    });

    const king_satin = new THREE.MeshStandardMaterial({
        map: diffuse_satin_king,
        normalMap:normal_satin_king,
        displacementMap: displace_satin_king,
        metalness: 0.6,
        roughness: 1
    });

    const king_gold = new THREE.MeshStandardMaterial({
        map: diffuse_gold_king,
        normalMap:normal_gold_king,
        displacementMap: displace_gold_king,
        metalness: 0.75,
        roughness: 0.15
    });


    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++)
        {
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
            if (row === 0 && (col === 2|| col === 5))
            {
                loader.load(bishopModelPath, function (bishop) {
                    bishop.scale.set(0.5, 0.5, 0.5);
                    bishop.position.set(translation_x, 0.5, translation_z);
                    bishop.castShadow = true;
                    bishop.receiveShadow = true;
                    bishop.traverse(function (child) {
                        if (child.isMesh) {
                            child.material = bishopMaterialBlack;
                        }
                        board.add(bishop);
                    });
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
                        board.add(bishop);
                    });
                });
            }

            if (row === 7 && (col === 7 || col === 0))
            {
                loader.load(towerModelPath, function (tower) {
                    tower.scale.set(0.5, 0.5, 0.5);
                    tower.position.set(translation_x, 0.5, translation_z);
                    tower.castShadow = true;
                    tower.receiveShadow = true;
                    tower.traverse(function (child) {
                        if (child.isMesh) {
                            child.material = towerMaterialWhite;
                        }
                        board.add(tower);
                    });
                });
            }
            if (row === 0 && (col === 7|| col === 0))
            {
                loader.load(towerModelPath, function (tower) {
                    tower.scale.set(0.5, 0.5, 0.5);
                    tower.position.set(translation_x, 0.5, translation_z);
                    tower.castShadow = true;
                    tower.receiveShadow = true;
                    tower.traverse(function (child) {
                        if (child.isMesh) {
                            child.material = towerMaterialBlack;
                        }
                        board.add(tower);
                    });
                });
            }

            if (col === 4 && (row === 7|| row === 0))
            {
                loader.load(kingModelPath, function (king) {
                    king.scale.set(0.5, 0.5, 0.5);
                    king.position.set(translation_x, 0.5, translation_z);
                    king.castShadow = true;
                    king.receiveShadow = true;
                    king.traverse(function (child) {
                        if (child.isMesh) {
                            child.material[0] = king_marble;
                            child.material[1] = king_satin;
                            child.material[2] = king_gold;
                        }
                        board.add(king);
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