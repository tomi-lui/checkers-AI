import { Piece, PieceType, TeamType } from "../Constants";
import Referee from "../referee/Referee";
export class Checkers_AI {

    // deep copy

    // evaluate board: returns a score
    // blue == white

    countPieces(board: Piece[], color: TeamType, countKings: boolean = false): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < board.length; i++) {
            const piece = board[i];

            if (countKings) {
                if (piece.color === color && piece.pieceType ===PieceType.KING) {
                    pieces.push(piece)
                }
            } else {
                if (piece.color === color) {
                    pieces.push(piece)
                }
            }
        }
        return pieces;
    }

    /**
     * incentivize AI to gain as many kings as they can
     * @param board array of pieces
     */
    evaluate(board: Piece[]): number {
        let blueNumPieces: number = this.countPieces(board, TeamType.BLUE).length;
        let blueNumKings: number = this.countPieces(board, TeamType.BLUE, true).length;
        let redNumPieces: number = this.countPieces(board, TeamType.RED).length;
        let redNumKings: number = this.countPieces(board, TeamType.RED, true).length;

        return blueNumPieces - redNumPieces + (blueNumKings * 0.5 - redNumKings * 0.5)
    }

    // get valid moves, should be implemented from referee

    // get all pieces of a given color

    // ai move returns the new ai board

    /**
     * 
     * @param board the 1D array of checkers board
     * @param depth how far do we want to calculate the tree of possibilities
     * @param max_player is the algorithm minimizing the value or maximizing the value
     */
    minimax(board: Piece[], depth: number, max_player: boolean):number {

        // only evaluate if we reached the end of the tree
        if (depth === 0 || Referee.getWinner(board) != TeamType.NONE) {
            return this.evaluate(board)
        }
        
    }
}