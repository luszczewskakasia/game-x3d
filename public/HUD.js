export function addCapturedPiece(pieceColor, pieceType, chess_scene) {
    const span = document.createElement('span');
    let imageUrl = '';
    if (pieceType === 'pawn') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_pawn.png' :'./Points_images/Black_Pawn.png' ;
        if(pieceColor === 'white'){chess_scene.pointsBlack += 1;}else{chess_scene.pointsWhite+= 1};
    }
    if (pieceType === 'knight') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Knight.png' :'./Points_images/Black_Knight.png' ;
        if(pieceColor === 'white'){chess_scene.pointsBlack += 3;}else{chess_scene.pointsWhite+= 3};
    }
    if (pieceType === 'rook') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Rook.png' :'./Points_images/Black_Rook.png' ;
        if(pieceColor === 'white'){chess_scene.pointsBlack += 5;}else{chess_scene.pointsWhite+= 5};
    }
    if (pieceType === 'queen') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Queen.png' :'./Points_images/Black_Queen.png' ;
        if(pieceColor === 'white'){chess_scene.pointsBlack += 9;}else{chess_scene.pointsWhite+= 9};
    }
    if (pieceType === 'bishop') {
        imageUrl = pieceColor === 'white' ? './Points_images/White_Bishop.png' :'./Points_images/Black_Bishop.png' ;
        if(pieceColor === 'white'){chess_scene.pointsBlack += 3;}else{chess_scene.pointsWhite+= 3};
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

    const WhiteplayerPointsElement = document.getElementById(`White_Player_points`);
    const BlackplayerPointsElement = document.getElementById(`Black_Player_points`);
    const  difference = chess_scene.pointsBlack - chess_scene.pointsWhite

    console.log("Difference:", difference);

    if(difference === 0)
    {
        WhiteplayerPointsElement.innerText = "";
        BlackplayerPointsElement.innerText = "";
    }
    else
    {
        if(difference > 0)
        {
            WhiteplayerPointsElement.innerText = "";
            BlackplayerPointsElement.innerText = `+${Math.abs(difference)}`;
        }
        else
        {
            WhiteplayerPointsElement.innerText = `+${Math.abs(difference)}`;  ;
            BlackplayerPointsElement.innerText = "";
        }

    }

    // pointsPiecesContainer.appendChild(span);
    pointsPiecesContainer.prepend(span);




}


export const ClockAnimation = (timeRemainingBlack, timeRemainingWhite,chess_scene) => {
    // console.log(chess_scene.pointsBlack, chess_scene.pointsWhite)

    if (!chess_scene.is_Animating) {
    if (!chess_scene.turn) {
        timeRemainingBlack--;

        if (timeRemainingBlack <= 0) {
            document.getElementById('Black_clock').innerText = "00:00";
            alert("Black clock time's up!");
            return;
        }

        const minutesBlack = Math.floor(timeRemainingBlack / 60);
        const secondsBlack = timeRemainingBlack % 60;
        document.getElementById('Black_clock').innerText =
            `${String(minutesBlack).padStart(2, '0')}:${String(secondsBlack).padStart(2, '0')}`;
    } else {
        timeRemainingWhite--;

        if (timeRemainingWhite <= 0) {
            document.getElementById('White_clock').innerText = "00:00";
            alert("White clock time's up!");
            return;
        }

        const minutesWhite = Math.floor(timeRemainingWhite / 60);
        const secondsWhite = timeRemainingWhite % 60;
        document.getElementById('White_clock').innerText =
            `${String(minutesWhite).padStart(2, '0')}:${String(secondsWhite).padStart(2, '0')}`;
    }
    // console.log(chess_scene.draggable_obj)
}

setTimeout(() => ClockAnimation(timeRemainingBlack, timeRemainingWhite, chess_scene),1000);

};


export function endGame(winner) {
    const endGameBar = document.getElementById('endGameBar');
    const endGameMessage = document.getElementById('endGameMessage');
    if (winner === 'black') {
        endGameMessage.innerText = 'Czarny wygrywa!';
    } else if (winner === 'white') {
        endGameMessage.innerText = 'Biały wygrywa!';
    } else {
        endGameMessage.innerText = 'Remis!';
    }
    endGameBar.style.top = '0';
}

// setTimeout(() => {
//     endGame('black');
// }, 2000);