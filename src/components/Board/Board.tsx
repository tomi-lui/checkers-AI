import React, { useEffect, useRef, useState } from "react";
import Referee, { Position } from "../../referee/Referee"
import "./Board.css";
import Tile from "../Tile/Tile"
import {
  GRID_SIZE, horizontalAxis, NUM_OF_PIECES_PER_COLOR, Piece, PieceType, TeamType, verticalAxis
} from "../../Constants"
import { useGameStats, useGameStatsUpdate } from "../../Contexts/GameStatsContext";
import { Checkers_AI } from "../../minimax/algorithm";


const initialBoardState: Piece[] = [];
// initialize blue pieces
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1) {
    initialBoardState.push({ color: 1, x: i, y: 7, pieceType: PieceType.PAWN });
  }
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0) {
    initialBoardState.push({ color: 1, x: i, y: 6, pieceType: PieceType.PAWN });
  }
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1) {
    initialBoardState.push({ color: 1, x: i, y: 5, pieceType: PieceType.PAWN });
  }
}

// initialize red pieces
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0)
    initialBoardState.push({ color: 2, x: i, y: 0, pieceType: PieceType.PAWN });
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 1)
    initialBoardState.push({ color: 2, x: i, y: 1, pieceType: PieceType.PAWN });
}
for (let i = 0; i < 8; i++) {
  if (i % 2 === 0)
    initialBoardState.push({ color: 2, x: i, y: 2, pieceType: PieceType.PAWN });
}

export default function Board() {

  const boardRef = useRef<HTMLElement>(null);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [originalPosition, setOriginalPosition] = useState({ x: -1, y: -1 })
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

  const updateGameStats = useGameStatsUpdate();
  const gameStats = useGameStats();

  function grabPiece(e: React.MouseEvent) {

    const element = e.target as HTMLElement;
    const board = boardRef.current;
    // const teamColor = (gameStats.turn === TeamType.RED) ? "red" : "blue";
    if (
      element.classList.contains("chess-piece") &&
      element.classList.contains("red") &&
      board) {
      
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      console.log("board top", board.offsetTop);
      console.log("clientY", e.clientY)
      console.log("board left", board.offsetLeft);
      
      

      setOriginalPosition({
        x: Math.floor((e.clientX - board.offsetLeft) / GRID_SIZE),
        y: Math.abs(Math.ceil((e.clientY - board.offsetTop - 800) / GRID_SIZE)
        )
      })
      
      setActivePiece(element)
    }
  }

  function movePiece(e: React.MouseEvent) {

    const board = boardRef.current;
    if (activePiece && board) {

      const minX = board.offsetLeft;
      const minY = board.offsetTop;
      const maxX = board.offsetLeft + board.clientWidth - 100;
      const maxY = board.offsetTop + board.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      activePiece.style.position = "absolute";
      activePiece.style.left = `${x}px`;
      activePiece.style.top = `${y}px`;

      //If x is smaller than minimum amount
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      }
      //If x is bigger than maximum amount
      else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      }
      //If x is in the constraints
      else {
        activePiece.style.left = `${x}px`;
      }
      //If y is smaller than minimum amount
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      }
      //If y is bigger than maximum amount
      else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      }
      //If y is in the constraints
      else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {

    const chessboard = boardRef.current;

    if (activePiece && chessboard) {

      // floor the coordinates to find the nearest placing square
      const newPosition: Position = {
        x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE),
        y: Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
        )
      }

      // find the current piece
      const currentPiece = pieces.find(p => p.x === originalPosition.x && p.y === originalPosition.y);

      if (currentPiece) {

        const attackedPiece = Referee.getAttackedPiece(originalPosition, newPosition, currentPiece.pieceType, currentPiece.color, pieces);
        const validMove = Referee.isValidMove(originalPosition, newPosition, currentPiece.pieceType, currentPiece.color, pieces);

        if (validMove) {
          console.log("valid");
          

          // return a new board with new piece position and update it
          const updatedPieces = Referee.movePiece(pieces, currentPiece, newPosition, attackedPiece);
          const { pieces: newPieces, score } = Checkers_AI.minimax(updatedPieces, 2, true);
          setPieces(newPieces)
          updateGameStats(TeamType.BLUE, false)

          // alert if we have a winner
          if (Referee.getWinner(pieces) !== TeamType.NONE) {
            const colorString = currentPiece.color === TeamType.BLUE ? "Blue" : "Red";
            alert(`${colorString} Won!!!`);
          }

        } else {

          // reset the piece location if it is not a valid move
          setPieces(value => {
            const pieces = value.map(p => {
              if (p.x === originalPosition.x && p.y === originalPosition.y) {

                const validMove = Referee.isValidMove(originalPosition, newPosition, p.pieceType, p.color, value);

                if (validMove) {
                  p.x = newPosition.x;
                  p.y = newPosition.y;
                }
                else {
                  // reset piece position
                  activePiece.style.position = 'relative';
                  activePiece.style.removeProperty('top')
                  activePiece.style.removeProperty('left')
                  p.x = originalPosition.x;
                  p.y = originalPosition.y;
                }
              }
              return p;
            })
            return pieces;
          })
        }
      }
      setActivePiece(null);
    }
  }

  let board = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {

      let color = 0;
      let pieceType = PieceType.PAWN;
      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          color = p.color;
          pieceType = p.pieceType;
        }
      })
      board.push(<Tile key={`${j},${i}`} pieceTeam={color} number={j + i + 2} pieceType={pieceType} />);
    }
  }

  return (
    <div
      className="board"
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
