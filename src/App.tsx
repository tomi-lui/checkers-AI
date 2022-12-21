import Board from './components/Board/Board'
import './App.css'
import { useGameStats } from './Contexts/GameStatsContext';
import { TeamType } from './Constants';

function App() {

  const gameStats = useGameStats()

  return (
    <div className="app">

      {/* <h1>Checkers: </h1> */}
      {/* <div className='info-section'>
        <h3 className='turn-block'>Turn: {(gameStats.turn === TeamType.RED) ?
          <div className="red-font">RED</div> :
          <div className='blue-font'>BLUE</div>}
        </h3>
        <h3 className="red-font">Red: {gameStats.redAttacks}</h3>
        <h3 className='blue-font'>Blue: {gameStats.blueAttacks}</h3>
      </div> */}

      <div className="content">
      </div>
      <Board />
    </div>
  )
}

export default App
