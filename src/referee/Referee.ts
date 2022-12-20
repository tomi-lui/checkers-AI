import { Piece, PieceType, TeamType } from "../Constants";

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
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): Piece | undefined {

        if (type == PieceType.PAWN) {
            const yAttackedPieceDirection = (team === TeamType.RED) ? 1 : -1;
            const xAttackedPieceDirection = (x - px > 0) ? 1 : -1;
            const attackedPiece = boardState.find(p => p.x === (px + xAttackedPieceDirection) && p.y === (py + yAttackedPieceDirection));

            return attackedPiece;

        } else if (type == PieceType.KING) {

            const yAttackedPieceDirection = (y > py) ? 1 : -1;
            const xAttackedPieceDirection = (x - px > 0) ? 1 : -1;
            const attackedPiece = boardState.find(p => p.x === (px + xAttackedPieceDirection) && p.y === (py + yAttackedPieceDirection));

            return attackedPiece;
        }
    }

    public static getPossibleMoves(board: Piece[], piece: Piece): Map<Position, Piece | null> {

        const validMoves: Map<Position, Piece | null> = new Map();

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
            const newAtkPosition: Position = {
                x: piece.x + attackDirection[0],
                y: piece.y + attackDirection[1]
            }

            // checking if movement direction is valid
            if (this.isValidMove(
                PrevPosition.x,
                PrevPosition.y,
                newMovPosition.x,
                newMovPosition.y,
                piece.pieceType,
                piece.color,
                board)
            ) {
                validMoves.set(newMovPosition, null);
            }

            // checking if attack direction is valid
            if (this.isValidMove(
                PrevPosition.x,
                PrevPosition.y,
                newAtkPosition.x,
                newAtkPosition.y,
                piece.pieceType,
                piece.color,
                board)
            ) {
                const attackedPiece = board.find(p =>
                    p.x === (PrevPosition.x + newMovPosition.x) &&
                    p.y === (PrevPosition.y + newMovPosition.y)
                );
                if (attackedPiece) {
                    validMoves.set(newMovPosition, attackedPiece)
                }
            }
        }

        return validMoves
    }

    static isValidMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): Boolean {

        // return false if user clicked on empty piece
        if (this.tileIsOccupied(x, y, boardState)) {
            return false
        }

        // PAWN RULES
        if (type === PieceType.PAWN) {

            // get the direction of the piece, red goes up blue goes down
            const yDirection = (team === TeamType.RED) ? 1 : -1;

            // movement logic
            if (y - py === (1 * yDirection) && Math.abs(px - x) === 1) {
                return true
            }
            // attack logic
            if (y - py === (2 * yDirection) && Math.abs(px - x) === 2) {

                // return false if there is no pawn to attack
                if (!this.getAttackedPiece(px, py, x, y, type, team, boardState)) {
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
            if (Math.abs(y - py) === 1 && Math.abs(px - x) === 1) {
                return true
            }
            // attack logic
            if (Math.abs(y - py) === 2 && Math.abs(px - x) === 2) {

                // return false if there is no pawn to attack
                if (!this.getAttackedPiece(px, py, x, y, type, team, boardState)) {
                    return false
                }
                return true;
            }
            return false;
        }


        return false;
    }

}