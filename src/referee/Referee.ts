import { PieceType, TeamType } from "../components/Board/Board";

export default class Referee {

    isValidMove(px:number, py:number , x: number, y:number, type: PieceType, team: TeamType):Boolean {
        console.log("Referee cheking the move");
        console.log("prev", px, py);
        console.log("curr", x, y);
        console.log("type", type);
        console.log("team", team);         
        
        if (team === TeamType.BLUE) {
             return false
        }
        
        return true;
    }
}