import './GameOver.css'

const GameOver = ({retryGame,pontos}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>A sua pontuação foi : <span>{pontos}</span></h2>
      <button onClick={retryGame}>Reiniciar o Jogo</button>
    </div>
  )
}

export default GameOver