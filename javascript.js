const player1 = player(prompt("Insert player 1 name"), "X");
const player2 = player(prompt("Insert player 2 name"), "O");

const gameBoard = ((mark1, mark2) => {

    const boardState = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    let playerTurn = Math.random() < 0.5 ? mark1 : mark2;

    const addMark = (position) => {
        // Adding the mark and changing the turn in the same method
        boardState[position] = playerTurn;
        playerTurn = playerTurn === mark1 ? mark2 : mark1;
        document.querySelector(".info").innerText = `Mark ${gameBoard.getPlayerTurn()}: ${player1.getNameByMark(gameBoard.getPlayerTurn())}${player2.getNameByMark(gameBoard.getPlayerTurn())}`
        return boardState[position];
    }

    const getBoardState = () => {
        return boardState;
    }

    const resetBoardState = () => {
        for (let i = 0; i < 9; i++) {
            boardState[i] = "";
        }
    }

    const getPlayerTurn = () => {
        return playerTurn;
    }

    const resetPlayerTurn = () => {
        playerTurn = Math.random() < 0.5 ? mark1 : mark2;
    }

    const checkWinner = () => {

        let candidateWinner = boardState[0];

        /* Cases X X X 
                 X X ?
                 X ? X 
        */

        if (candidateWinner) {
            if (candidateWinner === boardState[1] && candidateWinner === boardState[2]) return candidateWinner;
            if (candidateWinner === boardState[3] && candidateWinner === boardState[6]) return candidateWinner;
            if (candidateWinner === boardState[4] && candidateWinner === boardState[8]) return candidateWinner;
        }

        candidateWinner = boardState[1];

        /* Cases ? X ? 
                 ? X ?
                 ? X ? 
        */

        if (candidateWinner) {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[7]) return candidateWinner;
        }

        candidateWinner = boardState[2];

        /* Cases ? ? X 
                 ? X X
                 X ? X 
        */

        if (candidateWinner) {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[6]) return candidateWinner;
            if (candidateWinner === boardState[5] && candidateWinner === boardState[8]) return candidateWinner;
        }
        
        candidateWinner = boardState[3];
        
        /* Cases ? ? ? 
                 X X X
                 ? ? ? 
        */

        if (candidateWinner) {
            if (candidateWinner === boardState[4] && candidateWinner === boardState[5]) return candidateWinner;
        }

        /* Cases ? ? ? 
                 ? ? ?
                 X X X 
        */

        candidateWinner = boardState[6];

        if (candidateWinner) {
            if (candidateWinner === boardState[7] && candidateWinner === boardState[8]) return candidateWinner;
        }

        return "";

    }

    return {addMark, getBoardState, resetBoardState, getPlayerTurn, resetPlayerTurn, checkWinner};

})(player1.getMark(), player2.getMark());

function player(name, mark) {
    
    const getName = () => {
        return name;
    }

    const getMark = () => {
        return mark;
    }

    const getNameByMark = (markToEvaluate) => {
        if (mark === markToEvaluate) {
            return name;
        }
        
        return "";
    }

    return {getName, getMark, getNameByMark};
}

const boardRenderer = (() => {

    const renderNewTiles = () => {
        let board = document.querySelector(".board");

        if (board.firstElementChild !== null) {
            board.remove();
            board = document.createElement("div");
            board.classList.add("board");

            document.querySelector("body").appendChild(board);

            document.querySelector(".reset").remove()
            const resetButton = document.createElement("button");
            resetButton.classList.add("reset");
            resetButton.innerText = "Reset game";
            document.querySelector("body").appendChild(resetButton);

            resetButton.addEventListener("click", (_event) => {
                gameBoard.resetBoardState();
                gameBoard.resetPlayerTurn();
                boardRenderer.renderNewTiles();
                document.querySelector(".info").innerText = `Mark ${gameBoard.getPlayerTurn()}: ${player1.getNameByMark(gameBoard.getPlayerTurn())}${player2.getNameByMark(gameBoard.getPlayerTurn())}`;
            });
        }

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.innerText = gameBoard.getBoardState()[i];
            board.appendChild(tile);

            tile.addEventListener("click", (_event) => {
                if (!tile.innerText && !gameBoard.checkWinner()) {
                    tile.innerText = gameBoard.addMark(i);
                } 
                if (gameBoard.checkWinner()) {
                    document.querySelector(".info").innerText = `Mark ${gameBoard.checkWinner()}: ${player1.getNameByMark(gameBoard.checkWinner())}${player2.getNameByMark(gameBoard.checkWinner())} won the game!`
                }
            });
        }
    }

    return {renderNewTiles};

})();

boardRenderer.renderNewTiles();

document.querySelector(".reset").addEventListener("click", (_event) => {
    gameBoard.resetBoardState();
    gameBoard.resetPlayerTurn();
    boardRenderer.renderNewTiles();
    document.querySelector(".info").innerText = `Mark ${gameBoard.getPlayerTurn()}: ${player1.getNameByMark(gameBoard.getPlayerTurn())}${player2.getNameByMark(gameBoard.getPlayerTurn())}`;
});

document.querySelector(".info").innerText = `Mark ${gameBoard.getPlayerTurn()}: ${player1.getNameByMark(gameBoard.getPlayerTurn())}${player2.getNameByMark(gameBoard.getPlayerTurn())}`;