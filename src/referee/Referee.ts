import { Piece, PieceType, TeamType } from "../Constants";
import { Checkers_AI } from "../minimax/algorithm";

export interface Position {
    x: number,
    y: number
}

export interface Skips {
    skip: number[][];
}

export interface ValidMove {
    move: Position;
    skip: number[][];
}

export default class Referee {

    static possibleMovementDirections = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ]

    static possibleAttackDirections = [
        [-2, -2],
        [-2, 2],
        [2, -2],
        [2, 2]
    ]

    static NUM_OF_POSSIBLE_DIRECTIONS = 4;

    /**
     * Helper function that returns true if pawn has reached the end of the board
     * @param x pawns new x position
     * @param y pawns new y position
     * @param team pawns team color
     */
    static pawnReachedTheEnd(y: number, team: TeamType): Boolean {
        if (
            (team === TeamType.RED && y === 7) ||
            (team === TeamType.BLUE && y === 0)
        ) {
            return true;
        }
        return false;
    }

    static tileIsOccupied(x: number, y: number, boardState: Piece[]): Boolean {
        // console.log("checking if tile is occupied...");

        const piece = boardState.find(p => p.x === x && p.y === y);

        if (piece) {
            return true;
        } else {
            return false
        }
    }

    tileIsOccupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): Boolean {
        // console.log("checking if tile is occupied...");

        const piece = boardState.find(p => p.x === x && p.y === y && p.color !== team);

        if (piece) {
            return true;
        } else {
            return false
        }
    }


    static movePiece(
        board: Piece[],
        currentPiece: Piece,
        newPosition: Position
        // attackedPiece: Piece | null | undefined = null
    ):
        Piece[] {
        
        const newBoard = Checkers_AI.deepCopy(board)
        const attackedPiece = this.getAttackedPiece({x: currentPiece.x, y:currentPiece.y},newPosition, currentPiece.pieceType, currentPiece.color, board );
        const updatedPieces = newBoard.reduce((results, piece) => {

            // Move the selected piece to its new location
            if (piece.x === currentPiece.x && piece.y === currentPiece.y) {
                // if moved piece found, update its location and put it back into the array
                piece.x = newPosition.x;
                piece.y = newPosition.y;

                // convert Pawn to King if pawn has reached the end of the board
                if (piece.pieceType !== PieceType.KING && Referee.pawnReachedTheEnd(newPosition.y, currentPiece.color)) {
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

    /**
     * the enum of TeamType NONE if no winner is found, else
     * the enum of the winning team.
     * @param board the 1D array of checkers board
     * @returns TeamType Enum
     */
    public static getWinner(board: Piece[]): TeamType {
        let redPieces = 0;
        let bluePieces = 0;
        for (let i = 0; i < board.length; i++) {
            const piece = board[i];
            if (piece.color === TeamType.RED) {
                redPieces++;
            } else if (piece.color === TeamType.BLUE) {
                bluePieces++;
            }
        }
        if (redPieces === 0) {
            return TeamType.BLUE
        }
        else if (bluePieces === 0) {
            return TeamType.RED
        }
        return TeamType.NONE;
    }

    static getAttackedPiece(
        prevPosition: Position,
        newPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): Piece | undefined {

        if (type === PieceType.PAWN) {
            const yAttackedPieceDirection = (team === TeamType.RED) ? 1 : -1;
            const xAttackedPieceDirection = (newPosition.x - prevPosition.x > 0) ? 1 : -1;
            const attackedPiece = boardState.find(p => p.x === (prevPosition.x + xAttackedPieceDirection) && p.y === (prevPosition.y + yAttackedPieceDirection));
            const currentPiece = boardState.find(p => p.x === prevPosition.x && p.y === prevPosition.y);

            if (attackedPiece?.color === currentPiece?.color) {
                return undefined;
            }
            return attackedPiece;

        } else if (type === PieceType.KING) {

            const yAttackedPieceDirection = (newPosition.y > prevPosition.y) ? 1 : -1;
            const xAttackedPieceDirection = (newPosition.x - prevPosition.x > 0) ? 1 : -1;
            const attackedPiece = boardState.find(p => p.x === (prevPosition.x + xAttackedPieceDirection) && p.y === (prevPosition.y + yAttackedPieceDirection));

            return attackedPiece;
        }
    }

    public static getPossibleMovesForPiece(board: Piece[], piece: Piece): Map<string, Piece | null> {

        const validMoves: Map<string, Piece | null> = new Map();

        const PrevPosition: Position = {
            x: piece.x,
            y: piece.y
        }

        // checking for possible movement/attack directions
        for (let i = 0; i < this.NUM_OF_POSSIBLE_DIRECTIONS; i++) {

            const movementDirection = this.possibleMovementDirections[i];
            const attackDirection = this.possibleAttackDirections[i];

            const newMovPosition: Position = {
                x: piece.x + movementDirection[0],
                y: piece.y + movementDirection[1]
            }
            const newMovePositionJSONString = JSON.stringify(newMovPosition)

            const newAtkPosition: Position = {
                x: piece.x + attackDirection[0],
                y: piece.y + attackDirection[1]
            }
            const newAtkPositionJSONString = JSON.stringify(newAtkPosition)

            // checking if movement direction is valid
            if (this.isValidMove(
                PrevPosition,
                newMovPosition,
                piece.pieceType,
                piece.color,
                board)
            ) {
                validMoves.set(newMovePositionJSONString, null);
            }

            // checking if attack direction is valid
            else if (this.isValidMove(
                PrevPosition,
                newAtkPosition,
                piece.pieceType,
                piece.color,
                board)
            ) {
                const attackedPiece = this.getAttackedPiece(PrevPosition, newAtkPosition, piece.pieceType, piece.color, board)

                if (attackedPiece) {
                    validMoves.set(newAtkPositionJSONString, attackedPiece)
                }
            }
        }
        return validMoves
    }

    static isValidMove(
        prevPosition: Position,
        newPosition: Position,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): Boolean {

        // return false if user clicked on empty piece
        if (
            this.tileIsOccupied(newPosition.x, newPosition.y, boardState) ||
            newPosition.x < 0 ||
            newPosition.x > 7 ||
            newPosition.y > 7 ||
            newPosition.y < 0
        ) {
            return false
        }

        // PAWN RULES
        if (type === PieceType.PAWN) {

            // get the direction of the piece, red goes up blue goes down
            const yDirection = (team === TeamType.RED) ? 1 : -1;

            // movement logic
            if (
                newPosition.y - prevPosition.y === (1 * yDirection) &&
                Math.abs(prevPosition.x - newPosition.x) === 1
            ) {
                return true
            }
            // attack logic
            if (
                newPosition.y - prevPosition.y === (2 * yDirection) &&
                Math.abs(prevPosition.x - newPosition.x) === 2) {

                // return false if there is no pawn to attack
                if (!this.getAttackedPiece(prevPosition, newPosition, type, team, boardState)) {
                    return false
                }
                return true;
            }
            return false;
        }

        // KING RULES
        else if (type === PieceType.KING) {

            // get the direction of the piece, red goes up blue goes down

            // movement logic
            if (Math.abs(newPosition.y - prevPosition.y) === 1 && Math.abs(prevPosition.x - newPosition.x) === 1) {
                return true
            }
            // attack logic
            if (Math.abs(newPosition.y - prevPosition.y) === 2 && Math.abs(prevPosition.x - newPosition.x) === 2) {

                // return false if there is no pawn to attack
                if (!this.getAttackedPiece(prevPosition, newPosition, type, team, boardState)) {
                    return false
                }
                return true;
            }
            return false;
        }


        return false;
    }

}