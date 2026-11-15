const player1 = player("Hazerin", "X");
const player2 = player("Lisajin", "O");

const gameBoard = ((mark1, mark2) => {

    const boardState = [
        " ", " ", " ",
        " ", " ", " ",
        " ", " ", " "
    ];

    let playerTurn = Math.random() < 0.5 ? mark1 : mark2;

    const addMark = (position) => {
        // Adding the mark and changing the turn in the same method
        boardState[position] = playerTurn;
        playerTurn = playerTurn === mark1 ? mark2 : mark1;
        return playerTurn;
    }

    const getBoardState = () => {
        return boardState;
    }

    const getPlayerTurn = () => {
        return playerTurn;
    }

    const checkWinner = () => {

        let candidateWinner = boardState[0];

        /* Cases X X X 
                 X X ?
                 X ? X 
        */

        if (candidateWinner !== " ") {
            if (candidateWinner === boardState[1] && candidateWinner === boardState[2]) return candidateWinner;
            if (candidateWinner === boardState[3] && candidateWinner === boardState[6]) return candidateWinner;
            if (candidateWinner === boardState[4] && candidateWinner === boardState[8]) return candidateWinner;
        }

        candidateWinner = boardState[1];

        /* Cases ? X ? 
                 ? X ?
                 ? X ? 
        */

        if (candidateWinner !== " ") {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[7]) return candidateWinner;
        }

        candidateWinner = boardState[2];

        /* Cases ? ? X 
                 ? X X
                 X ? X 
        */

        if (candidateWinner !== " ") {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[6]) return candidateWinner;
            if (candidateWinner === boardState[5] && candidateWinner === boardState[8]) return candidateWinner;
        }
        
        candidateWinner = boardState[3];
        
        /* Cases ? ? ? 
                 X X X
                 ? ? ? 
        */

        if (candidateWinner !== " ") {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[5]) return candidateWinner;
        }

        /* Cases ? ? ? 
                 ? ? ?
                 X X X 
        */

        candidateWinner = boardState[6];

        if (candidateWinner !== " ") {
            if (candidateWinner === boardState[7] && candidateWinner === boardState[8]) return candidateWinner;
        }

        return " ";

    }

    return {addMark, getBoardState, getPlayerTurn, checkWinner};

})(player1.getMark(), player2.getMark());

function player(name, mark) {
    
    const getName = () => {
        return name;
    }

    const getMark = () => {
        return mark;
    }

    return {getName, getMark};
}

const boardRenderer = (() => {

    const renderNewTiles = () => {
        let board = document.querySelector(".board");

        if (board.firstElementChild !== null) {
            board.remove();
            board = document.createElement("div");
            board.classList.add("board");

            document.querySelector("body").appendChild(board);
        }

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.innerText = gameBoard.getBoardState()[i];
            board.appendChild(tile);

            tile.addEventListener("click", (_event) => {
                if (tile.innerText === "") {
                    console.log("aa")
                    tile.innerText = gameBoard.addMark(i);
                }
            });
        }
    }

    return {renderNewTiles};

})();

boardRenderer.renderNewTiles();