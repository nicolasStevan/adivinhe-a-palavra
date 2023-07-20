import './StartGame.css'

const StartGame = ({verificaLetra}) => {
  return (
    <div className="game">
      <p className="pontos">
        <span>PONTUAÇÃO: 000 </span>
      </p>
      <h1>Adivinhe a palavra !</h1>
      <h3 className='tipo'>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className="wordContainer">
        <span className='letras'>A</span>
        <span className='quadradoBranco'></span>
      </div>
      <div className="letraContainer">
        <p>Tente adivinhar uma letra da palavra</p>
        <form>
          <input type="text" className="letraInput" maxLength="1" required/>
          <button>Verificar</button>
          </form>  
      </div>
      <div className="letrasChutadas">
        <p>Letras ja utilizadas:</p>
        <span>a,</span>
        <span>d,</span>
      </div>
    </div>
  )
}

export default StartGame