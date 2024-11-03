import { ChessScene } from "main.js"

class Pieces {
    constructor() {
        this.loader = new OBJLoader();
        this.pawnModelPath = "pionek.obj";
        this.bishopModelPath = "skoczek.obj";
        this.textureLoader = new THREE.TextureLoader();

    }

    create_pawn()  {
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
                    board.add(pawn);
                });
            });
        }

    }

    create_bishop() {
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

    }
}