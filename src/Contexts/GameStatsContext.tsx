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
const GameStatsUpdateContext = React.createContext((teamType: TeamType, attacked:boolean) => { })


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


    function updateGameStats(teamType: TeamType, attacked: boolean) {

        let prevGameStats = {...gameStats}
        console.log(prevGameStats);
        
        prevGameStats.turn = (teamType === TeamType.RED) ? TeamType.BLUE : TeamType.RED;

        if (attacked) {
            if (teamType === TeamType.RED) {
                prevGameStats.redAttacks = prevGameStats.redAttacks
            } else if (teamType === TeamType.BLUE) {
                prevGameStats.blueAttacks = prevGameStats.blueAttacks
            }
        }

        setGameStats(prevGameStats)
        
    }

    return (
        <GameStatsContext.Provider value={gameStats}>
            <GameStatsUpdateContext.Provider value={updateGameStats}>
                    {children}
            </GameStatsUpdateContext.Provider>
        </GameStatsContext.Provider>
    );

}