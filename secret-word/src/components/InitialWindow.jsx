import './InitialWindow.css';

const InitialWindow = ({startGame}) => {
  return (
    <div className='Start'>
        <h1>ADIVINHE AS PALAVRAS</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o Jogo !</button>
    </div>
  )
}

export default InitialWindow