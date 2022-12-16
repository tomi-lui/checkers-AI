export const GRID_SIZE = 100;
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
    color: TeamType;
    x: number;
    y: number;
    pieceType: PieceType
}

export enum TeamType {
    NONE,
    BLUE,
    RED
}

export enum PieceType {
    PAWN,
    KING
}