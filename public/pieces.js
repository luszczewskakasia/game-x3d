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
    constructor(type, color, row, column, mesh) {
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
        this.mesh = mesh
        // this.model3D = this.createPiece(type,color,row,column,translation_x,translation_z);

    }

    async move_rules(board,fieldArray) {
        throw new Error("Abstract method 'move_rules' must be implemented in derived class.");
    }

    static async createPiece(type, color, row, column, translation_x, translation_z, board, fieldArray) {

        // console.log(fieldArray)


        let Model3D;
        let tex_layers;
        let textures;

        switch (type.toLowerCase()) {

            case "queen":
                Model3D = queenModelPath;
                tex_layers = 3;
                textures = [tex.createQueenMaterialGold(),color === "black" ? tex.createQueenMaterialObsidian() : tex.createQueenMaterialMarble(),tex.createQueenMaterialSatin()];
                break;

            case "king":
                Model3D = kingModelPath;
                tex_layers = 3;
                textures = [color === "black" ? tex.createKingMaterialObsidian() : tex.createKingMaterialMarble(),tex.createKingMaterialSatin(),tex.createKingMaterialGold()];
                break;
            case "bishop":
                Model3D = bishopModelPath;
                tex_layers = 1;
                textures = [color === "black" ? tex.createBishopMaterialBlack() : tex.createBishopMaterialWhite()];
                break;
            case "knight":
                Model3D = knightModelPath;
                tex_layers = 3;
                textures = [color === "black" ? tex.createKnightMaterialObsidian() : tex.createKnightMaterialMarble(),tex.createKingMaterialGold(),color === "white" ? tex.createKnightMaterialObsidianM() : tex.createKnightMaterialMarbleO()];
                break;
            case "pawn":
                Model3D = pawnModelPath;
                tex_layers = 1;
                textures = [color === "black" ? tex.createPawnMaterialBlack() : tex.createPawnMaterialWhite()];
                break;
            case "rook":
                Model3D = rookModelPath;
                tex_layers = 1;
                textures = [color === "black" ? tex.createRookMaterialBlack() : tex.createRookMaterialWhite()];
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
                    piece.userData = new Queen("queen",color, row, column, piece ,fieldArray);
                    board.add(piece);
                    return piece.userData
                case "king":
                    piece.userData =new King("king",color, row, column,piece,fieldArray);
                    board.add(piece);
                    return piece.userData
                case "bishop":
                    piece.userData =new Bishop("bishop",color, row, column,piece,fieldArray);
                    board.add(piece);
                    return piece.userData
                case "knight":
                    piece.userData = new Knight("knight",color, row, column,piece,fieldArray);
                    board.add(piece);
                    return piece.userData
                case "pawn":
                    piece.userData = new Pawn("pawn",color, row, column,piece,fieldArray);
                    board.add(piece);
                    return piece.userData
                case "rook":
                    piece.userData = new Rook("rook",color, row, column,piece,fieldArray);
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
    constructor(type, color, row, column, mesh,fieldArray) {
        super(type, color, row, column, mesh,fieldArray);
    }

    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const currentField = board.children[this.row * 8 + this.column];
        currentField.userData.legal = true;
        if (shouldIPaint) currentField.material.emissive.set(0xff0000);

        const directions = [
            { dr: -1, dc: 0 },   // up
            { dr: 1, dc: 0 },    // down
            { dr: 0, dc: -1 },   // left
            { dr: 0, dc: 1 },    // right
            { dr: -1, dc: -1 },  // up-left
            { dr: -1, dc: 1 },   // up-right
            { dr: 1, dc: -1 },   // down-left
            { dr: 1, dc: 1 }     // down-right
        ];

        for (let dir of directions) {
            let r = this.row + dir.dr;
            let c = this.column + dir.dc;

            while (r >= 0 && r < fieldArray.length && c >= 0 && c < fieldArray[r].length) {
                let field = board.children[r * 8 + c];

                const ogTargetState = field.piece_on
                const ogTargetPiece = field.piece
                const ogSourcePiece = currentField.piece

                field.piece_on = true
                field.piece = ogSourcePiece
                currentField.piece_on = false
                currentField.piece = null

                let isKingChecked = false
                if (shouldIPaint) isKingChecked = await isKingInCheck(this.color, chessScene)

                console.log("Czy jest szach: ", isKingChecked)

                field.piece_on = ogTargetState
                field.piece = ogTargetPiece
                currentField.piece_on = true
                currentField.piece = ogSourcePiece

                //if (!isKingChecked) {
                    if (field.userData.piece_on) {
                        if (field.userData.piece.color == this.color) {
                            //console.log(field.userData.piece.color)
                            field.userData.legal = false;
                            break;
                        } else {
                            if (shouldIPaint) field.material.emissive.set(0xff0000);
                            field.userData.legal = true;
                            legalMoves.push({row: field.row, column: field.column});
                            break;
                        }
                    } else {
                        if (shouldIPaint) field.material.emissive.set(0xff0000);
                        field.userData.legal = true;
                        legalMoves.push({row: field.row, column: field.column});
                    }
                //}

                r += dir.dr;
                c += dir.dc;

            }
        }

        return legalMoves;
    }
}



export class King extends Piece {
    constructor(type, color, row, column, mesh, fieldArray) {
        super(type, color, row, column, mesh, fieldArray);
    }


    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const directions = [
            { dr: 0, dc: 0 },   // stay
            { dr: -1, dc: 0 },   // up
            { dr: 1, dc: 0 },    // down
            { dr: 0, dc: -1 },   // left
            { dr: 0, dc: 1 },    // right
            { dr: -1, dc: -1 },  // up-left
            { dr: -1, dc: 1 },   // up-right
            { dr: 1, dc: -1 },   // down-left
            { dr: 1, dc: 1 }     // down-right
        ];

        const opponentColor = this.color === "white" ? "black" : "white";
        const opponentMoves = new Set();

        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                let piece = fieldArray[row][column].piece;

                if (piece instanceof Promise) {
                    piece = await piece;
                }

                if (piece && piece.color === opponentColor && piece.type !== "king") {
                    const moves = await piece.move_rules(chessScene, false);
                    moves.forEach(move => {
                        const key = `${move.row},${move.column}`; // Tworzenie unikalnego klucza
                        opponentMoves.add(key);
                    });
                }
            }
        }

        //console.log("Ruchy przeciwnika: ", opponentMoves);

        for (let i = 0; i < board.children.length; i++) {
            if (board.children[i].type === "Field") {
                const field = board.children[i];
                const targetRow = field.userData.row;
                const targetColumn = field.userData.column;
                const fieldKey = {row: targetRow, column: targetColumn};

                //console.log("numer ", fieldKey, " ?: ", opponentMoves.has(fieldKey));

                // field.userData.legal = false;
                // field.material.emissive.set(0x000000);

                if (targetRow === this.row && targetColumn === this.column) {
                    field.userData.legal = true;
                    if (shouldIPaint) field.material.emissive.set(0xff0000);
                    legalMoves.push({ row: field.row, column: field.column });
                    continue;
                }

                const rowDiff = Math.abs(targetRow - this.row);
                const colDiff = Math.abs(targetColumn - this.column);

                if (rowDiff <= 1 && colDiff <= 1) {
                    console.log("Aktualny fieldKey: ", fieldKey, "Czy zaszachowane?: ", opponentMoves.has(fieldKey))
                    console.log("Wszystkie ruchy ", opponentMoves)
                    if (!opponentMoves.has(fieldKey)) {
                        if (field.userData.piece_on) {
                            if (field.userData.piece.color !== this.color) {
                                field.userData.legal = true;
                                if (shouldIPaint) field.material.emissive.set(0xff0000);
                                legalMoves.push({ row: field.row, column: field.column });
                            }
                        } else {
                            field.userData.legal = true;
                            if (shouldIPaint) field.material.emissive.set(0xff0000);
                            legalMoves.push({ row: field.row, column: field.column });
                        }
                    }else console.log("Pole ", fieldKey, " jest zaszachowane")
                }
            }
        }

        return legalMoves;
    }
}

export class Knight extends Piece {
    constructor(type, color, row, column, mesh,fieldArray) {
        super(type, color, row, column, mesh,fieldArray);
    }


    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const knightMoves = [
            { row: 0, col: 0},
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
                const targetRow = field.userData.row;
                const targetColumn = field.userData.column;

                knightMoves.forEach((move) => {
                    if (
                        targetRow === this.row + move.row &&
                        targetColumn === this.column + move.col
                    ) {
                        field.userData.legal = true;
                        legalMoves.push({ row: field.row, column: field.column });

                        const targetField = fieldArray[targetRow][targetColumn];
                        if (targetField.piece_on) {
                            const targetPiece = targetField.piece;

                            if (targetPiece.color === this.color && targetRow != this.row && targetColumn != this.column) {
                                field.userData.legal = false;
                            }
                        }

                        if (field.userData.legal) {
                            if (shouldIPaint) field.material.emissive.set(0xff0000);
                        }
                    }
                });
            }
        }

        return legalMoves;
    }
}



export class Rook extends Piece {
    constructor(type, color, row, column, mesh,fieldArray) {
        super(type, color, row, column, mesh,fieldArray);
    }


    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const currentField = board.children[this.row * 8 + this.column];
        currentField.userData.legal = true;
        if (shouldIPaint) currentField.material.emissive.set(0xff0000);

        const directions = [
            { dr: -1, dc: 0 },  // up
            { dr: 1, dc: 0 },   // down
            { dr: 0, dc: -1 },  // left
            { dr: 0, dc: 1 }    // right
        ];

        for (let dir of directions) {
            let r = this.row + dir.dr;
            let c = this.column + dir.dc;

            while (r >= 0 && r < fieldArray.length && c >= 0 && c < fieldArray[r].length) {
                const field = board.children[r*8+c];
                if (field.userData.piece_on) {
                    if (field.userData.piece.color === this.color) {
                        field.userData.legal = false;
                        break;
                    } else {
                        if (shouldIPaint) field.material.emissive.set(0xff0000);
                        field.userData.legal = true;
                        legalMoves.push({ row: field.row, column: field.column });
                        break;
                    }
                } else {
                    if (shouldIPaint) field.material.emissive.set(0xff0000);
                    field.userData.legal = true;
                    legalMoves.push({ row: field.row, column: field.column });
                }
                r += dir.dr;
                c += dir.dc;
            }
        }

        return legalMoves;
    }
}

export class Bishop extends Piece {
    constructor(type, color, row, column, mesh,fieldArray) {
        super(type, color, row, column, mesh,fieldArray);
    }


    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const currentField = board.children[this.row * 8 + this.column];
        currentField.userData.legal = true;
        if (shouldIPaint) currentField.material.emissive.set(0xff0000);


        const directions = [
            { dr: -1, dc: -1 },  // up-left
            { dr: -1, dc: 1 },   // up-right
            { dr: 1, dc: -1 },   // down-left
            { dr: 1, dc: 1 }     // down-right
        ];

        for (let dir of directions) {
            let r = this.row + dir.dr;
            let c = this.column + dir.dc;

            while (r >= 0 && r < fieldArray.length && c >= 0 && c < fieldArray[r].length) {
                const field = board.children[r * 8 + c];
                if (field.userData.piece_on) {
                    if (field.userData.piece.color === this.color) {
                        field.userData.legal = false;
                        break;
                    } else {
                        if (shouldIPaint) field.material.emissive.set(0xff0000);
                        field.userData.legal = true;
                        legalMoves.push({ row: field.row, column: field.column });
                        break;
                    }
                } else {
                    if (shouldIPaint) field.material.emissive.set(0xff0000);
                    field.userData.legal = true;
                    legalMoves.push({ row: field.row, column: field.column });
                }
                r += dir.dr;
                c += dir.dc;
            }
        }

        return legalMoves;
    }
}


export class Pawn extends Piece {
    constructor(type, color, row, column, mesh,fieldArray) {
        super(type, color, row, column, mesh,fieldArray);
    }


    async move_rules(chessScene, shouldIPaint) {
        const board = chessScene.board
        const fieldArray = chessScene.fieldArray
        const legalMoves = [];
        const direction = this.color === "white" ? 1 : -1;
        const startRow = this.color === "white" ? 1 : 6;

        let fieldAhead = board.children[(this.row + direction) * 8 + this.column];
        if (!fieldAhead.userData.piece_on) {
            if (shouldIPaint) fieldAhead.material.emissive.set(0xff0000);
            fieldAhead.userData.legal = true;
            legalMoves.push({ row: fieldAhead.userData.row, column: fieldAhead.userData.column });

            if (this.row === startRow) {
                let secondFieldAhead = board.children[(this.row + 2 * direction) * 8 + this.column];
                if (!secondFieldAhead.userData.piece_on) {
                    if (shouldIPaint) secondFieldAhead.material.emissive.set(0xff0000);
                    secondFieldAhead.userData.legal = true;
                    legalMoves.push({row: secondFieldAhead.userData.row, column: secondFieldAhead.userData.column });
                }
            }
        }

        const diagonalDirections = [-1, 1];
        for (let dc of diagonalDirections) {
            let fieldDiagonal = board.children[(this.row + direction) * 8 + (this.column + dc)];
            if (fieldDiagonal && fieldDiagonal.userData.piece_on && fieldDiagonal.userData.piece.color !== this.color) {
                if (shouldIPaint) fieldDiagonal.material.emissive.set(0xff0000);
                fieldDiagonal.userData.legal = true;
                legalMoves.push({ row: fieldDiagonal.userData.row, column: fieldDiagonal.userData.column });
            }
        }

        const currentField = board.children[this.row * 8 + this.column];
        if (shouldIPaint) currentField.material.emissive.set(0xff0000);
        currentField.userData.legal = true;
        legalMoves.push({ row: currentField.row, column: currentField.column });

        return legalMoves;
    }
}

async function isKingInCheck(color, chessScene) {
    const kingPosition = color === 'white' ? chessScene.whiteKing : chessScene.blackKing;
    //console.log("Pozycja króla", kingPosition);
    const { fieldArray } = chessScene;
    //console.log("Arrayka", fieldArray);

    for (let i = 0; i < fieldArray.length; i++) {
        for (let j = 0; j < fieldArray[i].length; j++) {
            const field = fieldArray[i][j];
            let piece = field.piece;
            if (piece instanceof Promise) {
                piece = await piece;
            }

            if (piece === null || piece.type === "king") continue;

            if (piece.color !== color) {
                 console.log("checking colors")
                 const moves = await piece.move_rules(chessScene, false);

                if (moves.some(move => move.row === kingPosition.row && move.column === kingPosition.column)) {
                    return true;
                }
            }
        }
    }
    return false;
}

export class Field{
    constructor(row, column, material, mesh) {
        this.type = "ground";
        this.row = row;
        this.column = column;
        this.legal = false;
        this.material = material
        this.piece_on = false;
        this.piece = null;
        this.mesh = mesh;
    }


}