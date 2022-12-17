import React, { ReactNode, useContext } from "react";
import { useState } from "react";
import { TeamType } from "../Constants";

export interface GameStats {
    redAttacks: number;
    blueAttacks: number;
    turn: TeamType
}

const initialGameStats: GameStats = { redAttacks: 0, blueAttacks: 0, turn: TeamType.RED }
const GameStatsContext = React.createContext(initialGameStats)
const GameStatsUpdateContext = React.createContext((teamType:TeamType) => { })


export function useGameStats() {
    return useContext(GameStatsContext)
}

export function useGameStatsUpdate() {
    return useContext(GameStatsUpdateContext)
}

interface Props {
    children?: ReactNode
}

export function GameStatsProvider({ children }: Props) {

    const [gameStats, setGameStats] = useState(initialGameStats)

    function updateGameStats(teamType: TeamType) {

        console.log(gameStats);
        
        if (teamType == TeamType.RED) {
            setGameStats({
                ...gameStats,
                redAttacks: gameStats.redAttacks + 1
            });
            console.log("red eats");
            

        } else if (teamType == TeamType.BLUE) {
            setGameStats({
                ...gameStats,
                redAttacks: gameStats.blueAttacks + 1
            });
            console.log("blue eats");
        }
    }

    return (
        <GameStatsContext.Provider value={gameStats}>
            <GameStatsUpdateContext.Provider value={updateGameStats}>
                {children}
            </GameStatsUpdateContext.Provider>
        </GameStatsContext.Provider>
    );

}