import { Piece, PieceType, TeamType } from "../Constants";
import Referee from "../referee/Referee";
export class Checkers_AI {

    static NEG_INF = Number.NEGATIVE_INFINITY
    static POS_INF = Number.POSITIVE_INFINITY

    /**
     * returns a copy of the board so any changes to the original board is not affected
     * @param board 1D array of the board
     * @returns a new copy of the board
     */
    static deepCopy(pieces: Piece[]): Piece[] {
        const copyPieces: Piece[] = [];
        for (let i = 0; i < pieces.length; i++) {
            const piece = pieces[i];
            copyPieces.push({...piece})
        }
        return copyPieces
    }

    /**
     * return an array of all the selected pieces by color 
     * @param board Array of all pieces
     * @param color the color of the pieces you want to count
     * @param countKingsOnly boolean for if you want to count kings only
     * @returns an array of all the selected pieces by color 
     */
    static countPieces(board: Piece[], color: TeamType, countKingsOnly: boolean = false): Piece[] {
        const pieces: Piece[] = [];
        for (let i = 0; i < board.length; i++) {
            const piece = board[i];

            if (countKingsOnly) {
                if (piece.color === color && piece.pieceType === PieceType.KING) {
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
     * returns a score of AI
     * @param board array of pieces
     */
    static evaluate(board: Piece[]): number {
        let blueNumPieces: number = this.countPieces(board, TeamType.BLUE).length;
        let blueNumKings: number = this.countPieces(board, TeamType.BLUE, true).length;
        let redNumPieces: number = this.countPieces(board, TeamType.RED).length;
        let redNumKings: number = this.countPieces(board, TeamType.RED, true).length;

        return blueNumPieces - redNumPieces + (blueNumKings * 0.5 - redNumKings * 0.5)
        // return blueNumPieces - redNumPieces 
    }

    /**
     * Implemented MINIMAX depth first search algorithm to return the best possible move for team BLUE
     * @param board the 1D array of checkers board
     * @param depth how far do we want to calculate the tree of possibilities
     * @param max_player is the algorithm minimizing the value or maximizing the value
     */
    static minimax(currentBoard: Piece[], depth: number, max_player: boolean): { score: number, pieces: Piece[] } {
        
        // is this necessary?
        let board = this.deepCopy(currentBoard)

        // only evaluate if we reached the end of the tree
        if (depth === 0 || Referee.getWinner(board) !== TeamType.NONE) {            
            return { score: this.evaluate(board), pieces: board }
        }

        if (max_player) {
            let maxEval = this.NEG_INF;
            let bestMove = null;

            const allMoves = this.getAllMovesForTeam(board, TeamType.BLUE);
            for (let i = 0; i < allMoves.length; i++) {
                const move = allMoves[i];

                const evaluation = this.minimax(move, depth - 1, false).score;
                maxEval = Math.max(maxEval, evaluation)

                if (maxEval === evaluation) {
                    bestMove = move
                }

            }
            if (bestMove === null) {
                bestMove = board
            }
            return { score: maxEval, pieces: bestMove }
        } else {
            let minEval = this.POS_INF;
            let bestMove = null;
            const allMoves = this.getAllMovesForTeam(board, TeamType.RED);
            for (let i = 0; i < allMoves.length; i++) {
                const move = allMoves[i];
                const evaluation = this.minimax(move, depth - 1, true).score;
                minEval = Math.min(minEval, evaluation)

                if (minEval === evaluation) {
                    bestMove = move
                }
            }
            if (bestMove === null) {
                bestMove = board
            }
            return { score: minEval, pieces: bestMove }
        }
    }

    /**
     * returns an array of possible moves for each peice in a team
     * @param pieces 1D array of the pieces
     * @param color team color
     */
    static getAllMovesForTeam(pieces: Piece[], color: TeamType): Piece[][] {
        // stores the possible moves for all possible pieces in a board format
        let moves: Piece[][] = []
        const piecesForCurrentColor = this.countPieces(pieces, color, false);
        
        for (let i = 0; i < piecesForCurrentColor.length; i++) {
            const currentPiece = piecesForCurrentColor[i];
            const validMoves = Referee.getPossibleMovesForPiece(pieces, currentPiece)

            for (let possibleMovePositionString of Array.from(validMoves.keys())) {

                const possiblePosition = JSON.parse(possibleMovePositionString);
                if (possiblePosition) {
                                        
                    const tempPieces = this.deepCopy(pieces)
                    const tempPiece = { ...currentPiece }
                    const newBoard = Referee.movePiece(tempPieces, tempPiece, possiblePosition);
                    moves.push(newBoard)
                }
            }
        }
        return moves
    }

    // return new AI move
    aiMove(board: Piece[]) {

    }
}