import './StartGame.css'
import { useState,useRef } from 'react'
const StartGame = ({
  verificaLetra,
  pegarPalavra,
  pegarCategoria,
  letras,
  tentativas,
  LetrasAdvinhadas,
  pontos,
  letrasErradas,
  letrasDigitadas}) => {
  
    const [letter, setLetter] = useState('')
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()

      verificaLetra(letter)

      setLetter('')

      letterInputRef.current.focus()
    }
    return (

    <div className="game">
      <p className="pontos">
        <span>PONTUAÇÃO: {pontos} </span>
      </p>
      <h1>Adivinhe a palavra !</h1>
      <h3 className='tipo'>
        Dica sobre a palavra: <span>{pegarCategoria}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s)</p>
      <div className="wordContainer">
      {letras.map((l, index) => (
        <span key={index} className="letras">
          {LetrasAdvinhadas.includes(l) ? <span key={index} className='letras'>{l}</span> : <span className='quadradoBranco' key={index}></span>}
        </span>
      ))}
      </div>
      <div className="letraContainer">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input type="text" className="letraInput" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
          <button>Verificar</button>
          </form>  
      </div>
      <div className="letrasChutadas">
        <p>Letras ja utilizadas:</p>
       {letrasErradas.map((letras, index) => (
          <span key={index}>{letras}, </span>       
       ))}
      </div>
    </div>
  )
}

export default StartGame