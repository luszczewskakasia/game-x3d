import * as THREE from 'three';

// import { MapControls } from 'three/addons/controls/MapControls.js';

function initScene() {
    const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	// controls = new MapControls( camera, renderer.domElement );

    const background_geo = new THREE.BoxGeometry(9, -1, 9); 
    const background_material = new THREE.MeshBasicMaterial({ color: 0x964B00 });
    const background_cube = new THREE.Mesh(background_geo, background_material);
    scene.add(background_cube);


    const square_size = 1; 
    const rows = 8;       
    const cols = 8;  
    const square_geo = new THREE.BoxGeometry(square_size, 0.5, square_size);
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const black = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const board = new THREE.Group(); 

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const color = (row + col) % 2 === 0 ? white : black; 
            const square_mesh = new THREE.Mesh(square_geo, color); 
            const translation_x = (col - (cols - 1)/ 2) * square_size; 
            const translation_z = (row - (rows - 1)/ 2) * square_size; 
            square_mesh.position.set(translation_x, 0, translation_z); 
            board.add(square_mesh); 
        }
    }

    scene.add(board);

	window.addEventListener( 'resize', onWindowResize );

    camera.position.y = 5; 
    camera.lookAt(0, 0, 0); 




    function animate() {
		// scene.rotation.x += 0.01;
		// scene.rotation.y += 0.01;
        renderer.render(scene, camera);
    }


    renderer.setAnimationLoop(animate);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

initScene();