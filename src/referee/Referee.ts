import { Piece, PieceType, TeamType } from "../components/Board/Board";

export default class Referee {

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

        const yAttackedPieceDirection = (team === TeamType.RED) ? 1 : -1;
        const xAttackedPieceDirection = (x - px > 0) ? 1 : -1;
        const attackedPiece = boardState.find(p => p.x === (px + xAttackedPieceDirection) && p.y === (py + yAttackedPieceDirection));

        return attackedPiece;
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

        if (this.tileIsOccupied(x, y, boardState)) {
            return false
        }
        
        const yDirection = (team === TeamType.RED) ? 1 : -1;
        // movement logic
        if (y - py === (1 * yDirection) && Math.abs(px - x) === 1) {
            return true
        }
        // attack logic
        if (y - py === (2 * yDirection) && Math.abs(px - x) === 2) {

            // return false if there is no pawn to attack
            if (!this.getAttackedPiece(px,py,x,y,type,team,boardState)) {
                return false
            }

            return true;
        }
        return false;
    }
}