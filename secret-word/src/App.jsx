// CSS
import './App.css'

//REACT

import { useCallback, useEffect, useState } from 'react'

// DATA

import { wordList } from './data/words'

//Components
import InitialWindow from './components/initialWindow'
import StartGame from './components/StartGame'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'playing'},
  {id: 3, name: 'end'},
]

function App() {
const [gameStage, setGameStage] = useState(stages[0].name)
const [words] = useState(wordList)

const [pegarPalavra, setPegarPalavra] = useState('')
const [pegarCategoria, setPegarCategoria] = useState('')
const [letras, setLetras] = useState([])
const [letrasDigitadas, setLetrasDigitadas] = useState([])

const [LetrasAdvinhadas, setLetrasAdvinhadas] = useState([])
const [letrasErradas, setLetrasErradas] = useState([])
const [tentativas, setTentativas] = useState(6)
const [pontos, setPontos] = useState(0)

const pegaPalavraeCategoria = () =>{
  //pegando uma categoria aleatoria
    const categories = Object.keys(words) 
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

  // pegando uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return {word, category}
}

//iniciando o jogo
const startGame = () => {
  //pega uma palavra e uma categoria
 const {word,category} = pegaPalavraeCategoria()
  
  //cria um array de letras
  let wordLetters = word.split('')

  // passando as letras para minusculas
  wordLetters = wordLetters.map((l) => l.toLowerCase())


  console.log(word, category)
  console.log(wordLetters)

  //fill state
  setPegarPalavra(word)
  setPegarCategoria(category)
  setLetras(wordLetters)

  setGameStage(stages[1].name)
}

//processa a letra digitada

const verificaLetra = (letter) => {
    const normalizedLetter = letter.toLowerCase()

  //verifica se a letra ja foi digitada
  if(LetrasAdvinhadas.includes(normalizedLetter) || letrasErradas.includes(normalizedLetter)){
    return
  }

  //inclui as letras que o usuario inserir nas erradas ou acertadas.
  if(letras.includes(normalizedLetter)){
    setLetrasAdvinhadas((AtualEstadoDasLetras) => [
      ...AtualEstadoDasLetras,
      normalizedLetter
    ])
  }else{
    setLetrasErradas((AtualErroDasLetras) => [
      ...AtualErroDasLetras,
      normalizedLetter
    ])
  };
  console.log(LetrasAdvinhadas)
  console.log(letrasErradas)
}

// REINICIA O JOGO

const retryGame = () => {
  setGameStage(stages[0].name)
}

  return (
    <div className='App'>
      {gameStage === 'start' && <InitialWindow startGame={startGame} />}
      {gameStage === 'playing' && <StartGame 
      verificaLetra={verificaLetra}
      pegarPalavra={pegarPalavra}
      pegarCategoria={pegarCategoria}
      letras={letras}
      LetrasAdvinhadas={LetrasAdvinhadas}
      tentativas={tentativas}
      pontos={pontos}
      letrasErradas={letrasErradas}
      letrasDigitadas={letrasDigitadas} />}
      {gameStage === 'end' && <GameOver retryGame={retryGame} />}
    </div>
  )
}

export default App
