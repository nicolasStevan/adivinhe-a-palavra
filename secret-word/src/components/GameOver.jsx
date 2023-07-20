import './GameOver.css'

const GameOver = ({retryGame}) => {
  return (
    <div>
      <h1>Game</h1>
      <button onClick={retryGame}>Reiniciar o Jogo</button>
    </div>
  )
}

export default GameOver