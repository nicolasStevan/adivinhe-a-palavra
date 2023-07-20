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
const [letrasDigitadas, setLetrasDigitadas] = useState([])

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
  wordLetters = wordLetters.map((letras) => letras.toLowerCase())


  console.log(word, category)
  console.log(wordLetters)

  //fill state
  setPegarPalavra(word)
  setPegarCategoria(category)
  setLetrasDigitadas(wordLetters)

  setGameStage(stages[1].name)
}

//processa a letra digitada

const verificaLetra = () => {
  setGameStage(stages[2].name)
}

// REINICIA O JOGO

const retryGame = () => {
  setGameStage(stages[0].name)
}

  return (
    <div className='App'>
      {gameStage === 'start' && <InitialWindow startGame={startGame} />}
      {gameStage === 'playing' && <StartGame verificaLetra={verificaLetra} />}
      {gameStage === 'end' && <GameOver retryGame={retryGame} />}
    </div>
  )
}

export default App
