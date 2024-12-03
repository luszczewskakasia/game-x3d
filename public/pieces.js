import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.135.0/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';
import * as tex from './textures.js';
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
        this.type = this.constructor.name.toLowerCase();
        this.row = row;
        this.column = column;
        this.color = color;
        const square_size = 1;
        const translation_x = (column - 7/ 2) * square_size;
        const translation_z = (row - 7/ 2) * square_size;
        // this.model3D = this.createPiece(type,color,row,column,translation_x,translation_z);

    }

    move_rules() {
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
                textures = [tex.queen_gold,color === "white" ? tex.queen_obsidian : tex.queen_marble,tex.queen_satin];
                break;

            case "king":
                Model3D = kingModelPath;
                tex_layers = 3;
                textures = [color === "white" ? tex.king_obsidian : tex.king_marble,tex.king_satin,tex.king_gold];
                break;
            case "bishop":
                Model3D = bishopModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.bishopMaterialBlack : tex.bishopMaterialWhite];
                break;
            case "knight":
                Model3D = knightModelPath;
                tex_layers = 3;
                textures = [color === "white" ? tex.knight_obsidian : tex.knight_marble,tex.knight_gold,color === "white" ? tex.knight_obsidian_m : tex.knight_marble_o];
                break;
            case "pawn":
                Model3D = pawnModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.pawnMaterialBlack : tex.pawnMaterialWhite];
                break;
            case "rook":
                Model3D = rookModelPath;
                tex_layers = 1;
                textures = [color === "white" ? tex.rookMaterialBlack : tex.rookMaterialWhite];
                break;

            default:
                throw new Error(`Unsupported piece type: ${type}`);
        }



        return loader.loadAsync(Model3D).then((group) => {
            const piece = group.children[0];
            piece.scale.set(0.5, 0.5, 0.5);
            piece.position.set(translation_x, 0.5, translation_z);
            piece.castShadow = true;
            piece.receiveShadow = true;
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
            piece.userData.draggable = true;
            piece.userData.name = type.toLowerCase();

            board.add(piece);
            switch(type.toLowerCase())
            {
                case "queen":
                    return new Queen(color, row, column, piece);
                case "king":
                    return new King(color, row, column, piece);
                case "bishop":
                    return new Bishop(color, row, column, piece);
                case "knight":
                    return new Knight(color, row, column, piece);
                case "pawn":
                    return new Pawn(color, row, column, piece);
                case "rook":
                    return new Rook(color, row, column, piece);
                default:
                    throw new Error(`Unsupported piece type: ${type}`);

            }
        });

    }
}

export class Queen extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "Queen can move diagonally, horizontally, or vertically any number of squares.";
    }
}



export class King extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "King can move one square in any direction.";
    }
}

export class Knight extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "Knight moves like L shape";
    }
}



export class Rook extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "Rook horizontally, or vertically any number of squares.";
    }
}

export class Bishop extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "Bishop can move diagonally any number of squares.";
    }
}


export class Pawn extends Piece {
    constructor(type, color, row, column) {
        super(type, color, row, column);
    }

    move_rules() {
        return "Pawn can move only forward";
    }
}



