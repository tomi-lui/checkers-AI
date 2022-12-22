import React, { useEffect, useRef, useState } from "react";
import Referee, { Position } from "../../referee/Referee"
import "./Board.css";
import Tile from "../Tile/Tile"
import {
  BOARD_HEIGHT,
  GRID_SIZE, horizontalAxis, MINIMAX_DEPTH, Piece, PieceType, TeamType, verticalAxis
} from "../../Constants"
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

  const [board, setBoard] = useState<any>()
  const [toggle, setToggle] = useState(false)

  function populateBoard() {
    let tempBoard = []
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {

        let color = 0;
        let pieceType = PieceType.PAWN;
        let x = i;
        let y = j;
        pieces.forEach((p) => {
          if (p.x === i && p.y === j) {
            color = p.color;
            pieceType = p.pieceType;
          }
        })

        tempBoard.push(
          <Tile
            id={`xy${x}_${y}`}
            key={`${j},${i}`}
            pieceTeam={color}
            number={j + i + 2}
            pieceType={pieceType}
          />);
      }
    }
    setBoard(tempBoard)
  }

  useEffect(() => {
    populateBoard()
    if (toggle) {
      const { pieces: AIPieces } = Checkers_AI.minimax(pieces, MINIMAX_DEPTH, true);
      setPieces(AIPieces)
      setToggle(false)
    }
    alertIfWinner()
  }, [pieces])

  // extract x and y coordinates from css class
  function extractCordinates(classes: string[]) {
    let x = -1;
    let y = -1;
    classes.forEach(c => {
      if (c.includes('xy')) {
        let s = c.split('_')
        x = parseInt(s[0].slice(2))
        y = parseInt(s[1])
      }
    })
    if (activePiece?.classList.contains("blue")) {
      activePiece.style.position = ''
    }
    return { x, y }
  }

  // hanlde grabbing piece
  function grabPiece(e: React.MouseEvent) {

    const element = e.target as HTMLElement;
    const board = boardRef.current;

    if (
      element.classList.contains("chess-piece") &&
      element.classList.contains("red") &&
      !element.classList.contains("blue") &&
      board
    ) {

      const { x: originalX, y: originalY } = extractCordinates(Array.from(element.classList))

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setOriginalPosition({
        x: originalX,
        y: originalY,
      })
      setActivePiece(element)
      // element.style.position = "relative";
    }
  }

  // update element/piece location as you drag the piece
  function movePiece(e: React.MouseEvent) {

    const board = boardRef.current;
    if (activePiece &&
      board &&
      activePiece.classList.contains("red")
    ) {

      const minX = board.offsetLeft;
      const minY = board.offsetTop;
      const maxX = board.offsetLeft + board.clientWidth - 100;
      const maxY = board.offsetTop + board.clientHeight - 75;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      // activePiece.style.position = "absolute";
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

  // handle dropping/placing the piece on the tile
  function dropPiece(e: React.MouseEvent) {

    let newPieces = null;
    const chessboard = boardRef.current;

    if (activePiece && chessboard) {

      // floor the coordinates to find the nearest placing square
      const newPosition: Position = {
        x: Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE),
        y: Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - BOARD_HEIGHT) / GRID_SIZE)
        )
      }

      // find the current piece
      const currentPiece = pieces.find(p => p.x === originalPosition.x && p.y === originalPosition.y);

      if (currentPiece && currentPiece.color === TeamType.RED) {

        const validMove = Referee.isValidMove(originalPosition, newPosition, currentPiece.pieceType, currentPiece.color, pieces);

        if (validMove) {
          // return a new board with new piece position and update it
          const movedPieces = Referee.movePiece(pieces, currentPiece, newPosition);
          setPieces(movedPieces);

        } else {
          // reset the piece location if it is not a valid move
          setPieces(value => {
            const pieces = value.map(p => {
              if (p.x === originalPosition.x && p.y === originalPosition.y && p.color === TeamType.RED) {

                // reset piece position
                activePiece.style.position = 'relative';
                activePiece.style.removeProperty('top')
                activePiece.style.removeProperty('left')
              }
              return p;
            })
            return pieces;
          })
        }
      }
      if (newPieces) {
        setPieces(newPieces)
      }
      setToggle(true)
      // alertIfWinner();
      setActivePiece(null);
    }
  }

  function alertIfWinner() {
    // alert if we have a winner
    console.log("red", Checkers_AI.countPieces(pieces, TeamType.RED).length);

    if (Checkers_AI.countPieces(pieces, TeamType.BLUE).length === 0) {
      alert(`BLUE Won!!!`);
    }
    if (Checkers_AI.countPieces(pieces, TeamType.RED).length === 0) {
      alert(`RED Won!!!`);
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
