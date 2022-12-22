import Board from './components/Board/Board'
import './App.css'
import { useGameStats } from './Contexts/GameStatsContext';

function App() {

  const gameStats = useGameStats()

  return (
    <div className="app">
      <Board />
    </div>
  )
}

export default App
