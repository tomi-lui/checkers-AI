import Board from "../components/Board/Board";
import { Piece, PieceType, TeamType } from "../Constants";
import Referee, { Position } from "../referee/Referee";
export class Checkers_AI {

    static NEG_INF = Number.NEGATIVE_INFINITY
    static POS_INF = Number.POSITIVE_INFINITY

    /**
     * returns a copy of the board so any changes to the original board is not affected
     * @param board 1D array of the board
     * @returns a new copy of the board
     */
    static deepCopy(board: Piece[]): Piece[] {
        const copyBoard: Piece[] = [];
        for (let i = 0; i < board.length; i++) {
            const piece = board[i];
            copyBoard.push(piece)
        }
        return copyBoard
    }

    // evaluate board: returns a score
    // blue == white

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
     * incentivize AI to gain as many kings as they can
     * @param board array of pieces
     */
    static evaluate(board: Piece[]): number {
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
    static minimax(board: Piece[], depth: number, max_player: boolean): {score: number, board:Piece[]} {

        // only evaluate if we reached the end of the tree
        if (depth === 0 || Referee.getWinner(board) != TeamType.NONE) {
            return {score:this.evaluate(board), board}
        }
        if (max_player) {
            let maxEval = this.NEG_INF;
            let bestMove = null;
            const allMoves = this.getAllMoves(board, TeamType.BLUE);
            for (let i = 0; i < allMoves.length; i++) {
                const move = allMoves[i];
                const evaluation = this.minimax(move, depth-1, false).score;
                maxEval = Math.max(maxEval, evaluation)
                if (maxEval == evaluation) {
                    bestMove = move
                }
            }
            return {score:maxEval, board}
        } else {
            let minEval = this.POS_INF;
            let bestMove = null;
            const allMoves = this.getAllMoves(board, TeamType.RED);
            for (let i = 0; i < allMoves.length; i++) {
                const move = allMoves[i];
                const evaluation = this.minimax(move, depth-1, true).score;
                minEval = Math.max(minEval, evaluation)
                if (minEval == evaluation) {
                    bestMove = move
                }
            }
            return {score:minEval, board}
        }
    }

    /**
     * Stores an array <MOVE, 
     * @param board 1D array of the board
     * @param color team color
     */
    static getAllMoves(board: Piece[], color: TeamType): Piece[][] {
        // stores the possible moves for all possible pieces in a board format
        let moves: Piece[][] = []
        const piecesForCurrentColor = this.countPieces(board, color, false);

        for (let i = 0; i < piecesForCurrentColor.length; i++) {
            const currentPiece = piecesForCurrentColor[i];
            const validMoves = Referee.getPossibleMoves(board, currentPiece)

            for (let move of Array.from(validMoves.keys())) {
                const attackedPiece = validMoves.get(move);
                const tempBoard = this.deepCopy(board)
                // const newBoard = this.simulateMove(piece, move, tempBoard, attackedPiece)
                const newBoard = this.move(tempBoard, currentPiece, move.x, move.y, attackedPiece);
                moves.push(newBoard)
            }
        }
        return moves
    }

    // static simulateMove(piece: Piece, move: Position, board: Piece[], attackedPieces: Piece[]): Piece[] {
    //     const updatedBoard = this.move(board, piece, move.x, move.y, attackedPieces[0]);
    // }

    static move(
        board: Piece[],
        currentPiece: Piece,
        x: number,
        y: number,
        attackedPiece: Piece | null | undefined = null):
        Piece[] {
        const updatedPieces = board.reduce((results, piece) => {

            // Move the selected piece to its new location
            if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
                // if moved piece found, update its location and put it back into the array
                piece.x = x;
                piece.y = y;

                // convert Pawn to King if pawn has reached the end of the board
                if (piece.pieceType !== PieceType.KING && Referee.pawnReachedTheEnd(y, currentPiece.color)) {
                    piece.pieceType = PieceType.KING;
                }
                results.push(piece);

                // Delete the attacked piece 
            } else if (attackedPiece && (piece.x === attackedPiece.x && piece.y === attackedPiece.y)) {

                //do not put the attacked piece back into the array.
                // update the score

            } else {
                // if normal piece, put it back into the array
                results.push(piece)
            }

            return results;
        }, [] as Piece[])
        return updatedPieces;
    }

    // return new AI move
    aiMove(board: Piece[]) {

    }
}