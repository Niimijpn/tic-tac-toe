"use client";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";

function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  // null ダメだった
  // const [value, setValue] = useState("");

  // function handleClick() {
  // console.log("cliked!!");
  // setValue("X");
  // }

  return (
    // <button className="square" onClick={handleClick}>
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsnext, setXIsnext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i: number) {
    //
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = [...squares];
    if (xIsnext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsnext(!xIsnext);
    setSquares(nextSquares);
  }

  function calculateWinner(squares: string[]) {
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

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner:" + winner;
  } else {
    status = "Next player: " + (xIsnext ? "X" : "O");
  }

  return (
    <>
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
    </>
  );
}
