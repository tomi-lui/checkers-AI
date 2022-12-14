import React, { useRef } from "react";
import "./Board.css";
import Tile from "../Tile/Tile"

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];


interface Piece {
  color: number;
  x: number;
  y: number;
}

const pieces: Piece[] = []

// initialize blue pieces
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1) {
    pieces.push({ color: 1, x: i, y: 7 });
  }
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0) {
    pieces.push({ color: 1, x: i, y: 6 });
  }
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1) {
    pieces.push({ color: 1, x: i, y: 5 });
  }
}

// initialize red pieces
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0)
    pieces.push({ color: 2, x: i, y: 0 });
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1)
    pieces.push({ color: 2, x: i, y: 1 });
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0)
    pieces.push({ color: 2, x: i, y: 2 });
}


export default function Board() {
  const boardRef = useRef<HTMLElement>(null);

  let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent) {

  const element = e.target as HTMLElement;

  if (element.classList.contains("chess-piece")) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    activePiece = element;
  }
}

function movePiece(e: React.MouseEvent) {

  const board = boardRef.current;
  if (activePiece && board) {
    const minX = board.offsetLeft;
    const minY = board.offsetTop;
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = "absolute";
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;

    activePiece.style.left = 
      x < minX
        ? (activePiece.style.left = `${minX}px`)
        : (activePiece.style.left = `${x}px`)

  }
}

function dropPiece(e: React.MouseEvent) {
  if (activePiece) {
    activePiece = null;
  }
}

  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {

      let color = 0;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          color = p.color;
        }
      })
      board.push(<Tile key={`${j},${i}`} piece={color} number={j + i + 2} />);
    }
  }
  return (
    <div 
      onMouseMove={e => movePiece(e)} 
      onMouseDown={e => grabPiece(e)} 
      onMouseUp={e => dropPiece(e)}
      id="chessboard"
      ref={boardRef as React.RefObject<HTMLDivElement>}
      >
        {board}
    </div>
  )
}
