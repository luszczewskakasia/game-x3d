import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import * as tex from './textures.js';




const loader = new OBJLoader();
const pawnModelPath = "pionek.obj";
const bishopModelPath = "skoczek.obj";
const towerModelPath = "wieza.obj";
const kingModelPath = "krol.obj";
const queenModelPath = "krolowka.obj";
const horseModelPath = "konik.obj";


export class Piece {
    constructor(color, row, column, model3D,type) {
        if (new.target === Piece) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.type = this.constructor.name.toLowerCase(); // Nazwa klasy jako typ
        this.row = row;         // Wiersz na planszy
        this.column = column;   // Kolumna na planszy
        this.color = color
        this.model3D = model3D
    }

    move_rules() {
        throw new Error("Abstract method 'move_rules' must be implemented in derived class.");
    }

    static async createPiece(color, row, column, translation_x, translation_z, board) {}

}

export class Pawn extends Piece {



    constructor(color, row, column, model3D,type) {
        super(color, row, column, model3D,type);

    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}
export class PawnCreator {
    static async createPiece(color, row, column, translation_x, translation_z, board) {
        const group = await loader.loadAsync(pawnModelPath);
        const pawn = group.children[0];
        pawn.scale.set(0.5, 0.5, 0.5);
        pawn.position.set(translation_x, 0.5, translation_z);
        pawn.castShadow = true;
        pawn.receiveShadow = true;

        pawn.traverse(function (child) {
            if (child.isMesh) {
                child.material = row === 1 ? tex.pawnMaterialBlack : tex.pawnMaterialWhite;
            }
        });

        pawn.userData.draggable = true;
        pawn.userData.name = 'pawn';

        // Zamiast "this.board.add" używamy globalnego "board"
        board.add(pawn);

        const pieceColor = row === 1 ? "Black" : "White";

        return new Pawn(pieceColor, row, column, pawn,"pawn");
    }
}


export class Bishop extends Piece {

    constructor(color, row, column, model3D) {
        super(color, row, column, model3D);
    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}

class Knight extends Piece {

    constructor(color, row, column, model3D) {
        super(color, row, column, model3D);
    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}

// Klasa podrzędna dla wieży (rook)
class Rook extends Piece {

    constructor(color, row, column, model3D) {
        super(color, row, column, model3D);
    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}


class Queen extends Piece {

    constructor(color, row, column, model3D) {
        super(color, row, column, model3D);
    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}

class King extends Piece {

    constructor(color, row, column, model3D) {
        super(color, row, column, model3D);
    }

    move_rules() {
        return "Rook can move horizontally or vertically any number of squares.";
    }
}






















//
//
//
// export class Pieces {
//     constructor(Model_obj, x_position, z_position, type) {
//         this.loader = new OBJLoader();
//         this.pawnModelPath = "pionek.obj";
//         this.bishopModelPath = "skoczek.obj";
//         this.textureLoader = new THREE.TextureLoader();
//
//     }
//
//     create_pawn(row, col, translation_x, translation_z)  {
//         const pawnTextureBlack = this.textureLoader.load('Textures_pawn/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
//         const pawnNormalMapBlack = this.textureLoader.load('Textures_pawn/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
//         const pawnDisplacementMapBlack = this.textureLoader.load('Textures_pawn/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
//         const pawnMaterialBlack = new THREE.MeshStandardMaterial({
//             map: pawnTextureBlack,
//             normalMap: pawnNormalMapBlack,
//             displacementMap: pawnDisplacementMapBlack,
//             metalness: 0.5,
//             roughness: 0.78
//         });
//         const pawnTextureWhite = this.textureLoader.load("Textures_pawn/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
//         const pawnNormalMapWhite = this.textureLoader.load('Textures_pawn/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
//         const pawnMaterialWhite = new THREE.MeshStandardMaterial({
//             map: pawnTextureWhite,
//             normalMap: pawnNormalMapWhite,
//             metalness: 0.1,
//             roughness: 0.6
//         });
//
//         this.loader.load(this.pawnModelPath, function (pawn) {
//             pawn.scale.set(0.5, 0.5, 0.5);
//             pawn.position.set(translation_x, 0.5, translation_z);
//             pawn.castShadow = true;
//             pawn.receiveShadow = true;
//             pawn.userData.draggable = true;
//             pawn.userData.name = 'pawn';
//             pawn.traverse(function (child) {
//                 if (child.isMesh) {
//                     child.material = row === 1 ? pawnMaterialBlack : pawnMaterialWhite;
//                 }
//                 // board.add(pawn);
//             });
//         });
//         return pawn;
//     }
//
//
//     create_bishop(row, col, translation_x, translation_z) {
//         const bishopTextureBlack = this.textureLoader.load('Textures_bishop/Obsydian_texture.png'); // Ścieżka do tekstury czarnego pionka
//         const bishopNormalMapBlack = this.textureLoader.load('Textures_bishop/Obsydian_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
//         const bishopDisplacementMapBlack = this.textureLoader.load('Textures_bishop/Obsydian_texture_Displacment.png')*0.5; // Path to the displacement map texture
//         const bishopMaterialBlack = new THREE.MeshStandardMaterial({
//             map: bishopTextureBlack,
//             normalMap: bishopNormalMapBlack,
//             displacementMap: bishopDisplacementMapBlack,
//             metalness: 0.5,
//             roughness: 0.78
//         });
//         const bishopTextureWhite = this.textureLoader.load("Textures_bishop/Marble_texture.png"); // Ścieżka do tekstury czarnego pionka
//         const bishopNormalMapWhite = this.textureLoader.load('Textures_bishop/Marble_normal.png'); // Ścieżka do mapy normalnej czarnego pionka
//         const bishopMaterialWhite = new THREE.MeshStandardMaterial({
//             map: bishopTextureWhite,
//             normalMap: bishopNormalMapWhite,
//             metalness: 0.1,
//             roughness: 0.6
//         });
//
//         return new Promise((resolve) => {
//             this.loader.load(this.bishopModelPath, function (bishop) {
//                 bishop.scale.set(0.5, 0.5, 0.5);
//                 bishop.position.set(translation_x, 0.5, translation_z);
//                 bishop.castShadow = true;
//                 bishop.receiveShadow = true;
//                 bishop.traverse(function (child) {
//                     if (child.isMesh) {
//                         child.material = bishopMaterialBlack;
//                     }
//                     // board.add(bishop);
//                 });
//                 resolve(bishop);
//             });
//
//
//         });
//
//     }
// }