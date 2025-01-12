export function addCapturedPiece(pieceColor, pieceType) {
    const span = document.createElement('span');
    let imageUrl = '';

    if (pieceType === 'pawn') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_pawn.png' :'./Points_images/Black_Pawn.png' ;
    }
    if (pieceType === 'knight') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Knight.png' :'./Points_images/Black_Knight.png' ;
    }
    if (pieceType === 'rook') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Rook.png' :'./Points_images/Black_Rook.png' ;
    }
    if (pieceType === 'queen') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Queen.png' :'./Points_images/Black_Queen.png' ;
    }
    if (pieceType === 'bishop') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Bishop.png' :'./Points_images/Black_Bishop.png' ;
    }

    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `${pieceColor} ${pieceType}`;
        span.appendChild(img);
    }
    var pointsPiecesContainer;
    if(pieceColor === "white")
    {
         pointsPiecesContainer = document.querySelector(`#Black_Player`);
    }
    else
    {
         pointsPiecesContainer = document.querySelector(`#White_Player`);
    }
    console.log(pointsPiecesContainer)

    pointsPiecesContainer.appendChild(span);
}
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'pawn');
addCapturedPiece('white', 'knight');
addCapturedPiece('white', 'knight');
addCapturedPiece('white', 'rook');
addCapturedPiece('white', 'rook');
addCapturedPiece('white', 'bishop');
addCapturedPiece('white', 'bishop');
addCapturedPiece('white', 'queen');

addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'pawn');
addCapturedPiece('black', 'knight');
addCapturedPiece('black', 'knight');
addCapturedPiece('black', 'rook');
addCapturedPiece('black', 'rook');
addCapturedPiece('black', 'bishop');
addCapturedPiece('black', 'bishop');
addCapturedPiece('black', 'queen');