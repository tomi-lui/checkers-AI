import { Piece, TeamType, PieceType } from "../Constants";
import { Checkers_AI } from "../minimax/algorithm";
import Referee from "../referee/Referee";
import { instantiateBoard } from "./helper";


describe('Move Piece', () => {
    it('Referee to support moving a piece.', () => {

        let originalPieces = instantiateBoard();
        let movedPieces = Referee.movePiece(originalPieces, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 3, y: 3 });

        let movedPiece = movedPieces.find(p => p.x === 3 && p.y === 3)
        let previousPiece = movedPieces.find(p => p.x === 2 && p.y === 2)

        expect(originalPieces).not.toEqual(movedPieces);
        expect(movedPiece).toBeDefined();
        expect(previousPiece).toBeUndefined()
    });
});

describe('get All Moves for a given piece', () => {
    it('should return an array of all possible moves for a given piece in the form of Piece[]', () => {
  
      let originalPieces = instantiateBoard();
      const redX2Y2Piece: Piece = {
        x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN
      };
  
      const allPossibleMoves = Referee.getPossibleMovesForPiece(originalPieces, redX2Y2Piece)
  
      const firstPosition = { x: 1, y: 3 }
      const firstPositionString = JSON.stringify(firstPosition)
      const secondPostion = { x: 3, y: 3 }
      const secondPostionString = JSON.stringify(secondPostion)

      expect(allPossibleMoves.has(firstPositionString)).toBeTruthy()
      expect(allPossibleMoves.has(secondPostionString)).toBeTruthy()
  
      expect(allPossibleMoves.get(firstPositionString)).toBeNull()
      expect(allPossibleMoves.get(secondPostionString)).toBeNull()
    });
  });