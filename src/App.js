import React from "react"
import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [Nstep, setNstep] = useState(0);
  const [Rem, setRem] = useState(false);
  const [Pos, setPos] = useState(-1);
  function handleClick(i) {
    const nextSquares = squares.slice();
    const WinCheck = squares.slice();
    if (calculateWinner(squares)) {return;}
    if (Nstep < 6) {
      if (squares[i]) {
        return;
      }
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setNstep(Nstep+1) 
    }
    else {
    if (!Rem){
      if(!squares[i]) {return;}
      if (xIsNext && squares[i]=='O') {return;}
      if (!xIsNext && squares[i]=='X') {return;}
      nextSquares[i] = null;
      setSquares(nextSquares);
      setRem(true);
      setPos(i);
    }
    else {
      if (Pos == i) {
        nextSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(nextSquares);
        setRem(false);
        return;
      }
      if (!Isadj(Pos, i)) {return;}
      if (!(squares[i]==null)) {return;}
      if (squares[4] == (xIsNext ? 'X' : 'O')) {
        WinCheck[i] = xIsNext ? 'X' : 'O';
        if (!calculateWinner(WinCheck)) {
          if (Pos !=4) {return;}
        }
      }
      nextSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      setNstep(Nstep+1);
      setRem(false);
    }
  }
}

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Isadj(i, j) {
  if (i === 0) return j === 1 || j === 3 || j === 4;
  else if (i === 1) return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
  else if (i === 2) return j === 1 || j === 4 || j === 5;
  else if (i === 3) return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
  else if (i === 4) return true;
  else if (i === 5) return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
  else if (i === 6) return j === 3 || j === 4 || j === 7;
  else if (i === 7) return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
  else if (i === 8) return j === 4 || j === 5 || j === 7;
}