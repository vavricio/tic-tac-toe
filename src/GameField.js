import React, {useState} from "react";
import {Cell} from "./Cell";
import './GameField.css';

export function GameField() {
    const arrLength = 3;
    const [cells, setCells] = useState(Array(arrLength).fill(Array(arrLength).fill('')));
    const [turn, setTurn] = useState('X');
    const [winner, setWinner] = useState('');

    function changeTurn() {
        setTurn(turn === 'X' ? 'O' : 'X');
    }

    function checkWinner(newCells, i, j) {
        if (newCells[i].every(cell => cell === turn)) {
            return true;
        }
        if (newCells.map(row => row[j]).every(cell => cell === turn)) {
            return true;
        }
        const mainDiagonal = [];
        for (let k = 0; k < arrLength; k++){
            mainDiagonal.push(newCells[k][k])
        }
        if (mainDiagonal.every(cell => cell === turn)) {
            return true;
        }
        const auxDiagonal = [];
        for (let k = arrLength - 1, l = 0; k > 0 && l < arrLength; k--, l++){
            auxDiagonal.push(newCells[k][l]);
        }
        if (auxDiagonal.every(cell => cell === turn)) {
            return true;
        }
        return false;
    }

    function updateState(i, j) {
        if (winner !== '') return;
        const newState = cells.map(arr => arr.slice());
        newState[i][j] = turn;
        setCells(newState);
        if (checkWinner(newState, i, j)) {
            setWinner(turn);
            return;
        }
        changeTurn();
    }

    function resetGame() {
        setCells(Array(arrLength).fill(Array(arrLength).fill('')));
        setWinner('');
        setTurn('X');
    }


    const cellItems = cells.map((row, i) => {
        return row.map((cellValue, j) => <Cell value={cellValue} onClick={() => updateState(i, j)}></Cell>)
    });

    return (
        <div>
            <h2>Current turn: {turn}</h2>
            <div className="GameField">{cellItems}</div>
            <p>{winner !== '' ? `Winner is ${winner}` : ''}</p>
            <button onClick={() => resetGame()}>Reset Game</button>
        </div>
    )
}