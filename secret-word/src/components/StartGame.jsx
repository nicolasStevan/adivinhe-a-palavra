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
  letrasDigitadas}
  ) => {
  
    const [letter, setLetter] = useState('')
    const [chute, setChute] = useState('')
   
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
      e.preventDefault();
    
      if (letter.length === 1) {
        verificaLetra(letter);
      } else if (chute.length > 1) {
        // Lógica para verificar o chute da palavra
        if (chute.toLowerCase() === pegarPalavra.toLowerCase()) {
          // Palavra correta, você pode fazer o que quiser aqui, como aumentar a pontuação
          console.log('Palavra correta!');
        } else {
          // Palavra incorreta, você pode fazer o que quiser aqui, como diminuir tentativas
          console.log('Palavra incorreta!');
        }
      }
    
      setLetter('');
      setChute('');
      letterInputRef.current.focus();
    };


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
                {/* ... */}
          <p>Letras digitadas: <b>{letrasErradas.join(', ')}</b></p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="letraInput"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Verificar</button>
          </form>
          <p>ou</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="palavraInput"
              required
              onChange={(e) => setChute(e.target.value)}
              value={chute}
            />
            <button>Chutar Palavra</button>
          </form>
          {/* ... */}


      </div>
    </div>
  )
}

export default StartGame