import React, { useState } from 'react'
import Board from './components/Board/Board'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './App.css'

enum Colors {
  black,
  red
}

interface BoardState {
  pieces: Piece[][];
  turn: Colors;
  winner: Colors | null;
}

interface Piece {
  color: Colors,
  x: number;
  y: number;
  isKing: boolean;
}

const initialBoardState: BoardState = {
  pieces: [],
  turn: Colors.black,
  winner: null
};


function App() {

  const [selectedPiece, setSelectedPiece] = useState(Colors.black);

  const [boardState, setBoardState] = useState(initialBoardState);
  
  // replace board with new array of pieces
  function updateBoardPieces(pieces: Piece[][]) {
    setBoardState(prevState => ({
      ...prevState, pieces
    }));
  }

  // update the current piece
  function handleUpdatePieceLocation(piece: Piece) {
    setBoardState(prevState => ({...prevState, selectedPiece: piece}));
  }

  // implement mouse drag
  function handleMovePiece(orginX:number, orginY:number, newX:number, newY:number) {

    // assert correct player piece color
    if (selectedPiece != boardState.turn) {
      alert("it is not your turn");
    }

    // assert only diagonal positions
    
    
  }
  
  return (
    <div className="app">
      <h1>Checkers: </h1>
      <div className="content">
        {/* <FontAwesomeIcon icon={faSearch as IconProp} /> */}
      </div>
      <Board/>
    </div>
  )
}

export default App
