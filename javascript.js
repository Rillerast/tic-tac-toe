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

gameBoard.addMark(0);
gameBoard.addMark(3);
gameBoard.addMark(1);
gameBoard.addMark(4);
gameBoard.addMark(2);

console.log(gameBoard.getBoardState())
console.log(gameBoard.checkWinner())