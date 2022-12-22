import { Piece, TeamType, PieceType } from "../Constants";
import { Checkers_AI } from "../minimax/algorithm";
import Referee from "../referee/Referee";


function instantiateBoard() {

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

describe('minimax', () => {
  it.skip('should return the correct score and pieces for the given board and depth', () => {

    let originalPieces = instantiateBoard();

    originalPieces = Referee.movePiece(
      originalPieces,
      { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN },
      { x: 3, y: 3 }
    );

    const { pieces: newPieces } = Checkers_AI.minimax(originalPieces, 2, true);
    expect(newPieces).not.toEqual(originalPieces);
  });
});

describe('get all moves for a team', () => {
  it.only('returns a list of pieces, where each `pieces` represents the board after moving a piece', () => {

    let originalPieces = instantiateBoard();
    const allPossibleMoves = Checkers_AI.getAllMovesForTeam(originalPieces, TeamType.RED);
    expect(allPossibleMoves.length).toBe(7)
  });
});


      // let movedRedX3Y3 = instantiateBoard();
      // movedRedX3Y3 = Referee.movePiece(movedRedX3Y3, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 3, y: 3 });
  
      // let movedRedX1Y1 = instantiateBoard();
      // movedRedX1Y1 = Referee.movePiece(movedRedX3Y3, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 1, y: 3 });
  


