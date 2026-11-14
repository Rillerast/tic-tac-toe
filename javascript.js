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

        if (candidateWinner === boardState[1] && candidateWinner === boardState[2]) return candidateWinner;

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