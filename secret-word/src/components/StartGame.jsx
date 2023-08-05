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
  words,
  letrasDigitadas}
  ) => {
  
    const [letter, setLetter] = useState('')
    const [chute, setChute] = useState('')
    console.log(chute)
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault()

      verificaLetra(letter)

      setLetter('')

      letterInputRef.current.focus()
    }

    const handleChute = (e) => {
      e.preventDefault()
      // handleChute2()

      let chute = document.querySelector('.chutepalavra').value

      console.log('teste')

      if(chute === words.length){
        alert('Parabéns você acertou a palavra')
      }
      else{
        // gameStage = stages[2].name
        alert('Você errou a palavra')
      }

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
          
        <form onSubmit={handleChute}>
          <p>tente chutar uma palavra</p>
          <input type="text" value={chute} onChange={(e) => setChute(e.target.value)} className='chutepalavra' />
          <button>Verificar</button>
          </form>

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