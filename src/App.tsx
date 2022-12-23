import Board from './components/Board/Board'
import './App.css'
import { useGameStats, useGameStatsUpdate, useUpdateAIDifficulty } from './Contexts/GameStatsContext';
import { TeamType } from './Constants';

function App() {

  const gameStats = useGameStats()
  const updateAIDifficulty = useUpdateAIDifficulty()

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const val = parseInt(e.target.value);
    if (val < 0) {
      alert("Difficulty Must be Greater than 0.")
      return
    }
    if (val) {
      updateAIDifficulty(val)
    }
  }

  return (
    <div className="app">

      <div className='info-section'>
        <h1>Checkers: </h1>
        <h3 className='turn-block'>Turn: {(gameStats.turn === TeamType.RED) ?
          <div className="red-font">RED</div> :
          <div className='blue-font'>BLUE</div>}
        </h3>
        <h3 className=''>Move: {gameStats.moves}</h3>
        {/* <h3 className="red-font">Red Kills: {gameStats.redAttacks}</h3>
        <h3 className='blue-font'>Blue Kills: {gameStats.blueAttacks}</h3> */}
      </div>
      <Board />
      <div className='info-section'>
        {/* <button className='info-section'>Restart</button>
        <button className='info-section'>Play Against AI</button>
        <button className='info-section'>Multiplayer</button> */}
        <label>AI Difficulty (1 or above):</label>
        <input onChange={e => handleInputChange(e)} type="number" className='minimax-input'></input>
      </div>
    </div>
  )
}

export default App
