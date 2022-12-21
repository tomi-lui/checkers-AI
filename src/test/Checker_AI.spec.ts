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
  it('should return the correct score and pieces for the given board and depth', () => {

    const board = instantiateBoard();
    const depth = 2;
    const maxPlayer = true;

    const result = Checkers_AI.minimax(board, depth, maxPlayer);
    expect(result).toEqual({ score: -1, pieces: board });
  });
});
