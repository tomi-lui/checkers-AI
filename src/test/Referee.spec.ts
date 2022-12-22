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

describe('Move Piece', () => {
    it('Referee to support moving a piece.', () => {

        let originalPieces = instantiateBoard();
        let movedPieces = Referee.movePiece(originalPieces, { x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN }, { x: 3, y: 3 });

        let movedPiece = movedPieces.find(p => p.x === 3 && p.y === 3)
        expect(originalPieces).not.toEqual(movedPieces);
        expect(movedPiece).toBeDefined();
    });
});

describe('get All Moves for a given piece', () => {
    it('should return an array of all possible moves for a given piece in the form of Piece[]', () => {
  
      let originalPieces = instantiateBoard();
      const redX2Y2Piece: Piece = {
        x: 2, y: 2, color: TeamType.RED, pieceType: PieceType.PAWN
      };
  
  
      const allPossibleMoves = Referee.getPossibleMovesForPiece(originalPieces, redX2Y2Piece)
      const allPossibleMovesKeys = Array.from(allPossibleMoves.keys());
  
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