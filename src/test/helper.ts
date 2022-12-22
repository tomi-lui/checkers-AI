import { Piece, PieceType } from "../Constants";

export function instantiateBoard() {

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
  
    return initialBoardState
  }
  