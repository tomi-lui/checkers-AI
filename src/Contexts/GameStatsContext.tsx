import React, { ReactNode, useContext } from "react";
import { useState } from "react";
import { MINIMAX_DEPTH, TeamType } from "../Constants";

export interface GameStats {
    redAttacks: number;
    blueAttacks: number;
    turn: TeamType;
    minimaxDepth: number;
    moves: number
}

const initialGameStats: GameStats = { redAttacks: 0, blueAttacks: 0, turn: TeamType.RED, minimaxDepth: 3, moves: 0 }
const GameStatsContext = React.createContext(initialGameStats)
const GameStatsUpdateContext = React.createContext(() => { })
const updateAIDifficultyContext = React.createContext((depth: number) => { })

export function useGameStats() {
    return useContext(GameStatsContext)
}

export function useGameStatsUpdate() {
    return useContext(GameStatsUpdateContext)
}

export function useUpdateAIDifficulty() {
    return useContext(updateAIDifficultyContext)
}
interface Props {
    children?: ReactNode
}

export function GameInfoProvider({ children }: Props) {

    const [gameInfo, setGameInfo] = useState(initialGameStats)

    function updateAIDifficulty(depth: number) {
        let prevGameStats = { ...gameInfo }
        prevGameStats.minimaxDepth = depth
        setGameInfo(prevGameStats)
    }

    function switchTurns() {

        let prevGameStats = { ...gameInfo }
        prevGameStats.moves = prevGameStats.moves + 1

        // // alternate turn
        // prevGameStats.turn = (teamColorJustPlayed === TeamType.RED) ? TeamType.BLUE : TeamType.RED;

        // // 
        // if (attacked) {
        //     if (teamColorJustPlayed === TeamType.RED) {
        //         prevGameStats.redAttacks = prevGameStats.redAttacks
        //     } else if (teamColorJustPlayed === TeamType.BLUE) {
        //         prevGameStats.blueAttacks = prevGameStats.blueAttacks
        //     }
        // }
        setGameInfo(prevGameStats)
    }

    return (
        <updateAIDifficultyContext.Provider value={updateAIDifficulty} >
            <GameStatsContext.Provider value={gameInfo}>
                <GameStatsUpdateContext.Provider value={switchTurns}>
                    {children}
                </GameStatsUpdateContext.Provider>
            </GameStatsContext.Provider>
        </updateAIDifficultyContext.Provider>
    );

}