
import { player } from "../config/config";


const checkInvertArr = (arr) => {
    let invertMatrix = [];

    for (let [rowInd, row] of Object.entries(arr)) {
        for (let [colInd, value] of Object.entries(row)) {
            if (!invertMatrix[colInd]) {
                invertMatrix[colInd] = [value];
            }
            else {
                invertMatrix[colInd][rowInd] = value;
            }
        }
    }
    return invertMatrix;
}

const checkDiagonal = (arr) => {
    let diagonal = [[]];

    for (const [rowInd, row] of Object.entries(arr)) {
        diagonal[0].push(row[rowInd])
    }
    return diagonal;
};

const checkInvertDiagonal = (arr) => {
    let invertDiagonal = [[]];

    for (const [rowInd, row] of Object.entries(checkInvertArr(arr).reverse())) {
        invertDiagonal[0].push(row[rowInd])
    }
    return invertDiagonal;
};

export const checkWinner = (arr, currentPlayer, name1, name2, size) => {

    const checkLineWinner = (check) => {
        let result = false;

        check.forEach(v => {
            let count = 0;

            v.forEach(v => {
                if (v === currentPlayer) count++;

            })
            if (count === size && currentPlayer === player.cross.figure) {
                result = name1;
            }
            if (count === size && currentPlayer === player.zero.figure) {
                result = name2;
            }
        });
        return result;
    };

    return (
        checkLineWinner(arr) ||
        checkLineWinner(checkInvertArr(arr), currentPlayer, name1, name2) ||
        checkLineWinner(checkDiagonal(arr), currentPlayer, name1, name2) ||
        checkLineWinner(checkInvertDiagonal(arr), currentPlayer, name1, name2)
    );
};

