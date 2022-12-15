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

    isValidMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): Boolean {

        const pawnDirection = (team === TeamType.BLUE) ? -1 : 1;

        // console.log("Referee cheking the move");
        // console.log("prev", px, py);
        // console.log("curr", x, y);
        // console.log("type", type);
        // console.log("team", team);

        if (this.tileIsOccupied(x, y, boardState)) {
            return false
        }

        if (team === TeamType.RED) {
            
            // movement logic
            if ( y - py == 1 && Math.abs(px-x) == 1) {
                return true
            }

            // attack logic
            if ( y - py == 2 && Math.abs(px-x) == 2) {

                // return false if there is no pawn to attack
                const xDirection = (x - px > 0) ? 1 : -1;
                if (!this.tileIsOccupiedByOpponent(px + xDirection, py + 1, boardState, team)) {
                    return false;
                }
                
                return true;
            }
        }
        else { // team BLUE
            // movement logic 
            if (
                py - y == 1 &&
                Math.abs(px-x) == 1
            ) {
                return true
            }
        }
        return false;
    }
}