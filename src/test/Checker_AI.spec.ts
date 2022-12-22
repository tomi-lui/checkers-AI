import { TeamType, PieceType } from "../Constants";
import { Checkers_AI } from "../minimax/algorithm";
import Referee from "../referee/Referee";
import { instantiateBoard } from "./helper";

describe('minimax', () => {
  it('should return the correct score and pieces for the given board and depth', () => {

    let originalPieces = instantiateBoard();

    let movedPieces = Referee.movePiece(
      originalPieces,
      { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN },
      { x: 3, y: 3 }
    );

    const { score, pieces: newPieces } = Checkers_AI.minimax(movedPieces, 2, true);
    expect(movedPieces).not.toEqual(newPieces);

  });
});

describe('get all moves for a team', () => {
  it('returns a list of pieces, where each `pieces` represents the board after moving a piece', () => {

    let possibleMove1 = instantiateBoard();
    possibleMove1 = Referee.movePiece(
      possibleMove1, 
      { x: 0, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, 
      { x: 1, y: 3 }
    );

    let originalPieces = instantiateBoard();
    const allPossibleMoves = Checkers_AI.getAllMovesForTeam(originalPieces, TeamType.RED);
    expect(allPossibleMoves.length).toBe(7)

    expect(allPossibleMoves[0].length).toEqual(24)
    expect(allPossibleMoves[1].length).toEqual(24)
    expect(allPossibleMoves[2].length).toEqual(24)
    expect(allPossibleMoves[3].length).toEqual(24)
    expect(allPossibleMoves[4].length).toEqual(24)
    expect(allPossibleMoves[5].length).toEqual(24)
    expect(allPossibleMoves[6].length).toEqual(24)

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