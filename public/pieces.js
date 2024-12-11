import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import * as tex from './textures.js';
import {
    createKingMaterialGold,
    createKnightMaterialMarble,
    createKnightMaterialMarbleO,
    createKnightMaterialObsidian,
    createKnightMaterialObsidianM,
    createQueenMaterialGold,
    createQueenMaterialMarble,
    createQueenMaterialObsidian,
    createQueenMaterialSatin
} from "./textures.js";
// import * as main from './main';

// const board = main.board

const loader = new OBJLoader();
const pawnModelPath = "pionek.obj";
const bishopModelPath = "skoczek.obj";
const rookModelPath = "wieza.obj";
const kingModelPath = "krol.obj";
const queenModelPath = "krolowka.obj";
const knightModelPath = "konik.obj";



export class Piece {
    constructor(type, color, row, column) {
        if (new.target === Piece) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.type = type.toLowerCase();
        this.row = row;
        this.column = column;
        this.color = color;
        this.active = false;
        this.draggable = true;
        this.name = `${this.type}_${row}_${column}`;
        const square_size = 1;
        const translation_x = (column - 7/ 2) * square_size;
        const translation_z = (row - 7/ 2) * square_size;
        this.setPosition = new THREE.Vector3(translation_x,0.5,translation_z);
        this.setPositionPrime = new THREE.Vector3(0,0.0,0);
        // this.model3D = this.createPiece(type,color,row,column,translation_x,translation_z);

    }

    move_rules(board) {
        throw new Error("Abstract method 'move_rules' must be implemented in derived class.");
    }

    static async createPiece(type, color, row, column, translation_x, translation_z, board) {

        let Model3D;
        let tex_layers;
        let textures;

        switch (type.toLowerCase()) {

            case "queen":
                Model3D = queenModelPath;
                tex_layers = 3;
                textures = [tex.createQueenMaterialGold(),color === "white" ? tex.createQueenMaterialObsidian() : tex.createQueenMaterialMarble(),tex.createQueenMaterialSatin()];
                break;

            case "king":
                Model3D = kingModelPath;
                tex_layers = 3;
                textures = [color === "white" ? tex.createKingMaterialObsidian() : tex.createKingMaterialMarble(),tex.createKingMaterialSatin(),tex.createKingMaterialGold()];
                break;
            case "bishop":
                Model3D = bishopModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.createBishopMaterialBlack() : tex.createBishopMaterialWhite()];
                break;
            case "knight":
                Model3D = knightModelPath;
                tex_layers = 3;
                textures = [color === "white" ? tex.createKnightMaterialObsidian() : tex.createKnightMaterialMarble(),tex.createKingMaterialGold(),color === "white" ? tex.createKnightMaterialObsidianM() : tex.createKnightMaterialMarbleO()];
                break;
            case "pawn":
                Model3D = pawnModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.createPawnMaterialBlack() : tex.createPawnMaterialWhite()];
                break;
            case "rook":
                Model3D = rookModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.createRookMaterialBlack() : tex.createRookMaterialWhite()];
                break;

            default:
                throw new Error(`Unsupported piece type: ${type}`);
        }



        return loader.loadAsync(Model3D).then((group) => {

            const piece = group.children[0]

            piece.scale.set(0.5, 0.5, 0.5);
            piece.position.set(translation_x, 0.5, translation_z);
            piece.castShadow = true;
            piece.receiveShadow = true;
            piece.type = "Piece"
            piece.traverse(function (child) {
                if (child.isMesh) {
                    if(tex_layers === 1)
                    {
                        child.material =textures[0];
                    }
                    else
                    {
                        for (let l = 0; l < tex_layers; l++)
                        {
                            child.material[l] =textures[l];
                        }
                    }

                }
            });

            switch(type.toLowerCase())
            {
                case "queen":
                    piece.userData = new Queen("queen",color, row, column);
                    board.add(piece);
                    return piece.userData
                case "king":
                    piece.userData =new King("king",color, row, column);
                    board.add(piece);
                    return piece.userData
                case "bishop":
                    piece.userData =new Bishop("bishop",color, row, column);
                    board.add(piece);
                    return piece.userData
                case "knight":
                    piece.userData = new Knight("knight",color, row, column);
                    board.add(piece);
                    return piece.userData
                case "pawn":
                    piece.userData = new Pawn("pawn",color, row, column);
                    board.add(piece);
                    return piece.userData
                case "rook":
                    piece.userData = new Rook("rook",color, row, column);
                    board.add(piece);
                    return piece.userData
                default:
                    throw new Error(`Unsupported piece type: ${type}`);

            }
            // loaded_scene = true; 
        });

    }
}

export class Queen extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];

                if (
                    field.userData.row === this.row ||
                    field.userData.column === this.column ||
                    Math.abs(field.userData.row - this.row) === Math.abs(field.userData.column - this.column)
                ) {
                    field.material.emissive.set(0xff0000);
                }
            }
        }

        return "Queen can move diagonally, horizontally, or vertically any number of squares.";
    }
}



export class King extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];

                if (
                    Math.abs(field.userData.row - this.row) <= 1 &&
                    Math.abs(field.userData.column - this.column) <= 1
                ) {
                    field.material.emissive.set(0xff0000);
                }
            }
        }

        return "King can move one square in any direction.";
    }
}

export class Knight extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        const knightMoves = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: -1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: -2 },
            { row: 1, col: 2 },
            { row: 2, col: -1 },
            { row: 2, col: 1 }
        ];

        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];

                knightMoves.forEach((move) => {
                    if (
                        field.userData.row === this.row + move.row &&
                        field.userData.column === this.column + move.col
                    ) {
                        field.material.emissive.set(0xff0000);
                    }
                });
            }
        }

        return "Knight moves in an L shape.";
    }
}



export class Rook extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        for (let i = 0; i < board.children.length; i++) {

            if (board.children[i].type === "Field") {
                const field = board.children[i];

                if (field.userData.row === this.row || field.userData.column === this.column)
                {
                    board.children[i].material.emissive.set(0xff0000);
                }
            }
        }

        return "Rook horizontally, or vertically any number of squares.";
    }
}

export class Bishop extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];

                if (Math.abs(field.userData.row - this.row) === Math.abs(field.userData.column - this.column)) {
                    field.material.emissive.set(0xff0000);
                }
            }
        }

        return "Bishop can move diagonally any number of squares.";
    }
}


export class Pawn extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules(board) {
        const direction = this.color === "white" ? 1 : -1;

        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];

                if (field.userData.row === this.row + direction && field.userData.column === this.column) {
                    field.material.emissive.set(0xff0000);
                }

                if (
                    (this.color === "white" && this.row === 1) ||
                    (this.color === "black" && this.row === 6)
                ) {
                    if (field.userData.row === this.row + 2 * direction && field.userData.column === this.column) {
                        field.material.emissive.set(0xff0000);
                    }
                }
            }
        }

        return "Pawn can move forward one square, optionally two if in its starting position, and capture diagonally.";
    }
}



export class Field{
    constructor(row, column) {
            this.type = "ground";
            this.row = row;
            this.column = column;
            this.legal = false;
        }


}