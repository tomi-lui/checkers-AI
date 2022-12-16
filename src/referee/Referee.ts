import { Piece, PieceType, TeamType } from "../Constants";

export default class Referee {

    /**
     * Helper function that returns true if pawn has reached the end of the board
     * @param x pawns new x position
     * @param y pawns new y position
     * @param team pawns team color
     */
    pawnReachedTheEnd(y: number, team: TeamType): Boolean {
        if (
            (team === TeamType.RED && y === 7) ||
            (team === TeamType.BLUE && y === 0)
        ) {
            return true;
        }
        return false;
    }

    tileIsOccupied(x: number, y: number, boardState: Piece[]): Boolean {
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

    getAttackedPiece(
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

    isValidMove(
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