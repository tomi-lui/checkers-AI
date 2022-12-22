import { getOriginalNode } from "typescript";
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
  it.skip('returns a list of pieces, where each `pieces` represents the board after moving a piece', () => {

    let possibleMove1 = instantiateBoard();
    possibleMove1 = Referee.movePiece(possibleMove1, { x: 0, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 1, y: 3 });


    let originalPieces = instantiateBoard();
    const allPossibleMoves = Checkers_AI.getAllMovesForTeam(originalPieces, TeamType.RED);
    expect(allPossibleMoves.length).toBe(7)

    expect(allPossibleMoves[0].length).toEqual(24)
    expect(allPossibleMoves[1].length).toEqual(24)
    // expect(allPossibleMoves[2].length).toEqual(24)
    // expect(allPossibleMoves).toEqual(originalPieces)
    expect(allPossibleMoves[3].length).toEqual(24)
    // expect(allPossibleMoves[4].length).toEqual(24)
    expect(allPossibleMoves[5].length).toEqual(24)
    expect(allPossibleMoves[6].length).toEqual(24)
    // expect(allPossibleMoves[7].length).toEqual(24)

  });
});



describe('count pieces', () => {
  it('count the pieces', () => {
    let pieces = instantiateBoard();

    let countedPieces = Checkers_AI.countPieces(pieces, TeamType.RED)
    expect(countedPieces.length).toBe(12)

    countedPieces.forEach(p => {
      expect(p.color).toBe(TeamType.RED)
    })
  });

});


      // let movedRedX3Y3 = instantiateBoard();
      // movedRedX3Y3 = Referee.movePiece(movedRedX3Y3, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 3, y: 3 });
  
      // let movedRedX1Y1 = instantiateBoard();
      // movedRedX1Y1 = Referee.movePiece(movedRedX3Y3, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 1, y: 3 });
  


