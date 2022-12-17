import Board from './components/Board/Board'
import './App.css'
import { useGameStats } from './Contexts/GameStatsContext';

function App() {

  const gameStats = useGameStats()

  return (
    <div className="app">

      <h1>Checkers: </h1>
      <div className='info-section'>
        <h3>Turn: {gameStats.turn}</h3>
        <h3>Red: {gameStats.redAttacks}</h3>
        <h3>Blue: {gameStats.blueAttacks}</h3>
      </div>

      <div className="content">
      </div>
      <Board />
    </div>
  )
}

export default App
